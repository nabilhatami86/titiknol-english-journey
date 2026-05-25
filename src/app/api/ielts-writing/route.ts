import { NextRequest, NextResponse } from 'next/server';

export type TaskType = 'task1' | 'task2';

const DESCRIPTORS_TASK1 = `
IELTS Writing Task 1 Band Descriptors — Task Achievement:
Band 9: All requirements of the task are fully and appropriately satisfied.
Band 8: Covers all requirements appropriately, relevantly and sufficiently; key features skilfully selected, clearly presented and highlighted.
Band 7: Covers requirements; key features selected and highlighted but could be more fully illustrated; presents a clear overview; data appropriately categorised.
Band 6: Focuses on requirements; key features adequately highlighted; relevant overview attempted; some details may be missing.
Band 5: Generally addresses requirements; key features not adequately covered; recounting of detail mainly mechanical; may be no data to support description.
Band 4: Attempts to address task; few key features selected; presented features may be irrelevant, repetitive or inaccurate.
Band 3: Does not address requirements; key features presented may be largely irrelevant.
Band 2: Content barely relates to the task.

IELTS Writing Task 1 Band Descriptors — Coherence & Cohesion:
Band 9: Message can be followed effortlessly; cohesion used so it very rarely attracts attention; paragraphing skilfully managed.
Band 8: Message followed with ease; logically sequenced; cohesion well managed; paragraphing used sufficiently and appropriately.
Band 7: Logically organised; clear progression; range of cohesive devices used flexibly but with some inaccuracies or over/under use.
Band 6: Generally arranged coherently; cohesive devices used to some good effect but cohesion within/between sentences may be faulty or mechanical.
Band 5: Organisation evident but not wholly logical; relationship of ideas can be followed; may be limited/overuse of cohesive devices.
Band 4: Ideas evident but not arranged coherently; no clear progression; some basic cohesive devices used (may be inaccurate or repetitive).
Band 3: No apparent logical organisation; minimal use of sequencers or cohesive devices.

IELTS Writing Task 1 Band Descriptors — Lexical Resource:
Band 9: Full flexibility and precise use evident within scope of task; wide range used accurately and appropriately with very natural and sophisticated control; minor errors extremely rare.
Band 8: Wide resource fluently and flexibly used to convey precise meanings; skilful use of uncommon/idiomatic items; occasional inaccuracies in word choice and collocation.
Band 7: Resource sufficient for some flexibility and precision; some less common/idiomatic items; awareness of style and collocation evident; only a few spelling errors.
Band 6: Generally adequate and appropriate for the task; meaning generally clear despite restricted range or lack of precision; some errors in spelling/word formation but don't impede.
Band 5: Limited but minimally adequate; simple vocabulary may be used accurately but range doesn't permit much variation; may be noticeable spelling errors.
Band 4: Limited and inadequate for the task; basic vocabulary; may be repetitive; errors in word choice/formation/spelling may impede meaning.
Band 3: Inadequate; over-dependence on input material or memorised language; errors predominate and may severely impede meaning.

IELTS Writing Task 1 Band Descriptors — Grammatical Range & Accuracy:
Band 9: Wide range of structures used with full flexibility and control; punctuation and grammar used appropriately throughout; minor errors extremely rare.
Band 8: Wide range flexibly and accurately used; majority of sentences error-free; punctuation well managed; occasional non-systematic errors.
Band 7: Variety of complex structures used with some flexibility and accuracy; grammar and punctuation generally well controlled; error-free sentences frequent; a few errors persist but don't impede.
Band 6: Mix of simple and complex sentence forms but flexibility limited; errors in grammar and punctuation occur but rarely impede communication.
Band 5: Range of structures limited and rather repetitive; complex sentences attempted but tend to be faulty; grammatical errors may be frequent.
Band 4: Very limited range of structures; subordinate clauses rare; simple sentences predominate; grammatical errors frequent and may impede meaning.
Band 3: Sentence forms attempted but errors in grammar and punctuation predominate; length may be insufficient.
`;

const DESCRIPTORS_TASK2 = `
IELTS Writing Task 2 Band Descriptors — Task Response:
Band 9: Prompt appropriately addressed and explored in depth; clear and fully developed position directly answers the question; ideas relevant, fully extended and well supported.
Band 8: Prompt appropriately and sufficiently addressed; clear and well-developed position; ideas relevant, well extended and supported; may be occasional omissions.
Band 7: Main parts of prompt appropriately addressed; clear and developed position; main ideas extended and supported but may tend to over-generalise or lack focus.
Band 6: Main parts addressed (some more fully than others); position directly relevant to prompt though conclusions may be unclear or unjustified; main ideas relevant but may lack development.
Band 5: Main parts incompletely addressed; writer expresses a position but development not always clear; some main ideas put forward but limited and not sufficiently developed.
Band 4: Prompt tackled in minimal way; position discernible but reader has to read carefully to find it; main ideas difficult to identify; large parts may be repetitive.
Band 3: No part of the prompt adequately addressed; no relevant position; few ideas, possibly irrelevant.
Band 2: Content barely related to the prompt; no position can be identified.

IELTS Writing Task 2 Band Descriptors — Coherence & Cohesion:
Band 9: Message can be followed effortlessly; cohesion very rarely attracts attention; paragraphing skilfully managed.
Band 8: Message followed with ease; logically sequenced; cohesion well managed; paragraphing sufficiently and appropriately used.
Band 7: Information and ideas logically organised; clear progression throughout; range of cohesive devices used flexibly; paragraphing generally effective.
Band 6: Generally arranged coherently with clear overall progression; cohesive devices used to some good effect but cohesion within/between sentences may be faulty; paragraphing may not always be logical.
Band 5: Organisation evident but not wholly logical; relationship of ideas can be followed but sentences not fluently linked; paragraphing may be inadequate or missing.
Band 4: Ideas evident but not arranged coherently; no clear progression; some basic cohesive devices (may be inaccurate); may be no paragraphing.
Band 3: No apparent logical organisation; minimal cohesive devices; any paragraphing attempts are unhelpful.

IELTS Writing Task 2 Band Descriptors — Lexical Resource:
Band 9: Full flexibility and precise use widely evident; wide range used accurately and appropriately with very natural and sophisticated control; minor errors extremely rare.
Band 8: Wide resource fluently and flexibly used to convey precise meanings; skilful use of uncommon/idiomatic items; occasional inaccuracies in word choice and collocation.
Band 7: Resource sufficient for some flexibility and precision; some less common/idiomatic items; awareness of style and collocation; only a few spelling errors.
Band 6: Generally adequate and appropriate; meaning generally clear despite restricted range; some errors in spelling/word formation but don't impede communication.
Band 5: Limited but minimally adequate; simple vocabulary may be used accurately but limited range; frequent lapses in appropriacy of word choice.
Band 4: Limited and inadequate or unrelated to task; basic vocabulary may be repetitive; errors in word choice/formation/spelling may impede meaning.
Band 3: Inadequate; over-dependence on memorised language; errors in word choice/spelling very limited and may severely impede meaning.

IELTS Writing Task 2 Band Descriptors — Grammatical Range & Accuracy:
Band 9: Wide range of structures used with full flexibility and control; punctuation and grammar used appropriately throughout; minor errors extremely rare.
Band 8: Wide range flexibly and accurately used; majority of sentences error-free; punctuation well managed; occasional non-systematic errors.
Band 7: Variety of complex structures used with some flexibility and accuracy; grammar and punctuation generally well controlled; error-free sentences frequent; a few errors persist but don't impede.
Band 6: Mix of simple and complex sentence forms but flexibility limited; errors in grammar and punctuation occur but rarely impede communication.
Band 5: Range limited and rather repetitive; complex sentences tend to be faulty; grammatical errors may be frequent and cause some difficulty.
Band 4: Very limited range; subordinate clauses rare; simple sentences predominate; grammatical errors frequent and may impede meaning.
Band 3: Sentence forms attempted but errors in grammar and punctuation predominate; length may be insufficient.
`;

const buildPrompt = (taskType: TaskType, prompt: string, essay: string) => `
You are a certified IELTS examiner scoring IELTS Writing ${taskType === 'task1' ? 'Task 1' : 'Task 2'}.

${taskType === 'task1' ? DESCRIPTORS_TASK1 : DESCRIPTORS_TASK2}

IELTS ${taskType === 'task1' ? 'Task 1' : 'Task 2'} Question:
"${prompt}"

Candidate's response (approximately ${essay.trim().split(/\s+/).length} words):
"""
${essay}
"""

Minimum word requirement: ${taskType === 'task1' ? '150' : '250'} words.
${essay.trim().split(/\s+/).length < (taskType === 'task1' ? 150 : 250) ? `WARNING: Response is UNDER the minimum word count. Penalise Task ${taskType === 'task1' ? 'Achievement' : 'Response'} by at least 1.0 band.` : ''}

Score this response strictly and accurately according to the official IELTS band descriptors above.
Return ONLY a raw JSON object — no markdown, no code fences, no explanation outside the JSON.

Band score rules:
- Use ONLY these values: 0, 1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9
- Overall band = average of the 4 criteria, rounded to nearest 0.5
- Be strict: most test-takers score 4.5–7.0; reserve 8+ for truly exceptional responses

JSON structure (all feedback in Indonesian):
{
  "overallBand": <number>,
  "taskBand": <number>,
  "coherenceBand": <number>,
  "lexicalBand": <number>,
  "grammarBand": <number>,
  "taskFeedback": "<2-3 sentences in Indonesian explaining exactly why this Task Achievement/Response score was given, with specific reference to the essay>",
  "coherenceFeedback": "<2-3 sentences in Indonesian explaining the Coherence & Cohesion score with specific observations>",
  "lexicalFeedback": "<2-3 sentences in Indonesian explaining the Lexical Resource score with specific observations>",
  "grammarFeedback": "<2-3 sentences in Indonesian explaining the Grammatical Range & Accuracy score with specific observations>",
  "taskImprovement": {
    "targetBand": <current taskBand + 0.5>,
    "steps": ["<concrete action 1 in Indonesian>", "<concrete action 2>", "<concrete action 3>"]
  },
  "coherenceImprovement": {
    "targetBand": <current coherenceBand + 0.5>,
    "steps": ["<concrete action 1 in Indonesian>", "<concrete action 2>", "<concrete action 3>"]
  },
  "lexicalImprovement": {
    "targetBand": <current lexicalBand + 0.5>,
    "steps": ["<concrete action 1 in Indonesian>", "<concrete action 2>", "<concrete action 3>"]
  },
  "grammarImprovement": {
    "targetBand": <current grammarBand + 0.5>,
    "steps": ["<concrete action 1 in Indonesian>", "<concrete action 2>", "<concrete action 3>"]
  },
  "corrections": [
    { "original": "<exact phrase or sentence from essay>", "corrected": "<corrected version>", "explanation": "<why in Indonesian>" }
  ],
  "vocabularyEnhancements": [
    { "used": "<word or phrase used>", "better": "<stronger IELTS-level alternative>", "reason": "<why in Indonesian>" }
  ],
  "improvedEssay": "<complete rewritten version of the essay at Band 7+ level, preserving the candidate's main ideas>",
  "generalFeedback": "<3-4 sentences in Indonesian: overall impression, strongest criterion, most important thing to improve, one concrete actionable tip>"
}

Important for improvement steps:
- Each step must be SPECIFIC and ACTIONABLE — not generic advice like "improve vocabulary"
- Reference the actual essay: e.g. "Ganti 'big' dengan 'substantial' atau 'considerable' seperti yang dibutuhkan di paragraf 2"
- Steps must directly address what was wrong in THIS specific essay
- Target band is always current band + 0.5 (max 9.0)`;

async function callGroq(taskType: TaskType, prompt: string, essay: string, apiKey: string) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: buildPrompt(taskType, prompt, essay) }],
      temperature: 0.2,
      max_tokens: 5000,
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

async function callGemini(taskType: TaskType, prompt: string, essay: string, apiKey: string) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt(taskType, prompt, essay) }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 4000 },
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
  const essay: string = (body?.essay ?? '').trim();
  const taskType: TaskType = body?.taskType === 'task2' ? 'task2' : 'task1';
  const prompt: string = (body?.prompt ?? '').trim();

  const minWords = taskType === 'task1' ? 50 : 80;
  if (!essay || essay.split(/\s+/).length < minWords) {
    return NextResponse.json(
      { error: 'too_short', message: `Essay terlalu pendek. Tulis minimal ${taskType === 'task1' ? 150 : 250} kata untuk hasil yang akurat.` },
      { status: 400 }
    );
  }

  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!groqKey && !geminiKey) {
    return NextResponse.json({ error: 'no_api_key', message: 'Tidak ada API key dikonfigurasi.' }, { status: 503 });
  }

  try {
    const raw = groqKey
      ? await callGroq(taskType, prompt, essay, groqKey)
      : await callGemini(taskType, prompt, essay, geminiKey!);

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'parse_error', message: 'Gagal membaca respons AI.' }, { status: 500 });
    }

    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg === 'quota_exceeded') {
      return NextResponse.json({ error: 'quota_exceeded', message: 'Kuota AI habis, coba lagi sebentar.' }, { status: 429 });
    }
    return NextResponse.json({ error: 'server_error', message: msg }, { status: 500 });
  }
}
