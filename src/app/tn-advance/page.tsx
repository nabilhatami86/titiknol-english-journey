import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpenText, Mic2, PenLine, FileEdit, ArrowRight, Layers } from 'lucide-react';
import { getTnAdvanceLessonsByTrack, tnAdvanceTracks } from '@/data/tnAdvanceModules';

export const metadata: Metadata = {
  title: 'TN Advance',
  description: 'Materi Advance: Grammar, Speaking, Reading, dan Writing tingkat lanjut.',
};

const trackIcons = {
  reading: BookOpenText,
  speaking: Mic2,
  grammar: PenLine,
  writing: FileEdit,
} as const;

const trackColors = {
  reading:  'from-primary/20/10  to-primary/5/5   border-primary/40   text-primary',
  speaking: 'from-primary/20/10 to-primary/5/5  border-primary/40  text-primary',
  grammar:  'from-primary/20/10 to-primary/5/5 border-primary/30/40 text-primary',
  writing:  'from-primary/20/10 to-primary/5/5  border-primary/30/40  text-primary',
} as const;

export default function TnAdvancePage() {
  return (
    <div className="p-4 lg:p-6 space-y-10 animate-fade-in">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
          <Layers className="w-6 h-6 text-primary" />
          TN Advance
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          Materi lengkap level Advance: Grammar, Speaking, Reading, dan Writing — disertai latihan dan contoh.
        </p>
      </div>

      {/* Course Tracks */}
      <div className="grid sm:grid-cols-2 gap-4">
        {tnAdvanceTracks.map((trackInfo) => {
          const lessons = getTnAdvanceLessonsByTrack(trackInfo.track);
          const Icon = trackIcons[trackInfo.track as keyof typeof trackIcons];
          const colors = trackColors[trackInfo.track as keyof typeof trackColors];

          return (
            <Link
              key={trackInfo.track}
              href={`/tn-advance/class/${trackInfo.track}`}
              className={`group bg-linear-to-br ${colors} border rounded-2xl p-5 hover:shadow-md transition-all flex flex-col gap-3`}
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/50 dark:bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-semibold text-(--text) group-hover:text-primary transition-colors">
                    {trackInfo.title}
                  </h2>
                  <p className="text-xs text-(--text-muted) mt-0.5">
                    {lessons.length > 0 ? `${lessons.length} materi tersedia` : 'Segera hadir'}
                  </p>
                </div>
              </div>
              <p className="text-sm text-(--text-secondary) leading-relaxed line-clamp-2">
                {trackInfo.description}
              </p>
              <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all mt-auto">
                {lessons.length > 0 ? 'Lihat Materi' : 'Coming Soon'} <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
