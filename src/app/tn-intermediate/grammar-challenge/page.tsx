'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  FileText,
  SendHorizontal,
  Lightbulb,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { grammarChallengeQuestions } from '@/data/intermediateGrammarChallenge';

const LABELS = ['A', 'B', 'C', 'D'];

const SECTION_STYLE: Record<string, { bg: string; text: string; border: string; label: string }> = {
  A: { bg: 'bg-primary/10 dark:bg-primary/10',   text: 'text-primary',   border: 'border-primary/30 dark:border-primary/30',   label: 'Section A — Choose the Right Tense' },
  B: { bg: 'bg-primary/10 dark:bg-primary/10', text: 'text-primary', border: 'border-primary/30 dark:border-primary/30', label: 'Section B — Sentence Transformers' },
  C: { bg: 'bg-primary/10 dark:bg-primary/30',  text: 'text-primary',  border: 'border-primary/30 dark:border-primary/50',  label: 'Section C — Translation Trap' },
  D: { bg: 'bg-primary/10 dark:bg-primary/30',      text: 'text-primary',    border: 'border-primary/30 dark:border-primary/50',      label: 'Section D — Spot the Error' },
};

type QuestionResult = {
  correct: boolean;
  userAnswer: string | number;
};

function normalize(s: string) {
  return s.toLowerCase().trim().replace(/\.+$/, '').replace(/\s+/g, ' ');
}

const questions = grammarChallengeQuestions;

export default function GrammarChallengePage() {
  const [results, setResults] = useState<Record<string, QuestionResult>>({});
  const [textInputs, setTextInputs] = useState<Record<string, string>>({});

  const total = questions.length;
  const answeredCount = Object.keys(results).length;
  const remaining = total - answeredCount;
  const progress = Math.round((answeredCount / total) * 100);

  const scoreCount = Object.values(results).filter((r) => r.correct).length;
  const percent = answeredCount > 0 ? Math.round((scoreCount / answeredCount) * 100) : 0;
  const allDone = remaining === 0;

  const scoreColor = percent >= 80 ? 'text-primary' : percent >= 60 ? 'text-primary' : 'text-primary';
  const scoreBarColor = percent >= 80 ? 'bg-primary' : percent >= 60 ? 'bg-primary/10' : 'bg-primary';

  const handleSelectMCQ = (id: string, optionIndex: number, correctIndex: number) => {
    if (results[id]) return;
    setResults((prev) => ({
      ...prev,
      [id]: { correct: optionIndex === correctIndex, userAnswer: optionIndex },
    }));
  };

  const handleCheckText = (id: string, correctAnswer: string) => {
    const userInput = textInputs[id] ?? '';
    if (!userInput.trim()) return;
    setResults((prev) => ({
      ...prev,
      [id]: { correct: normalize(userInput) === normalize(correctAnswer), userAnswer: userInput },
    }));
  };

  const newSession = () => {
    setResults({});
    setTextInputs({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Group questions for section headers
  let lastSection = '';

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-5 animate-fade-in">

      {/* Top nav */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/tn-intermediate/class/grammar/9"
          className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Grammar Day 9
        </Link>
        <span className="text-xs font-medium text-(--text-muted)">
          {answeredCount}/{total} dijawab
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-(--bg-secondary) rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header card */}
      <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-5 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-(--text)">Grammar Challenge</h1>
            <p className="text-xs text-(--text-secondary) mt-0.5">
              Master the Tenses &amp; Outsmart the Traps! · 53 soal · A / B / C / D
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {(['A', 'B', 'C', 'D'] as const).map((s) => (
            <span key={s} className={cn('px-2.5 py-1 rounded-full border font-medium', SECTION_STYLE[s].bg, SECTION_STYLE[s].text, SECTION_STYLE[s].border)}>
              {s}
            </span>
          ))}
        </div>

        {/* Live score */}
        {answeredCount > 0 && (
          <div className="rounded-xl border border-(--border) bg-(--bg-secondary) p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-(--text)">
                  {allDone ? 'Challenge Selesai!' : 'Skor Sementara'}
                </span>
              </div>
              <span className={cn('text-xl font-bold', scoreColor)}>{percent}%</span>
            </div>
            <div className="w-full h-1.5 bg-(--border) rounded-full overflow-hidden">
              <div className={cn('h-full rounded-full transition-all duration-500', scoreBarColor)} style={{ width: `${percent}%` }} />
            </div>
            <div className="flex justify-between text-xs text-(--text-secondary)">
              <span>Benar: <span className="font-semibold text-primary">{scoreCount}</span></span>
              <span>Salah: <span className="font-semibold text-primary">{answeredCount - scoreCount}</span></span>
              <span>Sisa: <span className="font-semibold text-(--text)">{remaining}</span></span>
            </div>
            {allDone && (
              <button
                onClick={newSession}
                className="w-full mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Ulangi Challenge
              </button>
            )}
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const result = results[q.id];
          const isAnswered = !!result;
          const isRight = isAnswered && result.correct;
          const isWrong = isAnswered && !result.correct;
          const sectionStyle = SECTION_STYLE[q.section];
          const isMCQ = q.section === 'A';
          const correctAnswer = isMCQ
            ? (q.options?.[q.correctIndex ?? 0] ?? '')
            : (q.sampleAnswer ?? '');

          // Section header
          const showSectionHeader = q.section !== lastSection;
          lastSection = q.section;

          return (
            <div key={q.id}>
              {showSectionHeader && (
                <div className={cn('flex items-center gap-3 px-4 py-2.5 rounded-xl border font-semibold text-sm mb-1', sectionStyle.bg, sectionStyle.text, sectionStyle.border)}>
                  <span className="font-bold text-base">{q.section}</span>
                  <span>{sectionStyle.label}</span>
                </div>
              )}

              <section
                className={cn(
                  'bg-(--bg-card) border rounded-2xl overflow-hidden transition-all duration-200',
                  isRight && 'border-primary/30 dark:border-primary/50',
                  isWrong && 'border-primary/30 dark:border-primary/50',
                  !isAnswered && 'border-(--border)',
                )}
              >
                {/* Number badge + question */}
                <div className="px-5 pt-4 pb-3 flex items-start gap-3">
                  <span
                    className={cn(
                      'shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5',
                      isRight && 'bg-primary text-white',
                      isWrong && 'bg-primary text-white',
                      !isAnswered && 'bg-primary/10 text-primary',
                    )}
                  >
                    {isRight ? <CheckCircle2 className="w-4 h-4" /> : isWrong ? <XCircle className="w-4 h-4" /> : idx + 1}
                  </span>
                  <div className="flex-1">
                    <span className={cn('inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-1.5 border', sectionStyle.bg, sectionStyle.text, sectionStyle.border)}>
                      Section {q.section}
                    </span>
                    <p className="font-medium text-(--text) text-sm leading-relaxed whitespace-pre-line">{q.question}</p>
                  </div>
                </div>

                {/* MCQ options (Section A) */}
                {isMCQ && (
                  <div className="px-5 pb-4 space-y-2">
                    {(q.options ?? []).map((opt, i) => {
                      const isSelected = isAnswered && result.userAnswer === i;
                      const isCorrectOpt = i === (q.correctIndex ?? 0);
                      return (
                        <button
                          key={`${q.id}-${i}`}
                          type="button"
                          onClick={() => handleSelectMCQ(q.id, i, q.correctIndex ?? 0)}
                          disabled={isAnswered}
                          className={cn(
                            'w-full text-left rounded-xl border p-3 text-sm transition-all flex items-center gap-3',
                            !isAnswered && 'border-(--border) hover:border-primary/40 hover:bg-primary/5',
                            isAnswered && isCorrectOpt && 'border-primary/50 bg-primary/10 dark:bg-primary/30',
                            isAnswered && isSelected && !isCorrectOpt && 'border-primary/30 bg-primary/10 dark:bg-primary/30',
                            isAnswered && !isSelected && !isCorrectOpt && 'border-(--border) opacity-40',
                          )}
                        >
                          <span
                            className={cn(
                              'shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold',
                              !isAnswered && 'bg-(--bg-secondary) text-(--text-muted)',
                              isAnswered && isCorrectOpt && 'bg-primary text-white',
                              isAnswered && isSelected && !isCorrectOpt && 'bg-primary/30 text-white',
                              isAnswered && !isSelected && !isCorrectOpt && 'bg-(--bg-secondary) text-(--text-muted)',
                            )}
                          >
                            {LABELS[i]}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {isAnswered && isCorrectOpt && <CheckCircle2 className="shrink-0 w-4 h-4 text-primary" />}
                          {isAnswered && isSelected && !isCorrectOpt && <XCircle className="shrink-0 w-4 h-4 text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Text input (Sections B / C / D) */}
                {!isMCQ && (
                  <div className="px-5 pb-4 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        disabled={isAnswered}
                        placeholder="Ketik jawaban kamu..."
                        value={textInputs[q.id] ?? ''}
                        onChange={(e) => setTextInputs((prev) => ({ ...prev, [q.id]: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !isAnswered) handleCheckText(q.id, correctAnswer); }}
                        className={cn(
                          'flex-1 rounded-xl border px-3 py-2.5 text-sm bg-(--bg-card) text-(--text) outline-none transition-all placeholder:text-(--text-muted)',
                          !isAnswered && 'border-(--border) focus:border-primary',
                          isAnswered && isRight && 'border-primary/30 bg-primary/10 dark:bg-primary/20',
                          isAnswered && isWrong && 'border-primary/30 bg-primary/10 dark:bg-primary/20',
                        )}
                      />
                      {!isAnswered && (
                        <button
                          type="button"
                          onClick={() => handleCheckText(q.id, correctAnswer)}
                          disabled={!(textInputs[q.id] ?? '').trim()}
                          className={cn(
                            'shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5',
                            (textInputs[q.id] ?? '').trim()
                              ? 'bg-primary text-white hover:bg-primary/90'
                              : 'bg-(--bg-secondary) text-(--text-muted) cursor-not-allowed',
                          )}
                        >
                          <SendHorizontal className="w-4 h-4" />
                          Cek
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Feedback */}
                {isAnswered && (
                  <div className="mx-5 mb-4 space-y-2 text-xs">
                    <div className={cn(
                      'flex items-center gap-2 rounded-xl px-4 py-2.5 font-semibold',
                      isRight
                        ? 'bg-primary/15 text-primary dark:text-primary'
                        : 'bg-primary/15 text-primary dark:text-primary',
                    )}>
                      {isRight
                        ? <><CheckCircle2 className="w-4 h-4 shrink-0" /> Benar! Jawaban kamu tepat.</>
                        : <><XCircle className="w-4 h-4 shrink-0" /> Jawaban kamu kurang tepat.</>
                      }
                    </div>

                    {isWrong && (
                      <div className="rounded-xl border border-primary/30 dark:border-primary/50 bg-primary/10 dark:bg-primary/30 px-4 py-3 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-primary dark:text-primary flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Jawaban yang benar
                        </p>
                        <p className="font-semibold text-primary dark:text-primary text-sm">{correctAnswer}</p>
                      </div>
                    )}

                    {isWrong && isMCQ && (
                      <div className="rounded-xl border border-primary/30 dark:border-primary/50 bg-primary/10 dark:bg-primary/20 px-4 py-3 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-primary dark:text-primary flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Pilihan kamu
                        </p>
                        <p className="text-primary dark:text-primary text-sm line-through">
                          {typeof result.userAnswer === 'number' ? (q.options?.[result.userAnswer] ?? '') : result.userAnswer}
                        </p>
                      </div>
                    )}

                    {isWrong && !isMCQ && (
                      <div className="rounded-xl border border-primary/30 dark:border-primary/50 bg-primary/10 dark:bg-primary/20 px-4 py-3 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-primary dark:text-primary flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Jawaban kamu
                        </p>
                        <p className="text-primary dark:text-primary text-sm italic">"{result.userAnswer}"</p>
                      </div>
                    )}

                    <div className="flex gap-3 pl-1">
                      <div className="shrink-0 mt-1">
                        <Lightbulb className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-(--text-secondary) leading-relaxed">{q.reason}</p>
                    </div>

                    {isRight && (
                      <div className="rounded-xl border border-primary/30 dark:border-primary/50 bg-primary/10 dark:bg-primary/20 px-4 py-2.5 flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-primary shrink-0" />
                        <p className="text-primary dark:text-primary">
                          Jawaban: <span className="font-semibold">{correctAnswer}</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>
          );
        })}
      </div>

      {/* Sticky bottom */}
      <div className="sticky bottom-4">
        <div className="flex items-center gap-3 bg-(--bg-card) border border-(--border) rounded-2xl p-3 shadow-lg">
          <div className="flex-1">
            {allDone ? (
              <p className="text-xs text-primary font-medium">Semua soal selesai!</p>
            ) : (
              <p className="text-xs text-(--text-secondary)">
                Sisa <span className="font-semibold text-(--text)">{remaining} soal</span> — jawab langsung di atas
              </p>
            )}
            <div className="w-full h-1 bg-(--bg-secondary) rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <button
            onClick={newSession}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
