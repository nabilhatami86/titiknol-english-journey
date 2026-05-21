'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Trophy, RotateCcw, CheckCircle2, XCircle,
  ChevronDown, ChevronUp, BookOpen, ChevronRight, Shuffle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  s1000ByLevel, S1000_LEVEL_INFO,
  type S1000Level, type S1000Question,
} from '@/data/grammar/structure1000Grammar';

// ── Constants ───────────────────────────────────────────────────────────────

const LEVELS: S1000Level[] = ['all', 'basic', 'intermediate', 'advance'];
const SET_SIZE = 20;

// ── Helpers ─────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildSets(questions: S1000Question[], randomize: boolean) {
  const ordered = randomize ? shuffle(questions) : questions;
  const sets: { label: string; range: string; questions: S1000Question[] }[] = [];
  for (let i = 0; i < ordered.length; i += SET_SIZE) {
    const batch = ordered.slice(i, i + SET_SIZE);
    const nums = batch.map(q => q.num);
    sets.push({
      label: `Set ${sets.length + 1}`,
      range: randomize ? `${batch.length} soal acak` : `Soal ${Math.min(...nums)}–${Math.max(...nums)}`,
      questions: batch,
    });
  }
  return sets;
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function Structure1000Page() {
  const [level, setLevel] = useState<S1000Level | null>(null);
  const [setIdx, setSetIdx] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  // sets are built once per level selection (shuffle on 'all' each time)
  const [sets, setSets] = useState<ReturnType<typeof buildSets>>([]);

  const selectLevel = useCallback((lv: S1000Level) => {
    setLevel(lv);
    setSets(buildSets(s1000ByLevel[lv], lv === 'all'));
    setSetIdx(null);
    setAnswers({});
    setSubmitted(false);
    setShowWrong(false);
  }, []);

  const reshuffleSets = useCallback(() => {
    if (!level) return;
    setSets(buildSets(s1000ByLevel[level], level === 'all'));
    setSetIdx(null);
    setAnswers({});
    setSubmitted(false);
    setShowWrong(false);
  }, [level]);

  const activeSet = setIdx !== null ? sets[setIdx] : null;
  const questions = activeSet?.questions ?? [];
  const total = questions.length;
  const answered = Object.keys(answers).length;

  const score = useMemo(() => {
    if (!submitted) return 0;
    return questions.reduce((acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0), 0);
  }, [submitted, questions, answers]);

  const wrongItems = useMemo(
    () => (submitted ? questions.filter(q => answers[q.id] !== q.answer) : []),
    [submitted, questions, answers],
  );

  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowWrong(false);
  };

  const backToSets = () => { setSetIdx(null); reset(); };
  const backToLevels = () => { setLevel(null); setSetIdx(null); reset(); };

  // ── RESULT VIEW ────────────────────────────────────────────────────────────
  if (submitted && activeSet && level) {
    const cfg = S1000_LEVEL_INFO[level];
    return (
      <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
        <button onClick={backToSets} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Pilih Set Lain
        </button>

        <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-8 text-center">
          <Trophy className={cn('w-16 h-16 mx-auto mb-4', pct >= 70 ? 'text-amber-500' : 'text-(--text-muted)')} />
          <span className={cn('text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2', cfg.badge)}>
            {cfg.label} · {activeSet.range}
          </span>
          <p className="text-5xl font-bold text-primary my-3">{score} / {total}</p>
          <p className="text-sm text-(--text-secondary) mb-4">{pct}% benar</p>

          <div className="h-3 rounded-full bg-(--bg-secondary) overflow-hidden max-w-xs mx-auto mb-6">
            <div
              className={cn('h-full rounded-full transition-all duration-500',
                pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-amber-500' : 'bg-red-500')}
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {questions.map((q, i) => {
              const ok = answers[q.id] === q.answer;
              return (
                <div key={q.id} className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold',
                  ok
                    ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
                )}>
                  {i + 1}
                </div>
              );
            })}
          </div>

          <p className="text-sm text-(--text-secondary) mb-6">
            {pct >= 80 ? 'Keren! Kamu sudah menguasai set ini.' :
             pct >= 60 ? 'Bagus! Masih ada yang bisa ditingkatkan.' :
             pct >= 40 ? 'Lumayan, coba ulang untuk hasil lebih baik.' :
             'Pelajari kembali, kamu pasti bisa!'}
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={reset}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
              <RotateCcw className="w-4 h-4" /> Coba Lagi
            </button>
            <button onClick={backToSets}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-(--border) text-(--text-secondary) rounded-lg font-medium text-sm hover:bg-(--hover) transition-colors">
              Set Lain
            </button>
            <button onClick={backToLevels}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-(--border) text-(--text-secondary) rounded-lg font-medium text-sm hover:bg-(--hover) transition-colors">
              Ganti Level
            </button>
          </div>
        </div>

        {wrongItems.length > 0 && (
          <div className="bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden">
            <button onClick={() => setShowWrong(v => !v)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-(--hover) transition-colors">
              <span className="font-semibold text-(--text) flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                Jawaban Salah ({wrongItems.length} soal)
              </span>
              {showWrong ? <ChevronUp className="w-5 h-5 text-(--text-muted)" /> : <ChevronDown className="w-5 h-5 text-(--text-muted)" />}
            </button>

            {showWrong && (
              <div className="border-t border-(--border) divide-y divide-(--border)">
                {wrongItems.map(q => (
                  <div key={q.id} className="px-6 py-4 space-y-3">
                    <p className="text-xs text-(--text-muted) font-mono">No. {q.num}</p>
                    <p className="text-sm font-medium text-(--text)">{q.question}</p>
                    <div className="space-y-1.5">
                      {q.options.map(opt => {
                        const isCorrect = opt === q.answer;
                        const isYours   = opt === answers[q.id];
                        return (
                          <div key={opt} className={cn(
                            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
                            isCorrect && 'bg-green-50 dark:bg-green-950/50 border border-green-300 dark:border-green-800',
                            isYours && !isCorrect && 'bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 line-through opacity-70',
                            !isCorrect && !isYours && 'opacity-40',
                          )}>
                            <span className={cn('flex-1', isCorrect && 'font-semibold text-green-700 dark:text-green-300')}>{opt}</span>
                            {isCorrect   && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                            {isYours && !isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ── QUIZ VIEW ──────────────────────────────────────────────────────────────
  if (activeSet && level) {
    const cfg = S1000_LEVEL_INFO[level];
    return (
      <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <button onClick={backToSets} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Pilih Set Lain
          </button>
          <span className="text-sm text-(--text-secondary) font-medium">{answered} / {total} dijawab</span>
        </div>

        <div>
          <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', cfg.badge)}>
            {cfg.label}
          </span>
          <h1 className="text-xl font-bold text-(--text) mt-2">
            {activeSet.label} · {activeSet.range}
          </h1>
          <p className="text-xs text-(--text-muted) mt-0.5">TOEFL Structure — Pilih jawaban yang tepat</p>
        </div>

        <div className="h-2 rounded-full bg-(--bg-secondary) overflow-hidden sticky top-0 z-10">
          <div className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${(answered / total) * 100}%` }} />
        </div>

        <div className="space-y-5">
          {questions.map((q, qi) => {
            const sel = answers[q.id];
            return (
              <div key={q.id} className={cn(
                'bg-(--bg-card) border rounded-xl p-5 transition-all',
                sel ? 'border-primary/30' : 'border-(--border)',
              )}>
                <div className="flex items-start gap-3 mb-3">
                  <span className={cn(
                    'text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
                    sel ? 'bg-primary/10 text-primary' : 'bg-(--bg-secondary) text-(--text-muted)',
                  )}>
                    {qi + 1}
                  </span>
                  <p className="text-sm font-medium text-(--text) flex-1">{q.question}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-10">
                  {q.options.map(opt => {
                    const isSelected = sel === opt;
                    return (
                      <button key={opt} type="button"
                        onClick={() => !submitted && setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                        className={cn(
                          'flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm text-left transition-all',
                          isSelected
                            ? 'border-primary bg-primary/5 text-primary font-medium'
                            : 'border-(--border) hover:border-primary/40 hover:bg-(--hover) text-(--text)',
                        )}
                      >
                        <span className={cn(
                          'font-mono text-xs font-bold w-6 h-6 rounded-md flex items-center justify-center shrink-0',
                          isSelected ? 'bg-primary text-white' : 'bg-(--bg-secondary) text-(--text-muted)',
                        )}>
                          {opt[0]}
                        </span>
                        <span className="flex-1">{opt.slice(3)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="sticky bottom-4 z-10">
          <button
            onClick={() => { setSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={answered < total}
            className={cn(
              'w-full py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg',
              answered >= total
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-(--bg-secondary) text-(--text-muted) cursor-not-allowed',
            )}
          >
            {answered >= total ? `Submit (${total} soal)` : `Jawab semua dulu (${answered}/${total})`}
          </button>
        </div>
      </div>
    );
  }

  // ── SET LIST VIEW ──────────────────────────────────────────────────────────
  if (level) {
    const cfg = S1000_LEVEL_INFO[level];
    return (
      <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
        <button onClick={backToLevels} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Ganti Level
        </button>

        <div className="flex items-start justify-between gap-3">
          <div>
            <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', cfg.badge)}>{cfg.label}</span>
            <h1 className="text-xl font-bold text-(--text) mt-2">Pilih Set Soal</h1>
            <p className="text-sm text-(--text-secondary) mt-1">
              {cfg.range} · {s1000ByLevel[level].length} soal · {sets.length} set @ 20 soal
            </p>
          </div>
          {level === 'all' && (
            <button onClick={reshuffleSets}
              className="inline-flex items-center gap-1.5 mt-1 px-3 py-2 text-xs font-medium border border-(--border) rounded-lg hover:bg-(--hover) text-(--text-secondary) shrink-0">
              <Shuffle className="w-3.5 h-3.5" /> Acak Ulang
            </button>
          )}
        </div>

        <div className="space-y-2">
          {sets.map((s, i) => (
            <button key={i} onClick={() => setSetIdx(i)}
              className="w-full text-left bg-(--bg-card) border border-(--border) rounded-xl px-4 py-3.5 hover:border-primary/40 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold border',
                  cfg.border, cfg.color,
                )}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-(--text) text-sm group-hover:text-primary transition-colors">
                    {s.label}
                  </p>
                  <p className="text-xs text-(--text-muted) mt-0.5">{s.range}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <BookOpen className="w-3.5 h-3.5 text-(--text-muted)" />
                  <span className="text-xs text-(--text-muted)">{s.questions.length} soal</span>
                  <ChevronRight className="w-4 h-4 text-(--text-muted) group-hover:text-primary transition-colors" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── LEVEL SELECTOR VIEW ────────────────────────────────────────────────────
  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
      <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Practice
      </Link>

      <div>
        <h1 className="text-xl font-bold text-(--text)">Structure 1000 Soal</h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          700 soal TOEFL Structure pilihan ganda · pilih level untuk mulai latihan.
        </p>
      </div>

      <div className="grid gap-4">
        {LEVELS.map(lv => {
          const cfg = S1000_LEVEL_INFO[lv];
          const qs  = s1000ByLevel[lv];
          const totalSets = Math.ceil(qs.length / SET_SIZE);
          const initial = lv === 'all' ? '∞' : lv === 'basic' ? 'B' : lv === 'intermediate' ? 'I' : 'A';
          return (
            <button key={lv} onClick={() => selectLevel(lv)}
              className={cn('text-left bg-(--bg-card) border-2 rounded-2xl p-5 hover:shadow-md transition-all group', cfg.border)}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', cfg.badge)}>
                    {cfg.label}
                  </span>
                  <h2 className={cn('text-2xl font-bold mt-2 mb-1', cfg.color)}>{cfg.label}</h2>
                  <p className="text-sm text-(--text-secondary)">
                    {cfg.range} · {qs.length} soal · {totalSets} set
                    {lv === 'all' && <span className="ml-2 text-xs opacity-70">· diacak tiap sesi</span>}
                  </p>
                </div>
                <div className={cn('text-5xl font-black opacity-15 group-hover:opacity-30 transition-opacity', cfg.color)}>
                  {initial}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
