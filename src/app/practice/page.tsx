import { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Brain, PenLine, RotateCcw, BookCheck, FileText, ClipboardList, BookOpen, Shuffle, MessageCircle, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Practice',
  description: 'Practice your English vocabulary with quizzes, fill-in-the-blanks, and review modes.',
};

const modes = [
  {
    href: '/practice/quiz',
    title: 'Multiple Choice Quiz',
    description: 'Test your vocabulary knowledge with multiple choice questions. Choose the correct meaning for each word.',
    icon: Brain,
    color: 'bg-primary/10 text-primary',
    badge: null,
  },
  {
    href: '/practice/latihan-acak',
    title: 'Latihan Acak Grammar',
    description: '20 soal dipilih acak dari 88 bank soal setiap sesi — tidak bisa dihapal! Cakupan: Parts of Speech, Verb Agreement, Adj vs Adv, Another/Other, Quantifier, Pronoun.',
    icon: Shuffle,
    color: 'bg-primary/10 text-primary',
    badge: '88 bank soal',
  },
  {
    href: '/practice/grammar-contoh',
    title: 'Buat Contoh Kalimat + AI Review',
    description: 'Pilih topik grammar → tulis kalimat contoh → AI langsung review: benar/salah, koreksi, breakdown grammar, dan tips perbaikan.',
    icon: Sparkles,
    color: 'bg-rose-500/10 text-rose-600',
    badge: 'AI Feedback',
  },
  {
    href: '/practice/grammar-latihan',
    title: 'Practice Grammar — Basic · Inter · Advance',
    description: 'Latihan soal langsung dari materi grammar tiap level: Basic, Intermediate, dan Advance. Pilih level → pilih lesson → kerjakan soal.',
    icon: GraduationCap,
    color: 'bg-purple-500/10 text-purple-600',
    badge: '3 level',
  },
  {
    href: '/practice/grammar-quiz',
    title: 'Grammar Quiz',
    description: '25 soal pilihan ganda (ABCD) dari semua part of speech: Nouns, Verbs, Adjectives, Adverbs, Pronouns, Prepositions, Conjunctions, Articles.',
    icon: BookCheck,
    color: 'bg-amber-500/10 text-amber-600',
    badge: null,
  },
  {
    href: '/practice/grammar-evaluator',
    title: 'Grammar Evaluator (30Q)',
    description: 'Tes grammar 30 soal (A-D) dengan koreksi detail per nomor: rule, error type, corrected sentence, dan extra practice.',
    icon: FileText,
    color: 'bg-fuchsia-500/10 text-fuchsia-600',
    badge: null,
  },
  {
    href: '/practice/tugas-grammar',
    title: 'Tugas Grammar',
    description: 'Kumpulan tugas dan kisi-kisi grammar dari tutor: Articles, Nouns, Pronouns, Review Basic Grammar, Mid Test, Reading, dan Speaking.',
    icon: ClipboardList,
    color: 'bg-violet-500/10 text-violet-600',
    badge: '6 paket',
  },
  {
    href: '/practice/kisi-kisi',
    title: 'Kisi-Kisi Reading & Speaking',
    description: 'Persiapan Mid Test untuk Reading (comprehension Hobby & Interest) dan Speaking (greeting, identity, family, hobby, dll).',
    icon: BookOpen,
    color: 'bg-cyan-500/10 text-cyan-700',
    badge: '2 paket',
  },
  {
    href: '/practice/conversations',
    title: 'Daily Conversations',
    description: 'Pelajari percakapan sehari-hari di berbagai situasi: restoran, sekolah, belanja, dan rumah sakit. Dilengkapi terjemahan & key expressions.',
    icon: MessageCircle,
    color: 'bg-teal-500/10 text-teal-600',
    badge: '12 dialog',
  },
  {
    href: '/practice/fill-blanks',
    title: 'Fill in the Blanks',
    description: 'Complete sentences by typing the missing word. Great for spelling and context practice.',
    icon: PenLine,
    color: 'bg-accent/10 text-accent',
    badge: null,
  },
  {
    href: '/practice/review',
    title: 'Vocabulary Review',
    description: 'Flip through vocabulary cards to review words you have learned or need to practice.',
    icon: RotateCcw,
    color: 'bg-success/10 text-success',
    badge: null,
  },
];

export default function PracticePage() {
  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-primary" />
          Practice
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          Choose a practice mode to strengthen your vocabulary skills
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <Link
              key={mode.href}
              href={mode.href}
              className="bg-(--bg-card) border border-(--border) rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${mode.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                {mode.badge && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-secondary) border border-(--border)">
                    {mode.badge}
                  </span>
                )}
              </div>
              <h2 className="text-lg font-semibold text-(--text) group-hover:text-primary transition-colors mb-2">
                {mode.title}
              </h2>
              <p className="text-sm text-(--text-secondary) leading-relaxed">
                {mode.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
