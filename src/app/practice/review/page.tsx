'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Heart,
  CheckCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { vocabulary } from '@/data/vocabulary';
import { useVocabStore } from '@/store/useVocabStore';
import { shuffleArray, cn, getDifficultyColor } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import type { VocabWord } from '@/types/vocab';

export default function ReviewPage() {
  const toggleFavorite = useVocabStore((s) => s.toggleFavorite);
  const favorites = useVocabStore((s) => s.favorites);
  const markAsLearned = useVocabStore((s) => s.markAsLearned);
  const learnedWords = useVocabStore((s) => s.learnedWords);

  const [words, setWords] = useState(() => shuffleArray(vocabulary));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const current = words[currentIndex];
  const isFav = favorites.includes(current.id);
  const isLearned = learnedWords.includes(current.id);

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((i) => i + 1);
      setShowMeaning(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setShowMeaning(false);
    }
  };

  const handleShuffle = () => {
    setWords(shuffleArray(vocabulary));
    setCurrentIndex(0);
    setShowMeaning(false);
  };

  return (
    <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/practice"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <span className="text-sm text-(--text-secondary) font-medium">
          {currentIndex + 1} / {words.length}
        </span>
      </div>

      {/* Progress */}
      <div className="h-2 rounded-full bg-(--bg-secondary) overflow-hidden">
        <div
          className="h-full rounded-full bg-success transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-6 lg:p-8 min-h-[350px] flex flex-col">
        {/* Top actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <Badge variant="outline">{current.partOfSpeech}</Badge>
            <Badge className={getDifficultyColor(current.difficulty)}>{current.difficulty}</Badge>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => toggleFavorite(current.id)}
              className="p-2 rounded-lg hover:bg-(--hover) transition-colors"
            >
              <Heart className={cn('w-5 h-5', isFav ? 'fill-primary text-primary' : 'text-(--text-muted)')} />
            </button>
            <button
              onClick={() => markAsLearned(current.id)}
              className="p-2 rounded-lg hover:bg-(--hover) transition-colors"
            >
              <CheckCircle className={cn('w-5 h-5', isLearned ? 'text-success' : 'text-(--text-muted)')} />
            </button>
          </div>
        </div>

        {/* Word */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-(--text) mb-2">{current.word}</h2>
          <p className="text-sm text-(--text-muted) font-mono mb-6">{current.pronunciation.ipa}</p>

          {showMeaning ? (
            <div className="space-y-3 animate-fade-in w-full">
              <p className="text-lg text-(--text-secondary)">{current.meaning.en}</p>
              <p className="text-primary italic">{current.meaning.id}</p>
              {current.examples[0] && (
                <p className="text-sm text-(--text-muted) italic mt-4 pt-4 border-t border-(--border)">
                  &ldquo;{current.examples[0]}&rdquo;
                </p>
              )}
              {current.synonyms.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                  {current.synonyms.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowMeaning(true)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-(--border) rounded-xl text-sm text-(--text-secondary) hover:bg-(--hover) transition-colors"
            >
              <Eye className="w-4 h-4" /> Show Meaning
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-(--border)">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-(--text-secondary) hover:bg-(--hover) transition-colors disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          <button
            onClick={handleShuffle}
            className="p-2 rounded-lg hover:bg-(--hover) text-(--text-muted) transition-colors"
            aria-label="Shuffle cards"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === words.length - 1}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-primary hover:bg-primary/10 transition-colors disabled:opacity-30"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
