import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpenText, Mic2, PenLine, Headphones, ArrowLeft } from 'lucide-react';
import { getTnIntermediateLessonsByTrack, tnIntermediateTracks } from '@/data/tnIntermediateModules';
import type { ModuleTrack } from '@/types/module';
import LessonDayCard from '@/components/LessonDayCard';

interface PageProps {
  params: Promise<{ track: string }>;
}

const isTrack = (value: string): value is ModuleTrack =>
  ['reading', 'speaking', 'grammar', 'listening'].includes(value);

const trackIcons = {
  reading: BookOpenText,
  speaking: Mic2,
  grammar: PenLine,
  listening: Headphones,
} as const;

export async function generateStaticParams() {
  return tnIntermediateTracks.map((t) => ({ track: t.track }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { track } = await params;
  if (!isTrack(track)) return { title: 'TN Intermediate' };
  const info = tnIntermediateTracks.find((t) => t.track === track);
  return {
    title: `${info?.title ?? track} | TN Intermediate`,
    description: info?.description,
  };
}

export default async function TrackPage({ params }: PageProps) {
  const { track } = await params;
  if (!isTrack(track)) notFound();

  const trackInfo = tnIntermediateTracks.find((t) => t.track === track);
  if (!trackInfo) notFound();

  const lessons = getTnIntermediateLessonsByTrack(track);
  const Icon = trackIcons[track];

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Back */}
      <Link
        href="/tn-intermediate"
        className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-(--text) transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        TN Intermediate
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
          <Icon className="w-6 h-6 text-primary" />
          {trackInfo.title}
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">{trackInfo.description}</p>
      </div>

      {/* Day Cards */}
      {lessons.length === 0 ? (
        <p className="text-sm text-(--text-muted)">Belum ada materi untuk track ini.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {lessons.map((lesson) => (
            <LessonDayCard
              key={lesson.id}
              lesson={lesson}
              href={`/tn-intermediate/class/${lesson.track}/${lesson.day}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
