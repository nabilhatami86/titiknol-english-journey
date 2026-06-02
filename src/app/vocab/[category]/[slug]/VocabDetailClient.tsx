'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  Heart,
  CheckCircle,
  Volume2,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { cn, getDifficultyColor, getCategoryLabel } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { useVocabStore } from '@/store/useVocabStore';
import { vocabulary } from '@/data/vocabulary';
import type { VocabWord, Category } from '@/types/vocab';

interface Props {
  word: VocabWord;
  category: string;
}

export function VocabDetailClient({ word, category }: Props) {
  const toggleFavorite = useVocabStore((s) => s.toggleFavorite);
  const isFavorite = useVocabStore((s) => s.favorites.includes(word.id));
  const isLearned = useVocabStore((s) => s.learnedWords.includes(word.id));
  const markAsLearned = useVocabStore((s) => s.markAsLearned);
  const unmarkAsLearned = useVocabStore((s) => s.unmarkAsLearned);

  // Find related words (same category, excluding current)
  const relatedWords = vocabulary
    .filter((w) => w.id !== word.id && w.categories.some((c) => word.categories.includes(c)))
    .slice(0, 3);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Back navigation */}
      <Link
        href={`/vocab/${category}`}
        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to{' '}
        {getCategoryLabel(category as Category) || 'vocabulary'}
      </Link>

      {/* Main card */}
      <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-(--text)">{word.word}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-(--text-muted)">{word.pronunciation.text}</span>
              <span className="text-sm text-(--text-muted) font-mono">
                {word.pronunciation.ipa}
              </span>
              <button
                onClick={handleSpeak}
                className="p-1.5 rounded-lg hover:bg-(--hover) text-primary transition-colors"
                aria-label="Listen to pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(word.id)}
              className={cn(
                'p-2 rounded-lg border transition-colors',
                isFavorite
                  ? 'bg-primary/10 border-primary/30 dark:bg-primary dark:border-primary/50'
                  : 'border-(--border) hover:bg-(--hover)'
              )}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={cn(
                  'w-5 h-5',
                  isFavorite ? 'fill-primary text-primary' : 'text-(--text-muted)'
                )}
              />
            </button>
            <button
              onClick={() => (isLearned ? unmarkAsLearned(word.id) : markAsLearned(word.id))}
              className={cn(
                'p-2 rounded-lg border transition-colors',
                isLearned
                  ? 'bg-primary/10 border-primary/30 dark:bg-primary dark:border-primary/50'
                  : 'border-(--border) hover:bg-(--hover)'
              )}
              aria-label={isLearned ? 'Mark as not learned' : 'Mark as learned'}
            >
              <CheckCircle
                className={cn(
                  'w-5 h-5',
                  isLearned ? 'text-success' : 'text-(--text-muted)'
                )}
              />
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline">{word.partOfSpeech}</Badge>
          <Badge className={getDifficultyColor(word.difficulty)}>{word.difficulty}</Badge>
          {word.categories.map((cat) => (
            <Link key={cat} href={`/vocab/${cat}`}>
              <Badge variant="outline" className="hover:bg-primary/10 cursor-pointer">
                {getCategoryLabel(cat)}
              </Badge>
            </Link>
          ))}
        </div>

        {/* Meaning */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-(--text-muted) uppercase tracking-wider mb-2">
            Meaning
          </h2>
          <p className="text-(--text) text-lg">{word.meaning.en}</p>
          <p className="text-primary mt-1 italic">{word.meaning.id}</p>
        </section>

        {/* Examples */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-(--text-muted) uppercase tracking-wider mb-2">
            Examples
          </h2>
          <ul className="space-y-2">
            {word.examples.map((ex, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-(--text-secondary)"
              >
                <span className="text-primary mt-0.5">&#x2022;</span>
                <span className="italic">&ldquo;{ex}&rdquo;</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Synonyms & Antonyms */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {word.synonyms.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-(--text-muted) uppercase tracking-wider mb-2">
                Synonyms
              </h2>
              <div className="flex flex-wrap gap-2">
                {word.synonyms.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 bg-primary/10 text-primary dark:bg-primary dark:text-primary rounded-lg text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}
          {word.antonyms.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-(--text-muted) uppercase tracking-wider mb-2">
                Antonyms
              </h2>
              <div className="flex flex-wrap gap-2">
                {word.antonyms.map((a) => (
                  <span
                    key={a}
                    className="px-2.5 py-1 bg-primary/10 text-primary dark:bg-primary dark:text-primary rounded-lg text-sm"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Related Words */}
      {relatedWords.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-(--text) mb-3">Related Words</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {relatedWords.map((rw) => (
              <Link
                key={rw.id}
                href={`/vocab/${category}/${rw.slug}`}
                className="bg-(--bg-card) border border-(--border) rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <p className="font-medium text-(--text) group-hover:text-primary transition-colors">
                  {rw.word}
                </p>
                <p className="text-xs text-(--text-muted) mt-1 line-clamp-1">
                  {rw.meaning.en}
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                  Learn more <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
