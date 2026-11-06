import { OpenAI } from 'openai';

/**
 * Shared AI call utility: GROQ_API_KEY → GROQ_API_KEY_BACKUP
 */
async function groqRequest(
  prompt: string,
  maxTokens: number,
  apiKey: string,
): Promise<string> {
  const client = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://api.groq.com/openai/v1",
    timeout: 15000,
  });

  const response = await (client as any).responses.create({
    model: "openai/gpt-oss-20b",
    input: prompt,
    max_output_tokens: maxTokens,
  });

  return response?.output_text ?? "";
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
    } catch (e: any) {
      const msg = e instanceof Error ? e.message : String(e);
      const status = e?.status;
      if (status !== 429 && msg !== "timeout" && !msg.includes("429") && !msg.includes("rate limit")) throw e;
      // quota_exceeded or timeout → try next key
    }
  }

  throw new Error("quota_exceeded");
}
