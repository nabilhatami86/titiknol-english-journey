'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Volume2, Play, Pause, RotateCcw,
  Trophy, Headphones, CheckCircle2, BookOpen, ImageIcon, ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { IELTS_SAMPLES } from '@/data/ieltsListeningSamples';
import type { IeltsSample } from '@/data/ieltsListeningSamples';

// ── Helpers ────────────────────────────────────────────────────────────────────

function fmtTime(s: number) {
  return `${Math.floor(s / 60).toString().padStart(2, '0')}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
}

function bandFromScore(n: number): string {
  if (n >= 39) return '9.0';
  if (n >= 37) return '8.5';
  if (n >= 35) return '8.0';
  if (n >= 32) return '7.5';
  if (n >= 30) return '7.0';
  if (n >= 26) return '6.5';
  if (n >= 23) return '6.0';
  if (n >= 18) return '5.5';
  if (n >= 16) return '5.0';
  if (n >= 13) return '4.5';
  if (n >= 10) return '4.0';
  return '3.5';
}

function checkAnswer(given: string, correct: string, alts?: string[]): boolean {
  const norm = (s: string) => s.trim().toLowerCase();
  return norm(given) === norm(correct) || (alts?.some((a) => norm(given) === norm(a)) ?? false);
}

// ── Audio Player ───────────────────────────────────────────────────────────────

function AudioPlayer({ src }: { src: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => { if (ref.current) ref.current.playbackRate = rate; }, [rate]);
  useEffect(() => { setPlaying(false); setCurrent(0); setDuration(0); setLoadError(false); }, [src]);

  const toggle = () => {
    const a = ref.current; if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().catch(() => setLoadError(true)); setPlaying(true); }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = ref.current; if (!a || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - r.left) / r.width) * duration;
  };

  if (loadError) return (
    <p className="text-xs text-(--text-muted) py-1 italic">
      Audio file not found — place the .mp3 in{' '}
      <code className="bg-(--bg-secondary) px-1 rounded text-[11px]">/public/audio/listening-ielts/</code>
    </p>
  );

  return (
    <div className="space-y-2">
      <audio
        ref={ref} src={src}
        onTimeUpdate={() => setCurrent(ref.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(ref.current?.duration ?? 0)}
        onEnded={() => setPlaying(false)}
        onError={() => setLoadError(true)}
      />
      <div
        className="h-2.5 bg-(--bg-secondary) border border-(--border) rounded-full cursor-pointer overflow-hidden"
        onClick={seek}
      >
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${duration ? (current / duration) * 100 : 0}%` }}
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-(--text-muted) tabular-nums w-10">{fmtTime(current)}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { const a = ref.current; if (a) a.currentTime = Math.max(0, a.currentTime - 10); }}
            className="p-1.5 rounded-lg hover:bg-(--bg-secondary) text-(--text-secondary)"
            title="Rewind 10s"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={toggle}
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90"
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <select
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="text-xs bg-(--bg-card) border border-(--border) rounded-lg px-1.5 py-1 text-(--text-secondary) focus:outline-none"
          >
            {[0.75, 0.9, 1, 1.1, 1.25].map((r) => <option key={r} value={r}>{r}×</option>)}
          </select>
        </div>
        <span className="text-xs text-(--text-muted) tabular-nums w-10 text-right">{fmtTime(duration)}</span>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function IeltsListeningPage() {
  const [selected, setSelected] = useState<IeltsSample | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showTapescript, setShowTapescript] = useState(false);

  const handleSelect = (s: IeltsSample) => {
    setSelected(s);
    setAnswers({});
    setSubmitted(false);
    setShowTapescript(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelected(null);
    setAnswers({});
    setSubmitted(false);
  };

  const setAnswer = (n: number, v: string) => {
    if (!submitted) setAnswers((prev) => ({ ...prev, [n]: v }));
  };

  // ── List View ──────────────────────────────────────────────────────────
  if (!selected) {
    return (
      <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
        <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Practice
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
            <Headphones className="w-6 h-6 text-primary" />
            IELTS Listening Sample Tasks
          </h1>
          <p className="text-sm text-(--text-secondary) mt-1">
            {IELTS_SAMPLES.length} official sample exercises · Source: IELTS.org 2023
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {IELTS_SAMPLES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => handleSelect(s)}
              className="group text-left border border-(--border) hover:border-primary/40 hover:bg-(--hover) rounded-xl p-4 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Part {s.part}
                </span>
                <span className="text-xs text-(--text-muted)">Q{s.qRange[0]}–{s.qRange[1]}</span>
              </div>
              <p className="font-semibold text-(--text) group-hover:text-primary transition-colors text-sm leading-snug">
                {i + 1}. {s.title}
              </p>
              <p className="text-xs text-(--text-muted) mt-1">{s.taskType}</p>
              {s.imagePaths && (
                <p className="text-xs text-primary/70 mt-1.5 flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" /> Includes diagram / image
                </p>
              )}
            </button>
          ))}
        </div>

        <div className="bg-(--bg-secondary) border border-(--border) rounded-xl p-4 text-xs text-(--text-muted) space-y-1">
          <p className="font-semibold text-(--text-secondary) mb-1.5">Setup audio & images:</p>
          <p>• Audio files → <code className="bg-(--bg-card) px-1 rounded">/public/audio/listening-ielts/[filename].mp3</code></p>
          <p>• Image files → <code className="bg-(--bg-card) px-1 rounded">/public/image/listening/[filename].png</code></p>
        </div>
      </div>
    );
  }

  // ── Test View ──────────────────────────────────────────────────────────

  // Flatten all questions (from subsections or direct)
  const allQuestions = selected.subsections
    ? selected.subsections.flatMap((s) => s.questions)
    : (selected.questions ?? []);

  const correctCount = allQuestions.filter((q) =>
    checkAnswer(answers[q.n] ?? '', q.answer, q.alts)
  ).length;
  const totalCount = allQuestions.length;
  const scaledScore = Math.round((correctCount / totalCount) * 40);

  // Reusable question list renderer
  const renderQuestions = (questions: typeof allQuestions, sharedOptions: typeof selected.sharedOptions) =>
    questions.map((q) => {
      const ok = submitted ? checkAnswer(answers[q.n] ?? '', q.answer, q.alts) : null;
      return (
        <div
          key={q.n}
          className={cn(
            'bg-(--bg-card) border rounded-xl p-4 transition-colors',
            ok === true
              ? 'border-primary/30 bg-primary/5'
              : ok === false
                ? 'border-primary/50 bg-primary/30 dark:bg-primary/10'
                : 'border-(--border)',
          )}
        >
          <div className="flex items-start gap-3">
            <span className={cn(
              'text-sm font-bold w-7 shrink-0 mt-0.5',
              ok === true ? 'text-primary' : ok === false ? 'text-primary' : 'text-primary',
            )}>
              {q.n}.
            </span>
            <div className="flex-1 space-y-2">
              {q.prompt && <p className="text-sm text-(--text)">{q.prompt}</p>}

              {q.type === 'fill' && (
                <input
                  type="text"
                  value={answers[q.n] ?? ''}
                  onChange={(e) => setAnswer(q.n, e.target.value)}
                  readOnly={submitted}
                  placeholder="Your answer..."
                  className={cn(
                    'w-full px-3 py-2 text-sm rounded-lg border bg-(--bg-secondary) outline-none transition-colors',
                    submitted
                      ? ok
                        ? 'border-primary/40 text-primary font-semibold bg-primary/5'
                        : 'border-primary/60 text-(--text-muted) line-through'
                      : 'border-(--border) focus:border-primary text-(--text)',
                  )}
                />
              )}

              {q.type === 'mc' && q.options && (
                <div className="space-y-1.5">
                  {q.options.map((o) => {
                    const isSel = answers[q.n] === o.label;
                    const isCorrectOpt = submitted && o.label === q.answer;
                    const isWrong = submitted && isSel && !ok;
                    return (
                      <button
                        key={o.label}
                        onClick={() => !submitted && setAnswer(q.n, o.label)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2 rounded-lg border text-sm text-left transition-colors',
                          isCorrectOpt
                            ? 'border-primary/40 bg-primary/5 text-primary font-semibold'
                            : isWrong
                              ? 'border-primary/60 bg-primary/30 dark:bg-primary/10 text-primary dark:text-primary'
                              : isSel
                                ? 'border-primary/40 bg-primary/5 text-primary'
                                : 'border-(--border) bg-(--bg-secondary) text-(--text) hover:border-primary/30',
                          submitted ? 'cursor-default' : 'cursor-pointer',
                        )}
                      >
                        <span className="font-bold w-5 shrink-0">{o.label}</span>
                        <span>{o.text}</span>
                        {isCorrectOpt && submitted && <CheckCircle2 className="w-4 h-4 ml-auto shrink-0 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {q.type === 'matching' && sharedOptions && (
                <div className="flex flex-wrap gap-2">
                  {sharedOptions.map((o) => {
                    const isSel = answers[q.n] === o.label;
                    const isCorrectOpt = submitted && o.label === q.answer;
                    const isWrong = submitted && isSel && !ok;
                    return (
                      <button
                        key={o.label}
                        onClick={() => !submitted && setAnswer(q.n, o.label)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg border text-sm font-bold transition-colors',
                          isCorrectOpt
                            ? 'border-primary/40 bg-primary/10 text-primary'
                            : isWrong
                              ? 'border-primary/60 bg-primary/30 dark:bg-primary/10 text-primary dark:text-primary'
                              : isSel
                                ? 'border-primary/40 bg-primary/10 text-primary'
                                : 'border-(--border) bg-(--bg-secondary) text-(--text) hover:border-primary/30',
                          submitted ? 'cursor-default' : 'cursor-pointer',
                        )}
                      >
                        {o.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {submitted && ok === false && (
                <p className="text-xs text-primary font-semibold">✓ Correct: {q.answer}</p>
              )}
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-5 animate-fade-in">

      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={handleBack} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> All Samples
        </button>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
          Part {selected.part} · {selected.taskType}
        </span>
      </div>

      <div>
        <h1 className="text-xl font-bold text-(--text)">{selected.title}</h1>
        <p className="text-sm text-(--text-secondary) mt-0.5">
          Questions {selected.qRange[0]}–{selected.qRange[1]} · Official IELTS Sample Task
        </p>
      </div>

      {/* Score */}
      {submitted && (
        <div className="bg-(--bg-secondary) border border-(--border) rounded-2xl overflow-hidden">
          <div className="bg-primary/5 border-b border-primary/20 px-5 py-4 flex items-center gap-3">
            <Trophy className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="font-bold text-(--text)">Hasil</p>
              <p className="text-xs text-(--text-muted)">
                Estimated Band (scaled to 40):{' '}
                <span className="font-bold text-primary">{bandFromScore(scaledScore)}</span>
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-2xl font-extrabold text-primary">
                {correctCount}<span className="text-base font-semibold text-(--text-muted)">/{totalCount}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Images / Diagrams — shown once at top */}
      {selected.imagePaths && (
        <div className="border border-(--border) rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-(--border) bg-(--bg-secondary)">
            <ImageIcon className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm font-semibold text-(--text)">Task Diagram / Image</span>
          </div>
          <div className="p-4 space-y-3">
            {selected.imagePaths.map((img) => (
              <div key={img}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/image/listening/${img}`}
                  alt="IELTS task diagram"
                  className="w-full rounded-lg border border-(--border)"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const sibling = e.currentTarget.nextElementSibling as HTMLElement | null;
                    if (sibling) sibling.removeAttribute('hidden');
                  }}
                />
                <p hidden className="text-xs text-(--text-muted) italic p-2">
                  Image not found — place{' '}
                  <code className="bg-(--bg-secondary) px-1 rounded">{img}</code>{' '}
                  in <code className="bg-(--bg-secondary) px-1 rounded">/public/image/listening/</code>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MULTI-SECTION (subsections) ── */}
      {selected.subsections ? (
        selected.subsections.map((sec, idx) => (
          <div key={idx} className="space-y-3">
            {/* Audio per section */}
            <div className="border border-(--border) rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-(--border) bg-(--bg-secondary)">
                <Volume2 className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-semibold text-(--text)">Audio {idx + 1}</span>
                <span className="text-xs text-(--text-muted) ml-1 truncate">{sec.audioPath}</span>
              </div>
              <div className="px-4 py-4">
                <AudioPlayer src={`/audio/listening-ielts/${sec.audioPath}`} />
              </div>
            </div>

            {/* Instruction per section */}
            <div className="bg-(--bg-card) border border-(--border) rounded-xl px-4 py-3 space-y-1">
              <p className="text-sm font-semibold text-(--text)">{sec.instruction}</p>
              {sec.wordLimit && (
                <p className="text-xs font-bold text-primary uppercase tracking-wide">{sec.wordLimit}</p>
              )}
            </div>

            {/* Shared options per section */}
            {sec.sharedOptions && (
              <div className="bg-(--bg-secondary) border border-(--border) rounded-xl p-4">
                <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wider mb-2.5">Options</p>
                <div className="space-y-1.5">
                  {sec.sharedOptions.map((o) => (
                    <div key={o.label} className="flex items-start gap-2.5 text-sm">
                      <span className="font-bold text-primary w-5 shrink-0">{o.label}</span>
                      <span className="text-(--text)">{o.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Questions per section */}
            <div className="space-y-3">
              {renderQuestions(sec.questions, sec.sharedOptions)}
            </div>
          </div>
        ))
      ) : (
        /* ── SINGLE-SECTION ── */
        <div className="space-y-3">
          {/* Audio */}
          <div className="border border-(--border) rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-(--border) bg-(--bg-secondary)">
              <Volume2 className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm font-semibold text-(--text)">Audio</span>
              <span className="text-xs text-(--text-muted) ml-1 truncate">{selected.audioPath}</span>
            </div>
            <div className="px-4 py-4">
              <AudioPlayer src={`/audio/listening-ielts/${selected.audioPath}`} />
            </div>
          </div>

          {/* Instruction */}
          <div className="bg-(--bg-card) border border-(--border) rounded-xl px-4 py-3 space-y-1">
            <p className="text-sm font-semibold text-(--text)">{selected.instruction}</p>
            {selected.wordLimit && (
              <p className="text-xs font-bold text-primary uppercase tracking-wide">{selected.wordLimit}</p>
            )}
          </div>

          {/* Shared options */}
          {selected.sharedOptions && (
            <div className="bg-(--bg-secondary) border border-(--border) rounded-xl p-4">
              <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wider mb-2.5">Options</p>
              <div className="space-y-1.5">
                {selected.sharedOptions.map((o) => (
                  <div key={o.label} className="flex items-start gap-2.5 text-sm">
                    <span className="font-bold text-primary w-5 shrink-0">{o.label}</span>
                    <span className="text-(--text)">{o.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            {renderQuestions(selected.questions ?? [], selected.sharedOptions)}
          </div>
        </div>
      )}

      {/* Submit / Try another */}
      {!submitted ? (
        <button
          onClick={() => { setSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          disabled={Object.keys(answers).length === 0}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          <CheckCircle2 className="w-4 h-4" /> Check Answers
        </button>
      ) : (
        <button
          onClick={handleBack}
          className="w-full flex items-center justify-center gap-2 border border-(--border) rounded-xl py-3 px-6 font-semibold text-sm text-(--text-secondary) hover:bg-(--bg-secondary) transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Try Another Sample
        </button>
      )}

      {/* Tapescript */}
      <div className="border border-(--border) rounded-xl overflow-hidden">
        <button
          onClick={() => setShowTapescript((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 bg-(--bg-secondary) hover:bg-(--hover) transition-colors"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-(--text-secondary)">
            <BookOpen className="w-4 h-4" /> Tapescript
          </span>
          <ChevronDown className={cn('w-4 h-4 text-(--text-muted) transition-transform', showTapescript && 'rotate-180')} />
        </button>
        {showTapescript && (
          <div className="p-5">
            <p className="text-sm text-(--text) leading-relaxed whitespace-pre-wrap">{selected.tapescript}</p>
          </div>
        )}
      </div>
    </div>
  );
}
