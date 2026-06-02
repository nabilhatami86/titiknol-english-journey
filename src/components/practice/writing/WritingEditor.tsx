"use client";

import type { RefObject } from "react";
import {
  PenLine, X, Sparkles, Loader2, AlertCircle,
  FileWarning, WifiOff, KeyRound, Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { WritingErrorType } from "@/types/writingPractice";
import { WRITING_TYPES } from "./utils";

interface Props {
  text: string;
  wordCount: number;
  promptIdea: string;
  loading: boolean;
  error: string;
  errorType: WritingErrorType;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onChange: (text: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}

const MAX_WORDS = 150;

export function WritingEditor({
  text, wordCount, promptIdea, loading, error, errorType,
  textareaRef, onChange, onSubmit, onClear,
}: Props) {
  const wordPct  = Math.min((wordCount / MAX_WORDS) * 100, 100);
  const isReady  = wordCount >= 5 && !loading;

  return (
    <div className="space-y-4">

      {/* Writing type chips */}
      <div className="flex flex-wrap gap-1.5">
        {WRITING_TYPES.map((t) => (
          <span
            key={t}
            className="text-xs font-medium px-2.5 py-1 rounded-full border border-(--border) bg-(--bg-secondary) text-(--text-muted)"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Prompt idea banner */}
      {!text && promptIdea && (
        <div className="flex items-start gap-2.5 bg-primary/4 border border-primary/15 rounded-xl px-3.5 py-2.5">
          <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-(--text-secondary) leading-relaxed">
            <span className="font-semibold text-primary">Butuh ide? </span>
            <span className="italic">{promptIdea}</span>
          </p>
        </div>
      )}

      {/* Textarea card */}
      <div className={cn(
        "bg-(--bg-card) border rounded-2xl overflow-hidden shadow-sm transition-colors",
        "focus-within:border-primary/40 hover:border-primary/25 border-(--border)",
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-(--border) bg-(--bg-secondary)/40">
          <span className="text-xs font-semibold text-(--text-secondary) flex items-center gap-1.5">
            <PenLine className="w-3.5 h-3.5 text-primary" /> Your Writing
          </span>
          {text && (
            <button
              onClick={onClear}
              className="text-xs text-(--text-muted) hover:text-primary flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start writing here..."
          className="w-full min-h-[200px] sm:min-h-80 p-5 text-sm text-(--text) bg-transparent resize-none focus:outline-none leading-relaxed placeholder:text-(--text-muted)"
          spellCheck
        />

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-(--border) bg-(--bg-secondary)/40 space-y-2">
          <div className="flex items-center justify-between text-xs text-(--text-muted)">
            <div className="flex items-center gap-3">
              <span className={cn('font-medium', wordCount > 0 && wordCount < 5 && 'text-primary')}>
                {wordCount} / {MAX_WORDS} kata
              </span>
              <span>{text.length} karakter</span>
            </div>
            {wordCount > 0 && wordCount < 5 && (
              <span className="text-primary text-[11px] font-semibold">min. 5 kata</span>
            )}
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-(--bg-secondary) rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-300',
                wordPct >= 100 ? 'bg-primary/50' : 'bg-primary',
              )}
              style={{ width: `${wordPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Error states */}
      {error && errorType === "too_long" && (
        <div className="border border-primary/25 bg-primary/5 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FileWarning className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-(--text)">Teks Terlalu Panjang</p>
              <p className="text-xs text-(--text-muted)">Response AI kepotong karena token habis</p>
            </div>
          </div>
          <div className="bg-primary/10 rounded-xl px-3 py-2.5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-(--text) font-semibold flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-primary" /> Panjang tulisanmu
              </span>
              <span className="font-bold text-primary">{wordCount} kata</span>
            </div>
            <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min((wordCount / 150) * 100, 100)}%` }} />
            </div>
            <p className="text-[11px] text-(--text-muted)">Rekomendasi: <strong>maksimal 150 kata</strong></p>
          </div>
        </div>
      )}
      {error && errorType === "quota" && (
        <div className="flex items-start gap-2.5 bg-primary/5 border border-primary/25 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-(--text)">Quota AI habis</p>
            <p className="text-xs text-(--text-muted) mt-0.5">Groq gratis: 30 request/menit. Tunggu sebentar lalu coba lagi.</p>
          </div>
        </div>
      )}
      {error && errorType === "no_key" && (
        <div className="flex items-start gap-2.5 bg-primary/5 border border-primary/25 rounded-xl px-4 py-3">
          <KeyRound className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-(--text)">API Key belum diisi</p>
            <p className="text-xs text-(--text-muted) mt-0.5">
              Tambahkan <code className="bg-primary/10 px-1 rounded text-primary">GROQ_API_KEY</code> di{" "}
              <code className="bg-primary/10 px-1 rounded text-primary">.env.local</code>
            </p>
          </div>
        </div>
      )}
      {error && errorType === "network" && (
        <div className="flex items-start gap-2.5 bg-(--bg-card) border border-(--border) rounded-xl px-4 py-3">
          <WifiOff className="w-4 h-4 text-(--text-muted) shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-(--text)">Tidak ada koneksi</p>
            <p className="text-xs text-(--text-muted) mt-0.5">Cek internet kamu lalu coba lagi.</p>
          </div>
        </div>
      )}
      {error && errorType === "general" && (
        <div className="flex items-start gap-2.5 bg-primary/5 border border-primary/25 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-(--text)">{error}</p>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={onSubmit}
        disabled={!isReady}
        className={cn(
          'w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 px-6 font-bold text-sm transition-all',
          isReady
            ? 'bg-primary text-white hover:bg-primary/90 shadow-sm shadow-primary/25'
            : 'bg-(--bg-secondary) text-(--text-muted) border border-(--border) cursor-not-allowed',
        )}
      >
        {loading
          ? <><Loader2 className="w-4 h-4 animate-spin" /> AI is reviewing your writing...</>
          : <><Sparkles className="w-4 h-4" /> Check My Writing</>
        }
      </button>
    </div>
  );
}
