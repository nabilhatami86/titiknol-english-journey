import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Mic, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kisi-Kisi Reading, Speaking & Grammar',
  description: 'Kisi-kisi mid test untuk Reading, Speaking, dan Grammar.',
};

const tasks = [
  {
    href: '/practice/exams/kisi-kisi-reading-middle-test',
    title: 'Kisi-Kisi Reading Middle Test',
    subtitle: 'Reading Comprehension',
    description:
      'Teks bacaan topik Hobby and Interest: soal True/False/Not Given, multiple choice detail question, dan vocabulary.',
    icon: BookOpen,
    accentColor: 'bg-primary',
    iconBg: 'bg-primary/10 text-primary',
    badge: '15 soal',
    tags: ['True/False/NG', 'Detail Question', 'Vocabulary'],
  },
  {
    href: '/practice/modules/speaking/10',
    title: 'Kisi-Kisi Speaking Middle Test',
    subtitle: 'Speaking Practice',
    description:
      'Materi speaking: greeting & introduction, personal identity, education background, family, hobby, angka dan waktu.',
    icon: Mic,
    accentColor: 'bg-primary/10',
    iconBg: 'bg-primary/10/10 text-primary',
    badge: 'Speaking',
    tags: ['Greeting', 'Identity', 'Family', 'Hobby', 'Numbers'],
  },
  {
    href: '/practice/kisi-kisi/grammar-post-test',
    title: 'Kisi-Kisi Grammar — Post Test',
    subtitle: 'Grammar Practice',
    description:
      'Latihan 30 soal format post test: urutan adjective, correlative conjunctions & prepositions, terjemahan ke Inggris.',
    icon: FileText,
    accentColor: 'bg-primary/10',
    iconBg: 'bg-primary/10/10 text-primary',
    badge: '30 soal',
    tags: ['Correct Phrase', 'Conjunction', 'Preposition', 'Translate'],
  },
];

export default function KisiKisiPage() {
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
        <div>
          <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Kisi-Kisi Mid Test
          </h1>
          <p className="text-sm text-(--text-secondary) mt-1">
            Persiapan Mid Test — pilih materi yang ingin dipelajari
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Mata Pelajaran', value: '3' },
          { label: 'Soal Reading', value: '15' },
          { label: 'Soal Grammar', value: '30' },
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

      {/* Section label */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          Materi Mid Test
        </span>
        <div className="flex-1 h-px bg-(--border)" />
        <span className="text-xs text-(--text-muted)">3 paket</span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {tasks.map((item) => {
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
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-(--text-muted) mb-0.5">
                        {item.subtitle}
                      </p>
                      <h3 className="font-semibold text-(--text) group-hover:text-primary transition-colors leading-snug text-sm">
                        {item.title}
                      </h3>
                    </div>
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
  );
}
