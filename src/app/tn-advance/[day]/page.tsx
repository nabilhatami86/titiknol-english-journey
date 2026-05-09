import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTnAdvanceLesson, getTnAdvanceLessonsByDay } from '@/data/tnAdvanceModules';
import ModuleLessonClient from '@/app/tn-basic-cource/[track]/[day]/ModuleLessonClient';

interface PageProps {
  params: Promise<{ day: string }>;
}

export async function generateStaticParams() {
  const lessons = getTnAdvanceLessonsByDay();
  return lessons.map((lesson) => ({ day: String(lesson.day) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { day } = await params;
  const lesson = getTnAdvanceLesson(Number(day));
  if (!lesson) return { title: 'TN Advance' };
  return {
    title: `Day ${lesson.day} — ${lesson.title} | TN Advance`,
    description: lesson.subtitle,
  };
}

export default async function TnAdvanceLessonPage({ params }: PageProps) {
  const { day } = await params;
  const lesson = getTnAdvanceLesson(Number(day));
  if (!lesson) notFound();

  const lessons = getTnAdvanceLessonsByDay();
  const idx = lessons.findIndex((l) => l.day === lesson.day);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

  return (
    <ModuleLessonClient
      lesson={lesson}
      backHref="/tn-advance"
      backLabel="TN Advance"
      prevHref={prev ? `/tn-advance/${prev.day}` : undefined}
      prevLabel={prev ? `Day ${prev.day}` : undefined}
      prevTitle={prev?.title}
      nextHref={next ? `/tn-advance/${next.day}` : undefined}
      nextLabel={next ? `Day ${next.day}` : undefined}
      nextTitle={next?.title}
    />
  );
}
