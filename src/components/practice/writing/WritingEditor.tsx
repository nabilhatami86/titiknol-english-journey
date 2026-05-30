'use client';

import type { RefObject } from 'react';
import {
  PenLine, X, Sparkles, Loader2, AlertCircle,
  FileWarning, WifiOff, KeyRound, Gauge,
} from 'lucide-react';
import type { WritingErrorType } from '@/types/writingPractice';
import { WRITING_TYPES } from './utils';

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

export function WritingEditor({
  text, wordCount, promptIdea, loading, error, errorType,
  textareaRef, onChange, onSubmit, onClear,
}: Props) {
  return (
    <div className="space-y-4">

      {/* Writing type chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {WRITING_TYPES.map((t) => (
          <span key={t} className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border border-(--border) text-(--text-muted)">
            {t}
          </span>
        ))}
      </div>

      {/* Textarea card */}
      <div className="bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-(--border) bg-(--bg-secondary)/30">
          <span className="text-xs font-medium text-(--text-secondary) flex items-center gap-1.5">
            <PenLine className="w-3.5 h-3.5" /> Your Writing
          </span>
          {text && (
            <button onClick={onClear} className="text-xs text-(--text-muted) hover:text-primary flex items-center gap-1 transition-colors">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Start writing here...\n\nNeed an idea? Try: "${promptIdea}"`}
          className="w-full min-h-[200px] sm:min-h-[340px] p-5 text-sm text-(--text) bg-transparent resize-none focus:outline-none leading-relaxed placeholder:text-(--text-muted) placeholder:italic"
          spellCheck
        />

        <div className="flex items-center justify-between px-4 py-2.5 border-t border-(--border) bg-(--bg-secondary)/30">
          <div className="flex flex-wrap items-center gap-3 text-xs text-(--text-muted)">
            <span>{wordCount} words</span>
            <span>·</span>
            <span>{text.length} chars</span>
            {wordCount > 0 && wordCount < 5 && (
              <span className="text-primary">— write at least 5 words</span>
            )}
          </div>
        </div>
      </div>

      {/* Error: too long */}
      {error && errorType === 'too_long' && (
        <div className="border border-primary/30 bg-primary/5 rounded-2xl p-4 space-y-3">
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
                <Gauge className="w-3.5 h-3.5 text-primary" /> Panjang tulisanmu sekarang
              </span>
              <span className="font-bold text-primary">{wordCount} kata</span>
            </div>
            <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${Math.min((wordCount / 150) * 100, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-(--text-muted)">
              Rekomendasi: <strong>maksimal 150 kata</strong> untuk analisis lengkap
            </p>
          </div>
          <p className="text-xs text-(--text-muted)">Potong tulisanmu jadi lebih pendek, lalu coba lagi.</p>
        </div>
      )}

      {/* Error: quota */}
      {error && errorType === 'quota' && (
        <div className="flex items-start gap-2.5 bg-primary/5 border border-primary/30 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-(--text)">Quota AI habis</p>
            <p className="text-xs text-(--text-muted) mt-0.5">{error} Groq gratis: 30 request/menit, 14.400/hari.</p>
          </div>
        </div>
      )}

      {/* Error: no key */}
      {error && errorType === 'no_key' && (
        <div className="flex items-start gap-2.5 bg-primary/5 border border-primary/30 rounded-xl px-4 py-3">
          <KeyRound className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-(--text)">API Key belum diisi</p>
            <p className="text-xs text-(--text-muted) mt-0.5">
              Tambahkan <code className="bg-primary/10 px-1 rounded text-primary">GROQ_API_KEY</code> di file{' '}
              <code className="bg-primary/10 px-1 rounded text-primary">.env.local</code>. Daftar gratis di console.groq.com
            </p>
          </div>
        </div>
      )}

      {/* Error: network */}
      {error && errorType === 'network' && (
        <div className="flex items-start gap-2.5 bg-(--bg-card) border border-(--border) rounded-xl px-4 py-3">
          <WifiOff className="w-4 h-4 text-(--text-muted) shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-(--text)">Tidak ada koneksi</p>
            <p className="text-xs text-(--text-muted) mt-0.5">Cek internet kamu lalu coba lagi.</p>
          </div>
        </div>
      )}

      {/* Error: general */}
      {error && errorType === 'general' && (
        <div className="flex items-start gap-2.5 bg-primary/5 border border-primary/30 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-(--text)">{error}</p>
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={onSubmit}
        disabled={loading || wordCount < 5}
        className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> AI is reviewing your writing...</>
        ) : (
          <><Sparkles className="w-4 h-4" /> Check My Writing</>
        )}
      </button>

      <p className="text-center text-xs text-(--text-muted)">
        Powered by Groq AI ·
        add <code className="bg-(--bg-secondary) px-1 rounded text-[11px]">GROQ_API_KEY</code> to{' '}
        <code className="bg-(--bg-secondary) px-1 rounded text-[11px]">.env.local</code> to enable
      </p>
    </div>
  );
}
