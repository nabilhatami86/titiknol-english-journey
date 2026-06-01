'use client';

import { useState, useEffect } from 'react';
import { Clock, X, BookText } from 'lucide-react';
import { ESSAY_TOPICS, EssayTopic } from '@/data/essayTopics';
import { cn } from '@/lib/utils';

const CACHE_KEY = 'essay_writing_state';
const HISTORY_KEY = 'essay_writing_history';
const MAX_HISTORY = 30;

type Section = 'introduction' | 'body1' | 'body2' | 'conclusion';

const SECTIONS: { key: Section; label: string; hint: string }[] = [
  { key: 'introduction', label: 'Introduction', hint: '2 sentences: paraphrase topic + thesis (MI1 & MI2)' },
  { key: 'body1', label: 'Body Paragraph 1', hint: '4–5 sentences: MI → WHY → HOW → Example' },
  { key: 'body2', label: 'Body Paragraph 2', hint: '4–5 sentences: MI → WHY → HOW → Example' },
  { key: 'conclusion', label: 'Conclusion', hint: '3 sentences: restate thesis → summarise MI1+MI2 → closing' },
];

interface ReviewResult {
  score: number;
  meetsStructure: boolean;
  sentenceCount: number;
  expectedSentenceCount: string;
  structureFeedback: string;
  structureBreakdown?: { label: string; status: 'met' | 'missing' | 'incorrect'; note: string; why?: string; howToFix?: string; tutorNote?: string }[];
  strengths: string[];
  improvements: { point: string; suggestion: string }[];
  grammarIssues: { original: string; corrected: string; rule?: string; explanation: string }[];
  proTips?: { tip: string; example: string }[];
  vocabSuggestions?: {
    wordUsed: string;
    wordClass: string;
    why: string;
    alternatives: { word: string; formality: string; example: string }[];
  }[];
  improvedVersion: string;
}

interface SectionState {
  text: string;
  review: ReviewResult | null;
  loading: boolean;
  error: string;
  showImproved: boolean;
}

interface EssayHistoryEntry {
  id: string;
  savedAt: number;
  topic: EssayTopic;
  mi1: string;
  mi2: string;
  why1?: [string, string];
  how1?: string;
  example1?: string;
  why2?: [string, string];
  how2?: string;
  example2?: string;
  sections: Record<Section, { text: string; review: ReviewResult | null }>;
}

function defaultSection(): SectionState {
  return { text: '', review: null, loading: false, error: '', showImproved: false };
}

const TYPE_LABELS: Record<string, string> = {
  'causes-effects': 'Causes & Effects',
  solution: 'Problem & Solution',
  argument: 'Argumentative',
  'pros-cons': 'Pros & Cons',
  discussion: 'Discussion',
};

const BLANK_SECTIONS = (): Record<Section, SectionState> => ({
  introduction: defaultSection(), body1: defaultSection(),
  body2: defaultSection(), conclusion: defaultSection(),
});

function formatDate(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return 'Today, ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 1) return 'Yesterday, ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function avgScore(entry: EssayHistoryEntry): number | null {
  const scores = SECTIONS.map(s => entry.sections[s.key].review?.score).filter((n): n is number => n !== undefined);
  return scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
}

const inputCls = 'w-full px-3 py-2 rounded-lg border border-(--border) bg-(--bg-card) text-(--text) text-sm focus:outline-none focus:ring-2 focus:ring-primary/40';
const labelCls = 'block text-xs font-semibold text-(--text-muted) uppercase tracking-wide mb-1';

interface MiBlockProps {
  num: 1 | 2;
  mi: string; setMi: (v: string) => void;
  why: [string, string]; setWhy: (v: [string, string]) => void;
  how: string; setHow: (v: string) => void;
  example: string; setExample: (v: string) => void;
  placeholder: string;
}

function MiBlock({ num, mi, setMi, why, setWhy, how, setHow, example, setExample, placeholder }: MiBlockProps) {
  return (
    <div className="p-4 rounded-xl border border-(--border) bg-(--bg-card) space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">{num}</span>
        <span className="font-semibold text-(--text) text-sm">Main Idea {num} (MI{num})</span>
        <span className="text-xs text-primary ml-auto">required</span>
      </div>
      <div>
        <input
          value={mi}
          onChange={e => setMi(e.target.value)}
          placeholder={placeholder}
          className={inputCls}
        />
      </div>
      <div className="border-t border-(--border) pt-3 space-y-2.5">
        <p className="text-xs text-(--text-muted) italic">Brainstorm your paragraph plan (optional but recommended)</p>
        <div>
          <label className={labelCls}>WHY — Why is this important? <span className="text-[10px] normal-case font-normal">(max 2)</span></label>
          <div className="space-y-1.5">
            <input
              value={why[0]}
              onChange={e => setWhy([e.target.value, why[1]])}
              placeholder="Reason 1..."
              className={inputCls}
            />
            <input
              value={why[1]}
              onChange={e => setWhy([why[0], e.target.value])}
              placeholder="Reason 2 (optional)..."
              className={inputCls}
            />
          </div>
        </div>
        <div>
          <label className={labelCls}>HOW — How does it work or apply?</label>
          <input
            value={how}
            onChange={e => setHow(e.target.value)}
            placeholder="HOW it works or is implemented..."
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>EXAMPLE — Real-world evidence or example</label>
          <input
            value={example}
            onChange={e => setExample(e.target.value)}
            placeholder="e.g. According to a 2023 study..."
            className={inputCls}
          />
        </div>
      </div>
    </div>
  );
}

function cefrLevel(score: number): string {
  if (score >= 90) return 'C2';
  if (score >= 75) return 'C1';
  if (score >= 60) return 'B2';
  if (score >= 45) return 'B1';
  if (score >= 30) return 'A2';
  return 'A1';
}

export function EssayWriting() {
  const [step, setStep] = useState<'pick' | 'setup' | 'write'>('pick');
  const [topic, setTopic] = useState<EssayTopic | null>(null);
  const [mi1, setMi1] = useState('');
  const [mi2, setMi2] = useState('');
  const [why1, setWhy1] = useState<[string, string]>(['', '']);
  const [how1, setHow1] = useState('');
  const [example1, setExample1] = useState('');
  const [why2, setWhy2] = useState<[string, string]>(['', '']);
  const [how2, setHow2] = useState('');
  const [example2, setExample2] = useState('');
  const [activeSection, setActiveSection] = useState<Section>('introduction');
  const [sections, setSections] = useState<Record<Section, SectionState>>(BLANK_SECTIONS);
  const [hydrated, setHydrated] = useState(false);
  const [historyId, setHistoryId] = useState<string | null>(null);

  // History UI state
  const [historyTab, setHistoryTab] = useState<'topics' | 'history'>('topics');
  const [historyData, setHistoryData] = useState<EssayHistoryEntry[]>([]);
  const [historyDetail, setHistoryDetail] = useState<EssayHistoryEntry | null>(null);
  // Drawer (for write step)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDetail, setDrawerDetail] = useState<EssayHistoryEntry | null>(null);

  // Load cache + history after mount
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(CACHE_KEY) ?? 'null');
      if (raw) {
        if (raw.step) setStep(raw.step);
        if (raw.topic) setTopic(raw.topic);
        if (raw.mi1) setMi1(raw.mi1);
        if (raw.mi2) setMi2(raw.mi2);
        if (raw.why1) setWhy1(raw.why1);
        if (raw.how1) setHow1(raw.how1);
        if (raw.example1) setExample1(raw.example1);
        if (raw.why2) setWhy2(raw.why2);
        if (raw.how2) setHow2(raw.how2);
        if (raw.example2) setExample2(raw.example2);
        if (raw.activeSection) setActiveSection(raw.activeSection);
        if (raw.sections) setSections({
          introduction: { ...defaultSection(), text: raw.sections.introduction?.text ?? '', review: raw.sections.introduction?.review ?? null },
          body1: { ...defaultSection(), text: raw.sections.body1?.text ?? '', review: raw.sections.body1?.review ?? null },
          body2: { ...defaultSection(), text: raw.sections.body2?.text ?? '', review: raw.sections.body2?.review ?? null },
          conclusion: { ...defaultSection(), text: raw.sections.conclusion?.text ?? '', review: raw.sections.conclusion?.review ?? null },
        });
        if (raw.historyId) setHistoryId(raw.historyId);
      }
    } catch { /* ignore */ }

    try {
      const hist = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]');
      if (Array.isArray(hist)) setHistoryData(hist);
    } catch { /* ignore */ }

    setHydrated(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist session cache
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CACHE_KEY, JSON.stringify({ step, topic, mi1, mi2, why1, how1, example1, why2, how2, example2, activeSection, sections, historyId }));
  }, [hydrated, step, topic, mi1, mi2, why1, how1, example1, why2, how2, example2, activeSection, sections, historyId]);

  // Auto-save to history when all sections are reviewed (once per session)
  const allDone = hydrated && step === 'write' && topic !== null &&
    SECTIONS.every(s => sections[s.key].review !== null);

  useEffect(() => {
    if (!hydrated || !allDone || historyId || !topic) return;
    const id = Date.now().toString();
    const entry: EssayHistoryEntry = {
      id,
      savedAt: Date.now(),
      topic,
      mi1,
      mi2,
      why1,
      how1,
      example1,
      why2,
      how2,
      example2,
      sections: {
        introduction: { text: sections.introduction.text, review: sections.introduction.review },
        body1: { text: sections.body1.text, review: sections.body1.review },
        body2: { text: sections.body2.text, review: sections.body2.review },
        conclusion: { text: sections.conclusion.text, review: sections.conclusion.review },
      },
    };
    try {
      const existing: EssayHistoryEntry[] = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]');
      const updated = [entry, ...existing].slice(0, MAX_HISTORY);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      setHistoryData(updated);
      setHistoryId(id);
    } catch { /* ignore */ }
  }, [hydrated, allDone, historyId, topic, mi1, mi2, why1, how1, example1, why2, how2, example2, sections]);

  function updateSection(key: Section, patch: Partial<SectionState>) {
    setSections(prev => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }

  async function handleReview(key: Section) {
    const sec = sections[key];
    if (!sec.text.trim() || !topic) return;
    updateSection(key, { loading: true, error: '', review: null });
    try {
      const res = await fetch('/api/essay-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: key, topic: topic.title, text: sec.text, mi1, mi2,
          why1: why1.filter(w => w.trim()), how1: how1.trim(), example1: example1.trim(),
          why2: why2.filter(w => w.trim()), how2: how2.trim(), example2: example2.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) { updateSection(key, { loading: false, error: data.message ?? 'Error reviewing section.' }); return; }
      updateSection(key, { loading: false, review: data });
    } catch {
      updateSection(key, { loading: false, error: 'Network error. Please try again.' });
    }
  }

  function handleSelectTopic(t: EssayTopic) {
    setTopic(t); setMi1(t.mi1Hint ?? ''); setMi2(t.mi2Hint ?? '');
    setWhy1(['', '']); setHow1(''); setExample1('');
    setWhy2(['', '']); setHow2(''); setExample2('');
    setStep('setup');
  }

  function handleStartWriting() {
    if (!mi1.trim() || !mi2.trim()) return;
    setSections(BLANK_SECTIONS());
    setActiveSection('introduction');
    setHistoryId(null);
    setStep('write');
  }

  function handleReset() {
    localStorage.removeItem(CACHE_KEY);
    setStep('pick'); setTopic(null); setMi1(''); setMi2('');
    setWhy1(['', '']); setHow1(''); setExample1('');
    setWhy2(['', '']); setHow2(''); setExample2('');
    setActiveSection('introduction');
    setSections(BLANK_SECTIONS());
    setHistoryId(null);
    setHistoryTab('topics');
    setHistoryDetail(null);
  }

  function deleteHistory(id: string) {
    const updated = historyData.filter(e => e.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    setHistoryData(updated);
    if (historyDetail?.id === id) setHistoryDetail(null);
    if (drawerDetail?.id === id) setDrawerDetail(null);
  }

  function loadFromHistory(entry: EssayHistoryEntry) {
    setTopic(entry.topic);
    setMi1(entry.mi1);
    setMi2(entry.mi2);
    setWhy1(entry.why1 ?? ['', '']);
    setHow1(entry.how1 ?? '');
    setExample1(entry.example1 ?? '');
    setWhy2(entry.why2 ?? ['', '']);
    setHow2(entry.how2 ?? '');
    setExample2(entry.example2 ?? '');
    setSections({
      introduction: { ...defaultSection(), text: entry.sections.introduction.text, review: entry.sections.introduction.review },
      body1: { ...defaultSection(), text: entry.sections.body1.text, review: entry.sections.body1.review },
      body2: { ...defaultSection(), text: entry.sections.body2.text, review: entry.sections.body2.review },
      conclusion: { ...defaultSection(), text: entry.sections.conclusion.text, review: entry.sections.conclusion.review },
    });
    const firstUnreviewed = SECTIONS.find(s => !entry.sections[s.key].review);
    setActiveSection(firstUnreviewed?.key ?? 'introduction');
    setHistoryId(entry.id);
    setDrawerOpen(false);
    setDrawerDetail(null);
    setHistoryDetail(null);
    setStep('write');
  }

  function wordCount(text: string): number {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
  }

  // ── HISTORY DETAIL view ───────────────────────────────────────────────────
  if (step === 'pick' && historyDetail) {
    const avg = avgScore(historyDetail);
    return (
      <div className="max-w-3xl mx-auto pt-2">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setHistoryDetail(null)}
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            ← Back to History
          </button>
          <button
            onClick={() => loadFromHistory(historyDetail)}
            className="text-sm font-semibold bg-primary text-white px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Load &amp; Continue →
          </button>
        </div>

        {/* Header card */}
        <div className="p-4 rounded-xl border border-(--border) bg-(--bg-card) mb-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h2 className="font-bold text-(--text) leading-snug">{historyDetail.topic.title}</h2>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0 font-medium">
              {TYPE_LABELS[historyDetail.topic.type] ?? historyDetail.topic.type}
            </span>
          </div>
          <p className="text-xs text-(--text-muted)">
            MI1: <span className="font-medium text-(--text)">{historyDetail.mi1}</span> · MI2: <span className="font-medium text-(--text)">{historyDetail.mi2}</span>
          </p>
          <p className="text-xs text-(--text-muted) mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3 inline" /> {formatDate(historyDetail.savedAt)}
          </p>
          {/* Scores row */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-(--border) flex-wrap">
            {SECTIONS.map(s => {
              const r = historyDetail.sections[s.key].review;
              return (
                <div key={s.key} className="text-center">
                  <p className="text-[10px] text-(--text-muted) font-semibold uppercase tracking-wide">
                    {s.label.replace(' Paragraph', '')}
                  </p>
                  {r ? (
                    <div className="flex items-center gap-1 justify-center mt-0.5">
                      <span className="text-sm font-bold text-primary">{r.score}</span>
                      <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{cefrLevel(r.score)}</span>
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-(--text-muted)">—</p>
                  )}
                </div>
              );
            })}
            {avg !== null && (
              <>
                <div className="h-8 w-px bg-(--border)" />
                <div className="text-center">
                  <p className="text-[10px] text-(--text-muted) font-semibold uppercase tracking-wide">Avg</p>
                  <div className="flex items-center gap-1 justify-center mt-0.5">
                    <p className="text-sm font-extrabold text-primary">{avg}</p>
                    <span className="text-[10px] font-bold bg-primary text-white px-1.5 py-0.5 rounded-full">{cefrLevel(avg)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Full essay */}
        <div className="space-y-3">
          {SECTIONS.map(s => {
            const sec = historyDetail.sections[s.key];
            return (
              <div key={s.key} className="p-4 rounded-xl border border-(--border) bg-(--bg-card)">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-primary uppercase tracking-wide">{s.label}</p>
                  {sec.review && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {cefrLevel(sec.review.score)}
                      </span>
                      <span className={cn(
                        'text-xs font-bold px-2 py-0.5 rounded-full',
                        sec.review.meetsStructure ? 'bg-primary/10 text-primary' : 'bg-(--bg-secondary) text-(--text-muted)',
                      )}>
                        {sec.review.score}/100 · {sec.review.meetsStructure ? '✓' : '✗'}
                      </span>
                    </div>
                  )}
                </div>
                {sec.text
                  ? <p className="text-sm text-(--text) leading-relaxed whitespace-pre-wrap">{sec.text}</p>
                  : <p className="text-sm text-(--text-muted) italic">Not written</p>
                }
                {sec.review?.structureFeedback && (
                  <p className="text-xs text-(--text-muted) mt-2 pt-2 border-t border-(--border) italic">
                    {sec.review.structureFeedback}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── PICK TOPIC step ───────────────────────────────────────────────────────
  if (step === 'pick') {
    return (
      <div className="max-w-3xl mx-auto pt-2">
        {/* Tab toggle */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-1 p-1 bg-(--bg-secondary) rounded-xl">
            <button
              onClick={() => setHistoryTab('topics')}
              className={cn(
                'px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors',
                historyTab === 'topics' ? 'bg-primary text-white shadow-sm' : 'text-(--text-muted) hover:text-(--text)',
              )}
            >
              Topics
            </button>
            <button
              onClick={() => setHistoryTab('history')}
              className={cn(
                'px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5',
                historyTab === 'history' ? 'bg-primary text-white shadow-sm' : 'text-(--text-muted) hover:text-(--text)',
              )}
            >
              History
              {historyData.length > 0 && (
                <span className={cn(
                  'text-[11px] px-1.5 py-0.5 rounded-full font-bold leading-none',
                  historyTab === 'history' ? 'bg-white/25 text-white' : 'bg-primary/15 text-primary',
                )}>
                  {historyData.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Topics tab */}
        {historyTab === 'topics' && (
          <>
            <p className="text-(--text-muted) mb-4 text-sm">
              Pick a topic, set your main ideas, then write each section with AI review.
            </p>
            <div className="space-y-3">
              {ESSAY_TOPICS.map(t => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTopic(t)}
                  className="w-full text-left p-4 rounded-xl border border-(--border) bg-(--bg-card) hover:border-primary hover:bg-primary/5 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-(--text) group-hover:text-primary transition-colors">{t.title}</p>
                      {(t.mi1Hint || t.mi2Hint) && (
                        <p className="text-xs text-(--text-muted) mt-1">MI: {t.mi1Hint} · {t.mi2Hint}</p>
                      )}
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full shrink-0 bg-primary/10 text-primary">
                      {TYPE_LABELS[t.type] ?? t.type}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* History tab */}
        {historyTab === 'history' && (
          historyData.length === 0 ? (
            <div className="text-center py-16 text-(--text-muted)">
              <BookText className="w-8 h-8 mx-auto mb-3 opacity-25" />
              <p className="text-sm font-medium">No saved essays yet</p>
              <p className="text-xs mt-1 opacity-70">Complete all 4 sections to save an essay automatically.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {historyData.map(entry => {
                const avg = avgScore(entry);
                const doneCount = SECTIONS.filter(s => entry.sections[s.key].review).length;
                return (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-(--border) bg-(--bg-card) hover:border-primary/30 transition-colors group overflow-hidden"
                  >
                    <button
                      onClick={() => setHistoryDetail(entry)}
                      className="w-full text-left p-4"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <p className="font-medium text-(--text) group-hover:text-primary transition-colors leading-snug flex-1">
                          {entry.topic.title}
                        </p>
                        {avg !== null && (
                          <div className="shrink-0 flex items-center gap-1.5">
                            <span className="text-xs font-bold bg-primary text-white px-2 py-0.5 rounded-full">{cefrLevel(avg)}</span>
                            <span className="text-base font-extrabold text-primary leading-none">
                              {avg}<span className="text-xs font-normal text-(--text-muted)">/100</span>
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-(--text-muted) mb-2">
                        {entry.mi1} · {entry.mi2}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex gap-1.5 flex-wrap">
                          {SECTIONS.map(s => {
                            const r = entry.sections[s.key].review;
                            return (
                              <span
                                key={s.key}
                                className={cn(
                                  'text-[11px] px-2 py-0.5 rounded-full font-semibold',
                                  r ? 'bg-primary/10 text-primary' : 'bg-(--bg-secondary) text-(--text-muted)',
                                )}
                              >
                                {s.label.replace(' Paragraph', '')}{r ? ` ${r.score}` : ' —'}
                              </span>
                            );
                          })}
                        </div>
                        <span className="text-[11px] text-(--text-muted) shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(entry.savedAt)}
                        </span>
                      </div>
                      {doneCount < 4 && (
                        <p className="text-[11px] text-(--text-muted) mt-1.5 italic">
                          {doneCount}/4 sections reviewed
                        </p>
                      )}
                    </button>
                    {/* Action bar */}
                    <div className="border-t border-(--border) px-4 py-1.5 flex items-center justify-between">
                      <button
                        onClick={e => { e.stopPropagation(); loadFromHistory(entry); }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline transition-colors py-0.5"
                      >
                        Load &amp; Continue →
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); deleteHistory(entry.id); }}
                        className="inline-flex items-center gap-1 text-xs text-(--text-muted) hover:text-primary transition-colors py-0.5"
                      >
                        <X className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    );
  }

  // ── SETUP MI1 / MI2 + WHY / HOW / EXAMPLE ────────────────────────────────
  if (step === 'setup' && topic) {
    return (
      <div className="max-w-2xl mx-auto pt-2">
        <button onClick={() => setStep('pick')} className="text-sm text-primary hover:underline mb-4">← Back</button>
        <h2 className="text-lg font-bold text-(--text) mb-1">Set Your Main Ideas</h2>
        <p className="text-sm text-(--text-muted) mb-1">Topic:</p>
        <p className="font-medium text-(--text) mb-5 p-3 bg-(--bg-card) rounded-lg border border-(--border)">{topic.title}</p>
        <div className="space-y-4">
          <MiBlock
            num={1} mi={mi1} setMi={setMi1}
            why={why1} setWhy={setWhy1}
            how={how1} setHow={setHow1}
            example={example1} setExample={setExample1}
            placeholder="e.g. Transition to Renewable Energy"
          />
          <MiBlock
            num={2} mi={mi2} setMi={setMi2}
            why={why2} setWhy={setWhy2}
            how={how2} setHow={setHow2}
            example={example2} setExample={setExample2}
            placeholder="e.g. Stronger Governmental Regulations"
          />
        </div>
        <button
          onClick={handleStartWriting}
          disabled={!mi1.trim() || !mi2.trim()}
          className="mt-6 w-full py-3 rounded-xl bg-primary text-white font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          Start Writing
        </button>
      </div>
    );
  }

  // ── WRITE sections ────────────────────────────────────────────────────────
  if (step === 'write' && topic) {
    const activeSec = sections[activeSection];
    const activeInfo = SECTIONS.find(s => s.key === activeSection)!;

    return (
      <div className="max-w-4xl mx-auto pt-2">
        <div className="mb-4 flex items-start justify-between gap-2">
          <div>
            <button onClick={() => setStep('pick')} className="text-sm text-primary hover:underline">← Back</button>
            <p className="font-semibold text-(--text) mt-0.5 leading-snug">{topic.title}</p>
            <p className="text-xs text-(--text-muted)">
              MI1: <span className="font-medium text-(--text)">{mi1}</span> · MI2: <span className="font-medium text-(--text)">{mi2}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => { setDrawerOpen(true); setDrawerDetail(null); }}
              className="relative text-xs text-(--text-muted) hover:text-primary border border-(--border) px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              History
              {historyData.length > 0 && (
                <span className="text-[10px] font-bold bg-primary text-white px-1.5 py-0.5 rounded-full leading-none">
                  {historyData.length}
                </span>
              )}
            </button>
            <button
              onClick={handleReset}
              className="text-xs text-(--text-muted) hover:text-primary border border-(--border) px-3 py-1.5 rounded-lg transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {SECTIONS.map(s => {
            const done = sections[s.key].review !== null;
            const active = activeSection === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap border transition-colors',
                  active ? 'bg-primary text-white border-primary'
                  : done ? 'bg-primary/10 text-primary border-primary/30'
                  : 'bg-(--bg-card) text-(--text-muted) border-(--border) hover:border-primary',
                )}
              >
                {done && !active && <span>✓</span>}
                {s.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-(--border) bg-(--bg-card)">
            <h3 className="font-semibold text-(--text) mb-0.5">{activeInfo.label}</h3>
            <p className="text-xs text-(--text-muted) mb-3">{activeInfo.hint}</p>
            {(activeSection === 'body1' || activeSection === 'body2') && (() => {
              const isB1 = activeSection === 'body1';
              const planMi = isB1 ? mi1 : mi2;
              const planWhy = isB1 ? why1 : why2;
              const planHow = isB1 ? how1 : how2;
              const planEx = isB1 ? example1 : example2;
              const hasDetails = planWhy.some(w => w.trim()) || planHow.trim() || planEx.trim();
              return (
                <div className="mb-3 rounded-lg border border-primary/25 bg-primary/5 overflow-hidden">
                  <div className="px-3 py-2 bg-primary/10 border-b border-primary/20 flex items-center gap-2">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wide">Your Plan — {isB1 ? 'Body 1' : 'Body 2'}</span>
                  </div>
                  <div className="px-3 py-2 space-y-1.5 text-xs">
                    <div className="flex gap-2">
                      <span className="font-bold text-primary shrink-0 w-14">MI:</span>
                      <span className="text-(--text)">{planMi}</span>
                    </div>
                    {hasDetails && (
                      <>
                        {planWhy.filter(w => w.trim()).map((w, i) => (
                          <div key={i} className="flex gap-2">
                            <span className="font-bold text-primary shrink-0 w-14">{i === 0 ? 'WHY:' : ''}</span>
                            <span className="text-(--text-muted)">{w}</span>
                          </div>
                        ))}
                        {planHow.trim() && (
                          <div className="flex gap-2">
                            <span className="font-bold text-primary shrink-0 w-14">HOW:</span>
                            <span className="text-(--text-muted)">{planHow}</span>
                          </div>
                        )}
                        {planEx.trim() && (
                          <div className="flex gap-2">
                            <span className="font-bold text-primary shrink-0 w-14">Example:</span>
                            <span className="text-(--text-muted)">{planEx}</span>
                          </div>
                        )}
                      </>
                    )}
                    {!hasDetails && (
                      <p className="text-(--text-muted) italic">No plan details added — go back to Setup to add WHY / HOW / Example.</p>
                    )}
                  </div>
                </div>
              );
            })()}
            <textarea
              value={activeSec.text}
              onChange={e => updateSection(activeSection, { text: e.target.value, review: null, error: '' })}
              rows={5}
              placeholder={`Write your ${activeInfo.label.toLowerCase()} here...`}
              className="w-full px-4 py-3 rounded-lg border border-(--border) bg-(--bg-card) text-(--text) text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-xs text-(--text-muted)">
                {wordCount(activeSec.text)} kata
              </span>
              {activeSec.error && <span className="text-primary text-xs">{activeSec.error}</span>}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleReview(activeSection)}
                disabled={activeSec.loading || !activeSec.text.trim()}
                className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {activeSec.loading ? 'Reviewing...' : 'Get AI Review'}
              </button>
              {activeSec.review && activeSection !== 'conclusion' && (
                <button
                  onClick={() => {
                    const idx = SECTIONS.findIndex(s => s.key === activeSection);
                    if (idx < SECTIONS.length - 1) setActiveSection(SECTIONS[idx + 1].key);
                  }}
                  className="px-5 py-2 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition-colors"
                >
                  Next →
                </button>
              )}
            </div>
          </div>

          {activeSec.review && (
            <div className="space-y-3">
              {/* Score */}
              <div className="p-4 rounded-xl border border-(--border) bg-(--bg-card)">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-(--text)">Score</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary text-white tracking-wide">
                      {cefrLevel(activeSec.review.score)}
                    </span>
                    <span className="text-2xl font-bold text-primary">{activeSec.review.score}/100</span>
                  </div>
                </div>
                <div className="w-full bg-primary/10 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-primary transition-all" style={{ width: `${activeSec.review.score}%` }} />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {activeSec.review.meetsStructure ? '✓ Structure met' : '✗ Structure issues'}
                  </span>
                  <span className="text-(--text-muted) text-xs">
                    {activeSec.review.sentenceCount} sentence{activeSec.review.sentenceCount !== 1 ? 's' : ''} (expected {activeSec.review.expectedSentenceCount})
                  </span>
                </div>
                <p className="text-sm text-(--text-muted) mt-2">{activeSec.review.structureFeedback}</p>
              </div>

              {/* Structure breakdown */}
              {activeSec.review.structureBreakdown && activeSec.review.structureBreakdown.length > 0 && (
                <div className="p-4 rounded-xl border border-(--border) bg-(--bg-card)">
                  <h4 className="text-sm font-semibold text-(--text) mb-3">Structure Check (Board Criteria)</h4>
                  <div className="space-y-2">
                    {activeSec.review.structureBreakdown.map((row, i) => (
                      <div key={i} className={cn('rounded-lg text-sm border overflow-hidden', row.status === 'met' ? 'border-primary/20 bg-primary/5' : 'border-(--border) bg-(--bg-card)')}>
                        {/* Header row */}
                        <div className="flex gap-3 p-2.5">
                          <span className={cn('shrink-0 font-bold text-xs mt-0.5', row.status === 'met' ? 'text-primary' : 'text-(--text-muted)')}>
                            {row.status === 'met' ? '✓' : row.status === 'missing' ? '—' : '✗'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className={cn('font-semibold text-xs', row.status === 'met' ? 'text-primary' : 'text-(--text)')}>{row.label}</p>
                            <p className="text-xs text-(--text-muted) mt-0.5">{row.note}</p>
                          </div>
                        </div>
                        {/* Why + How to fix — only when not met */}
                        {row.status !== 'met' && (row.why || row.howToFix) && (
                          <div className="border-t border-(--border) px-3 py-2.5 space-y-2 bg-(--bg-secondary)/30">
                            {row.why && (
                              <div className="flex gap-2 text-xs">
                                <span className="text-primary font-bold shrink-0 mt-px">Why:</span>
                                <p className="text-(--text-muted) leading-snug">{row.why}</p>
                              </div>
                            )}
                            {row.howToFix && (
                              <div className="flex gap-2 text-xs">
                                <span className="text-primary font-bold shrink-0 mt-px">✎</span>
                                <p className="text-(--text) italic leading-snug border-l-2 border-primary/40 pl-2">&ldquo;{row.howToFix}&rdquo;</p>
                              </div>
                            )}
                            {row.tutorNote && (
                              <div className="flex gap-2 text-xs pt-1.5 border-t border-(--border)/60 mt-1">
                                <span className="text-primary font-bold shrink-0 mt-px">💬</span>
                                <p className="text-(--text-secondary) leading-snug">{row.tutorNote}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Strengths */}
              {activeSec.review.strengths.length > 0 && (
                <div className="p-4 rounded-xl border border-(--border) bg-(--bg-card)">
                  <h4 className="text-sm font-semibold text-(--text) mb-2">Strengths</h4>
                  <ul className="space-y-1">
                    {activeSec.review.strengths.map((s, i) => (
                      <li key={i} className="text-sm text-(--text-muted) flex gap-2"><span className="text-primary">✓</span><span>{s}</span></li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              {activeSec.review.improvements.length > 0 && (
                <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                  <h4 className="text-sm font-semibold text-(--text) mb-2">How to Fix It</h4>
                  <div className="space-y-3">
                    {activeSec.review.improvements.map((item, i) => (
                      <div key={i} className="flex gap-2 text-sm">
                        <span className="text-primary font-bold shrink-0 mt-0.5">→</span>
                        <div>
                          <p className="font-medium text-(--text)">{item.point}</p>
                          <p className="text-(--text-muted) mt-0.5">{item.suggestion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grammar corrections */}
              {activeSec.review.grammarIssues.length > 0 && (
                <div className="p-4 rounded-xl border border-(--border) bg-(--bg-card)">
                  <h4 className="text-sm font-semibold text-(--text) mb-3">Grammar Corrections</h4>
                  <div className="space-y-3">
                    {activeSec.review.grammarIssues.map((g, i) => (
                      <div key={i} className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm space-y-1.5">
                        {g.rule && (
                          <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">{g.rule}</span>
                        )}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="line-through text-primary/50 font-mono">{g.original}</span>
                          <span className="text-(--text-muted)">→</span>
                          <span className="font-semibold text-(--text) font-mono">{g.corrected}</span>
                        </div>
                        <p className="text-xs text-(--text-muted) leading-snug">{g.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pro tips */}
              {activeSec.review.proTips && activeSec.review.proTips.length > 0 && (
                <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
                  <h4 className="text-sm font-semibold text-(--text) mb-1">Mau Lebih Bagus?</h4>
                  <p className="text-xs text-(--text-muted) mb-3">Tips spesifik untuk elevate paragrafmu</p>
                  <div className="space-y-3">
                    {activeSec.review.proTips.map((t, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex gap-2 text-sm">
                          <span className="text-primary font-bold text-base shrink-0 leading-snug">★</span>
                          <p className="text-(--text) leading-snug">{t.tip}</p>
                        </div>
                        {t.example && (
                          <p className="text-xs text-(--text-muted) italic ml-5 p-2 bg-(--bg-card) rounded-lg border border-primary/15 leading-snug">
                            e.g. &ldquo;{t.example}&rdquo;
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vocab suggestions */}
              {activeSec.review.vocabSuggestions && activeSec.review.vocabSuggestions.length > 0 && (
                <div className="p-4 rounded-xl border border-(--border) bg-(--bg-card)">
                  <h4 className="text-sm font-semibold text-(--text) mb-1">Vocab Upgrade</h4>
                  <p className="text-xs text-(--text-muted) mb-3">Words you used — and stronger alternatives</p>
                  <div className="space-y-3">
                    {activeSec.review.vocabSuggestions.map((v, i) => (
                      <div key={i} className="border border-(--border) rounded-xl overflow-hidden">
                        <div className="px-3 py-2 bg-(--bg-secondary)/40 border-b border-(--border)">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono font-bold text-(--text) line-through text-primary/60">{v.wordUsed}</span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{v.wordClass}</span>
                          </div>
                          <p className="text-xs text-(--text-muted) mt-0.5">{v.why}</p>
                        </div>
                        <div className="divide-y divide-(--border)">
                          {v.alternatives.map((alt, j) => (
                            <div key={j} className="px-3 py-2.5 text-xs flex gap-3 items-start">
                              <div className="shrink-0 flex items-center gap-1.5 pt-0.5">
                                <span className="font-bold text-(--text) text-sm">{alt.word}</span>
                                <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-full text-[11px]">{alt.formality}</span>
                              </div>
                              <p className="text-(--text-muted) italic leading-snug flex-1">&ldquo;{alt.example}&rdquo;</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Improved version */}
              <div className="p-4 rounded-xl border border-(--border) bg-(--bg-card)">
                <button
                  onClick={() => updateSection(activeSection, { showImproved: !activeSec.showImproved })}
                  className="flex items-center justify-between w-full text-sm font-semibold text-(--text)"
                >
                  <span>Suggested Improved Version</span>
                  <span className="text-(--text-muted)">{activeSec.showImproved ? '▲' : '▼'}</span>
                </button>
                {activeSec.showImproved && (
                  <p className="mt-3 text-sm text-(--text) leading-relaxed p-3 bg-primary/5 rounded-lg whitespace-pre-wrap border border-primary/20">
                    {activeSec.review.improvedVersion}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Full essay panel when all done */}
        {allDone && (
          <div className="mt-8 p-5 rounded-2xl border border-primary/30 bg-primary/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-(--text) text-lg">Full Essay</h3>
              <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">
                Saved to History ✓
              </span>
            </div>
            <div className="space-y-5">
              {SECTIONS.map(s => (
                <div key={s.key}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">{s.label}</p>
                  <p className="text-sm text-(--text) leading-relaxed">{sections[s.key].text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── History Drawer ──────────────────────────────────────────── */}
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => { setDrawerOpen(false); setDrawerDetail(null); }}
            />
            {/* Panel */}
            <div className="fixed top-0 right-0 h-full z-50 w-full max-w-sm bg-(--bg-card) border-l border-(--border) flex flex-col shadow-2xl">
              {/* Drawer header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-(--border) shrink-0">
                {drawerDetail ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDrawerDetail(null)}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => loadFromHistory(drawerDetail)}
                      className="text-xs font-semibold bg-primary text-white px-3 py-1 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Load →
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-(--text) text-sm">Essay History</span>
                    {historyData.length > 0 && (
                      <span className="text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                        {historyData.length}
                      </span>
                    )}
                  </div>
                )}
                <button
                  onClick={() => { setDrawerOpen(false); setDrawerDetail(null); }}
                  className="p-1 text-(--text-muted) hover:text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer body */}
              <div className="flex-1 overflow-y-auto p-4">
                {drawerDetail ? (
                  /* Detail view */
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl border border-(--border) bg-(--bg-secondary)/30">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <p className="font-semibold text-(--text) text-sm leading-snug">{drawerDetail.topic.title}</p>
                        <span className="text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0 font-medium">
                          {TYPE_LABELS[drawerDetail.topic.type] ?? drawerDetail.topic.type}
                        </span>
                      </div>
                      <p className="text-xs text-(--text-muted)">MI1: {drawerDetail.mi1}</p>
                      <p className="text-xs text-(--text-muted)">MI2: {drawerDetail.mi2}</p>
                      <p className="text-xs text-(--text-muted) mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {formatDate(drawerDetail.savedAt)}
                      </p>
                      {/* Scores */}
                      <div className="flex gap-3 mt-2.5 pt-2.5 border-t border-(--border) flex-wrap">
                        {SECTIONS.map(s => {
                          const r = drawerDetail.sections[s.key].review;
                          return (
                            <div key={s.key} className="text-center">
                              <p className="text-[10px] text-(--text-muted) font-semibold uppercase">
                                {s.label.replace(' Paragraph', '')}
                              </p>
                              {r ? (
                                <div className="flex items-center gap-1 justify-center mt-0.5">
                                  <span className="text-sm font-bold text-primary">{r.score}</span>
                                  <span className="text-[10px] font-bold bg-primary/10 text-primary px-1 py-0.5 rounded-full">{cefrLevel(r.score)}</span>
                                </div>
                              ) : (
                                <p className="text-sm text-(--text-muted) font-bold">—</p>
                              )}
                            </div>
                          );
                        })}
                        {(() => {
                          const avg = avgScore(drawerDetail);
                          return avg !== null ? (
                            <>
                              <div className="h-8 w-px bg-(--border)" />
                              <div className="text-center">
                                <p className="text-[10px] text-(--text-muted) font-semibold uppercase">Avg</p>
                                <div className="flex items-center gap-1 justify-center mt-0.5">
                                  <span className="text-sm font-extrabold text-primary">{avg}</span>
                                  <span className="text-[10px] font-bold bg-primary text-white px-1 py-0.5 rounded-full">{cefrLevel(avg)}</span>
                                </div>
                              </div>
                            </>
                          ) : null;
                        })()}
                      </div>
                    </div>
                    {/* Section texts */}
                    {SECTIONS.map(s => {
                      const sec = drawerDetail.sections[s.key];
                      return (
                        <div key={s.key} className="p-3 rounded-xl border border-(--border) bg-(--bg-card)">
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-xs font-bold text-primary uppercase tracking-wide">{s.label}</p>
                            {sec.review && (
                              <span className="text-[11px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                {sec.review.score} · {cefrLevel(sec.review.score)}
                              </span>
                            )}
                          </div>
                          {sec.text
                            ? <p className="text-xs text-(--text) leading-relaxed whitespace-pre-wrap">{sec.text}</p>
                            : <p className="text-xs text-(--text-muted) italic">Not written</p>
                          }
                          {sec.review?.structureFeedback && (
                            <p className="text-xs text-(--text-muted) mt-2 pt-2 border-t border-(--border) italic leading-snug">
                              {sec.review.structureFeedback}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : historyData.length === 0 ? (
                  /* Empty state */
                  <div className="text-center py-16 text-(--text-muted)">
                    <BookText className="w-8 h-8 mx-auto mb-3 opacity-25" />
                    <p className="text-sm font-medium">No saved essays yet</p>
                    <p className="text-xs mt-1 opacity-70">Complete all 4 sections to save automatically.</p>
                  </div>
                ) : (
                  /* History list */
                  <div className="space-y-3">
                    {historyData.map(entry => {
                      const avg = avgScore(entry);
                      return (
                        <div key={entry.id} className="rounded-xl border border-(--border) bg-(--bg-card) overflow-hidden hover:border-primary/30 transition-colors group">
                          <button
                            onClick={() => setDrawerDetail(entry)}
                            className="w-full text-left p-3"
                          >
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="text-sm font-medium text-(--text) group-hover:text-primary transition-colors leading-snug flex-1">
                                {entry.topic.title}
                              </p>
                              {avg !== null && (
                                <div className="flex items-center gap-1 shrink-0">
                                  <span className="text-xs font-bold bg-primary text-white px-1.5 py-0.5 rounded-full">{cefrLevel(avg)}</span>
                                  <span className="text-sm font-extrabold text-primary">{avg}</span>
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-(--text-muted) mb-2 leading-snug">
                              {entry.mi1} · {entry.mi2}
                            </p>
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex gap-1 flex-wrap">
                                {SECTIONS.map(s => {
                                  const r = entry.sections[s.key].review;
                                  return (
                                    <span key={s.key} className={cn('text-[11px] px-1.5 py-0.5 rounded-full font-semibold', r ? 'bg-primary/10 text-primary' : 'bg-(--bg-secondary) text-(--text-muted)')}>
                                      {s.label.replace('Body Paragraph', 'B').replace('Introduction', 'Intro').replace('Conclusion', 'Concl')}{r ? ` ${r.score}` : ' —'}
                                    </span>
                                  );
                                })}
                              </div>
                              <span className="text-[11px] text-(--text-muted) shrink-0">{formatDate(entry.savedAt)}</span>
                            </div>
                          </button>
                          <div className="border-t border-(--border) px-3 py-1 flex items-center justify-between">
                            <button
                              onClick={e => { e.stopPropagation(); loadFromHistory(entry); }}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline transition-colors py-0.5"
                            >
                              Load →
                            </button>
                            <button
                              onClick={e => { e.stopPropagation(); deleteHistory(entry.id); }}
                              className="inline-flex items-center gap-1 text-xs text-(--text-muted) hover:text-primary transition-colors py-0.5"
                            >
                              <X className="w-3 h-3" /> Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
}
