/**
 * Shared AI call utility: GROQ_API_KEY → GROQ_API_KEY_BACKUP
 */

async function groqRequest(
  prompt: string,
  maxTokens: number,
  apiKey: string,
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  let res: Response;
  try {
    res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: maxTokens,
      }),
      signal: controller.signal,
    });
  } catch (e) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError")
      throw new Error("timeout");
    throw e;
  }
  clearTimeout(timer);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (res.status === 429) throw new Error("quota_exceeded");
    throw new Error(err?.error?.message ?? `Groq error ${res.status}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "";
}

/**
 * Call Groq with automatic fallback: GROQ_API_KEY → GROQ_API_KEY_BACKUP
 * Throws 'quota_exceeded' if both are exhausted, 'no_api_key' if none configured.
 */
export async function callAI(
  prompt: string,
  maxTokens = 4096,
): Promise<string> {
  const keys = [
    process.env.GROQ_API_KEY,
    process.env.GROQ_API_KEY_BACKUP,
    process.env.GROQ_API_KEY_BACKUP2,
  ].filter(Boolean) as string[];

  if (keys.length === 0) throw new Error("no_api_key");

  for (const key of keys) {
    try {
      return await groqRequest(prompt, maxTokens, key);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      if (msg !== "quota_exceeded" && msg !== "timeout") throw e;
      // quota_exceeded or timeout → try next key
    }
  }

  throw new Error("quota_exceeded");
}
