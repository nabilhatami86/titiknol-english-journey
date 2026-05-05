import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpenText, Mic2, PenLine, Headphones,
  ArrowRight, ArrowLeft, BookMarked, Shuffle, ClipboardList,
} from 'lucide-react';
import LessonDayCard from '@/components/LessonDayCard';
import { getLessonsByTrack, moduleTracks } from '@/data/modules';
import type { ModuleTrack } from '@/types/module';

interface PageProps {
  params: Promise<{ track: string }>;
}

const isTrack = (value: string): value is ModuleTrack =>
  ['reading', 'speaking', 'grammar', 'listening'].includes(value);

const trackIcons = {
  reading:   BookOpenText,
  speaking:  Mic2,
  grammar:   PenLine,
  listening: Headphones,
} as const;

export async function generateStaticParams() {
  return moduleTracks.map((t) => ({ track: t.track }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { track } = await params;
  if (!isTrack(track)) return { title: 'TN Basic' };
  const info = moduleTracks.find((t) => t.track === track);
  return {
    title: `${info?.title ?? track} | TN Basic`,
    description: info?.description,
  };
}

export default async function BasicTrackPage({ params }: PageProps) {
  const { track } = await params;
  if (!isTrack(track)) notFound();

  const trackInfo = moduleTracks.find((t) => t.track === track);
  if (!trackInfo) notFound();

  const lessons = getLessonsByTrack(track);
  const Icon = trackIcons[track];
  const isReading = track === 'reading';
  const isGrammar = track === 'grammar';

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Back */}
      <Link
        href="/tn-basic-cource"
        className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-(--text) transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        TN Basic Cource
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
            <Icon className="w-6 h-6 text-primary" />
            {trackInfo.title}
          </h1>
          <p className="text-sm text-(--text-secondary) mt-1">{trackInfo.description}</p>
        </div>
        {trackInfo.pdfPath && (
          <a
            href={trackInfo.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-(--border) text-(--text-secondary) hover:bg-(--hover) shrink-0"
          >
            PDF
          </a>
        )}
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
              href={`/tn-basic-cource/${lesson.track}/${lesson.day}`}
              isMidTest={lesson.day === 10}
            />
          ))}
        </div>
      )}

      {/* Post Test Reading — hanya untuk track reading */}
      {isReading && (
        <Link
          href="/tn-basic-cource/post-test-reading"
          className="flex items-center gap-3 border border-emerald-400/50 bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-xl p-4 transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
            <BookMarked className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Post Test</p>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 font-semibold">25 Soal</span>
            </div>
            <p className="text-sm font-medium text-(--text) group-hover:text-emerald-600 transition-colors">
              Post Test — Reading
            </p>
            <p className="text-xs text-(--text-muted) mt-0.5">
              Part A: True/False/Not Given · Part B: Multiple Choice · Part C: Short Answer
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
        </Link>
      )}

      {/* Latihan Acak + Post Test Grammar — hanya untuk track grammar */}
      {isGrammar && (
        <div className="space-y-3">
          <Link
            href="/tn-basic-cource/latihan-post-test"
            className="flex items-center gap-3 border border-violet-400/50 bg-violet-50/40 dark:bg-violet-950/20 hover:bg-violet-50 dark:hover:bg-violet-950/30 rounded-xl p-4 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-violet-500/15 flex items-center justify-center shrink-0">
              <Shuffle className="w-5 h-5 text-violet-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-violet-600 uppercase tracking-wider">Latihan Acak</p>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/15 text-violet-600 font-semibold">45 bank soal</span>
              </div>
              <p className="text-sm font-medium text-(--text) group-hover:text-violet-600 transition-colors">
                Latihan Acak Post Test Grammar
              </p>
              <p className="text-xs text-(--text-muted) mt-0.5">
                20 soal acak tiap sesi · Langsung tau kenapa salah · Berbasis kisi-kisi post test
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-violet-500 shrink-0" />
          </Link>

          <Link
            href="/tn-basic-cource/kisi-kisi-post-test"
            className="flex items-center gap-3 border border-blue-400/50 bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl p-4 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/15 flex items-center justify-center shrink-0">
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Post Test</p>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-600 font-semibold">30 Soal</span>
              </div>
              <p className="text-sm font-medium text-(--text) group-hover:text-blue-600 transition-colors">
                Kisi-Kisi Grammar — Post Test
              </p>
              <p className="text-xs text-(--text-muted) mt-0.5">
                Part I: Correct Phrase · Part II: Conjunction &amp; Preposition · Part III: Translate to English
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-500 shrink-0" />
          </Link>
        </div>
      )}
    </div>
  );
}
