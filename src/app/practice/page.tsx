import { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap, Brain, PenLine, RotateCcw, BookCheck,
  FileText, ClipboardList, BookOpen, Shuffle, MessageCircle,
  Sparkles, ChevronRight, ListChecks, BarChart2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Practice',
  description: 'Practice your English vocabulary and grammar skills.',
};

// ── Types ──────────────────────────────────────────────────────────
interface PracticeItem {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  badge?: string | null;
}

// ── Sections ───────────────────────────────────────────────────────

const vocabItems: PracticeItem[] = [
  {
    href: '/practice/vocab-sinonim',
    title: 'Sinonim & Makna',
    description: 'Kenali sinonim & makna kata dari level A1 → C2. Progress tersimpan, harus selesaikan tiap stage untuk lanjut.',
    icon: BookOpen,
    color: 'bg-primary/10 text-primary',
    badge: 'A1 → C2',
  },
  {
    href: '/practice/quiz',
    title: 'Multiple Choice Quiz',
    description: 'Tes pengetahuan vocab dengan pilihan ganda. Pilih arti yang benar dari setiap kata.',
    icon: Brain,
    color: 'bg-primary/10 text-primary',
  },
  {
    href: '/practice/fill-blanks',
    title: 'Fill in the Blanks',
    description: 'Lengkapi kalimat dengan mengetik kata yang hilang. Cocok untuk latihan ejaan dan konteks.',
    icon: PenLine,
    color: 'bg-accent/10 text-accent',
  },
  {
    href: '/practice/review',
    title: 'Vocabulary Review',
    description: 'Flip kartu vocab untuk mengulang kata yang sudah dipelajari atau perlu latihan lebih.',
    icon: RotateCcw,
    color: 'bg-success/10 text-success',
  },
];

const grammarItems: PracticeItem[] = [
  {
    href: '/practice/structure-1000',
    title: 'Structure 1000 Soal',
    description: '700 soal TOEFL Structure pilihan ganda dari buku "1000 Soal Grammar". Ada level All, Basic, Intermediate, dan Advance.',
    icon: ListChecks,
    color: 'bg-primary/10 text-primary',
    badge: '700 soal',
  },
  {
    href: '/practice/grammar-contoh',
    title: 'Buat Contoh + AI Review',
    description: 'Pilih topik grammar → tulis kalimat contoh → AI review: benar/salah, koreksi, breakdown, dan tips.',
    icon: Sparkles,
    color: 'bg-primary/10 text-primary',
    badge: 'AI',
  },
  {
    href: '/practice/latihan-acak',
    title: 'Latihan Acak Grammar',
    description: '20 soal acak dari 88 bank soal — Parts of Speech, Verb Agreement, Adj vs Adv, Quantifier, Pronoun.',
    icon: Shuffle,
    color: 'bg-primary/10 text-primary',
    badge: '88 bank soal',
  },
  {
    href: '/practice/grammar-quiz',
    title: 'Grammar Quiz',
    description: '25 soal pilihan ganda dari semua parts of speech: Nouns, Verbs, Adjectives, Adverbs, Pronouns, dll.',
    icon: BookCheck,
    color: 'bg-primary/10 text-primary',
  },
  {
    href: '/practice/grammar-evaluator',
    title: 'Grammar Evaluator',
    description: '30 soal (A-D) dengan koreksi detail: rule, error type, corrected sentence, dan extra practice.',
    icon: FileText,
    color: 'bg-fuchsia-500/10 text-fuchsia-600',
    badge: '30Q',
  },
];

const writingItems: PracticeItem[] = [
  {
    href: '/practice/latihan-surat',
    title: 'Latihan Menulis Surat',
    description: 'Tulis surat formal atau informal berdasarkan skenario, lalu AI koreksi struktur, grammar, tone, dan kosakata.',
    icon: FileText,
    color: 'bg-primary/10 text-primary',
    badge: 'AI Review',
  },
  {
    href: '/practice/ielts-writing',
    title: 'IELTS Writing Practice',
    description: 'Latihan Task 1 (deskripsi grafik) & Task 2 (essay). AI beri band score 0–9 berdasarkan 4 kriteria resmi IELTS: Task Achievement, Coherence, Lexical, Grammar.',
    icon: BarChart2,
    color: 'bg-primary/10 text-primary',
    badge: 'Band Score',
  },
];

const tnItems: PracticeItem[] = [
  {
    href: '/practice/grammar-latihan',
    title: 'Practice Grammar TN',
    description: 'Latihan soal langsung dari materi grammar Basic, Intermediate, dan Advance TitikNolJourney.',
    icon: GraduationCap,
    color: 'bg-primary/10 text-primary',
    badge: 'Basic · Inter · Adv',
  },
  {
    href: '/practice/tugas-grammar',
    title: 'Tugas Grammar',
    description: 'Kumpulan tugas & kisi-kisi dari tutor: Articles, Nouns, Pronouns, Mid Test, Reading, dan Speaking.',
    icon: ClipboardList,
    color: 'bg-primary/10 text-primary',
    badge: '6 paket',
  },
  {
    href: '/practice/kisi-kisi',
    title: 'Kisi-Kisi Mid Test',
    description: 'Persiapan Mid Test: Reading (comprehension) dan Speaking (greeting, identity, family, hobby, dll).',
    icon: BookOpen,
    color: 'bg-primary/10 text-primary',
    badge: '2 paket',
  },
  {
    href: '/practice/conversations',
    title: 'Daily Conversations',
    description: 'Percakapan sehari-hari di berbagai situasi: restoran, sekolah, belanja, rumah sakit + terjemahan.',
    icon: MessageCircle,
    color: 'bg-primary/10 text-primary',
    badge: '12 dialog',
  },
];

// ── Section component ──────────────────────────────────────────────

function SectionHeader({
  title, subtitle, accent,
}: { title: string; subtitle: string; accent: string }) {
  return (
    <div className={`flex items-center gap-3 pb-3 border-b-2 ${accent}`}>
      <div>
        <h2 className="text-base font-bold text-(--text)">{title}</h2>
        <p className="text-xs text-(--text-muted) mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function PracticeCard({ item }: { item: PracticeItem }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className="bg-(--bg-card) border border-(--border) rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        {item.badge && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-muted) border border-(--border)">
            {item.badge}
          </span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-(--text) group-hover:text-primary transition-colors leading-snug">
          {item.title}
        </h3>
        <p className="text-xs text-(--text-secondary) leading-relaxed mt-1">
          {item.description}
        </p>
      </div>
      <div className="flex items-center justify-end">
        <ChevronRight className="w-4 h-4 text-(--text-muted) group-hover:text-primary transition-colors" />
      </div>
    </Link>
  );
}

// ── Page ───────────────────────────────────────────────────────────

export default function PracticePage() {
  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-10 animate-fade-in">

      <div>
        <h1 className="text-2xl font-bold text-(--text)">Practice</h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          Pilih mode latihan sesuai kebutuhan.
        </p>
      </div>

      {/* ── Vocab ── */}
      <section className="space-y-4">
        <SectionHeader
          title="Latihan Vocabulary"
          subtitle="Latihan mandiri kosakata Bahasa Inggris"
          accent="border-primary/30 dark:border-primary/30"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {vocabItems.map(item => <PracticeCard key={item.href} item={item} />)}
        </div>
      </section>

      {/* ── Writing ── */}
      <section className="space-y-4">
        <SectionHeader
          title="Latihan Writing"
          subtitle="Latihan menulis teks dengan koreksi AI"
          accent="border-primary/30 dark:border-primary/30"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {writingItems.map(item => <PracticeCard key={item.href} item={item} />)}
        </div>
      </section>

      {/* ── Grammar ── */}
      <section className="space-y-4">
        <SectionHeader
          title="Latihan Grammar"
          subtitle="Latihan tata bahasa Inggris umum"
          accent="border-primary/30 dark:border-primary/30"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {grammarItems.map(item => <PracticeCard key={item.href} item={item} />)}
        </div>
      </section>

      {/* ── TN ── */}
      <section className="space-y-4">
        <SectionHeader
          title="TitikNolJourney (TN)"
          subtitle="Materi & latihan dari kelas TitikNolJourney"
          accent="border-primary/30 dark:border-primary/30"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tnItems.map(item => <PracticeCard key={item.href} item={item} />)}
        </div>
      </section>

    </div>
  );
}
