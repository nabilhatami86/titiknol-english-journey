'use client';

import Link from 'next/link';
import {
  BookOpen,
  GraduationCap,
  TrendingUp,
  Heart,
  ArrowRight,
  Zap,
  Calendar,
  Target,
  AlertTriangle,
} from 'lucide-react';
import { vocabulary, categories } from '@/data/vocabulary';
import { useVocabStore } from '@/store/useVocabStore';
import { getDailyWord, getDifficultyColor, getCategoryLabel } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { VocabCard } from '@/components/vocab/VocabCard';

export default function Dashboard() {
  const learnedWords = useVocabStore((s) => s.learnedWords);
  const favorites = useVocabStore((s) => s.favorites);
  const quizScores = useVocabStore((s) => s.quizScores);
  const grammarScores = useVocabStore((s) => s.grammarScores);

  const dailyWord = getDailyWord(vocabulary);
  const recentWords = vocabulary.slice(0, 4);
  const lastQuiz = quizScores[quizScores.length - 1];

  // Hitung akurasi per topik dari riwayat grammarScores
  const topicAccuracy = grammarScores.reduce<Record<string, { correct: number; total: number }>>(
    (acc, s) => {
      if (!acc[s.topic]) acc[s.topic] = { correct: 0, total: 0 };
      acc[s.topic].correct += s.score;
      acc[s.topic].total += s.total;
      return acc;
    },
    {}
  );

  // Topik lemah: sudah dikerjakan >= 3 soal dan akurasi < 60%, max 3 terlemah
  const grammarQuizTopics = new Set(['Nouns', 'Verbs', 'Adjectives', 'Adverbs', 'Pronouns', 'Prepositions', 'Conjunctions', 'Articles', 'Mixed']);
  const weakTopics = Object.entries(topicAccuracy)
    .filter(([, v]) => v.total >= 3 && v.correct / v.total < 0.6)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
    .slice(0, 3);

  const stats = [
    {
      label: 'Total Words',
      value: vocabulary.length,
      icon: BookOpen,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Learned',
      value: learnedWords.length,
      icon: GraduationCap,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      label: 'Favorites',
      value: favorites.length,
      icon: Heart,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Quizzes Taken',
      value: quizScores.length,
      icon: Target,
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-primary to-primary-dark rounded-2xl p-6 lg:p-8 text-white">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">
          Welcome to VocabMaster
        </h1>
        <p className="text-white/80 mb-4 max-w-lg">
          Build your English vocabulary with interactive lessons, quizzes, and daily practice.
          Track your progress and become fluent!
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/vocab"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary rounded-lg font-medium text-sm hover:bg-white/90 transition-colors"
          >
            Start Learning <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/practice/quiz"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg font-medium text-sm hover:bg-white/30 transition-colors"
          >
            Take a Quiz <Zap className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-(--bg-card) border border-(--border) rounded-xl p-4"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-(--text)">{stat.value}</p>
              <p className="text-sm text-(--text-secondary)">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Progress + Daily Word */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Learning Progress */}
        <div className="bg-(--bg-card) border border-(--border) rounded-xl p-5">
          <h2 className="text-lg font-semibold text-(--text) mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Learning Progress
          </h2>
          <ProgressBar value={learnedWords.length} max={vocabulary.length} className="mb-4" />
          <div className="space-y-2">
            {(['basic', 'intermediate', 'advanced'] as const).map((level) => {
              const total = vocabulary.filter((w) => w.difficulty === level).length;
              const learned = vocabulary.filter(
                (w) => w.difficulty === level && learnedWords.includes(w.id)
              ).length;
              return (
                <div key={level} className="flex items-center justify-between text-sm">
                  <Badge className={getDifficultyColor(level)}>{level}</Badge>
                  <span className="text-(--text-secondary)">
                    {learned} / {total}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Word */}
        <div className="bg-(--bg-card) border border-(--border) rounded-xl p-5">
          <h2 className="text-lg font-semibold text-(--text) mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            Word of the Day
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-bold text-primary">{dailyWord.word}</h3>
              <p className="text-xs text-(--text-muted)">{dailyWord.pronunciation.ipa}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">{dailyWord.partOfSpeech}</Badge>
              <Badge className={getDifficultyColor(dailyWord.difficulty)}>
                {dailyWord.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-(--text-secondary)">{dailyWord.meaning.en}</p>
            <p className="text-sm text-primary/80 italic">{dailyWord.meaning.id}</p>
            <p className="text-xs text-(--text-muted) italic border-t border-(--border) pt-3">
              &ldquo;{dailyWord.examples[0]}&rdquo;
            </p>
            <Link
              href={`/vocab/${dailyWord.categories[0]}/${dailyWord.slug}`}
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Learn more <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Rekomendasi Topik Lemah */}
      {weakTopics.length > 0 && (
        <div className="bg-(--bg-card) border border-primary/30 dark:border-primary/50 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-(--text) mb-1 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Perlu Ditingkatkan
          </h2>
          <p className="text-sm text-(--text-secondary) mb-4">
            Berdasarkan riwayat quiz kamu, topik-topik ini masih kurang — yuk latihan lagi!
          </p>
          <div className="space-y-3">
            {weakTopics.map(([topic, { correct, total }]) => {
              const acc = Math.round((correct / total) * 100);
              const href = grammarQuizTopics.has(topic)
                ? '/practice/grammar-quiz'
                : '/practice/latihan-acak';
              return (
                <div key={topic} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-(--text)">{topic}</span>
                      <span className="text-xs font-semibold text-primary">
                        {acc}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-(--bg-secondary) rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${acc}%` }}
                      />
                    </div>
                  </div>
                  <Link
                    href={href}
                    className="shrink-0 px-3 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    Latihan →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-(--text)">Categories</h2>
          <Link href="/vocab" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/vocab/${cat.slug}`}
              className="bg-(--bg-card) border border-(--border) rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <p className="font-medium text-(--text) group-hover:text-primary transition-colors">
                {cat.name}
              </p>
              <p className="text-xs text-(--text-muted) mt-1">{cat.count} words</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Words */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-(--text)">Explore Words</h2>
          <Link href="/vocab" className="text-sm text-primary hover:underline">
            See all
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentWords.map((word) => (
            <VocabCard key={word.id} word={word} />
          ))}
        </div>
      </div>
    </div>
  );
}
