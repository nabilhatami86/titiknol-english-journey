import { NextRequest, NextResponse } from 'next/server';

const PROMPT = (topic: string, subtopic: string, sentence: string) =>
  `You are an expert English grammar teacher. A student is practicing the grammar topic: "${topic}" (specifically: "${subtopic}").

Their example sentence:
"${sentence}"

Evaluate this sentence and return ONLY a raw JSON object — no markdown, no code fences.

JSON structure:
{
  "isCorrect": <true if the sentence is grammatically correct AND clearly demonstrates the target grammar topic>,
  "verdict": <"Benar" | "Hampir Benar" | "Salah">,
  "score": <integer 0-100>,
  "topicUsed": <true if the target grammar topic is visible/demonstrated in the sentence>,
  "feedback": "<2-3 sentences in Indonesian explaining whether it's correct and why>",
  "correctedSentence": "<the corrected sentence, or same as input if already correct>",
  "grammarBreakdown": [
    { "word": "<key word or phrase>", "role": "<its grammatical role, e.g. Adverb of Manner, Subject, Main Verb>", "note": "<1 short note in Indonesian>" }
  ],
  "topicExplanation": "<1-2 sentences in Indonesian: did this sentence correctly use '${subtopic}'? What rule applies?>",
  "improvement": "<one concrete suggestion in Indonesian to make the sentence better or more advanced>",
  "moreExamples": ["<another correct example sentence>", "<another one>"]
}`;

async function callGroq(topic: string, subtopic: string, sentence: string, apiKey: string) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: PROMPT(topic, subtopic, sentence) }],
      temperature: 0.3,
      max_tokens: 1500,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (res.status === 429) throw new Error('quota_exceeded');
    throw new Error(err?.error?.message ?? `Groq error ${res.status}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? '';
}

async function callGemini(topic: string, subtopic: string, sentence: string, apiKey: string) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: PROMPT(topic, subtopic, sentence) }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 1500 },
      }),
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (res.status === 429) throw new Error('quota_exceeded');
    throw new Error(err?.error?.message ?? `Gemini error ${res.status}`);
  }
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sentence: string = (body?.sentence ?? '').trim();
  const topic: string = (body?.topic ?? '').trim();
  const subtopic: string = (body?.subtopic ?? topic).trim();

  if (!sentence || sentence.split(/\s+/).length < 3) {
    return NextResponse.json({ error: 'too_short', message: 'Tulis minimal 3 kata.' }, { status: 400 });
  }

  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!groqKey && !geminiKey) {
    return NextResponse.json({ error: 'no_api_key', message: 'Tidak ada API key. Tambahkan GROQ_API_KEY atau GEMINI_API_KEY ke .env.local' }, { status: 503 });
  }

  try {
    const raw = groqKey
      ? await callGroq(topic, subtopic, sentence, groqKey)
      : await callGemini(topic, subtopic, sentence, geminiKey!);

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return NextResponse.json({ error: 'parse_error', message: 'Gagal membaca respons AI.' }, { status: 500 });

    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg === 'quota_exceeded') {
      return NextResponse.json({ error: 'quota_exceeded', message: 'Kuota AI habis, coba lagi sebentar.' }, { status: 429 });
    }
    return NextResponse.json({ error: 'server_error', message: msg }, { status: 500 });
  }
}
