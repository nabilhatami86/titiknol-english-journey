import { NextRequest, NextResponse } from 'next/server';

const PROMPT = (text: string) => `You are an expert English teacher and IELTS examiner. Analyze the student's English text below and return ONLY a raw JSON object — no markdown, no code fences, no explanation outside the JSON.

Text:
"""
${text}
"""

JSON structure (fill every field carefully):
{
  "grammar": {
    "score": <integer 0-100>,
    "feedback": "<one or two sentences summarising grammar quality>",
    "corrections": [
      { "original": "<incorrect phrase from text>", "corrected": "<corrected phrase>", "explanation": "<brief why>" }
    ]
  },
  "sentenceAnalysis": {
    "summary": "<2-3 sentences about overall grammar patterns: tense consistency, voice usage, sentence variety>",
    "sentences": [
      {
        "sentence": "<the original sentence from the text>",
        "tense": {
          "used": "<tense name, e.g. Simple Past>",
          "isCorrect": <true|false>,
          "shouldBe": "<correct tense if wrong, same as used if correct>",
          "explanation": "<1 sentence why correct or wrong>"
        },
        "voice": {
          "type": "<'Active' | 'Passive' | 'Non-verbal'>",
          "isAppropriate": <true|false>,
          "suggestion": "<1 sentence: is the voice choice good here?>",
          "converted": "<show the other form if conversion is natural, e.g. active→passive or passive→active; null if not applicable>"
        },
        "structure": {
          "sentenceType": "<'Simple Sentence' | 'Compound Sentence' | 'Complex Sentence' | 'Compound-Complex' | 'Non-clause / Fragment' | 'Verbless Clause'>",
          "clauses": [
            {
              "text": "<the clause text>",
              "type": "<'Main Clause (Independent)' | 'Subordinate Clause (Adverbial)' | 'Subordinate Clause (Nominal)' | 'Subordinate Clause (Relative/Adjective)' | 'Coordinated Clause'>",
              "connector": "<conjunction or relative pronoun used, or null>",
              "subject": "<subject of clause>",
              "predicate": "<predicate/verb phrase>",
              "object": "<object if any, or null>",
              "note": "<1 sentence about this clause>"
            }
          ],
          "phrases": [
            {
              "text": "<phrase text>",
              "type": "<'Noun Phrase' | 'Verb Phrase' | 'Adjective Phrase' | 'Adverb Phrase' | 'Prepositional Phrase' | 'Participial Phrase' | 'Infinitive Phrase' | 'Gerund Phrase'>",
              "function": "<grammatical function, e.g. Subject, Object, Adverbial of place, Modifier>"
            }
          ]
        },
        "reduction": {
          "possible": <true|false>,
          "type": "<'Participial Phrase Reduction' | 'Gerund Phrase Reduction' | 'Infinitive Phrase Reduction' | 'Adjective Phrase Reduction' | 'Appositive Reduction' | 'N/A'>",
          "original": "<the clause that can be reduced>",
          "reduced": "<reduced form>",
          "explanation": "<how and why this reduction works>"
        },
        "wordClasses": [
          {
            "word": "<key word from the sentence>",
            "class": "<'Noun' | 'Pronoun' | 'Verb' | 'Auxiliary Verb' | 'Adjective' | 'Adverb' | 'Preposition' | 'Conjunction' | 'Article' | 'Interjection'>",
            "subclass": "<e.g. 'Common Noun', 'Transitive Verb', 'Coordinating Conjunction', 'Subordinating Conjunction', etc.>",
            "function": "<role in the sentence, e.g. Subject, Object, Modifier of X>"
          }
        ]
      }
    ]
  },
  "vocabulary": {
    "score": <integer 0-100>,
    "feedback": "<one or two sentences>",
    "suggestions": ["<word/phrase suggestion 1>", "<suggestion 2>"],
    "wordEnhancements": [
      {
        "wordUsed": "<word from the student's text>",
        "wordClass": "<Noun | Verb | Adjective | Adverb | etc.>",
        "meaning": "<short definition of the word>",
        "typicalUsage": "<describe when/where this word is typically used, e.g. 'everyday informal speech, casual writing'>",
        "synonyms": [
          {
            "word": "<synonym>",
            "meaning": "<what this synonym means, slightly different nuance>",
            "formality": "<Formal | Neutral | Informal>",
            "typicalUsage": "<when/where to use: e.g. 'IELTS essays, academic writing', 'business emails', 'literary/creative writing', 'everyday conversation'>",
            "example": "<one natural sentence using this synonym>"
          }
        ],
        "bestAlternative": "<which synonym fits best in the context of the student's sentence>",
        "bestAlternativeReason": "<1 sentence why this is the best upgrade for this specific context>"
      }
    ]
  },
  "coherence": {
    "score": <integer 0-100>,
    "feedback": "<one or two sentences about flow and clarity>"
  },
  "style": {
    "score": <integer 0-100>,
    "feedback": "<one or two sentences about writing style>"
  },
  "level": {
    "estimated": "<A1|A2|B1|B2|C1|C2>",
    "feedback": "<one sentence explaining the level estimate>"
  },
  "overallScore": <integer 0-100, weighted average>,
  "correctedVersion": "<full text with grammar errors fixed, preserving meaning>",
  "rewriteSuggestion": "<polished native-level rewrite of the same content>"
}`;

// ─── Groq (LLaMA 3.3 70B) ────────────────────────────────────────────────────

async function callGroq(text: string, apiKey: string) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: PROMPT(text) }],
      temperature: 0.3,
      max_tokens: 8192,
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

// ─── Gemini ───────────────────────────────────────────────────────────────────

async function callGemini(text: string, apiKey: string) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: PROMPT(text) }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 8192 },
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

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const body = await req.json();
  const text: string = body?.text?.trim() ?? '';

  if (!text || text.split(/\s+/).length < 5) {
    return NextResponse.json({ error: 'too_short', message: 'Write at least 5 words.' }, { status: 400 });
  }

  const groqKey   = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!groqKey && !geminiKey) {
    return NextResponse.json(
      { error: 'no_api_key', message: 'No AI key configured. Add GROQ_API_KEY or GEMINI_API_KEY to .env.local' },
      { status: 503 }
    );
  }

  try {
    // Prefer Groq (faster, no billing required); fall back to Gemini
    const raw = groqKey
      ? await callGroq(text, groqKey)
      : await callGemini(text, geminiKey!);

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'parse_error', message: 'Could not parse AI response.' }, { status: 500 });
    }

    try {
      return NextResponse.json(JSON.parse(jsonMatch[0]));
    } catch {
      // Response got cut off — try to shorten the text and retry with fewer sentences analysed
      return NextResponse.json(
        { error: 'parse_error', message: 'AI response was too long and got cut off. Try with a shorter text (under 150 words).' },
        { status: 500 }
      );
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg === 'quota_exceeded') {
      return NextResponse.json(
        { error: 'quota_exceeded', message: 'AI quota exceeded. Please wait a moment and try again.' },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: 'server_error', message: msg }, { status: 500 });
  }
}
