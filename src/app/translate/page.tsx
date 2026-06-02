"use client";

import { useState } from "react";
import {
  Search,
  Languages,
  ArrowRightLeft,
  Copy,
  Check,
  BookOpen,
  Loader2,
  AlertCircle,
} from "lucide-react";

type Sense = {
  partOfSpeech: string;
  ipa: string;
  definition: string;
  translated: string;
  examples: string[];
};

type Entry = {
  partOfSpeech: string;
  ipa: string;
  conjugations: string;
  senses: Sense[];
};

type WordResult = {
  word: string;
  translated: string;
  partOfSpeech: string;
  ipa: string;
  conjugations: string;
  definition: string;
  examples: string[];
  entries: Entry[];
  senses: Sense[];
  source: "cambridge" | "google";
};

const POS_COLOR: Record<string, string> = {
  noun:        "bg-primary/10 text-primary",
  verb:        "bg-primary/10 text-primary",
  adjective:   "bg-primary/10 text-primary",
  adverb:      "bg-primary/10 text-primary",
  preposition: "bg-primary/10 text-primary",
  conjunction: "bg-primary/10 text-primary",
  pronoun:     "bg-primary/10 text-primary",
  exclamation: "bg-primary/10 text-primary",
  phrase:      "bg-primary/10 text-primary",
};
function posColor(pos: string) {
  const key = pos.toLowerCase();
  for (const k of Object.keys(POS_COLOR)) {
    if (key.includes(k)) return POS_COLOR[k];
  }
  return "bg-gray-100 text-gray-600";
}

export default function TranslatePage() {
  const [mode, setMode] = useState<"word" | "text">("word");

  // ── Word lookup ────────────────────────────────────────────────────────────
  const [wordInput, setWordInput] = useState("");
  const [wordResult, setWordResult] = useState<WordResult | null>(null);
  const [wordLoading, setWordLoading] = useState(false);
  const [wordError, setWordError] = useState("");

  const lookupWord = async (overrideWord?: string) => {
    const q = (overrideWord ?? wordInput).trim();
    if (!q) return;
    setWordLoading(true);
    setWordError("");
    setWordResult(null);
    try {
      const res = await fetch(`/api/translate?word=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (data.error) throw new Error(data.message ?? data.error);
      setWordResult(data);
      if (overrideWord) setWordInput(overrideWord);
    } catch (e) {
      setWordError(e instanceof Error ? e.message : "Word not found in Cambridge Dictionary.");
    } finally {
      setWordLoading(false);
    }
  };

  // ── Text translate ─────────────────────────────────────────────────────────
  const [textInput, setTextInput] = useState("");
  const [textResult, setTextResult] = useState("");
  const [textLoading, setTextLoading] = useState(false);
  const [textError, setTextError] = useState("");
  const [copied, setCopied] = useState(false);

  const translateText = async () => {
    if (!textInput.trim()) return;
    setTextLoading(true);
    setTextError("");
    setTextResult("");
    try {
      const res = await fetch(`/api/translate?text=${encodeURIComponent(textInput.trim())}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setTextResult(data.translated ?? "");
    } catch {
      setTextError("Translation failed. Please try again.");
    } finally {
      setTextLoading(false);
    }
  };

  const copyText = async (t: string) => {
    await navigator.clipboard.writeText(t);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
          <Languages className="w-7 h-7 text-primary" />
          Translate
        </h1>
        <p className="text-(--text-secondary) text-sm mt-1">
          Word lookup — Cambridge Dictionary &middot; Long text translation
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-(--bg-secondary) rounded-xl w-fit">
        <button
          onClick={() => setMode("word")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "word"
              ? "bg-white dark:bg-(--sidebar-bg) text-(--text) shadow-sm"
              : "text-(--text-secondary) hover:text-(--text)"
          }`}
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Word Lookup
          </span>
        </button>
        <button
          onClick={() => setMode("text")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "text"
              ? "bg-white dark:bg-(--sidebar-bg) text-(--text) shadow-sm"
              : "text-(--text-secondary) hover:text-(--text)"
          }`}
        >
          <span className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4" />
            Text Translate
          </span>
        </button>
      </div>

      {/* ── Word Lookup ─────────────────────────────────────────────────────── */}
      {mode === "word" && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-muted)" />
              <input
                type="text"
                value={wordInput}
                onChange={(e) => setWordInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && lookupWord()}
                placeholder="Ketik satu kata bahasa Inggris…"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-(--border) bg-(--bg-secondary) text-(--text) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
              />
            </div>
            <button
              onClick={() => lookupWord()}
              disabled={wordLoading || !wordInput.trim()}
              className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center gap-2 transition-opacity"
            >
              {wordLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Cari
            </button>
          </div>

          {/* Error */}
          {wordError && (
            <div className="flex items-start gap-2 text-sm text-primary bg-primary/10 border border-primary/30 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{wordError}</span>
            </div>
          )}

          {/* Loading skeleton */}
          {wordLoading && (
            <div className="rounded-2xl border border-(--border) bg-(--bg-secondary) p-6 space-y-4 animate-pulse">
              <div className="space-y-2">
                <div className="h-7 w-36 bg-(--border) rounded-lg" />
                <div className="h-4 w-24 bg-(--border) rounded-lg" />
              </div>
              <div className="h-px bg-(--border)" />
              <div className="h-6 w-40 bg-(--border) rounded-lg" />
              <div className="h-px bg-(--border)" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-(--border) rounded" />
                <div className="h-4 w-5/6 bg-(--border) rounded" />
              </div>
            </div>
          )}

          {/* Result */}
          {wordResult && !wordLoading && (
            <div className="rounded-2xl border border-(--border) bg-(--bg-secondary) overflow-hidden">

              {/* ① Word + POS + IPA */}
              <div className="px-6 py-5 border-b border-(--border)">
                <h2 className="text-2xl font-bold text-(--text) capitalize">{wordResult.word}</h2>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  {wordResult.partOfSpeech && (
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wide ${posColor(wordResult.partOfSpeech)}`}>
                      {wordResult.partOfSpeech}
                    </span>
                  )}
                  {wordResult.ipa && (
                    <span className="text-(--text-secondary) text-sm font-mono tracking-wide">
                      {wordResult.ipa}
                    </span>
                  )}
                  <span className="text-xs text-(--text-muted) border border-(--border) px-2 py-0.5 rounded-full">
                    Cambridge
                  </span>
                </div>
                {wordResult.conjugations && (
                  <p className="text-xs text-(--text-muted) mt-1.5 font-mono">
                    {wordResult.conjugations}
                  </p>
                )}
              </div>

              {/* ② Indonesian translation */}
              <div className="px-6 py-4 border-b border-(--border)">
                <p className="text-[11px] font-semibold text-(--text-muted) uppercase tracking-widest mb-1">
                  Terjemahan · Indonesian
                </p>
                <p className="text-2xl font-bold text-primary">{wordResult.translated}</p>
              </div>

              {/* ③ English definition */}
              {wordResult.definition && (
                <div className="px-6 py-4 border-b border-(--border)">
                  <p className="text-[11px] font-semibold text-(--text-muted) uppercase tracking-widest mb-1">
                    Definition · English
                  </p>
                  <p className="text-sm text-(--text) leading-relaxed">{wordResult.definition}</p>
                </div>
              )}

              {/* ④ Examples */}
              {wordResult.examples && wordResult.examples.length > 0 && (
                <div className="px-6 py-4 border-b border-(--border)">
                  <p className="text-[11px] font-semibold text-(--text-muted) uppercase tracking-widest mb-2">
                    Examples
                  </p>
                  <ul className="space-y-1.5">
                    {wordResult.examples.map((eg, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary text-xs mt-0.5">▸</span>
                        <span className="text-sm text-(--text) italic">&ldquo;{eg}&rdquo;</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ⑤ All entries grouped by POS */}
              {wordResult.entries && wordResult.entries.length > 0 && wordResult.senses.length > 1 && (
                <div className="px-6 py-4">
                  <p className="text-[11px] font-semibold text-(--text-muted) uppercase tracking-widest mb-3">
                    All Meanings
                  </p>
                  <div className="space-y-5">
                    {wordResult.entries.map((entry, ei) => (
                      <div key={ei}>
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          {entry.partOfSpeech && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide ${posColor(entry.partOfSpeech)}`}>
                              {entry.partOfSpeech}
                            </span>
                          )}
                          {entry.ipa && (
                            <span className="text-xs text-(--text-muted) font-mono">{entry.ipa}</span>
                          )}
                          {entry.conjugations && (
                            <span className="text-xs text-(--text-muted) font-mono">· {entry.conjugations}</span>
                          )}
                        </div>
                        <div className="space-y-3 pl-1 border-l-2 border-(--border) ml-1">
                          {entry.senses.map((s, si) => (
                            <div key={si} className="flex gap-3 pl-3">
                              <span className="shrink-0 w-5 h-5 rounded-full border border-(--border) text-(--text-muted) text-xs flex items-center justify-center font-medium mt-0.5">
                                {si + 1}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-(--text) text-sm">{s.translated}</p>
                                {s.definition && (
                                  <p className="text-xs text-(--text-secondary) mt-0.5 leading-relaxed">{s.definition}</p>
                                )}
                                {s.examples && s.examples.length > 0 && (
                                  <p className="text-xs text-(--text-muted) italic mt-1">
                                    &ldquo;{s.examples[0]}&rdquo;
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Text Translate ───────────────────────────────────────────────────── */}
      {mode === "text" && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Source */}
            <div className="rounded-2xl border border-(--border) bg-(--bg-secondary) overflow-hidden flex flex-col">
              <div className="px-4 py-2.5 border-b border-(--border)">
                <span className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider">English</span>
              </div>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Masukkan teks Bahasa Inggris…"
                rows={8}
                className="flex-1 w-full px-4 py-3 bg-transparent text-(--text) placeholder:text-(--text-muted) resize-none focus:outline-none text-sm"
              />
              <div className="flex items-center justify-between px-4 py-2 border-t border-(--border)">
                <span className="text-xs text-(--text-muted)">{textInput.length} chars</span>
                <button
                  onClick={() => setTextInput("")}
                  disabled={!textInput}
                  className="text-xs text-(--text-muted) hover:text-primary disabled:opacity-30 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Result */}
            <div className="rounded-2xl border border-(--border) bg-(--bg-secondary) overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-(--border)">
                <span className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Indonesian</span>
                <button
                  onClick={() => copyText(textResult)}
                  disabled={!textResult}
                  className="p-1 rounded-md text-(--text-muted) hover:text-primary disabled:opacity-30 transition-colors"
                  title="Copy"
                >
                  {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex-1 px-4 py-3 min-h-48">
                {textLoading ? (
                  <div className="flex items-center gap-2 text-(--text-muted) text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" /> Menerjemahkan…
                  </div>
                ) : textResult ? (
                  <p className="text-sm text-(--text) whitespace-pre-wrap">{textResult}</p>
                ) : (
                  <p className="text-sm text-(--text-muted)">Hasil terjemahan akan muncul di sini…</p>
                )}
              </div>
              <div className="px-4 py-2 border-t border-(--border)">
                <span className="text-xs text-(--text-muted)">{textResult.length} chars</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              onClick={translateText}
              disabled={!textInput.trim() || textLoading}
              className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center gap-2 transition-opacity"
            >
              {textLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRightLeft className="w-4 h-4" />}
              Translate
            </button>
            {textError && (
              <p className="text-primary text-sm">{textError}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
