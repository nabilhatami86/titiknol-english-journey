import { NextRequest, NextResponse } from 'next/server';
import { callAI } from '@/lib/callAI';

type Section = 'introduction' | 'body1' | 'body2' | 'conclusion';

function buildPrompt(
  section: Section,
  topic: string,
  text: string,
  mi1: string,
  mi2: string
): string {
  const criteria: Record<Section, string> = {
    introduction: `The introduction must have exactly 2 sentences:
- Sentence 1: Paraphrase the topic (do NOT copy the original words; use synonyms, change structure, change word forms).
- Sentence 2: Thesis statement that mentions MI1 ("${mi1}") and MI2 ("${mi2}") as the two main ideas.`,

    body1: `Body paragraph 1 is about MI1: "${mi1}". It must have 4–5 sentences in this exact order:
- Sentence 1 (MI): State the main idea — "${mi1}".
- Sentence 2 (WHY): Explain WHY this is important or true.
- Sentence 3 (HOW): Explain HOW it works or is applied.
- Sentence 4 (Example): Give a real-world example or evidence.
- Sentence 5 (optional): Additional support or elaboration.`,

    body2: `Body paragraph 2 is about MI2: "${mi2}". It must have 4–5 sentences in this exact order:
- Sentence 1 (MI): State the main idea — "${mi2}".
- Sentence 2 (WHY): Explain WHY this is important or true.
- Sentence 3 (HOW): Explain HOW it works or is applied.
- Sentence 4 (Example): Give a real-world example or evidence.
- Sentence 5 (optional): Additional support or elaboration.`,

    conclusion: `The conclusion must have exactly 3 sentences:
- Sentence 1: Restate the thesis (paraphrase the introduction's thesis — mention MI1 and MI2).
- Sentence 2: Summarise MI1 ("${mi1}") and MI2 ("${mi2}") briefly.
- Sentence 3: Closing statement — a final thought, prediction, recommendation, or call to action.`,
  };

  const sectionLabel = section === 'body1' ? 'body paragraph 1'
    : section === 'body2' ? 'body paragraph 2'
    : section;

  return `You are an IELTS essay writing coach evaluating a student's ${sectionLabel} for the essay topic: "${topic}".

STRUCTURE CRITERIA (from the teacher's board — must be followed exactly):
${criteria[section]}

Student's text:
"""
${text}
"""

Evaluate against the criteria and return ONLY a raw JSON object — no markdown, no code fences.

{
  "score": <integer 0-100>,
  "meetsStructure": <true|false>,
  "sentenceCount": <integer>,
  "expectedSentenceCount": "<'2' or '4-5' or '3'>",
  "structureFeedback": "<1-2 sentences: does it meet the board criteria or not?>",
  "structureBreakdown": [
    {
      "label": "<e.g. 'Sentence 1 (MI)' or 'Sentence 2 (WHY)' or 'Sentence 1 (Paraphrase)'>",
      "status": "<'met' | 'missing' | 'incorrect'>",
      "note": "<1 sentence: what the student wrote or attempted>",
      "why": "<only when status is 'missing' or 'incorrect': 1 sentence explaining specifically WHY it fails — quote the exact weak phrase from the student's text>",
      "howToFix": "<only when status is 'missing' or 'incorrect': take the student's ACTUAL sentence and correct it minimally — keep their words and structure as much as possible, only fix what is wrong. Do NOT write a completely new sentence. Show the corrected version of what they wrote.>",
      "tutorNote": "<only when status is 'missing' or 'incorrect': 1–2 sentences in BAHASA INDONESIA written like a tutor talking directly to the student — explain what they wrote, why it's off-track, and what direction they should go. Sound natural and encouraging, like a teacher guiding a student. E.g. 'Kamu sudah mencoba paraphrase, tapi kalimat ini terlalu melenceng dari topik utamanya. Yang seharusnya kamu bahas di sini adalah bagaimana globalisasi memengaruhi masyarakat, bukan hanya teknologi internet secara umum.'>"
    }
  ],
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": [
    { "point": "<what to improve>", "suggestion": "<how to fix it>" }
  ],
  "grammarIssues": [
    {
      "original": "<exact incorrect phrase from the student's text>",
      "corrected": "<corrected version>",
      "rule": "<grammar rule name, e.g. 'Subject-Verb Agreement', 'Article Usage', 'Tense Consistency'>",
      "explanation": "<1 sentence why it is wrong>"
    }
  ],
  "proTips": [
    {
      "tip": "<specific, actionable advice to make this paragraph more impressive — e.g. 'Add a statistic or real example in sentence 4 to strengthen the evidence'>",
      "example": "<a short example sentence demonstrating the tip in context of the essay topic>"
    }
  ],
  "vocabSuggestions": [
    {
      "wordUsed": "<exact word or phrase the student used in their text>",
      "wordClass": "<Noun|Verb|Adjective|Adverb|Connector>",
      "why": "<1 sentence: why this word is weak/basic and worth upgrading>",
      "alternatives": [
        {
          "word": "<stronger alternative>",
          "formality": "<Formal|Neutral|Informal>",
          "example": "<short sentence using this alternative in the context of the essay topic>"
        }
      ]
    }
  ],
  "improvedVersion": "<rewritten paragraph that perfectly follows the board structure criteria>"
}

Rules for proTips:
- Provide 2–3 tips that go BEYOND fixing errors — they should make the paragraph stand out
- Each tip must be specific to THIS paragraph, not generic advice
- Include a concrete example sentence demonstrating the tip

Rules for vocabSuggestions:
- ONLY pick words or phrases that appear in the student's actual text
- Focus on: weak verbs (use, get, make, do, depend), vague adjectives (good, bad, big), basic connectors (but, so, because, also), and overused nouns
- Provide 3–5 items
- Each item needs 2–3 alternatives with an example sentence relevant to the essay topic "${topic}"
- If the student used a connector like "but" suggest: "however", "on the other hand", "in contrast"
- If the student used "because" suggest: "due to", "owing to", "as a result of"
- If the student used "also" suggest: "furthermore", "in addition", "moreover"`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const section: Section = body?.section;
  const topic: string = body?.topic?.trim() ?? '';
  const text: string = body?.text?.trim() ?? '';
  const mi1: string = body?.mi1?.trim() ?? 'Main Idea 1';
  const mi2: string = body?.mi2?.trim() ?? 'Main Idea 2';

  const validSections: Section[] = ['introduction', 'body1', 'body2', 'conclusion'];
  if (!validSections.includes(section)) {
    return NextResponse.json({ error: 'invalid_section' }, { status: 400 });
  }
  if (!text || text.split(/\s+/).length < 5) {
    return NextResponse.json({ error: 'too_short', message: 'Write at least 5 words.' }, { status: 400 });
  }

  const prompt = buildPrompt(section, topic, text, mi1, mi2);

  try {
    const raw = await callAI(prompt, 3000);
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'parse_error', message: 'Could not parse AI response.' }, { status: 500 });
    }
    try {
      return NextResponse.json(JSON.parse(jsonMatch[0]));
    } catch {
      return NextResponse.json({ error: 'parse_error', message: 'AI response malformed.' }, { status: 500 });
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg === 'no_api_key') return NextResponse.json({ error: 'no_api_key', message: 'No AI key configured.' }, { status: 503 });
    if (msg === 'quota_exceeded') return NextResponse.json({ error: 'quota_exceeded', message: 'AI quota exceeded. Try again shortly.' }, { status: 429 });
    return NextResponse.json({ error: 'server_error', message: msg }, { status: 500 });
  }
}
