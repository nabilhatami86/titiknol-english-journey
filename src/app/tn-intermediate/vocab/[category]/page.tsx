'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronUp, Search, Volume2 } from 'lucide-react';
import { getCategoryBySlug } from '@/data/tnIntermediateVocab';
import { cn } from '@/lib/utils';
import { notFound } from 'next/navigation';

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string; input: string }> = {
  blue:   { bg: 'bg-primary/5', border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary', input: 'focus:border-primary/50' },
  green:  { bg: 'bg-primary/5', border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary', input: 'focus:border-primary/50' },
  red:    { bg: 'bg-primary/5', border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary', input: 'focus:border-primary/50' },
  orange: { bg: 'bg-primary/5', border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary', input: 'focus:border-primary/50' },
  pink:   { bg: 'bg-primary/5', border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary', input: 'focus:border-primary/50' },
  yellow: { bg: 'bg-primary/5', border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary', input: 'focus:border-primary/50' },
  purple: { bg: 'bg-primary/5', border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary', input: 'focus:border-primary/50' },
  teal:   { bg: 'bg-primary/5', border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary', input: 'focus:border-primary/50' },
  indigo: { bg: 'bg-primary/5', border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary', input: 'focus:border-primary/50' },
  cyan:   { bg: 'bg-primary/5', border: 'border-primary/20', text: 'text-primary', badge: 'bg-primary', input: 'focus:border-primary/50' },
};

function speak(word: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(word);
  u.lang = 'en-US';
  u.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

export default function VocabCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const c = COLOR_MAP[cat.color] ?? COLOR_MAP.blue;

  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const filtered = cat.words.filter(
    (w) =>
      !search ||
      w.word.toLowerCase().includes(search.toLowerCase()) ||
      w.meaning.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleExpand = (i: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const expandAll = () => setExpanded(new Set(filtered.map((_, i) => i)));
  const collapseAll = () => setExpanded(new Set());

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-5 animate-fade-in">

      {/* Nav */}
      <div className="flex items-center gap-3">
        <Link
          href="/tn-intermediate/vocab"
          className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Vocabulary Bank
        </Link>
      </div>

      {/* Header */}
      <div className={cn('rounded-2xl border p-5 flex items-start gap-4', c.bg, c.border)}>
        <span className="text-4xl leading-none shrink-0">{cat.icon}</span>
        <div className="flex-1">
          <h1 className={cn('text-xl font-bold', c.text)}>{cat.title}</h1>
          <p className="text-sm text-(--text-muted) italic">{cat.titleId}</p>
          <p className="text-xs text-(--text-secondary) mt-1">{cat.description}</p>
          <span className={cn('inline-block mt-2 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full', c.badge)}>
            {cat.words.length} kata
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-muted)" />
          <input
            type="text"
            placeholder="Cari kata atau arti..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
              'w-full pl-9 pr-3 py-2 rounded-xl border border-(--border) bg-(--bg-card) text-sm text-(--text) outline-none transition-colors placeholder:text-(--text-muted)',
              c.input,
            )}
          />
        </div>
        <button
          type="button"
          onClick={expandAll}
          className="shrink-0 px-3 py-2 rounded-xl border border-(--border) text-xs text-(--text-secondary) hover:text-primary hover:border-primary/40 transition-colors"
        >
          Buka Semua
        </button>
        <button
          type="button"
          onClick={collapseAll}
          className="shrink-0 px-3 py-2 rounded-xl border border-(--border) text-xs text-(--text-secondary) hover:text-primary hover:border-primary/40 transition-colors"
        >
          Tutup
        </button>
      </div>

      {/* Word count */}
      {search && (
        <p className="text-xs text-(--text-muted)">
          Menampilkan {filtered.length} dari {cat.words.length} kata
        </p>
      )}

      {/* Word list */}
      <div className="space-y-2">
        {filtered.map((item, i) => {
          const isOpen = expanded.has(i);
          return (
            <div
              key={i}
              className={cn(
                'rounded-xl border overflow-hidden transition-all',
                isOpen ? `${c.border} ${c.bg}` : 'border-(--border) bg-(--bg-card)',
              )}
            >
              {/* Word row */}
              <div className="flex items-center gap-3 px-4 py-3">
                <button
                  type="button"
                  onClick={() => speak(item.word)}
                  className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-(--text-muted) hover:text-primary hover:bg-primary/10 transition-colors"
                  title="Dengarkan pengucapan"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold text-(--text) text-sm">{item.word}</span>
                    <span className="text-xs text-(--text-muted) font-mono">{item.ipa}</span>
                  </div>
                  <p className={cn('text-sm font-medium mt-0.5', c.text)}>{item.meaning}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleExpand(i)}
                  className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-(--text-muted) hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Expanded: example */}
              {isOpen && (
                <div className="px-4 pb-3 border-t border-(--border)/50 pt-2.5 space-y-1">
                  <p className="text-sm text-(--text) italic leading-relaxed">
                    "{item.example}"
                  </p>
                  {item.exampleId && (
                    <p className="text-xs text-(--text-muted) leading-relaxed">
                      {item.exampleId}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-(--text-muted)">
          <Search className="w-8 h-8 mx-auto mb-2 text-primary/40" />
          <p className="text-sm">Kata tidak ditemukan. Coba kata lain.</p>
        </div>
      )}
    </div>
  );
}
