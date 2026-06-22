const DICT: Record<string, string> = {
  // whole-phrase mappings (longest first is preferred by algorithm)
  "i have not seen you for a long time":
    "saya sudah lama tidak bertemu denganmu",
  "long time no see": "lama tidak berjumpa",
  "it's been ages": "sudah lama sekali",
  "i have not seen you": "saya belum/baru saja tidak melihatmu",
  "what's up": "ada apa",
  "how are you": "apa kabar",
  "i don't know": "saya tidak tahu",
  "i do not know": "saya tidak tahu",
  "you're welcome": "sama-sama",
  "thank you": "terima kasih",
  thanks: "terima kasih",
  "i am sorry": "saya minta maaf",
  "i'm": "saya",
  "i am": "saya",
  you: "kamu",
  hello: "halo",
  goodbye: "selamat tinggal",
  "good night": "selamat malam",
  "let's": "mari",
  "let us": "mari",
  sorry: "maaf",
};

export function approxTranslate(input: string): string {
  if (!input) return "";
  const s = input.toLowerCase();

  // Try exact/normalized match first
  const normalized = s.replace(/["'’]/g, "").trim();
  if (DICT[normalized]) return capitalize(DICT[normalized]);

  // Replace phrases: prefer longer keys first to avoid partial mixes
  const keys = Object.keys(DICT).sort((a, b) => b.length - a.length);
  let out = input;
  let replaced = false;
  for (const k of keys) {
    const v = DICT[k];
    const re = new RegExp("\\b" + escapeRegExp(k) + "\\b", "gi");
    if (re.test(out)) {
      out = out.replace(re, v);
      replaced = true;
    }
  }

  // If nothing was replaced, return empty string to avoid mixed outputs
  if (!replaced) return "";

  return capitalize(out);
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
