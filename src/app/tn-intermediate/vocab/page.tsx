'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { vocabCategories, totalWordCount } from '@/data/tnIntermediateVocab';
import { cn } from '@/lib/utils';

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue:   { bg: 'bg-primary/5',  border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary' },
  green:  { bg: 'bg-primary/5',  border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary' },
  red:    { bg: 'bg-primary/5',  border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary' },
  orange: { bg: 'bg-primary/5',  border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary' },
  pink:   { bg: 'bg-primary/5',  border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary' },
  yellow: { bg: 'bg-primary/5',  border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary' },
  purple: { bg: 'bg-primary/5',  border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary' },
  teal:   { bg: 'bg-primary/5',  border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary' },
  indigo: { bg: 'bg-primary/5',  border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary' },
  cyan:   { bg: 'bg-primary/5',  border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary' },
};

export default function IntermediateVocabPage() {
  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">

      {/* Top nav */}
      <div className="flex items-center gap-3">
        <Link
          href="/tn-intermediate"
          className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          TN Intermediate
        </Link>
      </div>

      {/* Header */}
      <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-5 flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-(--text)">Vocabulary Bank</h1>
          <p className="text-sm text-(--text-secondary) mt-0.5">
            Kosakata tematik TN Intermediate · {vocabCategories.length} kategori · {totalWordCount} kata
          </p>
          <div className="flex items-center gap-2 mt-2">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-(--text-muted)">Klik kategori untuk mulai belajar · Pelajari arti + contoh kalimat</span>
          </div>
        </div>
      </div>

      {/* Category grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vocabCategories.map((cat) => {
          const c = COLOR_MAP[cat.color] ?? COLOR_MAP.blue;
          return (
            <Link
              key={cat.slug}
              href={`/tn-intermediate/vocab/${cat.slug}`}
              className={cn(
                'group block rounded-2xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5',
                c.bg, c.border,
              )}
            >
              <div className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-primary" />
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className={cn('font-bold text-sm leading-tight group-hover:underline', c.text)}>
                    {cat.title}
                  </h2>
                  <p className="text-xs text-(--text-muted) mt-0.5 italic">{cat.titleId}</p>
                  <p className="text-xs text-(--text-secondary) mt-1.5 leading-snug">{cat.description}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className={cn('inline-block text-white text-[10px] font-bold px-2 py-0.5 rounded-full', c.badge)}>
                  {cat.words.length} kata
                </span>
                <span className={cn('text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity', c.text)}>
                  Pelajari →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
