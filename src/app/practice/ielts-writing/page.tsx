'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Send, RotateCcw, CheckCircle2, BookOpen,
  AlertCircle, Lightbulb, FileText, BarChart2, Sparkles, PenLine,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ControlledCollapsibleCard } from '@/components/ui/CollapsibleCard';
import { CorrectionList, VocabList } from '@/components/ui/FeedbackBlocks';
import type { TaskType } from '@/app/api/ielts-writing/route';
import type { IeltsResult, TaskPrompt } from '@/types/ielts-writing';
import { TASK1_PROMPTS, TASK2_PROMPTS } from '@/data/writing/ieltsWritingPrompts';
import { CriterionRow } from '@/components/writing/CriterionRow';
import { ImprovementPlan } from '@/components/writing/ImprovementPlan';

// ── Page ──────────────────────────────────────────────────────────────

export default function IeltsWritingPage() {
  const [taskType, setTaskType] = useState<TaskType | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<TaskPrompt | null>(null);
  const [essay, setEssay] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IeltsResult | null>(null);
  const [error, setError] = useState('');

  const [openTask, setOpenTask] = useState(false);
  const [openCoherence, setOpenCoherence] = useState(false);
  const [openLexical, setOpenLexical] = useState(false);
  const [openGrammar, setOpenGrammar] = useState(false);
  const [showCorrections, setShowCorrections] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const [showImproved, setShowImproved] = useState(false);

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const minWords = taskType === 'task2' ? 250 : 150;
  const prompts = taskType === 'task2' ? TASK2_PROMPTS : TASK1_PROMPTS;

  const resetPanels = () => {
    setOpenTask(false); setOpenCoherence(false);
    setOpenLexical(false); setOpenGrammar(false);
    setShowCorrections(false); setShowVocab(false); setShowImproved(false);
  };

  const handleSubmit = async () => {
    if (!essay.trim() || !selectedPrompt || !taskType) return;
    setLoading(true);
    setResult(null);
    setError('');
    resetPanels();
    try {
      const res = await fetch('/api/ielts-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ essay: essay.trim(), taskType, prompt: selectedPrompt.question }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message ?? 'Terjadi kesalahan.'); return; }
      setResult(data as IeltsResult);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('Tidak bisa terhubung ke server. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setEssay(''); setResult(null); setError(''); };

  // ── Step 1: Task type selector ────────────────────────────────────
  if (!taskType) {
    return (
      <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-6 animate-fade-in">
        <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Practice
        </Link>
        <div>
          <h1 className="text-xl font-bold text-(--text) flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary" /> IELTS Writing Practice
          </h1>
          <p className="text-sm text-(--text-secondary) mt-1">
            Pilih task, tulis essay — AI memberi band score berdasarkan 4 kriteria resmi IELTS.
          </p>
        </div>

        <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4">
          <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wide mb-3">4 Kriteria Penilaian</p>
          <div className="grid grid-cols-2 gap-2">
            {['Task Achievement / Response', 'Coherence & Cohesion', 'Lexical Resource', 'Grammatical Range & Accuracy'].map(l => (
              <div key={l} className="rounded-lg px-3 py-2 text-xs font-medium bg-primary/10 text-primary border border-primary/20">{l}</div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <TaskTypeCard
            icon={<BarChart2 className="w-6 h-6" />}
            title="Task 1"
            sub="Academic · Describe Visual Data"
            desc="Deskripsikan grafik, diagram, atau proses. Minimal 150 kata."
            tags={['Bar Chart', 'Line Graph', 'Pie Chart', 'Process']}
            highlight
            onClick={() => setTaskType('task1')}
          />
          <TaskTypeCard
            icon={<PenLine className="w-6 h-6" />}
            title="Task 2"
            sub="Academic · Write an Essay"
            desc="Tulis essay argumentatif. Minimal 250 kata. Nilai 2× lipat dari Task 1."
            tags={['Opinion', 'Discussion', 'Problem-Solution', 'Advantages-Disadvantages']}
            onClick={() => setTaskType('task2')}
          />
        </div>
      </div>
    );
  }

  // ── Step 2: Prompt selector ───────────────────────────────────────
  if (!selectedPrompt) {
    return (
      <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-5 animate-fade-in">
        <button onClick={() => setTaskType(null)} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Ganti Task
        </button>
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
            IELTS Writing {taskType === 'task1' ? 'Task 1' : 'Task 2'}
          </span>
          <h1 className="text-xl font-bold text-(--text) mt-2">Pilih Soal</h1>
        </div>
        <div className="space-y-3">
          {prompts.map(p => (
            <button key={p.id} onClick={() => setSelectedPrompt(p)}
              className="w-full text-left bg-(--bg-card) border-2 border-primary/30 rounded-xl p-4 hover:shadow-sm hover:border-primary/60 transition-all group"
            >
              <h3 className="font-semibold text-sm text-primary group-hover:underline">{p.title}</h3>
              <p className="text-sm text-(--text-secondary) mt-1 leading-relaxed line-clamp-3">{p.question}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Step 3: Write + result ─────────────────────────────────────────
  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <button onClick={() => { setSelectedPrompt(null); handleReset(); }} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Ganti Soal
        </button>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
          IELTS {taskType === 'task1' ? 'Task 1' : 'Task 2'}
        </span>
      </div>

      {/* Question card */}
      <div className="rounded-xl border-l-4 border-l-primary p-4 bg-(--bg-card) border border-(--border)">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">{selectedPrompt.title}</p>
        <p className="text-sm text-(--text) leading-relaxed whitespace-pre-line">{selectedPrompt.question}</p>
        <div className="mt-3 space-y-1">
          {selectedPrompt.tips.map((tip, i) => (
            <p key={i} className="text-xs text-(--text-muted) flex items-start gap-1.5">
              <Lightbulb className="w-3 h-3 mt-0.5 shrink-0 text-primary/60" />
              {tip}
            </p>
          ))}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-4">
          {/* Overall band */}
          <div className="rounded-2xl border-2 border-(--border) bg-(--bg-card) p-6 text-center">
            <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-widest mb-1">Overall Band Score</p>
            <div className={cn('text-6xl font-black', result.overallBand >= 7 ? 'text-primary' : result.overallBand >= 5.5 ? 'text-(--text)' : 'text-(--text-muted)')}>
              {result.overallBand}
            </div>
            <p className="text-sm text-(--text-secondary) mt-3 leading-relaxed max-w-lg mx-auto">{result.generalFeedback}</p>
          </div>

          {/* 4 Criteria */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wide">Detail per Kriteria</p>
            <CriterionRow label={taskType === 'task1' ? 'Task Achievement' : 'Task Response'} band={result.taskBand} feedback={result.taskFeedback} improvement={result.taskImprovement} open={openTask} onToggle={() => setOpenTask(v => !v)} />
            <CriterionRow label="Coherence & Cohesion" band={result.coherenceBand} feedback={result.coherenceFeedback} improvement={result.coherenceImprovement} open={openCoherence} onToggle={() => setOpenCoherence(v => !v)} />
            <CriterionRow label="Lexical Resource" band={result.lexicalBand} feedback={result.lexicalFeedback} improvement={result.lexicalImprovement} open={openLexical} onToggle={() => setOpenLexical(v => !v)} />
            <CriterionRow label="Grammatical Range & Accuracy" band={result.grammarBand} feedback={result.grammarFeedback} improvement={result.grammarImprovement} open={openGrammar} onToggle={() => setOpenGrammar(v => !v)} />
          </div>

          {/* Improvement plan */}
          {(result.taskImprovement || result.coherenceImprovement || result.lexicalImprovement || result.grammarImprovement) && (
            <ImprovementPlan result={result} taskType={taskType} />
          )}

          {/* Corrections */}
          {result.corrections?.length > 0 && (
            <ControlledCollapsibleCard
              open={showCorrections}
              onToggle={() => setShowCorrections(v => !v)}
              icon={<CheckCircle2 className="w-4 h-4 text-primary" />}
              title="Koreksi Grammar & Struktur"
              badge={<span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">{result.corrections.length}</span>}
            >
              <CorrectionList items={result.corrections} />
            </ControlledCollapsibleCard>
          )}

          {/* Vocab enhancements */}
          {result.vocabularyEnhancements?.length > 0 && (
            <ControlledCollapsibleCard
              open={showVocab}
              onToggle={() => setShowVocab(v => !v)}
              icon={<BookOpen className="w-4 h-4 text-primary" />}
              title="Peningkatan Kosakata"
              badge={<span className="text-[10px] px-2 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-muted) border border-(--border) font-semibold">{result.vocabularyEnhancements.length}</span>}
            >
              <VocabList items={result.vocabularyEnhancements} />
            </ControlledCollapsibleCard>
          )}

          {/* Improved essay */}
          <ControlledCollapsibleCard
            open={showImproved}
            onToggle={() => setShowImproved(v => !v)}
            icon={<Sparkles className="w-4 h-4 text-primary" />}
            title="Essay yang Ditingkatkan (Band 7+)"
          >
            <p className="text-sm text-(--text) leading-relaxed whitespace-pre-wrap">{result.improvedEssay}</p>
          </ControlledCollapsibleCard>

          <button onClick={handleReset} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-(--border) bg-(--bg-card) text-sm font-semibold text-(--text) hover:bg-(--bg-secondary) transition-colors">
            <RotateCcw className="w-4 h-4" /> Tulis Ulang Essay
          </button>
        </div>
      )}

      {/* Writing form */}
      {!result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-(--text) flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> Jawaban Kamu
            </label>
            <span className={cn('text-xs font-semibold tabular-nums', wordCount >= minWords ? 'text-primary' : 'text-(--text-muted)')}>
              {wordCount} / {minWords}+ kata
            </span>
          </div>
          <textarea
            value={essay}
            onChange={e => setEssay(e.target.value)}
            placeholder={taskType === 'task1'
              ? 'Deskripsikan data dalam grafik/diagram. Mulai dengan paraphrase soal, lalu overview, kemudian detail...'
              : 'Tulis essay kamu di sini. Mulai dengan introduction yang jelas tentang posisimu...'
            }
            rows={14}
            className="w-full px-4 py-3 rounded-xl border border-(--border) bg-(--bg-card) text-(--text) text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 leading-relaxed"
          />

          {error && (
            <div className="flex items-center gap-2 text-sm bg-primary/5 border border-primary/20 rounded-xl p-3 text-(--text-secondary)">
              <AlertCircle className="w-4 h-4 text-primary shrink-0" />
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || wordCount < 20}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all',
              loading || wordCount < 20
                ? 'bg-(--bg-secondary) text-(--text-muted) cursor-not-allowed'
                : 'bg-primary text-white hover:opacity-90 active:scale-[0.98]',
            )}
          >
            {loading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> AI sedang menilai essay kamu...</>
              : <><Send className="w-4 h-4" /> Submit & Lihat Band Score</>
            }
          </button>

          <p className="text-center text-xs text-(--text-muted)">
            {taskType === 'task1' ? 'Minimum 150 kata untuk Task 1.' : 'Minimum 250 kata untuk Task 2.'} Di bawah minimum akan mengurangi band score.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Local component (only used on this page) ──────────────────────────

function TaskTypeCard({ icon, title, sub, desc, tags, highlight, onClick }: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  desc: string;
  tags: string[];
  highlight?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-left bg-(--bg-card) border-2 rounded-2xl p-5 hover:shadow-md transition-all',
        highlight ? 'border-primary/40 hover:border-primary/70' : 'border-(--border) hover:border-primary/40',
      )}
    >
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', highlight ? 'bg-primary/10 text-primary' : 'bg-(--bg-secondary) text-(--text-secondary)')}>
        {icon}
      </div>
      <h2 className="text-lg font-bold text-(--text)">{title}</h2>
      <p className={cn('text-xs font-semibold mt-0.5', highlight ? 'text-primary' : 'text-(--text-secondary)')}>{sub}</p>
      <p className="text-sm text-(--text-secondary) mt-2 leading-relaxed">{desc}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tags.map(t => (
          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-muted) border border-(--border)">{t}</span>
        ))}
      </div>
    </button>
  );
}
