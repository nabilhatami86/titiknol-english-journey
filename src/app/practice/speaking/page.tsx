'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, PenLine, Sparkles, Loader2, AlertCircle,
  Trophy, History, X, Star, Target, Layers, BookOpen,
  CheckCircle2, Lightbulb, Clock, ChevronDown, ChevronUp,
  GitBranch, CircleDot, FileWarning, WifiOff, KeyRound, Gauge,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Correction {
  original: string;
  corrected: string;
  explanation: string;
}

interface SentenceItem {
  sentence: string;
  tense: {
    used: string;
    isCorrect: boolean;
    shouldBe: string;
    explanation: string;
  };
  voice: {
    type: string;
    isAppropriate: boolean;
    suggestion: string;
    converted: string | null;
  };
  structure: {
    sentenceType: string;
    clauses: {
      text: string;
      type: string;
      connector: string | null;
      subject: string;
      predicate: string;
      object: string | null;
      note: string;
    }[];
    phrases: {
      text: string;
      type: string;
      function: string;
    }[];
  };
  reduction: {
    possible: boolean;
    type: string;
    original: string;
    reduced: string;
    explanation: string;
  };
  wordClasses: {
    word: string;
    class: string;
    subclass: string;
    function: string;
  }[];
}

interface SynonymEntry {
  word: string;
  meaning: string;
  formality: string;
  typicalUsage: string;
  example: string;
}

interface WordEnhancement {
  wordUsed: string;
  wordClass: string;
  meaning: string;
  typicalUsage: string;
  synonyms: SynonymEntry[];
  bestAlternative: string;
  bestAlternativeReason: string;
}

interface WritingFeedback {
  grammar:    { score: number; feedback: string; corrections: Correction[] };
  sentenceAnalysis: { summary: string; sentences: SentenceItem[] };
  vocabulary: { score: number; feedback: string; suggestions: string[]; wordEnhancements: WordEnhancement[] };
  coherence:  { score: number; feedback: string };
  style:      { score: number; feedback: string };
  adverbialClause?: AdverbialClauseAnalysis;
  level:      { estimated: string; feedback: string };
  overallScore: number;
  correctedVersion: string;
  rewriteSuggestion: string;
}

interface HistoryEntry {
  id: string;
  date: string;
  text: string;
  feedback: WritingFeedback;
}

interface AdverbialClauseItem {
  text: string;
  connector: string;
  clauseFunction: string;
  isCorrect: boolean;
  issue: string;
  tip: string;
}

interface AdverbialClauseAnalysis {
  found: boolean;
  count: number;
  summary: string;
  clauses: AdverbialClauseItem[];
  suggestions: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scoreColor(s: number) {
  if (s >= 80) return 'text-emerald-600 dark:text-emerald-400';
  if (s >= 60) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-500 dark:text-red-400';
}

function scoreBg(s: number) {
  if (s >= 80) return 'bg-emerald-500';
  if (s >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
}

const levelColors: Record<string, string> = {
  A1: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  A2: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  B1: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  B2: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  C1: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  C2: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
};

const STORAGE_KEY = 'ai_writing_history';

function loadHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'); }
  catch { return []; }
}

function saveEntry(entry: HistoryEntry) {
  const list = [entry, ...loadHistory()].slice(0, 20);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-3 flex-1">
      <span className={`text-sm font-bold min-w-[2.5rem] text-right ${scoreColor(score)}`}>{score}</span>
      <div className="flex-1 h-2 bg-(--bg-secondary) rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${scoreBg(score)}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function Section({
  title, icon: Icon, score, feedback, children,
}: {
  title: string;
  icon: React.ElementType;
  score?: number;
  feedback: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-(--border) rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-(--hover) transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="font-semibold text-(--text) text-sm">{title}</span>
        </div>
        <div className="flex items-center gap-2 ml-2 shrink-0">
          {score !== undefined && (
            <span className={`text-xs font-bold ${scoreColor(score)}`}>{score}/100</span>
          )}
          {open
            ? <ChevronUp className="w-3.5 h-3.5 text-(--text-muted)" />
            : <ChevronDown className="w-3.5 h-3.5 text-(--text-muted)" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-2 space-y-3 border-t border-(--border) bg-(--bg-secondary)/20">
          <p className="text-sm text-(--text-secondary) leading-relaxed">{feedback}</p>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Writing Topics ───────────────────────────────────────────────────────────

const WRITING_TYPES = ['Journal', 'Essay', 'Story', 'Opinion', 'Description', 'Letter', 'Email'];

const PROMPT_IDEAS = [
  'Describe your daily routine in detail.',
  'Write about your favorite place and why you love it.',
  'Tell a story about an unexpected friendship.',
  'Explain why learning English is important to you.',
  'Describe a challenge you recently overcame.',
  'Write about your dream job and how you plan to achieve it.',
  'Tell a story about your most memorable trip.',
  'Write your opinion about social media\'s effect on students.',
];

// ─── Main Page ────────────────────────────────────────────────────────────────

type Tab = 'feedback' | 'analysis' | 'corrected' | 'rewrite';
type ErrorType = 'too_long' | 'quota' | 'no_key' | 'network' | 'general' | null;

export default function WritingPage() {
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState<ErrorType>(null);
  const [activeTab, setActiveTab] = useState<Tab>('feedback');
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const [promptIdea, setPromptIdea] = useState('');
  useEffect(() => {
    setPromptIdea(PROMPT_IDEAS[Math.floor(Math.random() * PROMPT_IDEAS.length)]);
  }, []);

  async function checkWriting() {
    if (wordCount < 5) { setError('Please write at least 5 words.'); setErrorType('general'); return; }
    setError('');
    setErrorType(null);
    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/writing-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'no_api_key') {
          setErrorType('no_key');
          setError('GROQ_API_KEY atau GEMINI_API_KEY belum diisi di .env.local');
        } else if (data.error === 'quota_exceeded' || res.status === 429) {
          setErrorType('quota');
          setError('Quota AI habis. Tunggu sebentar lalu coba lagi.');
        } else if (data.error === 'parse_error') {
          setErrorType('too_long');
          setError('Tulisanmu terlalu panjang untuk dianalisis sekaligus. Coba potong jadi lebih pendek.');
        } else {
          setErrorType('general');
          setError(data.message ?? 'Something went wrong. Please try again.');
        }
        return;
      }

      setFeedback(data);
      setActiveTab('feedback');
      saveEntry({
        id: Date.now().toString(),
        date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        text: text.trim(),
        feedback: data,
      });
    } catch {
      setErrorType('network');
      setError('Tidak ada koneksi internet. Cek koneksimu dan coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  function openHistory() {
    setHistory(loadHistory());
    setShowHistory(true);
  }

  function loadFromHistory(entry: HistoryEntry) {
    setText(entry.text);
    setFeedback(entry.feedback);
    setActiveTab('feedback');
    setShowHistory(false);
  }

  function clearAll() {
    setText('');
    setFeedback(null);
    setError('');
    setErrorType(null);
    textareaRef.current?.focus();
  }

  return (
    <div className="min-h-screen p-4 lg:p-6 overflow-x-hidden">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6 max-w-7xl mx-auto">
        <Link
          href="/practice"
          className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Practice
        </Link>
        <button
          onClick={openHistory}
          className="flex items-center gap-1.5 text-xs text-(--text-secondary) hover:text-primary border border-(--border) px-3 py-1.5 rounded-lg transition-colors"
        >
          <History className="w-3.5 h-3.5" /> History
        </button>
      </div>

      {/* ── Title ── */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <PenLine className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-(--text)">AI Writing Practice</h1>
            <p className="text-xs text-(--text-secondary)">
              Write in English — get instant AI feedback like a real teacher &amp; IELTS examiner
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="max-w-7xl mx-auto">
        <div className={`grid gap-6 ${feedback ? 'lg:grid-cols-2' : 'max-w-3xl mx-auto'}`}>

          {/* ╔══ Left: Editor ══╗ */}
          <div className="space-y-4">

            {/* Writing type chips */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {WRITING_TYPES.map((t) => (
                <span
                  key={t}
                  className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border border-(--border) text-(--text-muted)"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Textarea card */}
            <div className="bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden shadow-sm">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-(--border) bg-(--bg-secondary)/30">
                <span className="text-xs font-medium text-(--text-secondary) flex items-center gap-1.5">
                  <PenLine className="w-3.5 h-3.5" /> Your Writing
                </span>
                {text && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-(--text-muted) hover:text-red-500 flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Start writing here...\n\nNeed an idea? Try: "${promptIdea}"`}
                className="w-full min-h-[340px] p-5 text-sm text-(--text) bg-transparent resize-none focus:outline-none leading-relaxed placeholder:text-(--text-muted) placeholder:italic"
                spellCheck
              />

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-(--border) bg-(--bg-secondary)/30">
                <div className="flex items-center gap-3 text-xs text-(--text-muted)">
                  <span>{wordCount} words</span>
                  <span>·</span>
                  <span>{text.length} chars</span>
                  {wordCount > 0 && wordCount < 5 && (
                    <span className="text-yellow-500 ml-1">— write at least 5 words</span>
                  )}
                </div>
              </div>
            </div>

            {/* Error banners */}
            {error && errorType === 'too_long' && (
              <div className="border border-orange-300/60 bg-orange-50 dark:bg-orange-950/30 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center shrink-0">
                    <FileWarning className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-orange-700 dark:text-orange-300">Teks Terlalu Panjang</p>
                    <p className="text-xs text-orange-600 dark:text-orange-400">Response AI kepotong karena token habis</p>
                  </div>
                </div>
                <div className="bg-orange-100/60 dark:bg-orange-900/20 rounded-xl px-3 py-2.5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-orange-700 dark:text-orange-300 font-semibold flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5" /> Panjang tulisanmu sekarang
                    </span>
                    <span className={`font-bold ${wordCount > 150 ? 'text-red-500' : 'text-orange-500'}`}>
                      {wordCount} kata
                    </span>
                  </div>
                  <div className="h-2 bg-orange-200 dark:bg-orange-800/40 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${wordCount > 150 ? 'bg-red-500' : 'bg-orange-500'}`}
                      style={{ width: `${Math.min((wordCount / 150) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-orange-600 dark:text-orange-400">
                    Rekomendasi: <strong>maksimal 150 kata</strong> untuk analisis lengkap
                  </p>
                </div>
                <p className="text-xs text-orange-600 dark:text-orange-400">
                  Potong tulisanmu jadi lebih pendek, lalu coba lagi.
                </p>
              </div>
            )}

            {error && errorType === 'quota' && (
              <div className="flex items-start gap-2.5 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-300/60 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Quota AI habis</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-0.5">{error} Groq gratis: 30 request/menit, 14.400/hari.</p>
                </div>
              </div>
            )}

            {error && errorType === 'no_key' && (
              <div className="flex items-start gap-2.5 bg-purple-50 dark:bg-purple-950/30 border border-purple-300/60 rounded-xl px-4 py-3">
                <KeyRound className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">API Key belum diisi</p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-0.5">
                    Tambahkan <code className="bg-purple-100 dark:bg-purple-900/40 px-1 rounded">GROQ_API_KEY</code> di file{' '}
                    <code className="bg-purple-100 dark:bg-purple-900/40 px-1 rounded">.env.local</code>. Daftar gratis di console.groq.com
                  </p>
                </div>
              </div>
            )}

            {error && errorType === 'network' && (
              <div className="flex items-start gap-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-300/60 rounded-xl px-4 py-3">
                <WifiOff className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-(--text)">Tidak ada koneksi</p>
                  <p className="text-xs text-(--text-muted) mt-0.5">Cek internet kamu lalu coba lagi.</p>
                </div>
              </div>
            )}

            {error && errorType === 'general' && (
              <div className="flex items-start gap-2.5 bg-red-50 dark:bg-red-950/30 border border-red-300/50 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Check button */}
            <button
              onClick={checkWriting}
              disabled={loading || wordCount < 5}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  AI is reviewing your writing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Check My Writing
                </>
              )}
            </button>

            <p className="text-center text-xs text-(--text-muted)">
              Powered by Google Gemini AI ·
              add <code className="bg-(--bg-secondary) px-1 rounded text-[11px]">GEMINI_API_KEY</code> to{' '}
              <code className="bg-(--bg-secondary) px-1 rounded text-[11px]">.env.local</code> to enable
            </p>
          </div>

          {/* ╔══ Right: Feedback ══╗ */}
          {feedback && (
            <div className="space-y-4 animate-fade-in">

              {/* Overall score card */}
              <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span className="font-bold text-(--text)">Overall Score</span>
                  </div>
                  <span className={`text-4xl font-black ${scoreColor(feedback.overallScore)}`}>
                    {feedback.overallScore}
                    <span className="text-sm font-normal text-(--text-muted)">/100</span>
                  </span>
                </div>
                <div className="h-3 bg-(--bg-secondary) rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${scoreBg(feedback.overallScore)}`}
                    style={{ width: `${feedback.overallScore}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${levelColors[feedback.level.estimated] ?? levelColors.A1}`}>
                    <Target className="w-3.5 h-3.5" />
                    {feedback.level.estimated} Level
                  </span>
                  <span className="text-xs text-(--text-muted)">
                    {feedback.overallScore >= 85 ? '🎉 Excellent!' : feedback.overallScore >= 65 ? '👍 Good work' : '📚 Keep practicing'}
                  </span>
                </div>
              </div>

              {/* Score breakdown */}
              <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4 space-y-2.5">
                <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider mb-3">Score Breakdown</p>
                {[
                  { label: 'Grammar',    score: feedback.grammar.score },
                  { label: 'Vocabulary', score: feedback.vocabulary.score },
                  { label: 'Coherence',  score: feedback.coherence.score },
                  { label: 'Style',      score: feedback.style.score },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-xs">
                    <span className="w-20 text-(--text-secondary) shrink-0">{item.label}</span>
                    <ScoreBar score={item.score} />
                  </div>
                ))}
              </div>

              {/* Tab switcher */}
              <div className="grid grid-cols-2 sm:flex gap-1 bg-(--bg-secondary) rounded-xl p-1">
                {(['feedback', 'analysis', 'corrected', 'rewrite'] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 text-xs font-semibold py-1.5 rounded-lg transition-all ${
                      activeTab === tab
                        ? 'bg-(--bg-card) text-primary shadow-sm'
                        : 'text-(--text-muted) hover:text-(--text)'
                    }`}
                  >
                    {tab === 'feedback' ? 'Feedback' : tab === 'analysis' ? 'Analysis' : tab === 'corrected' ? 'Corrected' : 'Rewrite'}
                  </button>
                ))}
              </div>

              {/* ── Feedback tab ── */}
              {activeTab === 'feedback' && (
                <div className="space-y-3">

                  <Section title="Grammar" icon={BookOpen} score={feedback.grammar.score} feedback={feedback.grammar.feedback}>
                    {feedback.grammar.corrections.length > 0 && (
                      <div className="space-y-2 mt-1">
                        {feedback.grammar.corrections.map((c, i) => (
                          <div key={i} className="bg-(--bg-card) border border-(--border) rounded-lg p-3 text-xs space-y-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-red-500 line-through">{c.original}</span>
                              <span className="text-(--text-muted)">→</span>
                              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{c.corrected}</span>
                            </div>
                            <p className="text-(--text-muted) leading-snug">{c.explanation}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </Section>

                  <Section title="Vocabulary" icon={Layers} score={feedback.vocabulary.score} feedback={feedback.vocabulary.feedback}>
                    {/* Suggestion chips */}
                    {feedback.vocabulary.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {feedback.vocabulary.suggestions.map((s, i) => (
                          <span key={i} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">{s}</span>
                        ))}
                      </div>
                    )}

                    {/* Word enhancements */}
                    {feedback.vocabulary.wordEnhancements?.length > 0 && (
                      <div className="mt-3 space-y-3">
                        <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Upgrade Vocabulary Kamu</p>
                        {feedback.vocabulary.wordEnhancements.map((w, i) => (
                          <div key={i} className="border border-(--border) rounded-2xl overflow-hidden bg-(--bg-card)">

                            {/* Header: word used */}
                            <div className="px-4 py-3 bg-(--bg-secondary)/40 border-b border-(--border) space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono font-bold text-(--text) text-sm">{w.wordUsed}</span>
                                <span className="text-[11px] bg-(--bg-secondary) border border-(--border) text-(--text-muted) px-2 py-0.5 rounded-full">
                                  {w.wordClass}
                                </span>
                                <span className="text-xs text-(--text-muted) min-w-0 break-words">— {w.meaning}</span>
                              </div>
                              <p className="text-[11px] text-(--text-muted) italic">
                                Biasa dipakai: {w.typicalUsage}
                              </p>
                              {/* Best alternative highlight */}
                              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                <span className="text-[11px] text-(--text-muted)">Terbaik untuk konteks ini:</span>
                                <span className="bg-primary text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                                  {w.bestAlternative}
                                </span>
                                <span className="text-[11px] text-(--text-muted) min-w-0 break-words">— {w.bestAlternativeReason}</span>
                              </div>
                            </div>

                            {/* Synonym list */}
                            <div className="divide-y divide-(--border)">
                              {w.synonyms.map((s, j) => (
                                <div key={j} className={`px-4 py-3 text-xs space-y-1.5 ${s.word === w.bestAlternative ? 'bg-primary/5' : ''}`}>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className={`font-bold text-sm ${s.word === w.bestAlternative ? 'text-primary' : 'text-(--text)'}`}>
                                      {s.word}
                                      {s.word === w.bestAlternative && (
                                        <span className="ml-1.5 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full font-semibold">Best</span>
                                      )}
                                    </span>
                                    {/* Formality badge */}
                                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                                      s.formality === 'Formal'
                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                        : s.formality === 'Informal'
                                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                    }`}>
                                      {s.formality}
                                    </span>
                                  </div>
                                  {/* Meaning */}
                                  <p className="text-(--text-secondary) leading-snug">{s.meaning}</p>
                                  {/* Typical usage */}
                                  <p className="text-[11px] text-(--text-muted) flex items-start gap-1">
                                    <span className="shrink-0 mt-0.5">📌</span>
                                    <span>Dipakai untuk: <span className="text-(--text-secondary)">{s.typicalUsage}</span></span>
                                  </p>
                                  {/* Example */}
                                  <p className="text-(--text-secondary) italic bg-(--bg-secondary) rounded-lg px-3 py-1.5 leading-snug">
                                    &ldquo;{s.example}&rdquo;
                                  </p>
                                </div>
                              ))}
                            </div>

                          </div>
                        ))}
                      </div>
                    )}
                  </Section>

                  <Section title="Coherence & Clarity" icon={Target} score={feedback.coherence.score} feedback={feedback.coherence.feedback} />

                  <Section title="Writing Style" icon={Sparkles} score={feedback.style.score} feedback={feedback.style.feedback} />

                  <div className="border border-(--border) rounded-xl p-4 bg-(--bg-card) flex items-start gap-3">
                    <Star className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-(--text) mb-1">
                        Estimated Level: {feedback.level.estimated}
                      </p>
                      <p className="text-sm text-(--text-secondary) leading-relaxed">{feedback.level.feedback}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Analysis tab ── */}
              {activeTab === 'analysis' && (
                <div className="space-y-4">
                  {feedback.sentenceAnalysis ? (
                    <>
                      {/* Summary */}
                      <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4 flex items-start gap-3">
                        <GitBranch className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-(--text-secondary) leading-relaxed">{feedback.sentenceAnalysis.summary}</p>
                      </div>

                      {/* ── Adverbial Clause Analysis ── */}
                      {feedback.adverbialClause && (
                        <div className="border border-(--border) rounded-2xl overflow-hidden bg-(--bg-card)">
                          <div className="px-4 py-3 bg-(--bg-secondary)/40 border-b border-(--border) flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <GitBranch className="w-4 h-4 text-emerald-500 shrink-0" />
                              <span className="text-sm font-bold text-(--text)">Adverbial Clause</span>
                            </div>
                            {feedback.adverbialClause.found ? (
                              <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-full font-semibold">
                                {feedback.adverbialClause.count} found
                              </span>
                            ) : (
                              <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2.5 py-1 rounded-full font-semibold">
                                Not used
                              </span>
                            )}
                          </div>
                          <div className="p-4 space-y-3">
                            <p className="text-sm text-(--text-secondary) leading-relaxed">{feedback.adverbialClause.summary}</p>

                            {feedback.adverbialClause.clauses.length > 0 && (
                              <div className="space-y-2">
                                {feedback.adverbialClause.clauses.map((cl, ci) => (
                                  <div key={ci} className={`rounded-xl border p-3 space-y-1.5 text-xs ${cl.isCorrect ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10' : 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10'}`}>
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold font-mono text-[11px]">
                                        {cl.connector}
                                      </span>
                                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[11px] font-semibold">
                                        {cl.clauseFunction}
                                      </span>
                                      {cl.isCorrect ? (
                                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 font-semibold text-[11px]">
                                          <CheckCircle2 className="w-3 h-3" /> Correct
                                        </span>
                                      ) : (
                                        <span className="text-red-500 flex items-center gap-0.5 font-semibold text-[11px]">
                                          ✕ Incorrect
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-(--text) italic">&ldquo;{cl.text}&rdquo;</p>
                                    {cl.issue && <p className="text-red-600 dark:text-red-400 leading-snug">{cl.issue}</p>}
                                    <p className="text-(--text-secondary) leading-snug flex items-start gap-1">
                                      <Lightbulb className="w-3 h-3 shrink-0 text-yellow-500 mt-0.5" /> {cl.tip}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {feedback.adverbialClause.suggestions.length > 0 && (
                              <div className="space-y-1.5 pt-1 border-t border-(--border)">
                                <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Suggestions</p>
                                {feedback.adverbialClause.suggestions.map((s, i) => (
                                  <div key={i} className="flex items-start gap-2 text-xs text-(--text-secondary)">
                                    <span className="shrink-0 text-primary font-bold mt-0.5">→</span>
                                    <span>{s}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Per-sentence cards */}
                      {feedback.sentenceAnalysis.sentences.map((s, idx) => (
                        <div key={idx} className="border border-(--border) rounded-2xl overflow-hidden bg-(--bg-card)">

                          {/* Sentence header */}
                          <div className="px-4 py-3 bg-(--bg-secondary)/40 border-b border-(--border)">
                            <span className="text-xs font-bold text-primary mr-2">#{idx + 1}</span>
                            <span className="text-sm text-(--text) italic">&ldquo;{s.sentence}&rdquo;</span>
                          </div>

                          <div className="divide-y divide-(--border)">

                            {/* ① Tense */}
                            <div className="px-4 py-3 space-y-2">
                              <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wider flex items-center gap-1.5">
                                <CircleDot className="w-3 h-3 text-blue-500" /> Tense
                              </p>
                              <div className="flex flex-wrap items-center gap-2 text-xs">
                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full font-semibold">
                                  {s.tense.used}
                                </span>
                                {s.tense.isCorrect ? (
                                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                                  </span>
                                ) : (
                                  <>
                                    <span className="text-(--text-muted)">→ seharusnya</span>
                                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-full font-semibold">
                                      {s.tense.shouldBe}
                                    </span>
                                  </>
                                )}
                              </div>
                              <p className="text-xs text-(--text-secondary) leading-snug">{s.tense.explanation}</p>
                            </div>

                            {/* ② Voice */}
                            <div className="px-4 py-3 space-y-2">
                              <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wider flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3 text-purple-500" /> Voice (Aktif / Pasif)
                              </p>
                              <div className="flex flex-wrap items-center gap-2 text-xs">
                                <span className={`px-2.5 py-1 rounded-full font-semibold ${
                                  s.voice.type === 'Passive'
                                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                }`}>
                                  {s.voice.type === 'Active' ? 'Kalimat Aktif' : s.voice.type === 'Passive' ? 'Kalimat Pasif' : 'Non-verbal'}
                                </span>
                                {!s.voice.isAppropriate && (
                                  <span className="text-red-500 text-xs font-medium">— kurang tepat</span>
                                )}
                              </div>
                              <p className="text-xs text-(--text-secondary) leading-snug">{s.voice.suggestion}</p>
                              {s.voice.converted && (
                                <div className="bg-(--bg-secondary) rounded-lg px-3 py-2 text-xs">
                                  <span className="text-(--text-muted) mr-1">Bentuk lain:</span>
                                  <span className="text-(--text) italic">&ldquo;{s.voice.converted}&rdquo;</span>
                                </div>
                              )}
                            </div>

                            {/* ③ Structure */}
                            <div className="px-4 py-3 space-y-2">
                              <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wider flex items-center gap-1.5">
                                <GitBranch className="w-3 h-3 text-emerald-500" /> Struktur Kalimat
                              </p>
                              <span className="inline-block text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-full font-semibold">
                                {s.structure.sentenceType}
                              </span>

                              {/* Clauses */}
                              {s.structure.clauses.length > 0 && (
                                <div className="space-y-2 mt-1">
                                  {s.structure.clauses.map((cl, ci) => (
                                    <div key={ci} className="border-l-2 border-primary/40 pl-3 space-y-1 text-xs">
                                      <div className="flex flex-wrap items-center gap-1.5">
                                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold text-[11px]">{cl.type}</span>
                                        {cl.connector && (
                                          <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded-full text-[11px] font-mono">
                                            &ldquo;{cl.connector}&rdquo;
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-(--text) italic text-[11px]">&ldquo;{cl.text}&rdquo;</p>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-0.5 text-[11px] text-(--text-muted)">
                                        {cl.subject && <span><b className="text-(--text-secondary)">S:</b> {cl.subject}</span>}
                                        {cl.predicate && <span><b className="text-(--text-secondary)">P:</b> {cl.predicate}</span>}
                                        {cl.object && <span><b className="text-(--text-secondary)">O:</b> {cl.object}</span>}
                                      </div>
                                      <p className="text-(--text-muted) leading-snug">{cl.note}</p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Phrases */}
                              {s.structure.phrases.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {s.structure.phrases.map((ph, pi) => (
                                    <div key={pi} className="bg-(--bg-secondary) border border-(--border) rounded-lg px-2.5 py-1.5 text-[11px]">
                                      <span className="font-semibold text-(--text)">{ph.text}</span>
                                      <span className="text-(--text-muted) mx-1">·</span>
                                      <span className="text-primary">{ph.type}</span>
                                      <span className="text-(--text-muted) ml-1">({ph.function})</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* ④ Reduction */}
                            <div className="px-4 py-3 space-y-2">
                              <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wider flex items-center gap-1.5">
                                <Lightbulb className="w-3 h-3 text-yellow-500" /> Reduction / Omitting
                              </p>
                              {s.reduction.possible ? (
                                <div className="space-y-1.5 text-xs">
                                  <span className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2.5 py-1 rounded-full font-semibold text-[11px]">
                                    {s.reduction.type}
                                  </span>
                                  <div className="space-y-1 bg-(--bg-secondary) rounded-lg p-2.5">
                                    <div className="flex flex-wrap items-start gap-1.5">
                                      <span className="text-red-400 line-through text-(--text-muted)">{s.reduction.original}</span>
                                      <span className="text-(--text-muted)">→</span>
                                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{s.reduction.reduced}</span>
                                    </div>
                                  </div>
                                  <p className="text-(--text-secondary) leading-snug">{s.reduction.explanation}</p>
                                </div>
                              ) : (
                                <p className="text-xs text-(--text-muted) italic">Tidak ada reduction yang natural untuk kalimat ini.</p>
                              )}
                            </div>

                            {/* ⑤ Word Classes */}
                            {s.wordClasses.length > 0 && (
                              <div className="px-4 py-3 space-y-2">
                                <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wider flex items-center gap-1.5">
                                  <BookOpen className="w-3 h-3 text-rose-500" /> Kelas Kata (Word Classes)
                                </p>
                                <div className="space-y-1.5">
                                  {s.wordClasses.map((wc, wi) => (
                                    <div key={wi} className="flex flex-wrap items-baseline gap-1.5 text-xs">
                                      <span className="font-mono font-bold text-(--text) bg-(--bg-secondary) px-2 py-0.5 rounded">{wc.word}</span>
                                      <span className="text-(--text-muted)">→</span>
                                      <span className="text-rose-600 dark:text-rose-400 font-semibold">{wc.class}</span>
                                      {wc.subclass && (
                                        <span className="text-(--text-muted) text-[11px]">({wc.subclass})</span>
                                      )}
                                      <span className="text-(--text-muted)">·</span>
                                      <span className="text-(--text-secondary) text-[11px]">{wc.function}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-center text-sm text-(--text-muted) py-8">No analysis available.</p>
                  )}
                </div>
              )}

              {/* ── Corrected tab ── */}
              {activeTab === 'corrected' && (
                <div className="bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-(--border) bg-(--bg-secondary)/30">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-semibold text-(--text)">Grammar-Corrected Version</span>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-(--text) leading-relaxed whitespace-pre-wrap">{feedback.correctedVersion}</p>
                  </div>
                </div>
              )}

              {/* ── Rewrite tab ── */}
              {activeTab === 'rewrite' && (
                <div className="bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-(--border) bg-(--bg-secondary)/30">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-(--text)">Native-Level Rewrite</span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-(--text-muted) italic mb-3">How a native English speaker might write this:</p>
                    <p className="text-sm text-(--text) leading-relaxed whitespace-pre-wrap">{feedback.rewriteSuggestion}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── History Modal ── */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowHistory(false)} />
          <div className="relative bg-(--bg-card) rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl border border-(--border)">
            <div className="flex items-center justify-between p-4 border-b border-(--border) shrink-0">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-primary" />
                <span className="font-bold text-(--text)">Writing History</span>
              </div>
              <button onClick={() => setShowHistory(false)} className="p-1.5 hover:bg-(--hover) rounded-lg transition-colors">
                <X className="w-4 h-4 text-(--text-muted)" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-4 space-y-3">
              {history.length === 0 ? (
                <div className="text-center py-14 text-(--text-muted)">
                  <Clock className="w-10 h-10 mx-auto mb-3 opacity-25" />
                  <p className="text-sm font-medium">No history yet</p>
                  <p className="text-xs mt-1">Checked writings will be saved here automatically.</p>
                </div>
              ) : (
                history.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => loadFromHistory(entry)}
                    className="w-full text-left p-4 rounded-xl border border-(--border) hover:bg-(--hover) transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-(--text-muted) flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> {entry.date}
                      </span>
                      <span className={`text-sm font-bold ${scoreColor(entry.feedback.overallScore)}`}>
                        {entry.feedback.overallScore}/100
                      </span>
                    </div>
                    <p className="text-sm text-(--text-secondary) line-clamp-2">{entry.text}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[entry.feedback.level.estimated] ?? levelColors.A1}`}>
                        {entry.feedback.level.estimated}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
