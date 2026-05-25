'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Play, Pause, Volume2, RotateCcw,
  Radio, ChevronDown, ChevronUp, ExternalLink,
  RefreshCw, AlertCircle, Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BBCEpisode } from '@/app/api/bbc-listening/route';

// ── Types ─────────────────────────────────────────────────────────────

interface FeedData {
  source: string;
  accent: string;
  level: string;
  episodes: BBCEpisode[];
}

// ── Helpers ───────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function formatDuration(dur: string): string {
  if (!dur) return '';
  if (/^\d+$/.test(dur)) {
    const s = parseInt(dur);
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  }
  return dur;
}

function formatAudioTime(s: number): string {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

// ── Audio Player Component ─────────────────────────────────────────────

function AudioPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = rate;
  }, [rate]);

  useEffect(() => {
    setPlaying(false);
    setCurrent(0);
    setDuration(0);
  }, [src]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play(); setPlaying(true); }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const replay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  };

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div className="bg-(--bg-secondary) rounded-xl p-4 space-y-3">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={() => setCurrent(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => setPlaying(false)}
      />

      <p className="text-xs font-semibold text-(--text) line-clamp-1">{title}</p>

      {/* Progress bar */}
      <div
        className="h-2 bg-(--bg-card) border border-(--border) rounded-full cursor-pointer overflow-hidden"
        onClick={seek}
      >
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-(--text-muted) tabular-nums">{formatAudioTime(current)}</span>

        <div className="flex items-center gap-2">
          {/* Replay 10s */}
          <button onClick={replay} className="p-1.5 rounded-lg hover:bg-(--bg-card) text-(--text-secondary) transition-colors" title="Putar ulang 10 detik">
            <RotateCcw className="w-4 h-4" />
          </button>
          {/* Play/Pause */}
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          {/* Speed */}
          <select
            value={rate}
            onChange={e => setRate(parseFloat(e.target.value))}
            className="text-xs bg-(--bg-card) border border-(--border) rounded-lg px-1.5 py-1 text-(--text-secondary) focus:outline-none"
          >
            {[0.75, 0.9, 1, 1.1, 1.25].map(r => (
              <option key={r} value={r}>{r}×</option>
            ))}
          </select>
        </div>

        <span className="text-xs text-(--text-muted) tabular-nums">{formatAudioTime(duration)}</span>
      </div>
    </div>
  );
}

// ── Episode Card ───────────────────────────────────────────────────────

function EpisodeCard({
  ep, isSelected, onSelect,
}: {
  ep: BBCEpisode;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div className={cn(
      'bg-(--bg-card) border rounded-xl overflow-hidden transition-all',
      isSelected ? 'border-primary/50' : 'border-(--border)',
    )}>
      <button
        onClick={onSelect}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-(--bg-secondary) transition-colors"
      >
        {ep.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={ep.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
        )}
        {!ep.imageUrl && (
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Volume2 className="w-5 h-5 text-primary" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-(--text) line-clamp-2 leading-snug">{ep.title}</p>
          <div className="flex items-center gap-3 mt-1">
            {ep.pubDate && (
              <span className="text-[10px] text-(--text-muted)">{formatDate(ep.pubDate)}</span>
            )}
            {ep.duration && (
              <span className="text-[10px] text-(--text-muted) flex items-center gap-0.5">
                <Clock className="w-3 h-3" />{formatDuration(ep.duration)}
              </span>
            )}
          </div>
        </div>
        {isSelected && (
          <span className="shrink-0 w-2 h-2 rounded-full bg-primary mt-1.5" />
        )}
      </button>

      {isSelected && (
        <div className="px-4 pb-4 space-y-3 border-t border-(--border) pt-3">
          {/* Player */}
          <AudioPlayer src={ep.audioUrl} title={ep.title} />

          {/* Description toggle */}
          {ep.description && (
            <div>
              <button
                onClick={() => setShowDesc(v => !v)}
                className="text-xs text-primary flex items-center gap-1 hover:underline"
              >
                {showDesc ? 'Sembunyikan deskripsi' : 'Lihat deskripsi episode'}
                {showDesc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {showDesc && (
                <p className="mt-2 text-sm text-(--text-secondary) leading-relaxed">{ep.description}</p>
              )}
            </div>
          )}

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-muted) uppercase tracking-wide">Catatan</label>
            <textarea
              rows={3}
              placeholder="Tulis kata baru yang kamu dengar, topik utama, atau hal yang menarik..."
              className="w-full px-3 py-2 rounded-xl border border-(--border) bg-(--bg-card) text-(--text) text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {ep.pageUrl && (
            <a
              href={ep.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              <ExternalLink className="w-3 h-3" /> Buka di BBC Learning English
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────

const SOURCES = [
  { label: 'BBC 6 Min English', idx: 0 },
  { label: 'BBC English We Speak', idx: 1 },
];

export default function GeneralListeningPage() {
  const [sourceIdx, setSourceIdx] = useState(0);
  const [data, setData] = useState<FeedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const load = async (idx: number) => {
    setLoading(true);
    setError('');
    setData(null);
    setSelected(null);
    try {
      const res = await fetch(`/api/bbc-listening?source=${idx}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Gagal memuat.');
      setData(json as FeedData);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Tidak bisa memuat episode.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(sourceIdx); }, [sourceIdx]);

  return (
    <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-5 animate-fade-in">
      <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Practice
      </Link>

      <div>
        <h1 className="text-xl font-bold text-(--text) flex items-center gap-2">
          <Radio className="w-5 h-5 text-primary" /> General Listening
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          Latihan mendengarkan native British accent dari BBC Learning English — gratis, otentik, tanpa AI.
        </p>
      </div>

      {/* Source tabs */}
      <div className="flex gap-2">
        {SOURCES.map(s => (
          <button
            key={s.idx}
            onClick={() => setSourceIdx(s.idx)}
            className={cn(
              'px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all',
              sourceIdx === s.idx
                ? 'bg-primary text-white border-primary'
                : 'bg-(--bg-card) border-(--border) text-(--text-secondary) hover:border-primary/40'
            )}
          >
            {s.label}
          </button>
        ))}
        <button
          onClick={() => load(sourceIdx)}
          disabled={loading}
          className="ml-auto px-3 py-2 rounded-xl text-xs font-semibold border border-(--border) text-(--text-secondary) hover:bg-(--bg-secondary) flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className={cn('w-3.5 h-3.5', loading && 'animate-spin')} />
          Refresh
        </button>
      </div>

      {/* Meta info */}
      {data && (
        <div className="flex items-center gap-3 text-xs text-(--text-muted)">
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">
            {data.accent} Accent
          </span>
          <span className="px-2 py-0.5 rounded-full bg-(--bg-secondary) border border-(--border) font-semibold">
            Level {data.level}
          </span>
          <span>{data.episodes.length} episode terbaru</span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12 gap-2 text-(--text-muted)">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="text-sm">Memuat episode...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-primary bg-primary/5 border border-primary/20 rounded-xl p-4">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <div>
            <p className="font-semibold">Gagal memuat podcast</p>
            <p className="text-xs text-(--text-muted) mt-0.5">{error}</p>
            <p className="text-xs text-(--text-muted) mt-1">
              Cek koneksi internet. BBC mungkin memblokir request langsung — coba lagi.
            </p>
          </div>
        </div>
      )}

      {/* Episode list */}
      {data && !loading && (
        <div className="space-y-3">
          {data.episodes.length === 0 && (
            <p className="text-sm text-(--text-muted) text-center py-8">Tidak ada episode ditemukan.</p>
          )}
          {data.episodes.map((ep, i) => (
            <EpisodeCard
              key={i}
              ep={ep}
              isSelected={selected === ep.audioUrl}
              onSelect={() => setSelected(prev => prev === ep.audioUrl ? null : ep.audioUrl)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
