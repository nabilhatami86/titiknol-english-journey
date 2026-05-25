'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Send, RotateCcw, ChevronDown, ChevronUp,
  FileText, BarChart2, Sparkles, CheckCircle2, Lightbulb,
  BookOpen, AlertCircle, PenLine,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TaskType } from '@/app/api/ielts-writing/route';

// ── Types ────────────────────────────────────────────────────────────

interface ImprovementTips {
  targetBand: number;
  steps: string[];
}

interface IeltsResult {
  overallBand: number;
  taskBand: number;
  coherenceBand: number;
  lexicalBand: number;
  grammarBand: number;
  taskFeedback: string;
  coherenceFeedback: string;
  lexicalFeedback: string;
  grammarFeedback: string;
  taskImprovement?: ImprovementTips;
  coherenceImprovement?: ImprovementTips;
  lexicalImprovement?: ImprovementTips;
  grammarImprovement?: ImprovementTips;
  corrections: { original: string; corrected: string; explanation: string }[];
  vocabularyEnhancements: { used: string; better: string; reason: string }[];
  improvedEssay: string;
  generalFeedback: string;
}

interface TaskPrompt {
  id: string;
  title: string;
  question: string;
  tips: string[];
}

// ── Prompts ──────────────────────────────────────────────────────────

const TASK1_PROMPTS: TaskPrompt[] = [
  {
    id: 't1-1',
    title: 'Internet Usage by Age Group',
    question: `The bar chart below shows the percentage of people in different age groups who used the internet daily in a particular country in 2010 and 2020.

[Chart description: In 2010 — Age 16-24: 72%, Age 25-34: 68%, Age 35-44: 55%, Age 45-54: 42%, Age 55-64: 28%, Age 65+: 15%. In 2020 — Age 16-24: 96%, Age 25-34: 94%, Age 35-44: 90%, Age 45-54: 82%, Age 55-64: 68%, Age 65+: 48%]

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.`,
    tips: [
      'Tulis overview di paragraf kedua (jangan di intro)',
      'Bandingkan tren antara 2010 dan 2020',
      'Gunakan data spesifik (angka persentase)',
      'Jangan tulis opini atau kesimpulan pribadi',
    ],
  },
  {
    id: 't1-2',
    title: 'Population Growth in Three Cities',
    question: `The line graph below shows the population (in millions) of three cities — Tokyo, Lagos, and Sydney — from 1980 to 2020 with projections to 2040.

[Chart description: Tokyo: 1980=8.5M, 1990=11M, 2000=12.5M, 2010=13M, 2020=13.5M, 2040=13M (projected). Lagos: 1980=2M, 1990=4M, 2000=7M, 2010=10.5M, 2020=14.8M, 2040=24M (projected). Sydney: 1980=3M, 1990=3.6M, 2000=4M, 2010=4.4M, 2020=5.3M, 2040=6.5M (projected)]

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.`,
    tips: [
      'Identifikasi tren utama setiap kota',
      'Bandingkan pertumbuhan yang paling signifikan',
      'Sebutkan nilai tertinggi dan terendah',
      'Gunakan language of trends: rose sharply, remained stable, is projected to',
    ],
  },
  {
    id: 't1-3',
    title: 'Energy Sources — Pie Chart',
    question: `The pie charts below show the proportion of electricity generated from different energy sources in Country X in 2000 and 2022.

[Chart description: 2000 — Coal: 52%, Natural Gas: 20%, Nuclear: 15%, Hydroelectric: 8%, Renewables: 5%. 2022 — Coal: 28%, Natural Gas: 22%, Nuclear: 12%, Hydroelectric: 10%, Renewables: 28%]

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.`,
    tips: [
      'Highlight perubahan paling signifikan (coal turun, renewables naik)',
      'Bandingkan dua pie chart secara langsung',
      'Gunakan frasa perbandingan: whereas, while, compared to',
      'Jangan jelaskan SEMUA angka — pilih yang paling penting',
    ],
  },
  {
    id: 't1-4',
    title: 'Water Recycling Process',
    question: `The diagram below illustrates the process of water recycling in a modern city.

[Process description: (1) Rainwater collected from rooftops → (2) Stored in underground tanks → (3) Filtered through sand and gravel layers → (4) Treated with UV light to kill bacteria → (5) Pumped to storage reservoir → (6) Distributed for non-drinking uses (toilets, gardening, industrial) → (7) Wastewater collected → (8) Sent to treatment plant → back to step 3]

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.`,
    tips: [
      'Gunakan passive voice: water is collected, is filtered',
      'Deskripsikan proses secara berurutan dengan sequencers: first, then, after that, finally',
      'Sebutkan tujuan setiap tahap jika jelas dari diagram',
      'Jangan pakai opini pribadi',
    ],
  },
];

const TASK2_PROMPTS: TaskPrompt[] = [
  {
    id: 't2-1',
    title: 'Technology & Social Skills',
    question: `Some people believe that modern technology has made people less socially skilled. To what extent do you agree or disagree?

Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.`,
    tips: [
      'Nyatakan posisi (agree/disagree/partially) dengan jelas di intro',
      'Kembangkan 2 body paragraphs dengan satu main idea masing-masing',
      'Dukung argumen dengan contoh spesifik',
      'Tulis conclusion yang me-restate posisimu',
    ],
  },
  {
    id: 't2-2',
    title: 'Government vs Individual Health Responsibility',
    question: `Some argue that it is the responsibility of governments to ensure that all citizens have a healthy lifestyle. Others believe that individuals should take responsibility for their own health.

Discuss both views and give your own opinion. Write at least 250 words.`,
    tips: [
      'Bahas KEDUA pandangan secara seimbang sebelum memberikan opini',
      'Gunakan language of discussion: proponents argue, critics contend, on the other hand',
      'Nyatakan opinimu di intro dan ulangi di conclusion',
      'Tambahkan contoh konkret (kebijakan pemerintah, gaya hidup individu)',
    ],
  },
  {
    id: 't2-3',
    title: 'Traffic Congestion in Cities',
    question: `Traffic congestion in cities is a growing problem worldwide.

What are the main causes of this problem? What measures could be taken to solve it? Write at least 250 words.`,
    tips: [
      'Bahas PENYEBAB di body 1 dan SOLUSI di body 2',
      'Berikan 2-3 penyebab yang jelas dan logis',
      'Berikan 2-3 solusi yang realistis dan spesifik',
      'Pastikan solusi berhubungan langsung dengan penyebab yang disebutkan',
    ],
  },
  {
    id: 't2-4',
    title: 'Free University Education',
    question: `In some countries, university education is free for all students. Do you think this is a positive or negative development?

Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.`,
    tips: [
      'Pilih satu posisi: positive ATAU negative (hindari "it depends" yang tidak berkembang)',
      'Berikan 2 alasan kuat dengan penjelasan mendalam',
      'Gunakan contoh dari negara nyata jika memungkinkan',
      'Akui counter-argument dan refute dengan argumen yang lebih kuat',
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────

function bandLabel(b: number): string {
  if (b >= 9) return 'Expert';
  if (b >= 8) return 'Very Good';
  if (b >= 7) return 'Good';
  if (b >= 6) return 'Competent';
  if (b >= 5) return 'Modest';
  if (b >= 4) return 'Limited';
  return 'Very Limited';
}

function bandColor(b: number) {
  if (b >= 7) return 'text-primary';
  if (b >= 5.5) return 'text-(--text)';
  return 'text-(--text-muted)';
}

function bandBg(_b: number) {
  return 'bg-(--bg-card) border-(--border)';
}

function bandBarWidth(b: number) {
  return `${((b / 9) * 100).toFixed(0)}%`;
}

function bandBarColor(b: number) {
  if (b >= 7) return 'bg-primary';
  if (b >= 5.5) return 'bg-primary/50';
  return 'bg-primary/25';
}

// ── Criterion Row ─────────────────────────────────────────────────────

function CriterionRow({
  label, band, feedback, improvement, open, onToggle,
}: {
  label: string;
  band: number;
  feedback: string;
  improvement?: ImprovementTips;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn('rounded-xl border p-4', bandBg(band))}>
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-sm font-semibold text-(--text) shrink-0">{label}</span>
          <div className="flex-1 h-2 bg-(--bg-secondary) rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all', bandBarColor(band))}
              style={{ width: bandBarWidth(band) }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right">
            <span className={cn('text-lg font-bold', bandColor(band))}>{band}</span>
            <span className={cn('text-[10px] block font-medium', bandColor(band))}>{bandLabel(band)}</span>
          </div>
          {open ? <ChevronUp className="w-4 h-4 text-(--text-muted)" /> : <ChevronDown className="w-4 h-4 text-(--text-muted)" />}
        </div>
      </button>
      {open && (
        <div className="mt-3 border-t border-(--border) pt-3 space-y-3">
          <p className="text-sm text-(--text-secondary) leading-relaxed">{feedback}</p>
          {improvement && improvement.steps?.length > 0 && band < 9 && (
            <div className="bg-(--bg-secondary) rounded-lg p-3 space-y-2">
              <p className="text-xs font-semibold text-primary flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                Cara naik ke Band {improvement.targetBand}:
              </p>
              <ul className="space-y-1.5">
                {improvement.steps.map((step, i) => (
                  <li key={i} className="text-xs text-(--text-secondary) flex items-start gap-2">
                    <span className="shrink-0 w-4 h-4 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

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

  const handleSubmit = async () => {
    if (!essay.trim() || !selectedPrompt || !taskType) return;
    setLoading(true);
    setResult(null);
    setError('');
    setOpenTask(false);
    setOpenCoherence(false);
    setOpenLexical(false);
    setOpenGrammar(false);
    setShowCorrections(false);
    setShowVocab(false);
    setShowImproved(false);

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

  const handleReset = () => {
    setEssay('');
    setResult(null);
    setError('');
  };

  // ── STEP 1: Task Type Selector ────────────────────────────────────
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
            Pilih task, tulis essay kamu — AI akan memberi band score berdasarkan kriteria resmi IELTS.
          </p>
        </div>

        {/* Band criteria info */}
        <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4">
          <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wide mb-3">4 Kriteria Penilaian IELTS Writing</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Task Achievement / Response',
              'Coherence & Cohesion',
              'Lexical Resource',
              'Grammatical Range & Accuracy',
            ].map(label => (
              <div key={label} className="rounded-lg px-3 py-2 text-xs font-medium bg-primary/8 text-primary border border-primary/20">
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Task 1 */}
          <button
            onClick={() => setTaskType('task1')}
            className="text-left bg-(--bg-card) border-2 border-primary/40 rounded-2xl p-5 hover:shadow-md hover:border-primary/70 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-(--text)">Task 1</h2>
            <p className="text-xs font-semibold text-primary mt-0.5">Academic · Describe Visual Data</p>
            <p className="text-sm text-(--text-secondary) mt-2 leading-relaxed">
              Deskripsikan grafik, diagram, atau proses. Minimal 150 kata. Fokus pada fitur utama dan perbandingan.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['Bar Chart', 'Line Graph', 'Pie Chart', 'Process'].map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-muted) border border-(--border)">{t}</span>
              ))}
            </div>
          </button>

          {/* Task 2 */}
          <button
            onClick={() => setTaskType('task2')}
            className="text-left bg-(--bg-card) border-2 border-(--border) rounded-2xl p-5 hover:shadow-md hover:border-primary/40 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-(--bg-secondary) text-(--text-secondary) flex items-center justify-center mb-4">
              <PenLine className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-(--text)">Task 2</h2>
            <p className="text-xs font-semibold text-(--text-secondary) mt-0.5">Academic · Write an Essay</p>
            <p className="text-sm text-(--text-secondary) mt-2 leading-relaxed">
              Tulis essay argumentatif tentang topik yang diberikan. Minimal 250 kata. Nilai 2× lipat dari Task 1.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['Opinion', 'Discussion', 'Problem-Solution', 'Advantages-Disadvantages'].map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-muted) border border-(--border)">{t}</span>
              ))}
            </div>
          </button>
        </div>
      </div>
    );
  }

  const taskColor = 'text-primary';
  const taskBadge = 'bg-primary/10 text-primary';
  const taskBorder = 'border-primary/40';
  const taskBorderL = 'border-l-primary';

  // ── STEP 2: Prompt Selector ────────────────────────────────────────
  if (!selectedPrompt) {
    return (
      <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-5 animate-fade-in">
        <button onClick={() => setTaskType(null)} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Ganti Task
        </button>
        <div>
          <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', taskBadge)}>
            IELTS Writing {taskType === 'task1' ? 'Task 1' : 'Task 2'}
          </span>
          <h1 className="text-xl font-bold text-(--text) mt-2">Pilih Soal</h1>
          <p className="text-sm text-(--text-secondary) mt-0.5">Pilih satu soal untuk kamu jawab.</p>
        </div>
        <div className="space-y-3">
          {prompts.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPrompt(p)}
              className={cn('w-full text-left bg-(--bg-card) border-2 rounded-xl p-4 hover:shadow-sm transition-all group', taskBorder)}
            >
              <h3 className={cn('font-semibold text-sm group-hover:underline', taskColor)}>{p.title}</h3>
              <p className="text-sm text-(--text-secondary) mt-1 leading-relaxed line-clamp-3">{p.question}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── STEP 3: Write + Result ─────────────────────────────────────────
  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <button
          onClick={() => { setSelectedPrompt(null); handleReset(); }}
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Ganti Soal
        </button>
        <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', taskBadge)}>
          IELTS {taskType === 'task1' ? 'Task 1' : 'Task 2'}
        </span>
      </div>

      {/* Question card */}
      <div className={cn('rounded-xl border-l-4 p-4 bg-(--bg-card) border border-(--border)', taskBorderL)}>
        <p className={cn('text-xs font-semibold uppercase tracking-wide mb-2', taskColor)}>{selectedPrompt.title}</p>
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

      {/* ── RESULT VIEW ─────────────────────────────────────────────── */}
      {result && (
        <div className="space-y-4">
          {/* Overall band */}
          <div className={cn('rounded-2xl border-2 p-6 text-center', bandBg(result.overallBand))}>
            <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-widest mb-1">Overall Band Score</p>
            <div className={cn('text-6xl font-black', bandColor(result.overallBand))}>{result.overallBand}</div>
            <p className={cn('text-base font-bold mt-1', bandColor(result.overallBand))}>{bandLabel(result.overallBand)}</p>
            <p className="text-sm text-(--text-secondary) mt-3 leading-relaxed max-w-lg mx-auto">{result.generalFeedback}</p>
          </div>

          {/* 4 Criteria */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wide">Detail per Kriteria</p>
            <CriterionRow
              label={taskType === 'task1' ? 'Task Achievement' : 'Task Response'}
              band={result.taskBand}
              feedback={result.taskFeedback}
              improvement={result.taskImprovement}
              open={openTask}
              onToggle={() => setOpenTask(v => !v)}
            />
            <CriterionRow
              label="Coherence & Cohesion"
              band={result.coherenceBand}
              feedback={result.coherenceFeedback}
              improvement={result.coherenceImprovement}
              open={openCoherence}
              onToggle={() => setOpenCoherence(v => !v)}
            />
            <CriterionRow
              label="Lexical Resource"
              band={result.lexicalBand}
              feedback={result.lexicalFeedback}
              improvement={result.lexicalImprovement}
              open={openLexical}
              onToggle={() => setOpenLexical(v => !v)}
            />
            <CriterionRow
              label="Grammatical Range & Accuracy"
              band={result.grammarBand}
              feedback={result.grammarFeedback}
              improvement={result.grammarImprovement}
              open={openGrammar}
              onToggle={() => setOpenGrammar(v => !v)}
            />
          </div>

          {/* Corrections */}
          {result.corrections?.length > 0 && (
            <div className="bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden">
              <button
                onClick={() => setShowCorrections(v => !v)}
                className="w-full flex items-center justify-between p-4 hover:bg-(--bg-secondary) transition-colors"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-(--text)">Koreksi Grammar & Struktur</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                    {result.corrections.length}
                  </span>
                </div>
                {showCorrections ? <ChevronUp className="w-4 h-4 text-(--text-muted)" /> : <ChevronDown className="w-4 h-4 text-(--text-muted)" />}
              </button>
              {showCorrections && (
                <div className="px-4 pb-4 space-y-3 border-t border-(--border) pt-3">
                  {result.corrections.map((c, i) => (
                    <div key={i} className="text-sm space-y-1">
                      <p className="line-through text-(--text-muted) bg-(--bg-secondary) px-2 py-1 rounded">{c.original}</p>
                      <p className="text-primary bg-primary/8 px-2 py-1 rounded font-medium">✓ {c.corrected}</p>
                      <p className="text-xs text-(--text-muted) pl-1">{c.explanation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Vocabulary Enhancements */}
          {result.vocabularyEnhancements?.length > 0 && (
            <div className="bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden">
              <button
                onClick={() => setShowVocab(v => !v)}
                className="w-full flex items-center justify-between p-4 hover:bg-(--bg-secondary) transition-colors"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-(--text)">Peningkatan Kosakata</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-muted) border border-(--border) font-semibold">
                    {result.vocabularyEnhancements.length}
                  </span>
                </div>
                {showVocab ? <ChevronUp className="w-4 h-4 text-(--text-muted)" /> : <ChevronDown className="w-4 h-4 text-(--text-muted)" />}
              </button>
              {showVocab && (
                <div className="px-4 pb-4 space-y-3 border-t border-(--border) pt-3">
                  {result.vocabularyEnhancements.map((v, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <div className="shrink-0">
                        <span className="line-through text-(--text-muted)">{v.used}</span>
                        <span className="mx-2 text-(--text-muted)">→</span>
                        <span className="font-semibold text-primary">{v.better}</span>
                      </div>
                      <p className="text-xs text-(--text-muted) leading-relaxed">{v.reason}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Improved Essay */}
          <div className="bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden">
            <button
              onClick={() => setShowImproved(v => !v)}
              className="w-full flex items-center justify-between p-4 hover:bg-(--bg-secondary) transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-(--text)">Essay yang Ditingkatkan (Band 7+)</span>
              </div>
              {showImproved ? <ChevronUp className="w-4 h-4 text-(--text-muted)" /> : <ChevronDown className="w-4 h-4 text-(--text-muted)" />}
            </button>
            {showImproved && (
              <div className="px-4 pb-4 border-t border-(--border) pt-3">
                <p className="text-sm text-(--text) leading-relaxed whitespace-pre-wrap">{result.improvedEssay}</p>
              </div>
            )}
          </div>

          {/* Try again */}
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-(--border) bg-(--bg-card) text-sm font-semibold text-(--text) hover:bg-(--bg-secondary) transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Tulis Ulang Essay
          </button>
        </div>
      )}

      {/* ── WRITING FORM (no result yet) ──────────────────────────── */}
      {!result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-(--text) flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> Jawaban Kamu
            </label>
            <span className={cn('text-xs font-semibold tabular-nums', wordCount >= minWords ? 'text-green-600 dark:text-green-400' : 'text-(--text-muted)')}>
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
            <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
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
                : 'bg-primary text-white hover:opacity-90 active:scale-[0.98]'
            )}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                AI sedang menilai essay kamu...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit & Lihat Band Score
              </>
            )}
          </button>

          <p className="text-center text-xs text-(--text-muted)">
            {taskType === 'task1'
              ? 'Minimum 150 kata untuk Task 1. Di bawah minimum akan mengurangi band score.'
              : 'Minimum 250 kata untuk Task 2. Di bawah minimum akan mengurangi band score.'}
          </p>
        </div>
      )}
    </div>
  );
}
