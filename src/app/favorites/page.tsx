'use client';

import { Heart } from 'lucide-react';
import { vocabulary } from '@/data/vocabulary';
import { useVocabStore } from '@/store/useVocabStore';
import { VocabCard } from '@/components/vocab/VocabCard';
import Link from 'next/link';

export default function FavoritesPage() {
  const favorites = useVocabStore((s) => s.favorites);

  const favoriteWords = vocabulary.filter((w) => favorites.includes(w.id));

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary" />
          Favorites
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          {favoriteWords.length} word{favoriteWords.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {favoriteWords.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteWords.map((word) => (
            <VocabCard key={word.id} word={word} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 text-(--text-muted) mx-auto mb-4" />
          <p className="text-(--text-secondary) font-medium text-lg">No favorites yet</p>
          <p className="text-sm text-(--text-muted) mt-1 mb-4">
            Tap the heart icon on any word to save it here
          </p>
          <Link
            href="/vocab"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors"
          >
            Browse Vocabulary
          </Link>
        </div>
      )}
    </div>
  );
}
