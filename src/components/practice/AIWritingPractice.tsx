'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, PenLine, History, BookOpen } from 'lucide-react';
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
    <div className="p-4 lg:p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-5 max-w-7xl mx-auto">
        <Link href="/practice" className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Practice
        </Link>
        {mode === 'check' && (
          <button onClick={openHistory} className="flex items-center gap-1.5 text-xs text-(--text-secondary) hover:text-primary border border-(--border) px-3 py-1.5 rounded-lg transition-colors">
            <History className="w-3.5 h-3.5" /> History
          </button>
        )}
      </div>

      {/* Title + Mode Tabs */}
      <div className="max-w-7xl mx-auto mb-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <PenLine className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-(--text)">Writing Practice</h1>
            <p className="text-xs text-(--text-secondary)">AI-powered writing feedback &amp; guided essay practice</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setMode('check')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              mode === 'check' ? 'bg-primary text-white border-primary' : 'bg-(--bg-card) text-(--text-muted) border-(--border) hover:border-primary'
            }`}
          >
            <PenLine className="w-3.5 h-3.5" /> AI Writing Check
          </button>
          <button
            onClick={() => setMode('essay')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              mode === 'essay' ? 'bg-primary text-white border-primary' : 'bg-(--bg-card) text-(--text-muted) border-(--border) hover:border-primary'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Guided Essay
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {mode === 'check' ? (
          <div className={`grid gap-6 ${feedback ? 'md:grid-cols-2' : 'max-w-3xl mx-auto'}`}>
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
      </div>

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
