'use client';

import { useState } from 'react';
import { Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonVocabCardProps {
  /** Raw vocab string — new format or old format */
  point: string;
  onSpeak?: (word: string) => void;
}

/**
 * Renders one lesson vocabulary entry from a plain-text string.
 *
 * New format (with tenses + clauses):
 *   "N.  word (pos) | tenses — meaning | translation\n    Clause: 'ex1.' / 'ex2.'"
 *
 * Old format:
 *   "word (pos) — meaning [| example]"
 */
export function LessonVocabCard({ point, onSpeak }: LessonVocabCardProps) {
  const [open, setOpen] = useState(false);

  // ── New format ────────────────────────────────────────────────────────
  const newFmt = point.match(
    /^(?:(\d+)\.\s+)?(.+?)\s*\(([^)]+)\)\s*\|\s*([^—\n]+)\s*[—–-]\s*([^\n]+)(?:\n\s*Clause:\s*([\s\S]+))?$/,
  );

  if (newFmt) {
    const [, num, word, pos, tenses, meaningFull, clauseText] = newFmt;
    const [meaning, translation] = meaningFull.split(/\s*\|\s*/);
    const clauses = clauseText
      ?.match(/'([^']+)'/g)
      ?.map((c) => c.replace(/^'|'$/g, ''));
    const hasClauses = clauses && clauses.length > 0;

    return (
      <div
        className={cn(
          'rounded-xl border transition-all overflow-hidden',
          open
            ? 'border-primary/40 bg-primary/5 dark:bg-primary/10'
            : 'border-(--border) bg-(--bg-secondary) hover:border-primary/25',
        )}
      >
        {/* ── Header row ── */}
        <div className="flex items-start gap-3 px-4 py-3">
          {/* Number pill */}
          {num && (
            <span className="shrink-0 mt-0.5 min-w-[26px] h-[22px] flex items-center justify-center rounded-md bg-primary/10 text-primary text-[10px] font-bold tabular-nums">
              {num.padStart(2, '0')}
            </span>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Word + POS */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-[15px] leading-tight text-primary">
                {word.trim()}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary uppercase tracking-widest">
                {pos}
              </span>
            </div>

            {/* Tenses */}
            {tenses.trim() && (
              <p className="text-[11px] text-(--text-muted) mt-0.5 font-mono tracking-tight">
                {tenses.trim()}
              </p>
            )}

            {/* Meaning + translation */}
            <div className="flex items-baseline gap-1.5 mt-1.5 flex-wrap">
              <span className="text-sm text-(--text) font-medium leading-snug">
                {meaning.trim()}
              </span>
              {translation && (
                <>
                  <span className="text-(--text-muted) text-xs select-none">·</span>
                  <span className="text-[12px] text-(--text-muted) italic">
                    {translation.trim()}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="shrink-0 flex items-center gap-1 mt-0.5">
            {onSpeak && (
              <button
                type="button"
                onClick={() => onSpeak(word.trim())}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-(--text-muted) hover:text-primary hover:bg-primary/10 transition-colors"
                title="Dengarkan"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            )}
            {hasClauses && (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-(--text-muted) hover:text-primary hover:bg-primary/10 transition-colors"
                title={open ? 'Sembunyikan contoh' : 'Lihat contoh'}
              >
                {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* ── Expanded clauses ── */}
        {open && clauses && (
          <div className="px-4 pb-3 pt-2 border-t border-(--border)/50 space-y-2">
            {clauses.map((clause, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="shrink-0 text-[10px] font-bold text-primary/50 mt-[3px] w-5">
                  {i + 1}.
                </span>
                <p className="text-xs text-(--text-secondary) italic leading-relaxed">
                  &ldquo;{clause}&rdquo;
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Old format ────────────────────────────────────────────────────────
  const oldFmt = point.match(
    /^(?:(\d+)\.\s+)?(.+?)\s*\(([^)]+)\)\s*[—–-]\s*(.+?)(?:\s*\|\s*([^\n]+))?(?:\n\s*Clause:\s*([\s\S]+))?$/,
  );

  if (oldFmt) {
    const [, num, word, pos, meaning, translation, clauseText] = oldFmt;
    const clauses = clauseText
      ?.match(/'([^']+)'/g)
      ?.map((c) => c.replace(/^'|'$/g, ''));
    const hasClauses = clauses && clauses.length > 0;

    return (
      <div
        className={cn(
          'rounded-xl border transition-all overflow-hidden',
          open
            ? 'border-primary/40 bg-primary/5 dark:bg-primary/10'
            : 'border-(--border) bg-(--bg-secondary) hover:border-primary/25',
        )}
      >
        <div className="flex items-start gap-3 px-4 py-3">
          {num && (
            <span className="shrink-0 mt-0.5 min-w-[26px] h-[22px] flex items-center justify-center rounded-md bg-primary/10 text-primary text-[10px] font-bold tabular-nums">
              {num.padStart(2, '0')}
            </span>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-[15px] leading-tight text-primary">{word.trim()}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary uppercase tracking-widest">
                {pos}
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-1.5 flex-wrap">
              <span className="text-sm text-(--text) font-medium leading-snug">
                {meaning.trim()}
              </span>
              {translation && (
                <>
                  <span className="text-(--text-muted) text-xs select-none">·</span>
                  <span className="text-[12px] text-(--text-muted) italic">
                    {translation.trim()}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-1 mt-0.5">
            {onSpeak && (
              <button
                type="button"
                onClick={() => onSpeak(word.trim())}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-(--text-muted) hover:text-primary hover:bg-primary/10 transition-colors"
                title="Dengarkan"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            )}
            {hasClauses && (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-(--text-muted) hover:text-primary hover:bg-primary/10 transition-colors"
                title={open ? 'Sembunyikan contoh' : 'Lihat contoh'}
              >
                {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>
        {open && clauses && (
          <div className="px-4 pb-3 pt-2 border-t border-(--border)/50 space-y-2">
            {clauses.map((clause, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="shrink-0 text-[10px] font-bold text-primary/50 mt-[3px] w-5">
                  {i + 1}.
                </span>
                <p className="text-xs text-(--text-secondary) italic leading-relaxed">
                  &ldquo;{clause}&rdquo;
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}
