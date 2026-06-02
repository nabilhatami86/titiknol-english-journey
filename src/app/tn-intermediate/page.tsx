import { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpenText, Mic2, PenLine, Headphones,
  ArrowRight, GraduationCap,
} from 'lucide-react';
import { getTnIntermediateLessonsByTrack, tnIntermediateTracks } from '@/data/tnIntermediateModules';

export const metadata: Metadata = {
  title: 'TN Intermediate',
  description: 'Materi Intermediate: Reading, Speaking, Grammar (5 Tenses + Adjective Clause + Gerund), dan Listening.',
};

const trackIcons = {
  reading:   BookOpenText,
  speaking:  Mic2,
  grammar:   PenLine,
  listening: Headphones,
  writing:   PenLine,
} as const;

const trackColors = {
  reading:   'from-primary/20/10  to-primary/5/5   border-primary/40   text-primary',
  speaking:  'from-primary/20/10 to-primary/5/5  border-primary/40  text-primary',
  grammar:   'from-primary/20/10 to-primary/5/5 border-primary/30/40 text-primary',
  listening: 'from-primary/20/10 to-primary/5/5  border-primary/30/40  text-primary',
  writing:   'from-primary/20/10  to-primary/5/5   border-primary/30/40   text-primary',
} as const;

export default function TNIntermediatePage() {
  return (
    <div className="p-4 lg:p-6 space-y-10 animate-fade-in">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-primary" />
          TN Intermediate
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          Materi lengkap level Intermediate: Reading, Speaking, Grammar, dan Listening — disertai latihan dan post test.
        </p>
      </div>

      {/* ── Course Tracks ───────────────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 gap-4">
        {tnIntermediateTracks.map((trackInfo) => {
          const lessons = getTnIntermediateLessonsByTrack(trackInfo.track);
          const Icon = trackIcons[trackInfo.track];
          const colors = trackColors[trackInfo.track];

          return (
            <Link
              key={trackInfo.track}
              href={`/tn-intermediate/class/${trackInfo.track}`}
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
                    {lessons.length} materi tersedia
                  </p>
                </div>
              </div>
              <p className="text-sm text-(--text-secondary) leading-relaxed line-clamp-2">
                {trackInfo.description}
              </p>
              <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all mt-auto">
                Lihat Materi <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
