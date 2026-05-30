/**
 * Shared AI call utility: GROQ_API_KEY → GROQ_API_KEY_BACKUP
 */

async function groqRequest(prompt: string, maxTokens: number, apiKey: string): Promise<string> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: maxTokens,
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

/**
 * Call Groq with automatic fallback: GROQ_API_KEY → GROQ_API_KEY_BACKUP
 * Throws 'quota_exceeded' if both are exhausted, 'no_api_key' if none configured.
 */
export async function callAI(prompt: string, maxTokens = 4096): Promise<string> {
  const groqKey = process.env.GROQ_API_KEY;
  const groqBackup = process.env.GROQ_API_KEY_BACKUP;

  if (!groqKey && !groqBackup) throw new Error('no_api_key');

  if (groqKey) {
    try {
      return await groqRequest(prompt, maxTokens, groqKey);
    } catch (e) {
      if (!(e instanceof Error && e.message === 'quota_exceeded')) throw e;
    }
  }

  if (groqBackup) {
    return await groqRequest(prompt, maxTokens, groqBackup);
  }

  throw new Error('quota_exceeded');
}
