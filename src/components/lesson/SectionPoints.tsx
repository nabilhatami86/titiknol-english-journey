'use client';

import type { ReactNode, RefObject } from 'react';
import { Lightbulb, XCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnnotatedText from '@/components/grammar/AnnotatedText';
import { LessonVocabCard } from '@/components/LessonVocabCard';
import { GrammarPassageCard } from '@/components/GrammarPassageCard';
import { GrammarIntroCard } from '@/components/GrammarIntroCard';
import { ComparisonAltsCard } from '@/components/ComparisonAltsCard';

const TENSES_ROWS = [
  { label: 'PRESENT',      sub: 'habit / fact',  active: 'S + V1',            passive: 'S + is/am/are + V3',    nonVerbal: 'S + is/am/are + ANA' },
  { label: 'PAST',         sub: 'past event',    active: 'S + V2',            passive: 'S + was/were + V3',     nonVerbal: 'S + was/were + ANA' },
  { label: 'PRESENT CONT.',sub: 'right now',     active: 'S + is/am/are + V1-ing', passive: 'S + is/am/are + being + V3', nonVerbal: 'S + is/am/are + being + ANA' },
] as const;

const BADGE = 'bg-primary/10 text-primary border border-primary/30 dark:border-primary/50';
const ROW   = 'bg-primary/10 dark:bg-primary/10';

interface Props {
  points: string[];
  title: string;
  track: string;
  imageUrl?: string;
  renderClickableText: (text: string, showSuffix?: boolean) => ReactNode;
  translateWord: (word: string) => void;
  setShowQuizGame: (v: boolean) => void;
  quizGameRef: RefObject<HTMLDivElement | null>;
}

export function SectionPoints({ points, title, track, imageUrl, renderClickableText, translateWord, setShowQuizGame, quizGameRef }: Props) {
  if (/grammar in the passage/i.test(title) || points.some(p => /^──.*──$/.test(p.trim()))) {
    return <GrammarPassageCard points={points} />;
  }
  if (/pengertian|ketentuan|jenis/i.test(title) && track === 'grammar') {
    return <GrammarIntroCard points={points} />;
  }

  return (
    <div className="space-y-0.5">
      {points.map((point, pIdx) => {
        const key = `${title}-${pIdx}`;

        if (!point.trim()) return <div key={key} className="h-3" />;

        // {{alts: main | alt1 | alt2}}
        const altsMatch = point.match(/^\{\{alts:\s*([\s\S]+?)\}\}$/);
        if (altsMatch) {
          const [main, ...alts] = altsMatch[1].split(/\s*\|\s*/);
          return <ComparisonAltsCard key={key} main={main} alts={alts} />;
        }

        // {{tenses-table}}
        if (point.trim() === '{{tenses-table}}') {
          return (
            <div key={key} className="mt-3 rounded-xl border border-(--border) overflow-x-auto text-xs">
              <div className="grid grid-cols-4 min-w-[480px] bg-(--bg-secondary) border-b border-(--border)">
                {['Tense', 'Active', 'Passive', 'Non-Verbal'].map(h => (
                  <div key={h} className="px-3 py-2 font-bold text-(--text-muted) uppercase tracking-wider text-[10px] text-center">{h}</div>
                ))}
              </div>
              {TENSES_ROWS.map(row => (
                <div key={row.label} className={`grid grid-cols-4 min-w-[480px] border-b last:border-b-0 border-(--border) ${ROW}`}>
                  <div className="px-3 py-3 flex flex-col items-center justify-center gap-1 border-r border-(--border)">
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${BADGE}`}>{row.label}</span>
                    <span className="text-(--text-muted) text-[10px] italic">{row.sub}</span>
                  </div>
                  <div className="px-3 py-3 flex items-center justify-center text-center font-mono text-(--text) border-r border-(--border)">{row.active}</div>
                  <div className="px-3 py-3 flex items-center justify-center text-center font-mono text-(--text) border-r border-(--border)">{row.passive}</div>
                  <div className="px-3 py-3 flex items-center justify-center text-center font-mono text-(--text)">{row.nonVerbal}</div>
                </div>
              ))}
              <div className="px-3 py-2 bg-(--bg-secondary) border-t border-(--border) text-(--text-muted) text-[10px] italic flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-primary/50 shrink-0" />
                ANA = Adjective / Noun / Adverb
              </div>
            </div>
          );
        }

        // {{conj-prep-table}}
        if (point.trim() === '{{conj-prep-table}}') {
          const rows = [
            { conj: 'because', prep: ['because of', 'due to'] },
            { conj: 'although', prep: ['despite', 'in spite of'] },
            { conj: 'when / while', prep: ['during'] },
          ];
          return (
            <div key={key} className="mt-3 mb-1 rounded-2xl overflow-hidden border border-primary/20">
              {/* Header */}
              <div className="grid grid-cols-[1fr_auto_1fr]">
                <div className="bg-primary px-4 py-3 flex flex-col items-center gap-0.5">
                  <span className="text-white/70 text-[9px] font-semibold uppercase tracking-widest">Conjunction</span>
                  <span className="text-white text-[11px] font-bold">+ Subject + Verb</span>
                </div>
                <div className="bg-primary/80 flex items-center justify-center px-3">
                  <span className="text-white/60 text-[10px] font-black">VS</span>
                </div>
                <div className="bg-primary/10 px-4 py-3 flex flex-col items-center gap-0.5 border-l border-primary/20">
                  <span className="text-primary/60 text-[9px] font-semibold uppercase tracking-widest">Preposition</span>
                  <span className="text-primary text-[11px] font-bold">+ Noun / Phrase</span>
                </div>
              </div>
              {/* Rows */}
              <div className="divide-y divide-primary/10">
                {rows.map((row, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto_1fr] bg-(--bg-card)">
                    <div className="px-4 py-3.5 flex items-center justify-center">
                      <span className="px-3.5 py-1.5 rounded-xl bg-primary/10 border border-primary/25 text-primary text-sm font-bold">
                        {row.conj}
                      </span>
                    </div>
                    <div className="flex items-center justify-center px-2">
                      <div className="w-px h-8 bg-primary/15" />
                    </div>
                    <div className="px-4 py-3.5 flex items-center justify-center gap-1.5 flex-wrap">
                      {row.prep.map((p, j) => (
                        <span key={j} className="px-3 py-1.5 rounded-xl bg-(--bg-secondary) border border-(--border) text-(--text) text-xs font-semibold">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Footer note */}
              <div className="bg-primary/[0.04] border-t border-primary/15 px-4 py-2.5 flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-primary/50 shrink-0" />
                <span className="text-[11px] text-(--text-muted)">Conjunction diikuti <span className="font-semibold text-primary">S + V</span>, sedangkan Preposition diikuti <span className="font-semibold text-primary">Noun/Phrase</span></span>
              </div>
            </div>
          );
        }

        // {{quiz-game: title | desc}}
        const quizGameMatch = point.match(/^\{\{quiz-game:([^|]+)\|([^}]+)\}\}$/);
        if (quizGameMatch) {
          const [, qTitle, qDesc] = quizGameMatch;
          return (
            <button key={key} type="button" onClick={() => { setShowQuizGame(true); setTimeout(() => quizGameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80); }} className="w-full mt-3 group">
              <div className="flex items-center gap-4 rounded-xl border-2 border-primary/25 bg-primary/[0.04] px-5 py-4 transition-all group-hover:border-primary/50 group-hover:bg-primary/[0.08]">
                <div className="flex-1 text-left">
                  <p className="font-bold text-(--text) text-sm">{qTitle}</p>
                  <p className="text-xs text-(--text-muted) mt-0.5">{qDesc}</p>
                </div>
                <span className="text-xs font-semibold text-primary border border-primary/30 rounded-full px-3 py-1 group-hover:bg-primary/10 transition-colors">Mulai →</span>
              </div>
            </button>
          );
        }

        // {{annotation:...}} lines
        if (point.includes('{{annotation:')) {
          return (
            <div key={key} className="flex items-start gap-2 py-1.5 flex-wrap">
              <span className="text-primary mt-1.5 shrink-0 text-xs">●</span>
              <AnnotatedText text={point} renderText={(t, i) => <span key={i} className="text-sm text-(--text-secondary)">{renderClickableText(t)}</span>} className="text-sm leading-relaxed" />
            </div>
          );
        }

        // {{listenLabel: label | sub}}
        const listenLabelMatch = point.match(/^\{\{listenLabel:\s*([^|]+)\|([^}]+)\}\}$/);
        if (listenLabelMatch) {
          return (
            <div key={key} className="flex items-center gap-2 pt-3 pb-1">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">{listenLabelMatch[1].trim()}</span>
              <span className="text-xs text-(--text-muted)">— {listenLabelMatch[2].trim()}</span>
            </div>
          );
        }

        // Suffix header: -suffix (desc):
        const suffixHeaderMatch = point.match(/^(-\w+(?:\s*\/\s*-\w+)*)\s+\(([^)]+)\)\s*:?\s*$/);
        if (suffixHeaderMatch) {
          return (
            <div key={key} className="pt-2 pb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary/15 text-primary font-bold text-sm tracking-wide">{suffixHeaderMatch[1]}</span>
                <span className="text-sm text-(--text-secondary) italic">{suffixHeaderMatch[2]}</span>
              </div>
            </div>
          );
        }

        // Indented suffix examples: "  word1 → word2, word3 → word4"
        if (point.startsWith('  ') && point.includes('→')) {
          const pairs = point.trim().split(',').map(p => p.trim()).filter(Boolean);
          return (
            <div key={key} className="pl-4 pb-2">
              <div className="flex flex-wrap gap-1.5">
                {pairs.map((pair, i) => {
                  const parts = pair.split('→').map(s => s.trim());
                  if (parts.length === 2) {
                    return (
                      <span key={i} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-(--bg-secondary) border border-(--border)">
                        <span className="text-(--text-secondary)">{parts[0]}</span>
                        <span className="text-primary">→</span>
                        <span className="font-semibold text-(--text)">{parts[1]}</span>
                      </span>
                    );
                  }
                  return <span key={i} className="text-sm text-(--text-secondary)">{pair}</span>;
                })}
              </div>
            </div>
          );
        }

        // Arrow transformation line
        if (point.includes('→') && !point.startsWith('Wrong') && !point.startsWith('Correct')) {
          const colonIdx = point.indexOf(':');
          if (colonIdx > 0 && colonIdx < 80) {
            const label = point.slice(0, colonIdx).trim();
            const rest = point.slice(colonIdx + 1).trim();
            const transformParts = rest.split(',').map(s => s.trim()).filter(s => s.includes('→'));
            if (transformParts.length > 0) {
              const nonTransformParts = rest.split(',').map(s => s.trim()).filter(s => !s.includes('→'));
              return (
                <div key={key} className="py-1.5">
                  <p className="text-sm font-medium text-(--text) mb-1.5">{renderClickableText(label)}</p>
                  {nonTransformParts.length > 0 && nonTransformParts[0] && (
                    <p className="text-xs text-(--text-muted) mb-1.5 pl-3">{renderClickableText(nonTransformParts.join(', '))}</p>
                  )}
                  <div className="flex flex-wrap gap-1.5 pl-3">
                    {transformParts.map((pair, i) => {
                      const parts = pair.split('→').map(s => s.trim());
                      if (parts.length === 2) {
                        return (
                          <span key={i} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-(--bg-secondary) border border-(--border)">
                            <span className="text-(--text-secondary)">{parts[0]}</span>
                            <span className="text-primary">→</span>
                            <span className="font-semibold text-(--text)">{parts[1]}</span>
                          </span>
                        );
                      }
                      return <span key={i} className="text-sm text-(--text-secondary)">{pair}</span>;
                    })}
                  </div>
                </div>
              );
            }
          }
          // Simple pipe-separated arrow pairs
          const items = point.split('|').map(s => s.trim()).filter(Boolean);
          if (items.length > 1) {
            return (
              <div key={key} className="py-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {items.map((item, i) => {
                    const parts = item.split('→').map(s => s.trim());
                    return (
                      <div key={i} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-(--bg-secondary) border border-(--border)">
                        {parts.map((p, j) => (
                          <span key={j} className={cn(j === 0 ? 'text-(--text-secondary)' : 'font-semibold text-(--text)')}>
                            {j > 0 && <span className="text-primary mr-1.5">→</span>}
                            {p}
                          </span>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
        }

        // Wrong/Correct pattern
        if (point.startsWith('Wrong:') || point.startsWith('Wrong ')) {
          const correctMatch = point.match(/Correct:\s*(.+)/);
          const wrongMatch   = point.match(/Wrong:\s*"([^"]+)"/);
          return (
            <div key={key} className="py-1 flex flex-col sm:flex-row gap-1.5">
              {wrongMatch && (
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                  <XCircle className="w-3.5 h-3.5 shrink-0" />
                  <span className="line-through">{wrongMatch[1]}</span>
                </span>
              )}
              {correctMatch && (
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{correctMatch[1]}</span>
                </span>
              )}
            </div>
          );
        }

        // ✅ / ❌ point markers
        if (point.startsWith('Wrong:') || point.startsWith('❌')) {
          return (
            <div key={key} className="flex items-start gap-2 py-0.5 mt-0.5">
              <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <XCircle className="w-3 h-3 text-primary" />
              </div>
              <span className="text-sm text-(--text-secondary) line-through leading-relaxed">{renderClickableText(point.replace(/^(Wrong:\s*|❌\s*)/, ''))}</span>
            </div>
          );
        }
        if (point.startsWith('✅')) {
          return (
            <div key={key} className="flex items-start gap-2 py-0.5 mt-0.5">
              <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-primary" />
              </div>
              <span className="text-sm text-(--text-secondary) leading-relaxed">{renderClickableText(point.replace(/^✅\s*/, ''))}</span>
            </div>
          );
        }

        // Indented sub-bullets
        if (point.startsWith('   ')) {
          if (point.includes('→')) {
            const trimmed = point.trim();
            const arrowIdx = trimmed.indexOf('→');
            const prefix = trimmed.slice(0, arrowIdx + 1).trim();
            const rest   = trimmed.slice(arrowIdx + 1).trim();
            return (
              <div key={key} className="mt-1 mb-0.5">
                <div className="bg-primary/[0.04] border border-primary/15 rounded-xl px-4 py-2.5">
                  <span className="text-xs font-bold text-primary mr-2">{prefix}</span>
                  <span className="text-sm text-(--text) leading-relaxed">{renderClickableText(rest)}</span>
                </div>
              </div>
            );
          }
          return (
            <div key={key} className="pl-5 py-0.5">
              <div className="flex items-start gap-2">
                <span className="text-primary/50 mt-1.5 shrink-0 text-[9px]">◆</span>
                <span className="text-sm text-(--text-secondary)">{renderClickableText(point.trim())}</span>
              </div>
            </div>
          );
        }

        // Position: rule
        if (point.startsWith('Position:')) {
          return (
            <div key={key} className="py-1.5 pl-3 border-l-2 border-primary/40 ml-1">
              <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-0.5">Position</p>
              <p className="text-sm text-(--text-secondary)">{renderClickableText(point.replace(/^Position:\s*/, ''))}</p>
            </div>
          );
        }

        // Example sentences: Ex: / Examples: / "quoted"
        if (point.startsWith('Ex:')) {
          const exText = point.replace(/^Ex:\s*/, '');
          return (
            <div key={key} className="mt-1 mb-0.5">
              <div className="bg-primary/[0.04] border border-primary/15 rounded-xl px-4 py-2.5">
                <span className="text-xs font-bold text-primary mr-2">Ex:</span>
                <span className="text-sm text-(--text) leading-relaxed italic">{renderClickableText(exText)}</span>
              </div>
            </div>
          );
        }
        if (point.match(/^(Examples?|Practical):/) || point.match(/^"[^"]+"/)) {
          const label = point.match(/^(Examples?|Practical):\s*/)?.[0] || '';
          const labelClean = label.replace(':', '').trim();
          return (
            <div key={key} className="mt-1 mb-0.5">
              <div className="bg-primary/[0.04] border border-primary/15 rounded-xl px-4 py-2.5">
                {labelClean && <span className="text-xs font-bold text-primary mr-2 uppercase tracking-wider">{labelClean}:</span>}
                <span className="text-sm text-(--text) leading-relaxed italic">{renderClickableText(point.slice(label.length))}</span>
              </div>
            </div>
          );
        }

        // Vocabulary card
        if (/vocabulary/i.test(title) && point.match(/^(?:\d+\.\s+)?(.+?)\s*\(([^)]+)\)\s*[\|—–-]/)) {
          return <LessonVocabCard key={`vocab-${title}-${pIdx}`} point={point} onSpeak={translateWord} />;
        }

        // Numbered item: "1. Label: desc"
        const numberedMatch = point.match(/^(\d+)\.\s+(\w+):\s*(.+)$/);
        if (numberedMatch) {
          return (
            <div key={key} className="flex items-start gap-2.5 py-1">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 text-primary text-xs font-bold shrink-0 mt-0.5">{numberedMatch[1]}</span>
              <div className="text-sm">
                <span className="font-semibold text-(--text)">{numberedMatch[2]}: </span>
                <span className="text-(--text-secondary)">{renderClickableText(numberedMatch[3])}</span>
              </div>
            </div>
          );
        }

        // Rule with description: "Label: description — examples" or "Label: description"
        const ruleMatch = point.match(/^([^:]{3,60}):\s+(.+)$/);
        if (ruleMatch && !point.startsWith('http') && !point.startsWith('Position')) {
          const ruleLabel = ruleMatch[1];
          const ruleDesc = ruleMatch[2];
          const dashIdx = ruleDesc.indexOf(' — ');
          if (dashIdx > 0) {
            return (
              <div key={key} className="py-1.5">
                <div className="flex items-start gap-2.5">
                  <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <div>
                    <span className="text-sm font-semibold text-(--text)">{renderClickableText(ruleLabel)}: </span>
                    <span className="text-sm text-(--text-secondary)">{renderClickableText(ruleDesc.slice(0, dashIdx))}</span>
                    <p className="text-xs text-(--text-muted) mt-1 pl-2 italic border-l border-primary/20">{renderClickableText(ruleDesc.slice(dashIdx + 3))}</p>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div key={key} className="py-1 flex items-start gap-2.5">
              <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60" />
              <div className="text-sm">
                <span className="font-semibold text-(--text)">{renderClickableText(ruleLabel)}: </span>
                <span className="text-(--text-secondary)">{renderClickableText(ruleDesc)}</span>
              </div>
            </div>
          );
        }

        // Default bullet
        return (
          <div key={key} className="flex items-start gap-2.5 py-0.5">
            <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-primary/50" />
            <span className="text-sm text-(--text-secondary) leading-relaxed">{renderClickableText(point)}</span>
          </div>
        );
      })}
      {imageUrl && (
        <div className="pt-2">
          <img src={imageUrl} alt={title} className="w-full rounded-lg border border-(--border)" />
        </div>
      )}
    </div>
  );
}