import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpenText, Mic2, PenLine, FileEdit, ArrowLeft } from 'lucide-react';
import { getTnAdvanceLessonsByTrack, tnAdvanceTracks } from '@/data/tnAdvanceModules';
import LessonDayCard from '@/components/LessonDayCard';
import LessonDayGroupCard from '@/components/LessonDayGroupCard';
import type { ModuleLesson } from '@/types/module';

interface PageProps {
  params: Promise<{ track: string }>;
}

const ADVANCE_TRACKS = ['reading', 'speaking', 'grammar', 'writing'] as const;
type AdvanceTrack = typeof ADVANCE_TRACKS[number];
const isAdvanceTrack = (v: string): v is AdvanceTrack => (ADVANCE_TRACKS as readonly string[]).includes(v);

const trackIcons = {
  reading: BookOpenText,
  speaking: Mic2,
  grammar: PenLine,
  writing: FileEdit,
} as const;

export async function generateStaticParams() {
  return tnAdvanceTracks.map((t) => ({ track: t.track }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { track } = await params;
  if (!isAdvanceTrack(track)) return { title: 'TN Advance' };
  const info = tnAdvanceTracks.find((t) => t.track === track);
  return {
    title: `${info?.title ?? track} | TN Advance`,
    description: info?.description,
  };
}

export default async function TnAdvanceTrackPage({ params }: PageProps) {
  const { track } = await params;
  if (!isAdvanceTrack(track)) notFound();

  const trackInfo = tnAdvanceTracks.find((t) => t.track === track);
  if (!trackInfo) notFound();

  const lessons = getTnAdvanceLessonsByTrack(track);
  const Icon = trackIcons[track];

  // Group by day so same-day lessons appear as one card
  const dayMap: Record<number, ModuleLesson[]> = {};
  for (const l of lessons) {
    if (!dayMap[l.day]) dayMap[l.day] = [];
    dayMap[l.day].push(l);
  }
  const dayGroups = Object.keys(dayMap).map(Number).sort((a, b) => a - b).map((d) => ({ day: d, group: dayMap[d] }));

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Back */}
      <Link
        href="/tn-advance"
        className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-(--text) transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        TN Advance
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
      {dayGroups.length === 0 ? (
        <div className="text-center py-16 text-(--text-muted)">
          <p className="text-sm">Materi segera hadir.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {dayGroups.map(({ day, group }) =>
            group.length === 1 ? (
              <LessonDayCard
                key={group[0].id}
                lesson={group[0]}
                href={`/tn-advance/class/${track}/${day}`}
              />
            ) : (
              <LessonDayGroupCard
                key={`day-${day}`}
                day={day}
                lessons={group}
                baseHref={`/tn-advance/class/${track}`}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
