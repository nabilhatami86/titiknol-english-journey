import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTnAdvanceLesson, getTnAdvanceLessonById, getTnAdvanceLessonsByTrack, tnAdvanceLessons } from '@/data/tnAdvanceModules';
import ModuleLessonClient from '@/app/tn-basic-cource/[track]/[day]/ModuleLessonClient';

export const dynamicParams = true;

interface PageProps {
  params: Promise<{ track: string; day: string }>;
  searchParams: Promise<{ lessonId?: string }>;
}

const ADVANCE_TRACKS = ['reading', 'speaking', 'grammar', 'writing'] as const;
type AdvanceTrack = typeof ADVANCE_TRACKS[number];
const isAdvanceTrack = (v: string): v is AdvanceTrack => (ADVANCE_TRACKS as readonly string[]).includes(v);

export async function generateStaticParams() {
  return tnAdvanceLessons.map((lesson) => ({
    track: lesson.track,
    day: String(lesson.day),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { track, day } = await params;
  if (!isAdvanceTrack(track)) return { title: 'TN Advance' };
  const lesson = getTnAdvanceLesson(track, Number(day));
  if (!lesson) return { title: 'TN Advance' };
  return {
    title: `${lesson.track.toUpperCase()} Day ${lesson.day} — ${lesson.title} | TN Advance`,
    description: lesson.subtitle,
  };
}

export default async function TnAdvanceLessonPage({ params, searchParams }: PageProps) {
  const { track, day } = await params;
  const { lessonId } = await searchParams;
  if (!isAdvanceTrack(track)) notFound();

  const lesson = lessonId
    ? getTnAdvanceLessonById(lessonId)
    : getTnAdvanceLesson(track, Number(day));
  if (!lesson) notFound();

  const trackLessons = getTnAdvanceLessonsByTrack(track);
  const idx = trackLessons.findIndex((l) => l.day === lesson.day);
  const prev = idx > 0 ? trackLessons[idx - 1] : null;
  const next = idx < trackLessons.length - 1 ? trackLessons[idx + 1] : null;
  const base = `/tn-advance/class/${track}`;

  return (
    <ModuleLessonClient
      lesson={lesson}
      backHref={`/tn-advance/class/${track}`}
      backLabel={`Back to ${track.charAt(0).toUpperCase() + track.slice(1)}`}
      prevHref={prev ? `${base}/${prev.day}` : undefined}
      prevLabel={prev ? `Day ${prev.day}` : undefined}
      prevTitle={prev?.title}
      nextHref={next ? `${base}/${next.day}` : undefined}
      nextLabel={next ? `Day ${next.day}` : undefined}
      nextTitle={next?.title}
    />
  );
}
