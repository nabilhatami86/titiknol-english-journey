'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, BookOpenText, CheckCircle2, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOEFL_PASSAGES } from '@/data/reading/toeflReadingPassages';

const MAX_SCORE = 30;

function toeflBand(score: number): string {
  const pct = score / MAX_SCORE;
  if (pct >= 0.93) return '29–30';
  if (pct >= 0.87) return '27–28';
  if (pct >= 0.80) return '24–26';
  if (pct >= 0.70) return '21–23';
  if (pct >= 0.60) return '18–20';
  if (pct >= 0.50) return '15–17';
  if (pct >= 0.40) return '12–14';
  return '0–11';
}

function toeflLevel(score: number): string {
  const pct = score / MAX_SCORE;
  if (pct >= 0.87) return 'Advanced';
  if (pct >= 0.60) return 'High-Intermediate';
  if (pct >= 0.40) return 'Intermediate';
  return 'Basic';
}

export default function ToeflReadingPage() {
  const [view, setView] = useState<'list' | 'test'>('list');
  const [passageIdx, setPassageIdx] = useState(0);
  const [mobileTab, setMobileTab] = useState<'passage' | 'soal'>('passage');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const passage = TOEFL_PASSAGES[passageIdx];
  const totalQ = TOEFL_PASSAGES.reduce((s, p) => s + p.questions.length, 0);

  const score = submitted
    ? TOEFL_PASSAGES.reduce((total, p) =>
        total + p.questions.filter(q => (answers[q.number] ?? '').toUpperCase() === q.answer).length, 0)
    : 0;

  const passageScore = (idx: number) =>
    TOEFL_PASSAGES[idx].questions.filter(
      q => (answers[q.number] ?? '').toUpperCase() === q.answer,
    ).length;

  const allAnswered = Object.keys(answers).length === totalQ;

  const startTest = () => {
    setView('test');
    setPassageIdx(0);
    setAnswers({});
    setSubmitted(false);
    setMobileTab('passage');
  };

  // ── List View ──────────────────────────────────────────────────────────
  if (view === 'list') {
    return (
      <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
        <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Practice
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
            <BookOpenText className="w-6 h-6 text-primary" />
            TOEFL Reading Practice
          </h1>
          <p className="text-sm text-(--text-secondary) mt-1">
            {TOEFL_PASSAGES.length} passages · {totalQ} soal · Estimated Score 0–30
          </p>
        </div>

        <div className="space-y-2">
          {TOEFL_PASSAGES.map((p, i) => (
            <div key={p.id} className="flex items-center gap-4 border border-(--border) rounded-xl px-4 py-3.5 bg-(--bg-card)">
              <span className="text-3xl font-extrabold text-(--text-muted) w-8 shrink-0 leading-none">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-primary uppercase tracking-wide">Passage {i + 1}</p>
                <p className="text-sm font-bold text-(--text) truncate">{p.title}</p>
              </div>
              <span className="text-xs text-(--text-muted) shrink-0">{p.questions.length} soal</span>
            </div>
          ))}
        </div>

        <button
          onClick={startTest}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity"
        >
          <BookOpen className="w-4 h-4" /> Mulai Full Reading Test
        </button>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-1">
          <p className="text-xs font-bold text-primary uppercase tracking-wide">TOEFL Reading Score Guide</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mt-2">
            {[
              ['Advanced', '24–30'], ['High-Intermediate', '18–23'],
              ['Intermediate', '12–17'], ['Basic', '0–11'],
            ].map(([lvl, range]) => (
              <div key={lvl} className="flex items-center justify-between text-xs">
                <span className="text-(--text-secondary)">{lvl}</span>
                <span className="font-bold text-primary">{range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Test View ──────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-[calc(100svh-60px)] animate-fade-in">

      {/* ── Top bar ── */}
      <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-b border-(--border) bg-(--bg-card)">
        <button
          onClick={() => setView('list')}
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali
        </button>

        <div className="flex-1 flex items-center gap-1.5 justify-center">
          {TOEFL_PASSAGES.map((p, i) => {
            const answered = p.questions.filter(q => !!answers[q.number]).length;
            const pScore = submitted ? passageScore(i) : null;
            return (
              <button
                key={i}
                onClick={() => { setPassageIdx(i); setMobileTab('passage'); }}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border-2 transition-all shrink-0',
                  passageIdx === i
                    ? 'bg-primary text-white border-primary'
                    : 'bg-(--bg-secondary) border-(--border) text-(--text-secondary) hover:border-primary/40',
                )}
              >
                P{i + 1}
                {pScore !== null
                  ? <span className="text-[10px] opacity-80">{pScore}/{p.questions.length}</span>
                  : answered > 0
                  ? <span className="text-[10px] opacity-60">{answered}/{p.questions.length}</span>
                  : null}
              </button>
            );
          })}
        </div>

        {submitted ? (
          <div className="shrink-0 flex items-center gap-1 text-xs font-bold text-primary">
            <Trophy className="w-3.5 h-3.5" />
            <span>{score}/{totalQ}</span>
          </div>
        ) : (
          <button
            onClick={() => { setSubmitted(true); setPassageIdx(0); setMobileTab('soal'); }}
            disabled={!allAnswered}
            className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-primary text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Submit
          </button>
        )}
      </div>

      {/* ── Score banner ── */}
      {submitted && (
        <div className="shrink-0 px-4 py-2.5 bg-primary/5 border-b border-primary/20">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-base font-extrabold text-primary">{score}</span>
              <span className="text-xs text-(--text-muted)">/ {totalQ}</span>
            </div>
            <div className="h-4 w-px bg-(--border)" />
            <span className="text-xs text-(--text-secondary)">
              Level: <strong className="text-primary">{toeflLevel(score)}</strong>
            </span>
            <span className="text-xs text-(--text-secondary)">
              Est. Score: <strong className="text-primary">{toeflBand(score)}</strong>
            </span>
            <div className="flex items-center gap-3 ml-auto">
              {TOEFL_PASSAGES.map((p, i) => (
                <div key={i} className="text-center">
                  <p className="text-[10px] text-(--text-muted) font-semibold">P{i + 1}</p>
                  <p className="text-xs font-bold text-primary">
                    {passageScore(i)}<span className="text-(--text-muted) font-normal">/{p.questions.length}</span>
                  </p>
                </div>
              ))}
              <button onClick={() => setView('list')} className="text-xs text-primary underline ml-1">Selesai</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile tab switcher ── */}
      <div className="shrink-0 flex lg:hidden border-b border-(--border)">
        {(['passage', 'soal'] as const).map(tab => {
          const answered = passage.questions.filter(q => !!answers[q.number]).length;
          return (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={cn(
                'flex-1 py-2 text-xs font-bold transition-colors',
                mobileTab === tab
                  ? 'border-b-2 border-primary text-primary bg-primary/5'
                  : 'text-(--text-muted)',
              )}
            >
              {tab === 'passage' ? 'Passage' : `Soal (${answered}/${passage.questions.length})`}
            </button>
          );
        })}
      </div>

      {/* ── Split panels ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left: Passage text */}
        <div className={cn(
          'w-full lg:w-[55%] lg:border-r border-(--border) overflow-y-auto p-4 lg:p-5',
          mobileTab !== 'passage' && 'hidden lg:block',
        )}>
          <div className="mb-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
              Passage {passageIdx + 1} of {TOEFL_PASSAGES.length}
            </span>
            <h2 className="text-base font-bold text-(--text) mt-0.5">{passage.title}</h2>
          </div>
          <div className="space-y-4">
            {passage.text.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm text-(--text) leading-[1.75]">{para}</p>
            ))}
          </div>
          <button
            onClick={() => setMobileTab('soal')}
            className="lg:hidden mt-5 w-full py-2.5 rounded-xl text-xs font-bold bg-primary/10 text-primary"
          >
            Lihat Soal →
          </button>
        </div>

        {/* Right: All questions */}
        <div className={cn(
          'w-full lg:w-[45%] overflow-y-auto p-3 lg:p-4 space-y-2.5',
          mobileTab !== 'soal' && 'hidden lg:block',
        )}>
          {/* Section header */}
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-bold text-primary uppercase tracking-wide">
              Questions {passage.questions[0]?.number}–{passage.questions[passage.questions.length - 1]?.number}
            </p>
            <span className="text-xs text-(--text-muted)">
              {passage.questions.filter(q => !!answers[q.number]).length}/{passage.questions.length} dijawab
            </span>
          </div>

          {passage.questions.map(q => {
            const selected = answers[q.number];
            const isCorrect = submitted && selected?.toUpperCase() === q.answer;
            const isWrong = submitted && !!selected && selected.toUpperCase() !== q.answer;
            const unanswered = submitted && !selected;

            return (
              <div key={q.number} className={cn(
                'rounded-xl border overflow-hidden transition-colors',
                submitted
                  ? isCorrect ? 'border-primary/25 bg-primary/5'
                  : 'border-(--border) bg-(--bg-card)'
                  : 'border-(--border) bg-(--bg-card)',
              )}>
                {/* Question stem */}
                <div className="px-3 py-2.5 border-b border-(--border)/50">
                  <p className="text-xs font-semibold text-(--text) leading-snug">
                    <span className={cn(
                      'font-bold mr-1.5',
                      submitted ? isCorrect ? 'text-primary' : 'text-(--text-muted)' : 'text-primary',
                    )}>
                      {q.number}.
                    </span>
                    {q.stem}
                  </p>
                </div>

                {/* Options */}
                <div className="p-2 space-y-1.5">
                  {q.options.map(opt => {
                    const isSel = selected === opt.letter;
                    const isOptCorrect = submitted && opt.letter === q.answer;
                    const isOptWrong = submitted && isSel && opt.letter !== q.answer;
                    return (
                      <button
                        key={opt.letter}
                        onClick={() => !submitted && setAnswers(prev => ({ ...prev, [q.number]: opt.letter }))}
                        disabled={submitted}
                        className={cn(
                          'w-full text-left flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-colors',
                          submitted
                            ? isOptCorrect
                              ? 'bg-primary/10 border border-primary/30 text-primary font-semibold'
                              : isOptWrong
                              ? 'bg-(--bg-secondary) border border-(--border) text-(--text-muted) line-through opacity-60'
                              : 'bg-(--bg-secondary) border border-(--border) text-(--text-muted) opacity-50'
                            : isSel
                            ? 'bg-primary text-white border border-primary'
                            : 'bg-(--bg-secondary) border border-(--border) text-(--text-secondary) hover:border-primary/40 hover:bg-(--hover)',
                        )}
                      >
                        <span className={cn(
                          'w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0',
                          submitted
                            ? isOptCorrect ? 'bg-primary text-white' : 'bg-(--bg-card) text-(--text-muted)'
                            : isSel ? 'bg-white/20 text-white' : 'bg-(--bg-card) text-(--text)',
                        )}>
                          {opt.letter}
                        </span>
                        <span className="leading-snug">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Wrong answer explanation */}
                {submitted && (isWrong || unanswered) && (
                  <div className="mx-2 mb-2 flex items-center gap-1.5 bg-primary/5 border border-primary/20 rounded-lg px-2.5 py-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-xs text-primary font-semibold">
                      Jawaban benar: <strong>{q.answer}</strong>
                      {' — '}
                      {q.options.find(o => o.letter === q.answer)?.text}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Passage navigation */}
          <div className="flex items-center justify-between pt-2 mt-1 border-t border-(--border)">
            <button
              onClick={() => { setPassageIdx(p => Math.max(0, p - 1)); setMobileTab('passage'); }}
              disabled={passageIdx === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-(--border) text-(--text-secondary) hover:bg-(--bg-secondary) disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>
            {passageIdx < TOEFL_PASSAGES.length - 1 ? (
              <button
                onClick={() => { setPassageIdx(p => p + 1); setMobileTab('passage'); }}
                className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-bold bg-primary text-white hover:opacity-90 transition-opacity"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : !submitted ? (
              <button
                onClick={() => { setSubmitted(true); setPassageIdx(0); setMobileTab('soal'); }}
                disabled={!allAnswered}
                className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-bold bg-primary text-white hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Submit
              </button>
            ) : (
              <button onClick={() => setView('list')} className="text-xs text-primary underline">
                Selesai
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
