'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, RotateCcw, CheckCircle2, XCircle, Lightbulb, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { basicGrammarLessons } from '@/data/grammar/tnBasicGrammar';
import { intermediateGrammarLessons } from '@/data/grammar/tnIntermediateGrammar';
import { advanceGrammarLessons } from '@/data/grammar/tnAdvanceGrammar';
import type { ModuleLesson } from '@/types/module';

// ── Types ──────────────────────────────────────────────────────────────────

type Level = 'basic' | 'intermediate' | 'advance';

interface QuizItem {
  id: string;
  lessonTitle: string;
  question: string;
  options: string[];
  correctAnswer: string;
  reason?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

const levelConfig: Record<Level, { label: string; color: string; border: string; badge: string; lessons: ModuleLesson[] }> = {
  basic: {
    label: 'Basic',
    color: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-400 dark:border-emerald-600',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    lessons: basicGrammarLessons,
  },
  intermediate: {
    label: 'Intermediate',
    color: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-400 dark:border-blue-600',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    lessons: intermediateGrammarLessons,
  },
  advance: {
    label: 'Advance',
    color: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-400 dark:border-purple-600',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
    lessons: advanceGrammarLessons,
  },
};

function extractQuizItems(lesson: ModuleLesson): QuizItem[] {
  return lesson.exercises
    .filter((ex) => ex.type === 'multiple-choice' && ex.options && ex.correctAnswer)
    .map((ex) => ({
      id: ex.id,
      lessonTitle: lesson.title,
      question: ex.question,
      options: ex.options as string[],
      correctAnswer: ex.correctAnswer as string,
      reason: ex.reason,
    }));
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function GrammarLatihanPage() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<ModuleLesson | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const quizItems = useMemo(
    () => (selectedLesson ? extractQuizItems(selectedLesson) : []),
    [selectedLesson],
  );

  const answeredCount = Object.keys(answers).length;
  const totalCount = quizItems.length;

  const score = useMemo(() => {
    if (!isSubmitted) return 0;
    return quizItems.reduce((acc, q) => acc + (answers[q.id] === q.correctAnswer ? 1 : 0), 0);
  }, [isSubmitted, quizItems, answers]);

  const wrongItems = useMemo(
    () => (isSubmitted ? quizItems.filter((q) => answers[q.id] !== q.correctAnswer) : []),
    [isSubmitted, quizItems, answers],
  );

  const percentage = totalCount > 0 ? Math.round((score / totalCount) * 100) : 0;

  const handleSelect = (id: string, val: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const handleSubmit = () => {
    if (answeredCount < totalCount) return;
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setAnswers({});
    setIsSubmitted(false);
    setShowDetails(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLessons = () => {
    setSelectedLesson(null);
    setAnswers({});
    setIsSubmitted(false);
    setShowDetails(false);
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
    setSelectedLesson(null);
    setAnswers({});
    setIsSubmitted(false);
    setShowDetails(false);
  };

  // ── RESULTS VIEW ──────────────────────────────────────────────────────────
  if (isSubmitted && selectedLevel) {
    const cfg = levelConfig[selectedLevel];
    return (
      <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
        <button onClick={handleBackToLessons} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Pilih Lesson Lain
        </button>

        <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-8 text-center">
          <Trophy className={cn('w-16 h-16 mx-auto mb-4', percentage >= 70 ? 'text-amber-500' : 'text-(--text-muted)')} />
          <span className={cn('text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block', cfg.badge)}>{cfg.label}</span>
          <h1 className="text-xl font-bold text-(--text) mt-2 mb-1">{selectedLesson?.title}</h1>
          <p className="text-5xl font-bold text-primary my-3">{score} / {totalCount}</p>
          <p className="text-sm text-(--text-secondary) mb-4">{percentage}% benar</p>

          <div className="h-3 rounded-full bg-(--bg-secondary) overflow-hidden max-w-xs mx-auto mb-6">
            <div
              className={cn('h-full rounded-full transition-all duration-500', percentage >= 70 ? 'bg-green-500' : percentage >= 40 ? 'bg-amber-500' : 'bg-red-500')}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {quizItems.map((q, i) => {
              const correct = answers[q.id] === q.correctAnswer;
              return (
                <div key={q.id} className={cn('w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold',
                  correct ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
                )}>
                  {i + 1}
                </div>
              );
            })}
          </div>

          <p className="text-sm text-(--text-secondary) mb-2">
            {percentage >= 80 ? 'Keren! Kamu sudah menguasai materi ini.' :
             percentage >= 60 ? 'Bagus! Masih ada yang bisa ditingkatkan.' :
             percentage >= 40 ? 'Lumayan, coba ulang untuk hasil lebih baik.' :
             'Pelajari kembali materinya ya, kamu pasti bisa!'}
          </p>

          <div className="flex gap-3 justify-center flex-wrap mt-6">
            <button onClick={handleRestart} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors">
              <RotateCcw className="w-4 h-4" /> Coba Lagi
            </button>
            <button onClick={handleBackToLessons} className="inline-flex items-center gap-2 px-5 py-2.5 border border-(--border) text-(--text-secondary) rounded-lg font-medium text-sm hover:bg-(--hover) transition-colors">
              Lesson Lain
            </button>
            <button onClick={handleBackToLevels} className="inline-flex items-center gap-2 px-5 py-2.5 border border-(--border) text-(--text-secondary) rounded-lg font-medium text-sm hover:bg-(--hover) transition-colors">
              Ganti Level
            </button>
          </div>
        </div>

        {wrongItems.length > 0 && (
          <div className="bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden">
            <button onClick={() => setShowDetails(!showDetails)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-(--hover) transition-colors">
              <span className="font-semibold text-(--text) flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                Jawaban Salah ({wrongItems.length} soal)
              </span>
              {showDetails ? <ChevronUp className="w-5 h-5 text-(--text-muted)" /> : <ChevronDown className="w-5 h-5 text-(--text-muted)" />}
            </button>

            {showDetails && (
              <div className="border-t border-(--border) divide-y divide-(--border)">
                {wrongItems.map((q) => (
                  <div key={q.id} className="px-6 py-4 space-y-3">
                    <p className="text-sm font-medium text-(--text)">{q.question}</p>
                    <div className="space-y-1.5">
                      {q.options.map((opt) => {
                        const isCorrect = opt === q.correctAnswer;
                        const isYours = opt === answers[q.id];
                        return (
                          <div key={opt} className={cn(
                            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
                            isCorrect && 'bg-green-50 dark:bg-green-950/50 border border-green-300 dark:border-green-800',
                            isYours && !isCorrect && 'bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 line-through opacity-70',
                            !isCorrect && !isYours && 'opacity-40',
                          )}>
                            <span className={cn('flex-1', isCorrect && 'font-semibold text-green-700 dark:text-green-300')}>{opt}</span>
                            {isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                            {isYours && !isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                    {q.reason && (
                      <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
                        <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">{q.reason}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ── QUIZ VIEW ─────────────────────────────────────────────────────────────
  if (selectedLesson && selectedLevel) {
    const cfg = levelConfig[selectedLevel];
    return (
      <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <button onClick={handleBackToLessons} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Pilih Lesson Lain
          </button>
          <span className="text-sm text-(--text-secondary) font-medium">{answeredCount} / {totalCount} dijawab</span>
        </div>

        <div>
          <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', cfg.badge)}>{cfg.label}</span>
          <h1 className="text-xl font-bold text-(--text) mt-2">{selectedLesson.title}</h1>
          {selectedLesson.subtitle && (
            <p className="text-sm text-(--text-secondary) mt-0.5">{selectedLesson.subtitle}</p>
          )}
        </div>

        <div className="h-2 rounded-full bg-(--bg-secondary) overflow-hidden sticky top-0 z-10">
          <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${(answeredCount / totalCount) * 100}%` }} />
        </div>

        {totalCount === 0 ? (
          <div className="text-center py-12 text-(--text-muted) text-sm">
            Lesson ini belum punya soal latihan pilihan ganda.
          </div>
        ) : (
          <div className="space-y-5">
            {quizItems.map((q, qIdx) => {
              const selected = answers[q.id];
              return (
                <div key={q.id} className={cn('bg-(--bg-card) border rounded-xl p-5 transition-all', selected ? 'border-primary/30' : 'border-(--border)')}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className={cn('text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
                      selected ? 'bg-primary/10 text-primary' : 'bg-(--bg-secondary) text-(--text-muted)',
                    )}>
                      {qIdx + 1}
                    </span>
                    <p className="text-sm font-medium text-(--text) flex-1">{q.question}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-10">
                    {q.options.map((opt, oIdx) => {
                      const letter = String.fromCharCode(65 + oIdx);
                      const isSelected = selected === opt;
                      return (
                        <button key={oIdx} type="button" onClick={() => handleSelect(q.id, opt)}
                          className={cn('flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm text-left transition-all',
                            isSelected ? 'border-primary bg-primary/5 text-primary font-medium' : 'border-(--border) hover:border-primary/40 hover:bg-(--hover) text-(--text)',
                          )}
                        >
                          <span className={cn('font-mono text-xs font-bold w-6 h-6 rounded-md flex items-center justify-center shrink-0',
                            isSelected ? 'bg-primary text-white' : 'bg-(--bg-secondary) text-(--text-muted)',
                          )}>
                            {letter}
                          </span>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {totalCount > 0 && (
          <div className="sticky bottom-4 z-10">
            <button onClick={handleSubmit} disabled={answeredCount < totalCount}
              className={cn('w-full py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg',
                answeredCount >= totalCount ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-(--bg-secondary) text-(--text-muted) cursor-not-allowed',
              )}
            >
              {answeredCount >= totalCount ? `Submit (${totalCount} soal)` : `Jawab semua dulu (${answeredCount}/${totalCount})`}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── LESSON LIST VIEW ──────────────────────────────────────────────────────
  if (selectedLevel) {
    const cfg = levelConfig[selectedLevel];
    return (
      <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
        <button onClick={handleBackToLevels} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Ganti Level
        </button>

        <div>
          <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', cfg.badge)}>{cfg.label}</span>
          <h1 className="text-xl font-bold text-(--text) mt-2">Pilih Materi</h1>
          <p className="text-sm text-(--text-secondary) mt-1">Pilih lesson grammar yang mau dilatih.</p>
        </div>

        <div className="space-y-2">
          {cfg.lessons.map((lesson) => {
            const count = lesson.exercises.filter((ex) => ex.type === 'multiple-choice').length;
            return (
              <button key={lesson.id} onClick={() => setSelectedLesson(lesson)}
                className="w-full text-left bg-(--bg-card) border border-(--border) rounded-xl px-4 py-3.5 hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold border', cfg.border, cfg.color)}>
                    {lesson.day}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-(--text) text-sm group-hover:text-primary transition-colors truncate">{lesson.title}</p>
                    {lesson.subtitle && (
                      <p className="text-xs text-(--text-muted) truncate mt-0.5">{lesson.subtitle}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <BookOpen className="w-3.5 h-3.5 text-(--text-muted)" />
                    <span className="text-xs text-(--text-muted)">{count} soal</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── LEVEL SELECTOR VIEW ───────────────────────────────────────────────────
  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
      <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Practice
      </Link>

      <div>
        <h1 className="text-xl font-bold text-(--text)">Practice Grammar</h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          Latihan soal grammar berdasarkan materi dari setiap level — Basic, Intermediate, dan Advance.
        </p>
      </div>

      <div className="grid gap-4">
        {(Object.entries(levelConfig) as [Level, typeof levelConfig[Level]][]).map(([key, cfg]) => {
          const totalSoal = cfg.lessons.reduce((acc, l) => acc + l.exercises.filter((ex) => ex.type === 'multiple-choice').length, 0);
          const totalLesson = cfg.lessons.length;
          return (
            <button key={key} onClick={() => setSelectedLevel(key)}
              className={cn('text-left bg-(--bg-card) border-2 rounded-2xl p-5 hover:shadow-md transition-all group', cfg.border)}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', cfg.badge)}>{cfg.label}</span>
                  <h2 className={cn('text-2xl font-bold mt-2 mb-1', cfg.color)}>Grammar {cfg.label}</h2>
                  <p className="text-sm text-(--text-secondary)">
                    {totalLesson} lesson · {totalSoal} soal pilihan ganda
                  </p>
                </div>
                <div className={cn('text-4xl font-black opacity-20 group-hover:opacity-40 transition-opacity', cfg.color)}>
                  {key === 'basic' ? 'B' : key === 'intermediate' ? 'I' : 'A'}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {cfg.lessons.slice(0, 5).map((l) => (
                  <span key={l.id} className="text-[10px] px-2 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-muted) truncate max-w-[140px]">
                    {l.title}
                  </span>
                ))}
                {cfg.lessons.length > 5 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-muted)">
                    +{cfg.lessons.length - 5} lagi
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
