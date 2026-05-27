'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, Volume2, Play, Pause, RotateCcw,
  ChevronRight, ChevronLeft, Trophy, Headphones, AlertCircle, Loader2, CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Pagination } from '@/components/ui/Pagination';
import { parseListeningTest, isCorrect, type ParsedTest, type ParsedPart } from './parser';

const TOTAL_TESTS = 300;
const PER_PAGE = 30;

// ── Helpers ────────────────────────────────────────────────────────────────────

function fmtTime(s: number) {
  return `${Math.floor(s / 60).toString().padStart(2, '0')}:${Math.floor(s % 60).toString().padStart(2, '00')}`;
}

function bandFromScore(n: number): string {
  if (n >= 39) return '9.0';
  if (n >= 37) return '8.5';
  if (n >= 35) return '8.0';
  if (n >= 32) return '7.5';
  if (n >= 30) return '7.0';
  if (n >= 26) return '6.5';
  if (n >= 23) return '6.0';
  if (n >= 18) return '5.5';
  if (n >= 16) return '5.0';
  if (n >= 13) return '4.5';
  if (n >= 10) return '4.0';
  return '3.5';
}

// ── Audio Player ───────────────────────────────────────────────────────────────

function AudioPlayer({ src }: { src: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => { if (ref.current) ref.current.playbackRate = rate; }, [rate]);
  useEffect(() => { setPlaying(false); setCurrent(0); setDuration(0); setError(false); }, [src]);

  const toggle = () => {
    const a = ref.current; if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().catch(() => setError(true)); setPlaying(true); }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = ref.current; if (!a || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - r.left) / r.width) * duration;
  };

  if (error) return (
    <p className="text-xs text-(--text-muted) py-1">Audio tidak bisa diputar — pastikan URL atau file sudah benar.</p>
  );

  return (
    <div className="space-y-2">
      <audio ref={ref} src={src}
        onTimeUpdate={() => setCurrent(ref.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(ref.current?.duration ?? 0)}
        onEnded={() => setPlaying(false)}
        onError={() => setError(true)}
      />
      <div className="h-2.5 bg-(--bg-secondary) border border-(--border) rounded-full cursor-pointer overflow-hidden" onClick={seek}>
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${duration ? (current / duration) * 100 : 0}%` }} />
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-(--text-muted) tabular-nums w-10">{fmtTime(current)}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => { const a = ref.current; if (a) a.currentTime = Math.max(0, a.currentTime - 10); }}
            className="p-1.5 rounded-lg hover:bg-(--bg-secondary) text-(--text-secondary)" title="Rewind 10s">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button onClick={toggle}
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90">
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <select value={rate} onChange={e => setRate(parseFloat(e.target.value))}
            className="text-xs bg-(--bg-card) border border-(--border) rounded-lg px-1.5 py-1 text-(--text-secondary) focus:outline-none">
            {[0.75, 0.9, 1, 1.1, 1.25].map(r => <option key={r} value={r}>{r}×</option>)}
          </select>
        </div>
        <span className="text-xs text-(--text-muted) tabular-nums w-10 text-right">{fmtTime(duration)}</span>
      </div>
    </div>
  );
}

// ── Answer Input Grid ──────────────────────────────────────────────────────────

function AnswerGrid({ range, answers, onChange, submitted, answerKey }: {
  range: [number, number];
  answers: Record<number, string>;
  onChange: (n: number, v: string) => void;
  submitted: boolean;
  answerKey: Record<number, string>;
}) {
  const nums = Array.from({ length: range[1] - range[0] + 1 }, (_, i) => range[0] + i);
  return (
    <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4">
      <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wide mb-3">
        Jawaban Kamu — Q{range[0]} s/d Q{range[1]}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {nums.map(n => {
          const ok = submitted ? isCorrect(n, answers[n] ?? '', answerKey) : null;
          const correctAns = answerKey[n] || '';
          return (
            <div key={n} className="flex items-center gap-2">
              <span className={cn('text-xs font-bold w-7 shrink-0', submitted ? (ok ? 'text-primary' : 'text-(--text-muted)') : 'text-primary')}>
                {n}.
              </span>
              <input
                type="text"
                value={answers[n] ?? ''}
                onChange={e => !submitted && onChange(n, e.target.value)}
                readOnly={submitted}
                placeholder="jawaban..."
                className={cn(
                  'flex-1 px-2 py-1.5 text-sm rounded-lg border bg-(--bg-secondary) outline-none transition-colors',
                  submitted
                    ? ok
                      ? 'border-primary/40 text-primary font-semibold bg-primary/5'
                      : 'border-(--border) text-(--text-muted) line-through'
                    : 'border-(--border) focus:border-primary text-(--text)',
                )}
              />
              {submitted && !ok && correctAns && (
                <span className="text-xs font-bold text-primary shrink-0 max-w-[80px] truncate" title={correctAns}>
                  → {correctAns}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Score Summary ──────────────────────────────────────────────────────────────

function ScoreSummary({ answers, answerKey, parts }: {
  answers: Record<number, string>;
  answerKey: Record<number, string>;
  parts: ParsedPart[];
}) {
  const partScores = parts.map(p => {
    let correct = 0;
    for (let q = p.range[0]; q <= p.range[1]; q++) {
      if (isCorrect(q, answers[q] ?? '', answerKey)) correct++;
    }
    return { label: `Part ${p.number}`, correct, total: p.range[1] - p.range[0] + 1 };
  });
  const total = partScores.reduce((s, p) => s + p.correct, 0);
  const totalQ = partScores.reduce((s, p) => s + p.total, 0);

  return (
    <div className="bg-(--bg-secondary) border border-(--border) rounded-2xl overflow-hidden">
      <div className="bg-primary/5 border-b border-primary/20 px-5 py-4 flex items-center gap-3">
        <Trophy className="w-5 h-5 text-primary shrink-0" />
        <div>
          <p className="font-bold text-(--text)">Hasil Test</p>
          <p className="text-xs text-(--text-muted)">Estimated Band: <span className="font-bold text-primary">{bandFromScore(total)}</span></p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-2xl font-extrabold text-primary">
            {total}<span className="text-base font-semibold text-(--text-muted)">/{totalQ}</span>
          </p>
        </div>
      </div>
      <div className="grid divide-x divide-(--border)" style={{ gridTemplateColumns: `repeat(${partScores.length}, 1fr)` }}>
        {partScores.map(ps => (
          <div key={ps.label} className="px-3 py-3 text-center">
            <p className="text-[10px] text-(--text-muted) font-semibold uppercase">{ps.label}</p>
            <p className="text-lg font-bold text-(--text) mt-0.5">{ps.correct}<span className="text-xs text-(--text-muted)">/{ps.total}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function IeltsListeningPage() {
  const [view, setView] = useState<'list' | 'test'>('list');
  const [listPage, setListPage] = useState(1);
  const [testNumber, setTestNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [parsedTest, setParsedTest] = useState<ParsedTest | null>(null);
  const [currentPart, setCurrentPart] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [audioInput, setAudioInput] = useState('');
  const [showAudioInput, setShowAudioInput] = useState(false);

  const totalPages = Math.ceil(TOTAL_TESTS / PER_PAGE);

  const handleSelect = async (n: number) => {
    setTestNumber(n);
    setView('test');
    setLoading(true);
    setError('');
    setParsedTest(null);
    setAnswers({});
    setSubmitted(false);
    setCurrentPart(0);
    setAudioUrl('');
    setShowAudioInput(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const res = await fetch(`/api/practicepte?n=${n}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setParsedTest(parseListeningTest(data.html as string));
    } catch (e) {
      setError((e as Error).message || 'Gagal memuat test');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAudio = () => {
    const url = audioInput.trim();
    if (!url) return;
    setAudioUrl(url);
    setShowAudioInput(false);
    setAudioInput('');
  };

  const onChange = (n: number, v: string) => setAnswers(prev => ({ ...prev, [n]: v }));

  // ── List View ────────────────────────────────────────────────────────
  if (view === 'list') {
    const start = (listPage - 1) * PER_PAGE;
    const visible = Array.from({ length: Math.min(PER_PAGE, TOTAL_TESTS - start) }, (_, i) => start + i + 1);

    return (
      <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
        <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Practice
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
            <Headphones className="w-6 h-6 text-primary" />
            IELTS Listening Practice
          </h1>
          <p className="text-sm text-(--text-secondary) mt-1">
            {TOTAL_TESTS} latihan listening · Pilih test yang ingin dikerjakan
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {visible.map(n => (
            <button
              key={n}
              onClick={() => handleSelect(n)}
              className="group border border-(--border) hover:border-primary/40 hover:bg-(--hover) rounded-xl p-4 text-left transition-colors"
            >
              <p className="text-xs text-primary font-semibold mb-1">Test</p>
              <p className="text-3xl font-extrabold text-(--text) group-hover:text-primary transition-colors leading-none">
                {n}
              </p>
              <p className="text-xs text-(--text-muted) mt-2">40 soal · 4 bagian</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs text-primary">
                Mulai <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            page={listPage}
            totalPages={totalPages}
            onChange={p => { setListPage(p); window.scrollTo({ top: 0 }); }}
            maxVisible={totalPages}
            className="mt-2"
          />
        )}
      </div>
    );
  }

  // ── Test View ────────────────────────────────────────────────────────
  const part = parsedTest?.parts[currentPart];

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setView('list')}
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Semua Test
        </button>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
          Test {testNumber}
        </span>
      </div>

      <div>
        <h1 className="text-xl font-bold text-(--text)">
          {parsedTest?.title || `IELTS Listening Test ${testNumber}`}
        </h1>
        <p className="text-sm text-(--text-secondary) mt-0.5">
          40 soal · 4 bagian · practicepteonline.com
        </p>
      </div>

      {/* Score */}
      {submitted && parsedTest && (
        <ScoreSummary answers={answers} answerKey={parsedTest.answerKey} parts={parsedTest.parts} />
      )}

      {/* Part tabs */}
      {parsedTest && (
        <div className="flex gap-1.5 flex-wrap items-center">
          {parsedTest.parts.map((p, i) => {
            let correctCount = 0;
            if (submitted) {
              for (let q = p.range[0]; q <= p.range[1]; q++) {
                if (isCorrect(q, answers[q] ?? '', parsedTest.answerKey)) correctCount++;
              }
            }
            const total = p.range[1] - p.range[0] + 1;
            return (
              <button
                key={i}
                onClick={() => setCurrentPart(i)}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all',
                  currentPart === i
                    ? 'bg-primary text-white border-primary'
                    : 'bg-(--bg-card) border-(--border) text-(--text-secondary) hover:border-primary/40',
                )}
              >
                Part {p.number}
                {submitted && <span className="ml-1.5 opacity-70">{correctCount}/{total}</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Audio section */}
      <div className="border border-(--border) rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-(--border) bg-(--bg-secondary)">
          <Volume2 className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm font-semibold text-(--text)">Audio Part {(part?.number ?? 1)}</span>
          {audioUrl && (
            <button
              onClick={() => { setAudioUrl(''); setShowAudioInput(true); }}
              className="ml-auto text-xs text-(--text-muted) hover:text-primary"
            >
              Ganti
            </button>
          )}
        </div>
        <div className="px-4 py-4">
          {audioUrl ? (
            <AudioPlayer src={audioUrl} />
          ) : showAudioInput ? (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={audioInput}
                  onChange={e => setAudioInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddAudio()}
                  placeholder="Paste URL audio (.mp3, .ogg, ...)"
                  autoFocus
                  className="flex-1 px-3 py-2 text-sm rounded-xl border border-(--border) bg-(--bg-card) text-(--text) focus:outline-none focus:border-primary"
                />
                <button onClick={handleAddAudio} className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90">Add</button>
                <button onClick={() => setShowAudioInput(false)} className="px-3 py-2 rounded-xl border border-(--border) text-(--text-secondary) text-sm hover:bg-(--bg-secondary)">Cancel</button>
              </div>
              <p className="text-xs text-(--text-muted)">Download audio dari practicepteonline.com lalu paste URL-nya di sini.</p>
            </div>
          ) : (
            <button onClick={() => setShowAudioInput(true)} className="text-sm text-primary hover:underline font-medium">
              + Tambah URL audio untuk Part {part?.number ?? 1}
            </button>
          )}
        </div>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-(--text-secondary)">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-sm">Memuat soal...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4">
          <AlertCircle className="w-5 h-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium text-(--text)">Gagal memuat test</p>
            <p className="text-xs text-(--text-secondary)">{error}</p>
          </div>
          <button onClick={() => handleSelect(testNumber)} className="ml-auto text-xs text-primary underline">
            Coba Lagi
          </button>
        </div>
      )}

      {/* Questions */}
      {part && !loading && (
        <>
          {/* Part label */}
          <div className="rounded-xl border border-(--border) bg-(--bg-card) px-4 py-3">
            <p className="text-xs font-bold text-primary uppercase tracking-wide">{part.label}</p>
          </div>

          {/* Scraped question HTML */}
          {part.html && (
            <div
              className="bg-(--bg-secondary) border border-(--border) rounded-xl p-4 text-sm text-(--text) leading-relaxed overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-(--border) [&_td]:px-2 [&_td]:py-1.5 [&_th]:border [&_th]:border-(--border) [&_th]:px-2 [&_th]:py-1.5 [&_th]:bg-primary/5 [&_th]:font-bold [&_strong]:font-bold [&_strong]:text-(--text) [&_p]:mb-2"
              dangerouslySetInnerHTML={{ __html: part.html }}
            />
          )}

          {/* Answer inputs */}
          <AnswerGrid
            range={part.range}
            answers={answers}
            onChange={onChange}
            submitted={submitted}
            answerKey={parsedTest!.answerKey}
          />
        </>
      )}

      {/* Navigation */}
      {parsedTest && !loading && (
        <div className="flex items-center justify-between pt-2 border-t border-(--border)">
          <button
            onClick={() => setCurrentPart(p => Math.max(0, p - 1))}
            disabled={currentPart === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-(--border) text-(--text-secondary) hover:bg-(--bg-secondary) disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>

          {currentPart < parsedTest.parts.length - 1 ? (
            <button
              onClick={() => setCurrentPart(p => p + 1)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:opacity-90 transition-opacity"
            >
              Part {parsedTest.parts[currentPart + 1].number} <ChevronRight className="w-4 h-4" />
            </button>
          ) : !submitted ? (
            <button
              onClick={() => { setSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:opacity-90 transition-opacity"
            >
              <CheckCircle2 className="w-4 h-4" /> Submit Jawaban
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-sm text-primary font-semibold">
              <CheckCircle2 className="w-4 h-4" /> Test selesai
            </div>
          )}
        </div>
      )}
    </div>
  );
}
