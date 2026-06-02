import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ClipboardList, FileText, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tugas Grammar',
  description: 'Kumpulan tugas grammar dari tutor.',
};

type TaskItem = {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  iconBg: string;
  badge: string;
  tags: string[];
};

const groups: { group: string; labelColor: string; items: TaskItem[] }[] = [
  {
    group: 'Tugas dari Tutor',
    labelColor: 'text-primary',
    items: [
      {
        href: '/practice/exams/tugas-conjunction-preposition',
        title: 'Tugas Conjunction & Preposition (15 Soal)',
        description:
          'Latihan conjunction koordinatif & korelatif (and/but/yet, either/or, neither/nor, not only/but also) dan preposisi waktu & tempat (in/on/at).',
        icon: ClipboardList,
        accentColor: 'bg-primary/10',
        iconBg: 'bg-primary/10/10 text-primary',
        badge: '15 soal',
        tags: ['Conjunction', 'Preposition', 'in/on/at', 'Correlative'],
      },
      {
        href: '/practice/exams/tugas-phrase',
        title: 'Tugas Phrase — Jenis-Jenis Frasa (20 Soal)',
        description:
          'Identifikasi jenis frasa: Noun Phrase, Verb Phrase, Adjective Phrase, Adverbial Phrase, Gerund Phrase, Infinitive Phrase, dan Prepositional Phrase.',
        icon: FileText,
        accentColor: 'bg-primary/10',
        iconBg: 'bg-primary/10/10 text-primary',
        badge: '20 soal',
        tags: ['Noun Phrase', 'Verb Phrase', 'Gerund', 'Infinitive', 'Prepositional'],
      },
      {
        href: '/practice/exams/tugas-grammar-a1',
        title: 'Tugas Grammar — Articles & Nouns (20 Soal)',
        description:
          'Articles (a/an/the), Demonstratives, Possessives, Quantifiers, Ordinal/Cardinal Numbers, Plural Nouns.',
        icon: ClipboardList,
        accentColor: 'bg-primary/30',
        iconBg: 'bg-primary/10 text-primary',
        badge: '20 soal',
        tags: ['Articles', 'Nouns', 'Possessives', 'Quantifiers'],
      },
      {
        href: '/practice/exams/tugas-grammar-a2',
        title: 'Tugas Grammar — Articles & Nouns (15 Soal)',
        description:
          'Articles, Demonstratives, Possessives, Quantifiers, Ordinal/Cardinal Numbers. Paket tugas kedua.',
        icon: ClipboardList,
        accentColor: 'bg-primary',
        iconBg: 'bg-primary/10 text-primary',
        badge: '15 soal',
        tags: ['Articles', 'Demonstratives', 'Ordinal Numbers'],
      },
      {
        href: '/practice/exams/tugas-pronoun-1',
        title: 'Tugas Pronoun — Pilih yang Tepat (Set 1)',
        description:
          'Pilih pronoun yang benar dari dua opsi dalam kurung: subject/object, possessives, reflexive pronouns.',
        icon: BookOpen,
        accentColor: 'bg-primary/10',
        iconBg: 'bg-primary/10/10 text-primary',
        badge: '15 soal',
        tags: ['Subject Pronoun', 'Object Pronoun', 'Reflexive'],
      },
      {
        href: '/practice/exams/tugas-pronoun-2',
        title: 'Tugas Pronoun — Pilih yang Tepat (Set 2)',
        description:
          'Pilih pronoun yang benar dari dua opsi dalam kurung: subject/object, possessives, reflexive, reciprocal.',
        icon: BookOpen,
        accentColor: 'bg-primary/10',
        iconBg: 'bg-primary/10/10 text-primary',
        badge: '15 soal',
        tags: ['Object Pronoun', 'Reflexive', 'Reciprocal'],
      },
      {
        href: '/practice/exams/review-basic-grammar-1-2',
        title: 'Tugas Review Basic Grammar',
        description:
          'Latihan 30 soal dari file REVIEW BASIC GRAMMAR 1-2 untuk persiapan ujian.',
        icon: FileText,
        accentColor: 'bg-primary',
        iconBg: 'bg-primary/10 text-primary',
        badge: '30 soal',
        tags: ['Adjective', 'Adverb', 'Noun', 'Verb', 'Mixed'],
      },
      {
        href: '/practice/exams/tugas-grammar-b1',
        title: 'Tugas Grammar — Pilihan Ganda (10 Soal)',
        description:
          'Latihan pilihan ganda 10 soal: Adjective, Adverb, Noun, Pronoun, Verb Agreement, dan Quantifier.',
        icon: ClipboardList,
        accentColor: 'bg-primary/10',
        iconBg: 'bg-primary/10/10 text-primary',
        badge: '10 soal',
        tags: ['Adjective', 'Adverb', 'Verb Agreement', 'Quantifier'],
      },
      {
        href: '/practice/exams/tugas-grammar-b2',
        title: 'Tugas Grammar — Isian Singkat (10 Soal)',
        description:
          'Pilih kata yang tepat dalam kurung: Adverb vs Adjective, Subject-Verb Agreement, Countable/Uncountable Noun.',
        icon: ClipboardList,
        accentColor: 'bg-primary/10',
        iconBg: 'bg-primary/10/10 text-primary',
        badge: '10 soal',
        tags: ['Adverb vs Adjective', 'Verb Agreement', 'Uncountable Noun'],
      },
    ],
  },
  {
    group: 'Kisi-Kisi Mid Test Grammar',
    labelColor: 'text-primary',
    items: [
      {
        href: '/practice/exams/kisi-kisi-having',
        title: 'Kisi-Kisi Mid Test Basic Grammar',
        description:
          'Persiapan ujian Mid Test Basic Grammar — Adjective, Adverb, Noun, Pronoun, dan Verb.',
        icon: ClipboardList,
        accentColor: 'bg-primary',
        iconBg: 'bg-primary/10 text-primary',
        badge: 'Mid Test',
        tags: ['Adjective', 'Adverb', 'Noun', 'Pronoun', 'Verb'],
      },
    ],
  },
  {
    group: 'Kisi-Kisi Post Test Grammar',
    labelColor: 'text-primary',
    items: [
      {
        href: '/practice/exams/kisi-kisi-grammar-post-test',
        title: 'Kisi-Kisi Post Test Basic Grammar',
        description:
          'Persiapan ujian Post Test — 30 soal mencakup seluruh materi: Parts of Speech, Nouns, Articles, Pronouns, Quantifiers, Adj vs Adv, Verb Agreement, Another/Other, Prepositions, Conjunctions.',
        icon: ClipboardList,
        accentColor: 'bg-primary/10',
        iconBg: 'bg-primary/10 text-primary',
        badge: '30 soal',
        tags: ['Parts of Speech', 'Articles', 'Pronouns', 'Verb Agreement', 'Prepositions'],
      },
    ],
  },
];

const totalSoal = groups
  .flatMap((g) => g.items)
  .reduce((sum, item) => {
    const n = parseInt(item.badge);
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

const totalPaket = groups.flatMap((g) => g.items).length;

export default function TugasGrammarPage() {
  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start gap-3">
        <Link
          href="/practice"
          className="mt-1 p-1.5 rounded-lg hover:bg-(--bg-hover) text-(--text-secondary) hover:text-(--text) transition-colors shrink-0"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-primary" />
            Tugas Grammar
          </h1>
          <p className="text-sm text-(--text-secondary) mt-1">
            Kumpulan tugas grammar dari tutor — pilih paket yang ingin dikerjakan
          </p>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Paket', value: totalPaket },
          { label: 'Total Soal', value: `${totalSoal}+` },
          { label: 'Topik', value: '10' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-(--bg-card) border border-(--border) rounded-xl p-3 text-center"
          >
            <p className="text-xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-(--text-secondary) mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Task Groups */}
      {groups.map((group) => (
        <div key={group.group} className="space-y-3">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold uppercase tracking-widest ${group.labelColor}`}>
              {group.group}
            </span>
            <div className="flex-1 h-px bg-(--border)" />
            <span className="text-xs text-(--text-muted)">{group.items.length} paket</span>
          </div>

          <div className="flex flex-col gap-3">
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.accentColor}`} />

                  <div className="pl-5 pr-4 py-4 flex items-center gap-4">
                    <div className={`shrink-0 w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="font-semibold text-(--text) group-hover:text-primary transition-colors leading-snug text-sm">
                          {item.title}
                        </h3>
                        <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-secondary) border border-(--border)">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-(--text-secondary) leading-relaxed mb-2">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-(--bg-secondary) text-(--text-muted) border border-(--border)"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <ArrowRight className="shrink-0 w-4 h-4 text-(--text-muted) group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
