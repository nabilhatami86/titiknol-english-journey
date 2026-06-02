import Link from 'next/link';
import { BookOpen, Clock, BarChart2 } from 'lucide-react';
import { stories } from '@/data/stories';
import type { StoryDifficulty } from '@/types/story';

const difficultyConfig: Record<
  StoryDifficulty,
  { label: string; color: string; bg: string; border: string; description: string }
> = {
  basic: {
    label: 'Basic',
    color: 'text-primary dark:text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    description: 'Kalimat pendek, kosakata sehari-hari yang umum',
  },
  intermediate: {
    label: 'Intermediate',
    color: 'text-primary dark:text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    description: 'Kalimat lebih kompleks, kosakata topik spesifik',
  },
  advanced: {
    label: 'Advanced',
    color: 'text-primary dark:text-primary',
    bg: 'bg-primary/10/10',
    border: 'border-primary/30/30',
    description: 'Teks akademik & analitik, kosakata tinggi',
  },
};

export default function StoryListPage({
  searchParams,
}: {
  searchParams?: Promise<{ difficulty?: string }>;
}) {
  // We read difficulty from the URL synchronously by using a sync pattern
  return <StoryListContent />;
}

function StoryListContent() {
  const basicStories = stories.filter((s) => s.difficulty === 'basic');
  const intermediateStories = stories.filter((s) => s.difficulty === 'intermediate');
  const advancedStories = stories.filter((s) => s.difficulty === 'advanced');

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-(--text)">Stories & Readings</h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          Baca cerita narasi dalam bahasa Inggris. Klik kata untuk melihat terjemahan, tandai kata yang belum
          dikuasai, dan blok frasa untuk dipelajari.
        </p>
      </div>

      {/* How to use guide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4 text-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
          <p className="text-xs font-semibold text-(--text)">Klik Kata</p>
          <p className="text-xs text-(--text-secondary) mt-1">Klik satu kata untuk melihat terjemahan lengkap beserta contoh kalimat</p>
        </div>
        <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4 text-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
          <p className="text-xs font-semibold text-(--text)">Tandai Merah</p>
          <p className="text-xs text-(--text-secondary) mt-1">Di panel terjemahan, klik "Tidak Tahu" untuk menandai kata dengan warna merah</p>
        </div>
        <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4 text-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
          <p className="text-xs font-semibold text-(--text)">Blok Frasa</p>
          <p className="text-xs text-(--text-secondary) mt-1">Seleksi/blok teks panjang lalu klik "Tandai Frasa" untuk menyorot dan menerjemahkan</p>
        </div>
      </div>

      {/* Difficulty levels */}
      {([['basic', basicStories], ['intermediate', intermediateStories], ['advanced', advancedStories]] as const).map(
        ([level, levelStories]) => {
          const config = difficultyConfig[level];
          return (
            <section key={level}>
              {/* Level header */}
              <div className={`flex items-start gap-3 p-4 rounded-xl border ${config.bg} ${config.border} mb-4`}>
                <BarChart2 className={`w-5 h-5 mt-0.5 shrink-0 ${config.color}`} />
                <div>
                  <h2 className={`font-bold text-base ${config.color}`}>{config.label}</h2>
                  <p className="text-xs text-(--text-secondary) mt-0.5">{config.description}</p>
                </div>
              </div>

              {/* Story cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {levelStories.map((story) => (
                  <Link
                    key={story.id}
                    href={`/story/${story.id}`}
                    className="group bg-(--bg-card) border border-(--border) rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}
                      >
                        {config.label}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-(--text-muted)">
                        <Clock className="w-3 h-3" />
                        {story.estimatedMinutes} min
                      </div>
                    </div>

                    <h3 className="font-bold text-(--text) text-base leading-tight group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-xs text-(--text-secondary) mt-1 line-clamp-2">{story.subtitle}</p>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs bg-(--bg-secondary) text-(--text-muted) px-2 py-0.5 rounded-full">
                        {story.topic}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-(--text-muted)">
                        <BookOpen className="w-3 h-3" />
                        {story.keyVocab.length} vocab
                      </div>
                    </div>

                    {/* Vocab preview */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {story.keyVocab.slice(0, 4).map((v, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 bg-(--bg-secondary) border border-(--border) rounded-full text-(--text-muted)"
                        >
                          {v.word}
                        </span>
                      ))}
                      {story.keyVocab.length > 4 && (
                        <span className="text-xs text-(--text-muted) px-1">
                          +{story.keyVocab.length - 4}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        }
      )}
    </div>
  );
}
