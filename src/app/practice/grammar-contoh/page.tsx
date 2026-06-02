'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Send, CheckCircle2, XCircle, AlertCircle,
  Lightbulb, BookOpen, RotateCcw, ChevronDown, ChevronUp, Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { basicGrammarLessons } from '@/data/grammar/tnBasicGrammar';
import { intermediateGrammarLessons } from '@/data/grammar/tnIntermediateGrammar';
import { advanceGrammarLessons } from '@/data/grammar/tnAdvanceGrammar';
import type { ModuleLesson } from '@/types/module';

// ── Types ──────────────────────────────────────────────────────────────────

type Level = 'basic' | 'intermediate' | 'advance';

interface FeedbackResult {
  isCorrect: boolean;
  verdict: 'Benar' | 'Hampir Benar' | 'Salah';
  score: number;
  topicUsed: boolean;
  feedback: string;
  correctedSentence: string;
  grammarBreakdown: { word: string; role: string; note: string }[];
  topicExplanation: string;
  improvement: string;
  moreExamples: string[];
}

// ── Config ─────────────────────────────────────────────────────────────────

const levelConfig: Record<Level, { label: string; color: string; badge: string; border: string; lessons: ModuleLesson[] }> = {
  basic: {
    label: 'Basic',
    color: 'text-primary dark:text-primary',
    badge: 'bg-primary/10 text-primary dark:bg-primary/10 dark:text-primary',
    border: 'border-primary/30 dark:border-primary/30',
    lessons: basicGrammarLessons,
  },
  intermediate: {
    label: 'Intermediate',
    color: 'text-primary dark:text-primary',
    badge: 'bg-primary/10 text-primary dark:bg-primary/10 dark:text-primary',
    border: 'border-primary/30 dark:border-primary/30',
    lessons: intermediateGrammarLessons,
  },
  advance: {
    label: 'Advance',
    color: 'text-primary dark:text-primary',
    badge: 'bg-primary/10 text-primary dark:bg-primary/10 dark:text-primary',
    border: 'border-primary/30 dark:border-primary/30',
    lessons: advanceGrammarLessons,
  },
};

function getSubtopics(lesson: ModuleLesson): string[] {
  const out: string[] = [];
  for (const sec of lesson.materialSections) {
    const t = sec.title.trim();
    if (!t || t.toLowerCase().includes('vocabulary') || t.toLowerCase().includes('vocab')) continue;
    out.push(t);
  }
  return out.slice(0, 8);
}

// ── Score colour ───────────────────────────────────────────────────────────
function scoreColor(s: number) {
  if (s >= 80) return 'text-primary dark:text-primary';
  if (s >= 60) return 'text-primary dark:text-primary';
  return 'text-primary dark:text-primary';
}

// ── Main ───────────────────────────────────────────────────────────────────

export default function GrammarContohPage() {
  const [level, setLevel] = useState<Level | null>(null);
  const [lesson, setLesson] = useState<ModuleLesson | null>(null);
  const [subtopic, setSubtopic] = useState('');
  const [sentence, setSentence] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FeedbackResult | null>(null);
  const [error, setError] = useState('');
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [history, setHistory] = useState<{ sentence: string; result: FeedbackResult }[]>([]);

  const cfg = level ? levelConfig[level] : null;
  const subtopics = lesson ? getSubtopics(lesson) : [];

  const handleSubmit = async () => {
    if (!sentence.trim() || !lesson || !subtopic) return;
    setLoading(true);
    setResult(null);
    setError('');
    setShowBreakdown(false);

    try {
      const res = await fetch('/api/grammar-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: sentence.trim(), topic: lesson.title, subtopic }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message ?? 'Terjadi kesalahan.'); return; }
      setResult(data as FeedbackResult);
      setHistory((prev) => [{ sentence: sentence.trim(), result: data }, ...prev.slice(0, 4)]);
    } catch {
      setError('Tidak bisa terhubung ke server. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSentence('');
    setResult(null);
    setError('');
    setShowBreakdown(false);
  };

  // ── LEVEL SELECTOR ────────────────────────────────────────────────────────
  if (!level) {
    return (
      <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-6 animate-fade-in">
        <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Practice
        </Link>
        <div>
          <h1 className="text-xl font-bold text-(--text) flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Practice: Buat Contoh Kalimat
          </h1>
          <p className="text-sm text-(--text-secondary) mt-1">
            Pilih level, topik grammar, lalu buat kalimat contoh — AI akan langsung me-review dan memberi feedback.
          </p>
        </div>
        <div className="grid gap-4">
          {(Object.entries(levelConfig) as [Level, typeof levelConfig[Level]][]).map(([key, c]) => (
            <button key={key} onClick={() => setLevel(key)}
              className={cn('text-left bg-(--bg-card) border-2 rounded-2xl p-5 hover:shadow-md transition-all group', c.border)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', c.badge)}>{c.label}</span>
                  <h2 className={cn('text-xl font-bold mt-2', c.color)}>Grammar {c.label}</h2>
                  <p className="text-sm text-(--text-secondary) mt-0.5">{c.lessons.length} lesson tersedia</p>
                </div>
                <span className={cn('text-5xl font-black opacity-20 group-hover:opacity-40 transition-opacity', c.color)}>
                  {key === 'basic' ? 'B' : key === 'intermediate' ? 'I' : 'A'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── LESSON SELECTOR ───────────────────────────────────────────────────────
  if (!lesson) {
    return (
      <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-6 animate-fade-in">
        <button onClick={() => setLevel(null)} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Ganti Level
        </button>
        <div>
          <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', cfg!.badge)}>{cfg!.label}</span>
          <h1 className="text-xl font-bold text-(--text) mt-2">Pilih Materi Grammar</h1>
        </div>
        <div className="space-y-2">
          {cfg!.lessons.map((l) => (
            <button key={l.id} onClick={() => { setLesson(l); setSubtopic(getSubtopics(l)[0] ?? l.title); }}
              className="w-full text-left bg-(--bg-card) border border-(--border) rounded-xl px-4 py-3.5 hover:border-primary/40 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold border', cfg!.border, cfg!.color)}>
                  {l.day}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-(--text) text-sm group-hover:text-primary transition-colors truncate">{l.title}</p>
                  {l.subtitle && <p className="text-xs text-(--text-muted) truncate mt-0.5">{l.subtitle}</p>}
                </div>
                <BookOpen className="w-4 h-4 text-(--text-muted) shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── PRACTICE VIEW ─────────────────────────────────────────────────────────
  return (
    <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => { setLesson(null); handleReset(); }} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Ganti Materi
        </button>
        <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', cfg!.badge)}>{cfg!.label}</span>
      </div>

      <div>
        <h1 className="text-xl font-bold text-(--text)">{lesson.title}</h1>
        {lesson.subtitle && <p className="text-xs text-(--text-muted) mt-0.5">{lesson.subtitle}</p>}
      </div>

      {/* Sub-topic picker */}
      <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4 space-y-2">
        <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wide">Pilih Sub-topik</p>
        <div className="flex flex-wrap gap-2">
          {subtopics.map((st) => (
            <button key={st} onClick={() => { setSubtopic(st); handleReset(); }}
              className={cn('text-xs px-3 py-1.5 rounded-lg border transition-all',
                subtopic === st
                  ? 'border-primary bg-primary/10 text-primary font-semibold'
                  : 'border-(--border) text-(--text-secondary) hover:border-primary/40',
              )}
            >
              {st}
            </button>
          ))}
          {subtopics.length === 0 && (
            <span className="text-xs text-(--text-muted)">Menggunakan judul lesson sebagai topik.</span>
          )}
        </div>
      </div>

      {/* Prompt card */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Tugas</p>
        <p className="text-sm text-(--text) font-medium">
          Buatlah <span className="text-primary font-bold">1 kalimat contoh</span> yang menggunakan:
        </p>
        <p className="text-base font-bold text-primary mt-1">"{subtopic || lesson.title}"</p>
        <p className="text-xs text-(--text-muted) mt-2">Tulis dalam Bahasa Inggris. Pastikan kalimatmu jelas menunjukkan penggunaan topik tersebut.</p>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <textarea
          value={sentence}
          onChange={(e) => { setSentence(e.target.value); setResult(null); setError(''); }}
          placeholder="Tulis kalimat contohmu di sini..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-(--border) bg-(--bg-card) text-(--text) text-sm resize-none focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-(--text-muted)"
        />
        <div className="flex items-center justify-between gap-3">
          {result && (
            <button onClick={handleReset} className="inline-flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-primary transition-colors">
              <RotateCcw className="w-4 h-4" /> Coba lagi
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading || !sentence.trim() || sentence.trim().split(/\s+/).length < 3}
            className={cn(
              'ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all',
              loading || !sentence.trim() || sentence.trim().split(/\s+/).length < 3
                ? 'bg-(--bg-secondary) text-(--text-muted) cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary-dark shadow-sm',
            )}
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Menilai...</>
            ) : (
              <><Send className="w-4 h-4" /> Review AI</>
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 bg-primary/10 dark:bg-primary/10 border border-primary/30 dark:border-primary/30 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-primary dark:text-primary">{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-3 animate-fade-in">
          {/* Verdict banner */}
          <div className={cn(
            'rounded-xl px-5 py-4 flex items-center gap-4 border',
            result.isCorrect
              ? 'bg-primary/10 dark:bg-primary/10 border-primary/30 dark:border-primary/30'
              : result.verdict === 'Hampir Benar'
              ? 'bg-primary/10 dark:bg-primary/10 border-primary/30 dark:border-primary/30'
              : 'bg-primary/10 dark:bg-primary/10 border-primary/30 dark:border-primary/30',
          )}>
            {result.isCorrect
              ? <CheckCircle2 className="w-8 h-8 text-primary shrink-0" />
              : result.verdict === 'Hampir Benar'
              ? <AlertCircle className="w-8 h-8 text-primary shrink-0" />
              : <XCircle className="w-8 h-8 text-primary shrink-0" />
            }
            <div className="flex-1">
              <p className={cn('text-lg font-bold', result.isCorrect ? 'text-primary dark:text-primary' : result.verdict === 'Hampir Benar' ? 'text-primary dark:text-primary' : 'text-primary dark:text-primary')}>
                {result.verdict}
              </p>
              <p className={cn('text-3xl font-black', scoreColor(result.score))}>{result.score}<span className="text-base font-semibold text-(--text-muted)">/100</span></p>
            </div>
            {!result.topicUsed && (
              <span className="text-xs bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary px-2 py-1 rounded-lg font-medium">
                Topik kurang terlihat
              </span>
            )}
          </div>

          {/* Feedback */}
          <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4 space-y-3">
            <p className="text-sm text-(--text) leading-relaxed">{result.feedback}</p>

            {result.correctedSentence && result.correctedSentence !== sentence.trim() && (
              <div className="bg-(--bg-secondary) rounded-lg px-4 py-3">
                <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wide mb-1">Koreksi</p>
                <p className="text-sm font-medium text-primary dark:text-primary">"{result.correctedSentence}"</p>
              </div>
            )}

            <div className="bg-(--bg-secondary) rounded-lg px-4 py-3">
              <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wide mb-1">Topik: {subtopic}</p>
              <p className="text-sm text-(--text-secondary) leading-relaxed">{result.topicExplanation}</p>
            </div>
          </div>

          {/* Grammar breakdown (collapsible) */}
          {result.grammarBreakdown?.length > 0 && (
            <div className="bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden">
              <button onClick={() => setShowBreakdown(!showBreakdown)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-(--hover) transition-colors"
              >
                <span className="text-sm font-semibold text-(--text) flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> Grammar Breakdown
                </span>
                {showBreakdown ? <ChevronUp className="w-4 h-4 text-(--text-muted)" /> : <ChevronDown className="w-4 h-4 text-(--text-muted)" />}
              </button>
              {showBreakdown && (
                <div className="border-t border-(--border) divide-y divide-(--border)">
                  {result.grammarBreakdown.map((item, i) => (
                    <div key={i} className="px-4 py-2.5 flex items-start gap-3">
                      <code className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded shrink-0">{item.word}</code>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-semibold text-(--text)">{item.role}</span>
                        <p className="text-xs text-(--text-muted) mt-0.5">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Improvement tip */}
          {result.improvement && (
            <div className="flex items-start gap-3 bg-primary/10 dark:bg-primary/10 border border-primary/30 dark:border-primary/30 rounded-xl px-4 py-3">
              <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-primary dark:text-primary leading-relaxed">{result.improvement}</p>
            </div>
          )}

          {/* More examples */}
          {result.moreExamples?.length > 0 && (
            <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4">
              <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wide mb-2">Contoh Lain yang Benar</p>
              <div className="space-y-1.5">
                {result.moreExamples.map((ex, i) => (
                  <p key={i} className="text-sm text-(--text-secondary) italic">"{ex}"</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* History */}
      {history.length > 1 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wide">Percobaan Sebelumnya</p>
          {history.slice(1).map((h, i) => (
            <div key={i} className="flex items-center gap-3 bg-(--bg-card) border border-(--border) rounded-lg px-4 py-2.5">
              {h.result.isCorrect
                ? <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                : h.result.verdict === 'Hampir Benar'
                ? <AlertCircle className="w-4 h-4 text-primary shrink-0" />
                : <XCircle className="w-4 h-4 text-primary shrink-0" />
              }
              <p className="text-sm text-(--text-secondary) flex-1 truncate italic">"{h.sentence}"</p>
              <span className={cn('text-sm font-bold shrink-0', scoreColor(h.result.score))}>{h.result.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
