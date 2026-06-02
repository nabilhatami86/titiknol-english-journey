import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTnIntermediateLesson, getTnIntermediateLessonsByTrack, tnIntermediateLessons } from '@/data/tnIntermediateModules';
import type { ModuleTrack } from '@/types/module';
import ModuleLessonClient from '@/components/lesson/ModuleLessonClient';

interface PageProps {
  params: Promise<{ track: string; day: string }>;
}

const isTrack = (value: string): value is ModuleTrack =>
  ['reading', 'speaking', 'grammar', 'listening'].includes(value);

export async function generateStaticParams() {
  return tnIntermediateLessons.map((lesson) => ({
    track: lesson.track,
    day: String(lesson.day),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { track, day } = await params;
  if (!isTrack(track)) return { title: 'TN Intermediate Lesson' };

  const lesson = getTnIntermediateLesson(track, Number(day));
  if (!lesson) return { title: 'TN Intermediate Lesson' };

  return {
    title: `${lesson.track.toUpperCase()} Day ${lesson.day} — ${lesson.title} | TN Intermediate`,
    description: lesson.subtitle,
  };
}

export default async function TnIntermediateLessonPage({ params }: PageProps) {
  const { track, day } = await params;

  if (!isTrack(track)) notFound();

  const lesson = getTnIntermediateLesson(track, Number(day));
  if (!lesson) notFound();

  const trackLessons = getTnIntermediateLessonsByTrack(track);
  const currentIdx = trackLessons.findIndex((l) => l.day === lesson.day);
  const prevLesson = currentIdx > 0 ? trackLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < trackLessons.length - 1 ? trackLessons[currentIdx + 1] : null;
  const base = `/tn-intermediate/class/${track}`;

  return (
    <ModuleLessonClient
      lesson={lesson}
      backHref={`/tn-intermediate/class/${track}`}
      backLabel={`Back to ${track.charAt(0).toUpperCase() + track.slice(1)}`}
      prevHref={prevLesson ? `${base}/${prevLesson.day}` : undefined}
      prevLabel={prevLesson ? `Day ${prevLesson.day}` : undefined}
      prevTitle={prevLesson?.title}
      nextHref={nextLesson ? `${base}/${nextLesson.day}` : undefined}
      nextLabel={nextLesson ? `Day ${nextLesson.day}` : undefined}
      nextTitle={nextLesson?.title}
    />
  );
}
