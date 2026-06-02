'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, PenLine, History, BookOpen, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WritingFeedback, WritingHistoryEntry, WritingTab, WritingErrorType } from '@/types/writingPractice';
import { WritingEditor } from './writing/WritingEditor';
import { FeedbackPanel } from './writing/FeedbackPanel';
import { HistoryModal } from './writing/HistoryModal';
import { PROMPT_IDEAS, loadHistory, saveEntry } from './writing/utils';
import { EssayWriting } from './writing/EssayWriting';

export function AIWritingPractice() {
  const [mode, setMode] = useState<'check' | 'essay'>('check');
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState<WritingErrorType>(null);
  const [activeTab, setActiveTab] = useState<WritingTab>('feedback');
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<WritingHistoryEntry[]>([]);
  const [promptIdea, setPromptIdea] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  useEffect(() => {
    setPromptIdea(PROMPT_IDEAS[Math.floor(Math.random() * PROMPT_IDEAS.length)]);
  }, []);

  async function checkWriting() {
    if (wordCount < 5) { setError('Please write at least 5 words.'); setErrorType('general'); return; }
    setError(''); setErrorType(null); setLoading(true); setFeedback(null);
    try {
      const res = await fetch('/api/writing-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === 'no_api_key')           { setErrorType('no_key');   setError('GROQ_API_KEY atau GEMINI_API_KEY belum diisi di .env.local'); }
        else if (data.error === 'quota_exceeded' || res.status === 429) { setErrorType('quota'); setError('Quota AI habis. Tunggu sebentar lalu coba lagi.'); }
        else if (data.error === 'parse_error')     { setErrorType('too_long'); setError('Tulisanmu terlalu panjang untuk dianalisis sekaligus. Coba potong jadi lebih pendek.'); }
        else                                       { setErrorType('general');  setError(data.message ?? 'Something went wrong. Please try again.'); }
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
      setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
    } catch {
      setErrorType('network');
      setError('Tidak ada koneksi internet. Cek koneksimu dan coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  function openHistory() { setHistory(loadHistory()); setShowHistory(true); }

  function loadFromHistory(entry: WritingHistoryEntry) {
    setText(entry.text); setFeedback(entry.feedback); setActiveTab('feedback'); setShowHistory(false);
    setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
  }

  function clearAll() {
    setText(''); setFeedback(null); setError(''); setErrorType(null);
    textareaRef.current?.focus();
  }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">

      {/* Back link */}
      <Link
        href="/practice"
        className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-primary transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Practice
      </Link>

      {/* Hero card */}
      <div className="relative rounded-2xl overflow-hidden border border-(--border) bg-(--bg-card)">
        <div className="absolute inset-0 bg-linear-to-br from-primary/15 via-primary/5 to-transparent pointer-events-none" />
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-primary/5 pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-primary/5 pointer-events-none" />

        <div className="relative p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
                <PenLine className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-(--text) leading-tight">Writing Practice</h1>
                <p className="text-sm text-(--text-secondary) mt-1.5 leading-relaxed">
                  AI-powered writing feedback &amp; guided essay practice.
                </p>
              </div>
            </div>
            {mode === 'check' && (
              <button
                onClick={openHistory}
                className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-(--text-secondary) hover:text-primary border border-(--border) hover:border-primary/30 px-3 py-2 rounded-xl transition-all"
              >
                <History className="w-3.5 h-3.5" /> History
              </button>
            )}
          </div>

          {/* Mode tabs */}
          <div className="flex gap-2 mt-6 pt-5 border-t border-(--border)/50">
            <button
              onClick={() => setMode('check')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all',
                mode === 'check'
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'bg-(--bg-secondary) text-(--text-muted) border-(--border) hover:border-primary/30 hover:text-primary'
              )}
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Writing Check
            </button>
            <button
              onClick={() => setMode('essay')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all',
                mode === 'essay'
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'bg-(--bg-secondary) text-(--text-muted) border-(--border) hover:border-primary/30 hover:text-primary'
              )}
            >
              <BookOpen className="w-3.5 h-3.5" /> Guided Essay
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {mode === 'check' ? (
        <div className={cn('grid gap-6', feedback ? 'md:grid-cols-2' : 'max-w-3xl mx-auto')}>
          <WritingEditor
            text={text}
            wordCount={wordCount}
            promptIdea={promptIdea}
            loading={loading}
            error={error}
            errorType={errorType}
            textareaRef={textareaRef}
            onChange={setText}
            onSubmit={checkWriting}
            onClear={clearAll}
          />
          {feedback && (
            <FeedbackPanel
              feedback={feedback}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              feedbackRef={feedbackRef}
            />
          )}
        </div>
      ) : (
        <EssayWriting />
      )}

      {showHistory && (
        <HistoryModal
          history={history}
          onClose={() => setShowHistory(false)}
          onLoad={loadFromHistory}
        />
      )}
    </div>
  );
}
