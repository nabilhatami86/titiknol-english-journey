import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Layers } from 'lucide-react';
import { getTnAdvanceLessonsByDay } from '@/data/tnAdvanceModules';

export const metadata: Metadata = {
  title: 'TN Advance',
  description: 'Materi Grammar Advanced: Noun Clause, Adverbial Clause, Causative Verb, Comparative, Inversion, dan Conditional Sentence.',
};

const dayColors = [
  'border-violet-400/50 bg-violet-50/40 dark:bg-violet-950/20 hover:bg-violet-50/70 dark:hover:bg-violet-950/30',
  'border-blue-400/50   bg-blue-50/40   dark:bg-blue-950/20   hover:bg-blue-50/70   dark:hover:bg-blue-950/30',
  'border-emerald-400/50 bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30',
  'border-amber-400/50  bg-amber-50/40  dark:bg-amber-950/20  hover:bg-amber-50/70  dark:hover:bg-amber-950/30',
  'border-rose-400/50   bg-rose-50/40   dark:bg-rose-950/20   hover:bg-rose-50/70   dark:hover:bg-rose-950/30',
  'border-cyan-400/50   bg-cyan-50/40   dark:bg-cyan-950/20   hover:bg-cyan-50/70   dark:hover:bg-cyan-950/30',
  'border-indigo-400/50 bg-indigo-50/40 dark:bg-indigo-950/20 hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30',
];

const dotColors = [
  'bg-violet-500',
  'bg-blue-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-indigo-500',
];

const textColors = [
  'text-violet-600 dark:text-violet-400',
  'text-blue-600 dark:text-blue-400',
  'text-emerald-600 dark:text-emerald-400',
  'text-amber-600 dark:text-amber-400',
  'text-rose-600 dark:text-rose-400',
  'text-cyan-600 dark:text-cyan-400',
  'text-indigo-600 dark:text-indigo-400',
];

export default function TnAdvancePage() {
  const lessons = getTnAdvanceLessonsByDay();

  return (
    <div className="p-4 lg:p-6 space-y-8 animate-fade-in">

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Layers className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-(--text)">TN Advance</h1>
        </div>
        <p className="text-sm text-(--text-secondary) ml-10">
          Grammar tingkat lanjut — {lessons.length} materi kompleks untuk level Advanced.
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-6 px-4 py-3 rounded-xl bg-(--hover) border border-(--border)">
        <div className="text-center">
          <p className="text-xl font-bold text-(--text)">{lessons.length}</p>
          <p className="text-xs text-(--text-muted)">Materi</p>
        </div>
        <div className="w-px h-8 bg-(--border)" />
        <div className="text-center">
          <p className="text-xl font-bold text-(--text)">
            {lessons.reduce((sum, l) => sum + l.exercises.length, 0)}
          </p>
          <p className="text-xs text-(--text-muted)">Latihan</p>
        </div>
        <div className="w-px h-8 bg-(--border)" />
        <div className="flex items-center gap-1.5">
          <BookOpenCheck className="w-4 h-4 text-primary" />
          <span className="text-xs text-(--text-secondary)">Grammar Advanced</span>
        </div>
      </div>

      {/* Lesson cards */}
      <div className="space-y-3">
        {lessons.map((lesson, idx) => {
          const color = dayColors[idx % dayColors.length];
          const dot = dotColors[idx % dotColors.length];
          const text = textColors[idx % textColors.length];

          return (
            <Link
              key={lesson.id}
              href={`/tn-advance/${lesson.day}`}
              className={`group flex items-center gap-4 border ${color} rounded-2xl p-4 transition-all`}
            >
              {/* Day badge */}
              <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white/60 dark:bg-white/10 shrink-0">
                <div className={`w-2 h-2 rounded-full ${dot} mb-0.5`} />
                <span className={`text-xs font-bold ${text}`}>Day</span>
                <span className={`text-sm font-black ${text} leading-none`}>{lesson.day}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold ${text} uppercase tracking-wide mb-0.5`}>
                  Grammar Advanced
                </p>
                <p className="text-sm font-semibold text-(--text) group-hover:text-primary transition-colors leading-snug">
                  {lesson.title}
                </p>
                <p className="text-xs text-(--text-muted) mt-0.5 line-clamp-1">
                  {lesson.subtitle}
                </p>
              </div>

              {/* Exercise count + arrow */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-(--text-muted) hidden sm:block">
                  {lesson.exercises.length} soal
                </span>
                <ArrowRight className="w-4 h-4 text-(--text-muted) group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
