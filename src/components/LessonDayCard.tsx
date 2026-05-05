import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';
import type { ModuleLesson } from '@/types/module';

interface LessonDayCardProps {
  lesson: ModuleLesson;
  href: string;
  isMidTest?: boolean;
}

export default function LessonDayCard({ lesson, href, isMidTest: midTestProp }: LessonDayCardProps) {
  const isMidTest = midTestProp ?? !Number.isInteger(lesson.day);

  if (isMidTest) {
    return (
      <Link
        href={href}
        className="group col-span-full sm:col-span-2 lg:col-span-3 flex items-center gap-3 border border-primary/40 bg-primary/5 hover:bg-primary/10 rounded-xl p-4 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
          <GraduationCap className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-xs font-bold text-primary uppercase tracking-wider">Middle Test</p>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-semibold">
              Ujian
            </span>
          </div>
          <p className="text-sm font-medium text-(--text) group-hover:text-primary transition-colors">
            {lesson.title}
          </p>
          <p className="text-xs text-(--text-muted) mt-0.5">{lesson.subtitle}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-primary shrink-0" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group border border-(--border) hover:border-primary/40 hover:bg-(--hover) rounded-xl p-4 transition-colors"
    >
      <p className="text-xs text-primary font-semibold mb-1">Day {lesson.day}</p>
      <p className="text-sm font-medium text-(--text) group-hover:text-primary transition-colors leading-snug">
        {lesson.title}
      </p>
      <p className="text-xs text-(--text-muted) mt-1.5 line-clamp-2">{lesson.subtitle}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary">
        Buka <ArrowRight className="w-3 h-3" />
      </span>
    </Link>
  );
}
