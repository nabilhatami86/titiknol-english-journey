'use client';

import { useState, useEffect } from 'react';
import { ESSAY_TOPICS, EssayTopic } from '@/data/essayTopics';

const CACHE_KEY = 'essay_writing_state';

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
  structureBreakdown?: { label: string; status: 'met' | 'missing' | 'incorrect'; note: string }[];
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
  introduction: defaultSection(), body1: defaultSection(), body2: defaultSection(), conclusion: defaultSection(),
});

export function EssayWriting() {
  // Always start with defaults — avoids server/client hydration mismatch
  const [step, setStep] = useState<'pick' | 'setup' | 'write'>('pick');
  const [topic, setTopic] = useState<EssayTopic | null>(null);
  const [mi1, setMi1] = useState('');
  const [mi2, setMi2] = useState('');
  const [activeSection, setActiveSection] = useState<Section>('introduction');
  const [sections, setSections] = useState<Record<Section, SectionState>>(BLANK_SECTIONS);
  const [hydrated, setHydrated] = useState(false);

  // Load cache after hydration (client-only)
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(CACHE_KEY) ?? 'null');
      if (raw) {
        if (raw.step) setStep(raw.step);
        if (raw.topic) setTopic(raw.topic);
        if (raw.mi1) setMi1(raw.mi1);
        if (raw.mi2) setMi2(raw.mi2);
        if (raw.activeSection) setActiveSection(raw.activeSection);
        if (raw.sections) setSections({
          introduction: { ...defaultSection(), text: raw.sections.introduction?.text ?? '', review: raw.sections.introduction?.review ?? null },
          body1: { ...defaultSection(), text: raw.sections.body1?.text ?? '', review: raw.sections.body1?.review ?? null },
          body2: { ...defaultSection(), text: raw.sections.body2?.text ?? '', review: raw.sections.body2?.review ?? null },
          conclusion: { ...defaultSection(), text: raw.sections.conclusion?.text ?? '', review: raw.sections.conclusion?.review ?? null },
        });
      }
    } catch { /* ignore */ }
    setHydrated(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on every change (only after hydration to avoid overwriting with defaults)
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CACHE_KEY, JSON.stringify({ step, topic, mi1, mi2, activeSection, sections }));
  }, [hydrated, step, topic, mi1, mi2, activeSection, sections]);

  function updateSection(key: Section, patch: Partial<SectionState>) {
    setSections((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }

  async function handleReview(key: Section) {
    const sec = sections[key];
    if (!sec.text.trim() || !topic) return;
    updateSection(key, { loading: true, error: '', review: null });
    try {
      const res = await fetch('/api/essay-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: key, topic: topic.title, text: sec.text, mi1, mi2 }),
      });
      const data = await res.json();
      if (!res.ok) { updateSection(key, { loading: false, error: data.message ?? 'Error reviewing section.' }); return; }
      updateSection(key, { loading: false, review: data });
    } catch {
      updateSection(key, { loading: false, error: 'Network error. Please try again.' });
    }
  }

  function handleSelectTopic(t: EssayTopic) {
    setTopic(t); setMi1(t.mi1Hint ?? ''); setMi2(t.mi2Hint ?? ''); setStep('setup');
  }

  function handleStartWriting() {
    if (!mi1.trim() || !mi2.trim()) return;
    setSections({ introduction: defaultSection(), body1: defaultSection(), body2: defaultSection(), conclusion: defaultSection() });
    setActiveSection('introduction');
    setStep('write');
  }

  function handleReset() {
    localStorage.removeItem(CACHE_KEY);
    setStep('pick'); setTopic(null); setMi1(''); setMi2(''); setActiveSection('introduction');
    setSections({ introduction: defaultSection(), body1: defaultSection(), body2: defaultSection(), conclusion: defaultSection() });
  }

  // Step 1: Pick topic
  if (step === 'pick') {
    return (
      <div className="max-w-3xl mx-auto pt-2">
        <p className="text-(--text-muted) mb-5 text-sm">
          Pick a topic, set your main ideas, then write each section (Intro → Body 1 → Body 2 → Conclusion) with AI review after each one.
        </p>
        <div className="space-y-3">
          {ESSAY_TOPICS.map((t) => (
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
      </div>
    );
  }

  // Step 2: Set MI1 / MI2
  if (step === 'setup' && topic) {
    return (
      <div className="max-w-2xl mx-auto pt-2">
        <button onClick={() => setStep('pick')} className="text-sm text-primary hover:underline mb-4">← Back</button>
        <h2 className="text-lg font-bold text-(--text) mb-1">Set Your Main Ideas</h2>
        <p className="text-sm text-(--text-muted) mb-1">Topic:</p>
        <p className="font-medium text-(--text) mb-5 p-3 bg-(--bg-card) rounded-lg border border-(--border)">{topic.title}</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-(--text) mb-1">Main Idea 1 (MI1)</label>
            <input
              value={mi1}
              onChange={(e) => setMi1(e.target.value)}
              placeholder="e.g. Transition to Renewable Energy"
              className="w-full px-4 py-2.5 rounded-lg border border-(--border) bg-(--bg-card) text-(--text) text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-(--text) mb-1">Main Idea 2 (MI2)</label>
            <input
              value={mi2}
              onChange={(e) => setMi2(e.target.value)}
              placeholder="e.g. Stronger Governmental Regulations"
              className="w-full px-4 py-2.5 rounded-lg border border-(--border) bg-(--bg-card) text-(--text) text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>
        <button
          onClick={handleStartWriting}
          disabled={!mi1.trim() || !mi2.trim()}
          className="mt-6 w-full py-3 rounded-xl bg-primary text-white font-semibold disabled:opacity-40 hover:bg-primary-dark transition-colors"
        >
          Start Writing
        </button>
      </div>
    );
  }

  // Step 3: Write sections
  if (step === 'write' && topic) {
    const activeSec = sections[activeSection];
    const activeInfo = SECTIONS.find((s) => s.key === activeSection)!;
    const allDone = SECTIONS.every((s) => sections[s.key].review !== null);

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
          <button
            onClick={handleReset}
            className="text-xs text-(--text-muted) hover:text-primary border border-(--border) px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >
            Start Over
          </button>
        </div>

        {/* Section tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {SECTIONS.map((s) => {
            const done = sections[s.key].review !== null;
            const active = activeSection === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap border transition-colors ${
                  active ? 'bg-primary text-white border-primary'
                  : done ? 'bg-primary/10 text-primary border-primary/30'
                  : 'bg-(--bg-card) text-(--text-muted) border-(--border) hover:border-primary'
                }`}
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
            {activeSection === 'body1' && (
              <p className="text-xs bg-primary/8 text-primary px-3 py-2 rounded-lg mb-3 border border-primary/20">
                <strong>MI1:</strong> {mi1}
              </p>
            )}
            {activeSection === 'body2' && (
              <p className="text-xs bg-primary/8 text-primary px-3 py-2 rounded-lg mb-3 border border-primary/20">
                <strong>MI2:</strong> {mi2}
              </p>
            )}
            <textarea
              value={activeSec.text}
              onChange={(e) => updateSection(activeSection, { text: e.target.value, review: null, error: '' })}
              rows={5}
              placeholder={`Write your ${activeInfo.label.toLowerCase()} here...`}
              className="w-full px-4 py-3 rounded-lg border border-(--border) bg-(--bg-card) text-(--text) text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            {activeSec.error && <p className="text-primary text-xs mt-1">{activeSec.error}</p>}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleReview(activeSection)}
                disabled={activeSec.loading || !activeSec.text.trim()}
                className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold disabled:opacity-40 hover:bg-primary-dark transition-colors"
              >
                {activeSec.loading ? 'Reviewing...' : 'Get AI Review'}
              </button>
              {activeSec.review && activeSection !== 'conclusion' && (
                <button
                  onClick={() => {
                    const idx = SECTIONS.findIndex((s) => s.key === activeSection);
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
              {/* Score + structure status */}
              <div className="p-4 rounded-xl border border-(--border) bg-(--bg-card)">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-(--text)">Score</span>
                  <span className="text-2xl font-bold text-primary">{activeSec.review.score}/100</span>
                </div>
                <div className="w-full bg-primary/10 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-primary transition-all" style={{ width: `${activeSec.review.score}%` }} />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${activeSec.review.meetsStructure ? 'bg-primary/10 text-primary' : 'bg-primary/20 text-primary'}`}>
                    {activeSec.review.meetsStructure ? '✓ Structure met' : '✗ Structure issues'}
                  </span>
                  <span className="text-(--text-muted) text-xs">
                    {activeSec.review.sentenceCount} sentence{activeSec.review.sentenceCount !== 1 ? 's' : ''} (expected {activeSec.review.expectedSentenceCount})
                  </span>
                </div>
                <p className="text-sm text-(--text-muted) mt-2">{activeSec.review.structureFeedback}</p>
              </div>

              {/* Structure breakdown — per-sentence checklist from the board */}
              {activeSec.review.structureBreakdown && activeSec.review.structureBreakdown.length > 0 && (
                <div className="p-4 rounded-xl border border-(--border) bg-(--bg-card)">
                  <h4 className="text-sm font-semibold text-(--text) mb-3">Structure Check (Board Criteria)</h4>
                  <div className="space-y-2">
                    {activeSec.review.structureBreakdown.map((row, i) => (
                      <div key={i} className={`flex gap-3 p-2.5 rounded-lg text-sm border ${
                        row.status === 'met' ? 'border-primary/20 bg-primary/5' : 'border-(--border) bg-(--bg-card)'
                      }`}>
                        <span className={`shrink-0 font-bold text-xs mt-0.5 ${row.status === 'met' ? 'text-primary' : 'text-(--text-muted)'}`}>
                          {row.status === 'met' ? '✓' : row.status === 'missing' ? '—' : '✗'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-xs ${row.status === 'met' ? 'text-primary' : 'text-(--text)'}`}>{row.label}</p>
                          <p className="text-xs text-(--text-muted) mt-0.5">{row.note}</p>
                        </div>
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

              {/* Vocabulary upgrade suggestions */}
              {activeSec.review.vocabSuggestions && activeSec.review.vocabSuggestions.length > 0 && (
                <div className="p-4 rounded-xl border border-(--border) bg-(--bg-card)">
                  <h4 className="text-sm font-semibold text-(--text) mb-1">Vocab Upgrade</h4>
                  <p className="text-xs text-(--text-muted) mb-3">Words you used — and stronger alternatives</p>
                  <div className="space-y-3">
                    {activeSec.review.vocabSuggestions.map((v, i) => (
                      <div key={i} className="border border-(--border) rounded-xl overflow-hidden">
                        {/* Used word */}
                        <div className="px-3 py-2 bg-(--bg-secondary)/40 border-b border-(--border)">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono font-bold text-(--text) line-through text-primary/60">{v.wordUsed}</span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{v.wordClass}</span>
                          </div>
                          <p className="text-xs text-(--text-muted) mt-0.5">{v.why}</p>
                        </div>
                        {/* Alternatives */}
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

        {allDone && (
          <div className="mt-8 p-5 rounded-2xl border border-primary/30 bg-primary/5">
            <h3 className="font-bold text-(--text) text-lg mb-4">Full Essay</h3>
            <div className="space-y-5">
              {SECTIONS.map((s) => (
                <div key={s.key}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">{s.label}</p>
                  <p className="text-sm text-(--text) leading-relaxed">{sections[s.key].text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
