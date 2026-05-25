'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import type { ModuleLesson } from '@/types/module';

interface Props {
  day: number;
  lessons: ModuleLesson[];
  baseHref: string;
}

export default function LessonDayGroupCard({ day, lessons, baseHref }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${open ? 'border-primary/40' : 'border-(--border)'}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left p-4 hover:bg-(--hover) transition-colors group"
      >
        <p className="text-xs text-primary font-semibold mb-1">Day {day}</p>
        <p className="text-sm font-medium text-(--text) group-hover:text-primary transition-colors leading-snug">
          {lessons.length} Set Latihan
        </p>
        <p className="text-xs text-(--text-muted) mt-1.5 line-clamp-1">
          {lessons.map((l) => l.title).join(' · ')}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary">
          {open ? 'Tutup' : 'Pilih Set'}
          {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </span>
      </button>

      {open && (
        <div className="border-t border-(--border) divide-y divide-(--border)/60">
          {lessons.map((lesson, idx) => {
            const letter = String.fromCharCode(65 + idx);
            return (
              <Link
                key={lesson.id}
                href={`${baseHref}/${day}?lessonId=${lesson.id}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-(--hover) transition-colors group/item"
              >
                <span className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                  {letter}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-(--text) group-hover/item:text-primary transition-colors truncate">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-(--text-muted) truncate mt-0.5">{lesson.subtitle}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-(--text-muted) group-hover/item:text-primary shrink-0" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
