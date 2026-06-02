'use client';

import { useState } from 'react';
import Link from 'next/link';
import ExamLockGate from '@/components/ExamLockGate';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  FileText,
  SendHorizontal,
  Lightbulb,
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  readingPassage,
  readingPostTestQuestions,
  type ReadingQuestion,
} from '@/data/readingPostTest';

// ─── Style maps ─────────────────────────────────────────────────────────────

const PART_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  A: { bg: 'bg-primary/10 dark:bg-primary/10/30',  text: 'text-primary',  border: 'border-primary/30 dark:border-primary/30'  },
  B: { bg: 'bg-primary/10 dark:bg-primary/10/30',      text: 'text-primary',    border: 'border-primary/30 dark:border-primary/30'      },
  C: { bg: 'bg-primary/10 dark:bg-primary/10',    text: 'text-primary',   border: 'border-primary/30 dark:border-primary/30'    },
};

const TFN_STYLE: Record<string, { active: string; idle: string }> = {
  True:      { active: 'border-primary/50 bg-primary/10 dark:bg-primary/30 text-primary dark:text-primary',  idle: 'border-(--border) hover:border-primary/30 hover:bg-primary/60 dark:hover:bg-primary/20' },
  False:     { active: 'border-primary/30   bg-primary/10 dark:bg-primary/30 text-primary dark:text-primary',          idle: 'border-(--border) hover:border-primary/30   hover:bg-primary/60   dark:hover:bg-primary/20'   },
  'Not Given': { active: 'border-gray-500  bg-gray-100 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300',  idle: 'border-(--border) hover:border-gray-400  hover:bg-gray-100/60 dark:hover:bg-gray-800/20'  },
};

const MCQ_LABELS = ['A', 'B', 'C', 'D'];

// ─── Types ──────────────────────────────────────────────────────────────────

type QuestionResult = {
  correct: boolean;
  userAnswer: string | number;
};

function normalize(s: string) {
  return s.toLowerCase().trim().replace(/\.+$/, '').replace(/\s+/g, ' ');
}

// ─── Page ───────────────────────────────────────────────────────────────────

const questions: ReadingQuestion[] = readingPostTestQuestions;

function PostTestReadingContent() {
  const [results, setResults]       = useState<Record<string, QuestionResult>>({});
  const [textInputs, setTextInputs] = useState<Record<string, string>>({});
  const [passageOpen, setPassageOpen] = useState(true);

  const total         = questions.length;
  const answeredCount = Object.keys(results).length;
  const remaining     = total - answeredCount;
  const progress      = Math.round((answeredCount / total) * 100);
  const scoreCount    = Object.values(results).filter((r) => r.correct).length;
  const percent       = answeredCount > 0 ? Math.round((scoreCount / answeredCount) * 100) : 0;
  const allDone       = remaining === 0;

  const scoreColor    = percent >= 80 ? 'text-primary' : percent >= 60 ? 'text-primary' : 'text-primary';
  const scoreBarColor = percent >= 80 ? 'bg-primary'   : percent >= 60 ? 'bg-primary/10'   : 'bg-primary';

  // Part A: T/F/NG — click option label
  const handleTFN = (id: string, optionIndex: number, correctIndex: number) => {
    if (results[id]) return;
    setResults((prev) => ({
      ...prev,
      [id]: { correct: optionIndex === correctIndex, userAnswer: optionIndex },
    }));
  };

  // Part B: MCQ — click option
  const handleMCQ = (id: string, optionIndex: number, correctIndex: number) => {
    if (results[id]) return;
    setResults((prev) => ({
      ...prev,
      [id]: { correct: optionIndex === correctIndex, userAnswer: optionIndex },
    }));
  };

  // Part C: text input
  const handleCheckText = (id: string, correctAnswer: string) => {
    const userInput = textInputs[id] ?? '';
    if (!userInput.trim()) return;
    setResults((prev) => ({
      ...prev,
      [id]: { correct: normalize(userInput) === normalize(correctAnswer), userAnswer: userInput },
    }));
  };

  const reset = () => {
    setResults({});
    setTextInputs({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Group questions by part for part headers
  const parts: Array<{ key: 'A' | 'B' | 'C'; title: string; desc: string }> = [
    { key: 'A', title: 'Part A — True / False / Not Given', desc: 'Tentukan apakah pernyataan berikut True, False, atau Not Given berdasarkan teks.' },
    { key: 'B', title: 'Part B — Multiple Choice',          desc: 'Pilih jawaban yang paling tepat berdasarkan teks (A/B/C/D).' },
    { key: 'C', title: 'Part C — Short Answer',             desc: 'Jawab pertanyaan berikut berdasarkan teks dan kosa kata penting.' },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-5 animate-fade-in">

      {/* Top nav */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/tn-basic-cource"
          className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          TN Basic Course
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
          <div className="w-10 h-10 rounded-xl bg-primary/10/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-(--text)">Post Test — Reading</h1>
            <p className="text-xs text-(--text-secondary) mt-0.5">
              25 soal · Part A: T/F/NG · Part B: Pilihan Ganda · Part C: Isian
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {parts.map((p) => (
            <span key={p.key} className={cn('px-2.5 py-1 rounded-full border font-medium', PART_STYLE[p.key].bg, PART_STYLE[p.key].text, PART_STYLE[p.key].border)}>
              Part {p.key}
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
                  {allDone ? 'Sesi Selesai!' : 'Skor Sementara'}
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
                onClick={reset}
                className="w-full mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                Ulangi dari Awal
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Reading Passage ── */}
      <div className="bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setPassageOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-(--hover) transition-colors"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-bold text-(--text)">Reading Passage</p>
              <p className="text-xs text-(--text-muted) mt-0.5">{readingPassage.title}</p>
            </div>
          </div>
          {passageOpen ? (
            <ChevronUp className="w-4 h-4 text-(--text-secondary) shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-(--text-secondary) shrink-0" />
          )}
        </button>

        {passageOpen && (
          <div className="px-5 pb-5 space-y-3 border-t border-(--border)">
            <h2 className="text-sm font-bold text-(--text) mt-4 leading-snug">
              {readingPassage.title}
            </h2>
            {readingPassage.paragraphs.map((para, i) => (
              <p key={i} className="text-sm text-(--text-secondary) leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* ── Questions grouped by Part ── */}
      {parts.map((partInfo) => {
        const partQuestions = questions.filter((q) => q.part === partInfo.key);
        return (
          <section key={partInfo.key} className="space-y-3">
            {/* Part header */}
            <div className={cn('rounded-xl border px-4 py-3', PART_STYLE[partInfo.key].bg, PART_STYLE[partInfo.key].border)}>
              <p className={cn('text-sm font-bold', PART_STYLE[partInfo.key].text)}>{partInfo.title}</p>
              <p className="text-xs text-(--text-secondary) mt-0.5">{partInfo.desc}</p>
            </div>

            {/* Questions */}
            {partQuestions.map((q, idx) => {
              const globalIdx = questions.findIndex((x) => x.id === q.id);
              const result    = results[q.id];
              const isAnswered = !!result;
              const isRight    = isAnswered && result.correct;
              const isWrong    = isAnswered && !result.correct;
              const partStyle  = PART_STYLE[q.part];
              const isText     = q.part === 'C';
              const isTFN      = q.part === 'A';

              return (
                <section
                  key={q.id}
                  className={cn(
                    'bg-(--bg-card) border rounded-2xl overflow-hidden transition-all duration-200',
                    isRight  && 'border-primary/30 dark:border-primary/50',
                    isWrong  && 'border-primary/30 dark:border-primary/50',
                    !isAnswered && 'border-(--border)',
                  )}
                >
                  {/* Question header */}
                  <div className="px-5 pt-4 pb-3 flex items-start gap-3">
                    <span
                      className={cn(
                        'shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5',
                        isRight  && 'bg-primary text-white',
                        isWrong  && 'bg-primary text-white',
                        !isAnswered && 'bg-primary/10 text-primary',
                      )}
                    >
                      {isRight ? <CheckCircle2 className="w-4 h-4" /> : isWrong ? <XCircle className="w-4 h-4" /> : globalIdx + 1}
                    </span>
                    <div className="flex-1 space-y-1">
                      <span className={cn('inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border', partStyle.bg, partStyle.text, partStyle.border)}>
                        Part {q.part} · {q.partLabel}
                      </span>
                      <p className="font-medium text-(--text) text-sm leading-relaxed">{q.question}</p>
                      {q.paraphraseNote && (
                        <p className="text-[11px] text-primary dark:text-primary italic bg-primary/10/60 dark:bg-primary/10/20 rounded-lg px-2.5 py-1.5 border border-primary/30 dark:border-primary/30">
                          {q.paraphraseNote}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Part A: T / F / NG buttons */}
                  {isTFN && (
                    <div className="px-5 pb-4 flex flex-wrap gap-2">
                      {q.options.map((opt, i) => {
                        const isSelected    = isAnswered && result.userAnswer === i;
                        const isCorrectOpt  = i === q.correctIndex;
                        const style         = TFN_STYLE[opt];
                        return (
                          <button
                            key={`${q.id}-${i}`}
                            type="button"
                            disabled={isAnswered}
                            onClick={() => handleTFN(q.id, i, q.correctIndex)}
                            className={cn(
                              'flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all',
                              !isAnswered && style.idle,
                              isAnswered && isCorrectOpt && style.active,
                              isAnswered && isSelected && !isCorrectOpt && 'border-primary/30 bg-primary/10 dark:bg-primary/30 text-primary dark:text-primary line-through opacity-70',
                              isAnswered && !isSelected && !isCorrectOpt && 'border-(--border) opacity-30',
                            )}
                          >
                            {isAnswered && isCorrectOpt && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                            {isAnswered && isSelected && !isCorrectOpt && <XCircle className="w-3.5 h-3.5 shrink-0" />}
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Part B: MCQ A/B/C/D */}
                  {!isTFN && !isText && (
                    <div className="px-5 pb-4 space-y-2">
                      {q.options.map((opt, i) => {
                        const isSelected   = isAnswered && result.userAnswer === i;
                        const isCorrectOpt = i === q.correctIndex;
                        return (
                          <button
                            key={`${q.id}-${i}`}
                            type="button"
                            onClick={() => handleMCQ(q.id, i, q.correctIndex)}
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
                              {MCQ_LABELS[i]}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {isAnswered && isCorrectOpt && <CheckCircle2 className="shrink-0 w-4 h-4 text-primary" />}
                            {isAnswered && isSelected && !isCorrectOpt && <XCircle className="shrink-0 w-4 h-4 text-primary" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Part C: text input */}
                  {isText && (
                    <div className="px-5 pb-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          disabled={isAnswered}
                          placeholder="Tulis jawabanmu dalam bahasa Inggris..."
                          value={textInputs[q.id] ?? ''}
                          onChange={(e) => setTextInputs((prev) => ({ ...prev, [q.id]: e.target.value }))}
                          onKeyDown={(e) => { if (e.key === 'Enter' && !isAnswered) handleCheckText(q.id, q.options[q.correctIndex]); }}
                          className={cn(
                            'flex-1 rounded-xl border px-3 py-2.5 text-sm bg-(--bg-card) text-(--text) outline-none transition-all placeholder:text-(--text-muted)',
                            !isAnswered && 'border-(--border) focus:border-primary',
                            isAnswered && isRight  && 'border-primary/30 bg-primary/10 dark:bg-primary/20',
                            isAnswered && isWrong  && 'border-primary/30 bg-primary/10 dark:bg-primary/20',
                          )}
                        />
                        {!isAnswered && (
                          <button
                            type="button"
                            onClick={() => handleCheckText(q.id, q.options[q.correctIndex])}
                            disabled={!(textInputs[q.id] ?? '').trim()}
                            className={cn(
                              'shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5',
                              (textInputs[q.id] ?? '').trim()
                                ? 'bg-primary text-white hover:bg-primary-dark'
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
                        isRight ? 'bg-primary/15 text-primary dark:text-primary' : 'bg-primary/15 text-primary dark:text-primary',
                      )}>
                        {isRight
                          ? <><CheckCircle2 className="w-4 h-4 shrink-0" /> Benar! Jawaban kamu tepat.</>
                          : <><AlertCircle className="w-4 h-4 shrink-0" /> Jawaban kamu kurang tepat.</>
                        }
                      </div>

                      {isWrong && (
                        <div className="rounded-xl border border-primary/30 dark:border-primary/50 bg-primary/10 dark:bg-primary/30 px-4 py-3 space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-primary dark:text-primary flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Jawaban yang benar
                          </p>
                          <p className="font-semibold text-primary dark:text-primary text-sm">
                            {isTFN
                              ? q.options[q.correctIndex]
                              : isText
                                ? q.options[q.correctIndex]
                                : `${MCQ_LABELS[q.correctIndex]}. ${q.options[q.correctIndex]}`
                            }
                          </p>
                        </div>
                      )}

                      {isRight && (
                        <div className="rounded-xl border border-primary/30 dark:border-primary/50 bg-primary/10 dark:bg-primary/20 px-4 py-2.5 flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-primary shrink-0" />
                          <p className="text-primary dark:text-primary">
                            Jawaban:{' '}
                            <span className="font-semibold">
                              {isTFN
                                ? q.options[q.correctIndex]
                                : isText
                                  ? q.options[q.correctIndex]
                                  : `${MCQ_LABELS[q.correctIndex]}. ${q.options[q.correctIndex]}`
                              }
                            </span>
                          </p>
                        </div>
                      )}

                      <div className="flex gap-3 pl-1">
                        <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <p className="text-(--text-secondary) leading-relaxed">{q.reason}</p>
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
          </section>
        );
      })}

      {/* Sticky bottom */}
      <div className="sticky bottom-4">
        <div className="flex items-center gap-3 bg-(--bg-card) border border-(--border) rounded-2xl p-3 shadow-lg">
          <div className="flex-1">
            {allDone ? (
              <p className="text-xs text-primary font-medium">Semua soal selesai! Skor: {scoreCount}/{total}</p>
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
            onClick={reset}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PostTestReadingPage() {
  return (
    <ExamLockGate examType="post-test" examLabel="Post Test — Reading">
      <PostTestReadingContent />
    </ExamLockGate>
  );
}
