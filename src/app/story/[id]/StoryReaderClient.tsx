'use client';

import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Volume2,
  X,
  HelpCircle,
  BookmarkX,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { Story, StoryDifficulty } from '@/types/story';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

interface TranslationResult {
  translated: string;
  alternatives?: string[];
  partOfSpeech?: string;
  ipa?: string;
  definition?: string;
  example?: string;
}

interface MarkedPhrase {
  id: string;
  text: string;
}

interface MarkButtonState {
  x: number;
  y: number;
  selectedText: string;
}

// ─── Difficulty Config ────────────────────────────────────────────────────────

const DIFFICULTY_CONFIG: Record<
  StoryDifficulty,
  { label: string; color: string; bg: string }
> = {
  basic: {
    label: 'Basic',
    color: 'text-primary dark:text-primary',
    bg: 'bg-primary/10',
  },
  intermediate: {
    label: 'Intermediate',
    color: 'text-primary dark:text-primary',
    bg: 'bg-primary/10',
  },
  advanced: {
    label: 'Advanced',
    color: 'text-primary dark:text-primary',
    bg: 'bg-primary/10',
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  story: Story;
}

export default function StoryReaderClient({ story }: Props) {
  // Word / phrase marking state
  const [unknownWords, setUnknownWords] = useState<Set<string>>(new Set());
  const [markedPhrases, setMarkedPhrases] = useState<MarkedPhrase[]>([]);

  // Floating "mark phrase" button after text selection
  const [markButton, setMarkButton] = useState<MarkButtonState | null>(null);

  // Translation panel state
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);
  const [translation, setTranslation] = useState<TranslationResult | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState('');
  const [translationCache, setTranslationCache] = useState<Record<string, TranslationResult>>({});
  const [panelMinimized, setPanelMinimized] = useState(false);

  // Unknown words / phrases summary panel visibility
  const [showSummary, setShowSummary] = useState(true);

  const storyRef = useRef<HTMLDivElement>(null);

  // ── Translation ─────────────────────────────────────────────────────────────

  const translate = useCallback(
    async (text: string, isPhrase = false) => {
      const key = text.toLowerCase().trim();
      if (!key) return;

      if (isPhrase) {
        setSelectedPhrase(key);
        setSelectedWord(null);
      } else {
        setSelectedWord(key);
        setSelectedPhrase(null);
      }
      setTranslationError('');
      setPanelMinimized(false);

      if (translationCache[key]) {
        setTranslation(translationCache[key]);
        return;
      }

      setIsTranslating(true);
      setTranslation(null);

      try {
        const res = await fetch(`/api/translate?word=${encodeURIComponent(key)}`);
        if (!res.ok) throw new Error('failed');
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        const result: TranslationResult = {
          translated: data.translated,
          partOfSpeech: data.partOfSpeech || '',
          ipa: data.ipa || '',
          definition: data.definition || '',
          example: data.example || '',
          alternatives: data.alternatives || [],
        };
        setTranslation(result);
        setTranslationCache((prev) => ({ ...prev, [key]: result }));
      } catch {
        setTranslationError('Terjemahan gagal. Coba klik ulang.');
      } finally {
        setIsTranslating(false);
      }
    },
    [translationCache]
  );

  const speakText = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.85;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Samantha') ||
          v.name.includes('Google') ||
          v.name.includes('Natural'))
    );
    if (preferred) u.voice = preferred;
    window.speechSynthesis.speak(u);
  }, []);

  // ── Toggle unknown word ──────────────────────────────────────────────────────

  const toggleUnknown = useCallback((word: string) => {
    const key = word.toLowerCase().replace(/^'+|'+$/g, '');
    setUnknownWords((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  // ── Phrase mark / remove ────────────────────────────────────────────────────

  const addPhraseMark = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      if (markedPhrases.some((p) => p.text.toLowerCase() === trimmed.toLowerCase())) return;
      setMarkedPhrases((prev) => [
        ...prev,
        { id: Math.random().toString(36).slice(2), text: trimmed },
      ]);
    },
    [markedPhrases]
  );

  const removePhraseMark = useCallback(
    (id: string) => {
      const phrase = markedPhrases.find((p) => p.id === id);
      setMarkedPhrases((prev) => prev.filter((p) => p.id !== id));
      if (phrase && selectedPhrase === phrase.text.toLowerCase().trim()) {
        setSelectedPhrase(null);
        setTranslation(null);
      }
    },
    [markedPhrases, selectedPhrase]
  );

  // ── Text selection → Mark Phrase button ─────────────────────────────────────

  const handleMouseUp = useCallback((e: MouseEvent) => {
    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        setMarkButton(null);
        return;
      }
      const text = sel.toString().trim();
      if (text.length < 3) {
        setMarkButton(null);
        return;
      }
      if (!storyRef.current) return;
      const range = sel.getRangeAt(0);
      if (!storyRef.current.contains(range.commonAncestorContainer)) {
        setMarkButton(null);
        return;
      }
      const rect = range.getBoundingClientRect();
      setMarkButton({
        x: Math.max(80, Math.min(window.innerWidth - 80, rect.left + rect.width / 2)),
        y: rect.bottom + 8,
        selectedText: text,
      });
    }, 10);
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  const handleMarkPhrase = useCallback(() => {
    if (!markButton) return;
    addPhraseMark(markButton.selectedText);
    window.getSelection()?.removeAllRanges();
    setMarkButton(null);
  }, [markButton, addPhraseMark]);

  // ── Paragraph renderer ───────────────────────────────────────────────────────

  const renderParagraph = useCallback(
    (text: string, paraKey: string) => {
      // 1. Find all marked-phrase ranges inside this text
      type Seg =
        | { type: 'phrase'; text: string; phraseId: string }
        | { type: 'normal'; text: string };

      const segments: Seg[] = [];

      // Build match list
      const matches: Array<{ start: number; end: number; phrase: MarkedPhrase }> = [];
      for (const phrase of markedPhrases) {
        const idx = text.toLowerCase().indexOf(phrase.text.toLowerCase());
        if (idx >= 0) {
          matches.push({ start: idx, end: idx + phrase.text.length, phrase });
        }
      }
      matches.sort((a, b) => a.start - b.start);

      // Build segment list (skip overlapping)
      let cursor = 0;
      for (const m of matches) {
        if (m.start < cursor) continue;
        if (m.start > cursor) {
          segments.push({ type: 'normal', text: text.slice(cursor, m.start) });
        }
        segments.push({
          type: 'phrase',
          text: text.slice(m.start, m.end),
          phraseId: m.phrase.id,
        });
        cursor = m.end;
      }
      if (cursor < text.length) {
        segments.push({ type: 'normal', text: text.slice(cursor) });
      }

      // 2. Render each segment
      return segments.map((seg, segIdx) => {
        // ── Marked phrase ──────────────────────────────────────────────────────
        if (seg.type === 'phrase') {
          const phraseKey = seg.text.toLowerCase().trim();
          const isActive = selectedPhrase === phraseKey;
          return (
            <span
              key={`${paraKey}-seg-${segIdx}`}
              onClick={() => translate(seg.text, true)}
              className={cn(
                'cursor-pointer rounded px-0.5 border-b-2 transition-all',
                isActive
                  ? 'bg-primary/50 border-primary/50 dark:bg-primary/35'
                  : 'bg-primary/40 border-primary/70 hover:bg-primary/40 dark:bg-primary/15 dark:border-primary/50'
              )}
            >
              {seg.text}
            </span>
          );
        }

        // ── Normal text → tokenize into clickable words ───────────────────────
        const tokens = seg.text.split(/(\s+|[^A-Za-z'-]+)/g).filter((t) => t !== '');

        return (
          <span key={`${paraKey}-seg-${segIdx}`}>
            {tokens.map((token, tokIdx) => {
              const isWord = /^[A-Za-z][A-Za-z'-]*$/.test(token);
              if (!isWord) {
                return <span key={`${paraKey}-tok-${tokIdx}`}>{token}</span>;
              }

              const wordKey = token.toLowerCase().replace(/^'+|'+$/g, '');
              const isUnknown = unknownWords.has(wordKey);
              const isActive = selectedWord === wordKey;

              return (
                <span
                  key={`${paraKey}-tok-${tokIdx}`}
                  onClick={() => translate(token)}
                  className={cn(
                    'cursor-pointer rounded px-0.5 transition-colors',
                    isUnknown
                      ? 'text-primary dark:text-primary underline decoration-dotted underline-offset-2 hover:bg-primary/10'
                      : isActive
                        ? 'bg-primary/15 text-primary'
                        : 'hover:bg-primary/10 hover:text-primary'
                  )}
                >
                  {token}
                </span>
              );
            })}
          </span>
        );
      });
    },
    [markedPhrases, unknownWords, selectedWord, selectedPhrase, translate]
  );

  // ── Derived values ────────────────────────────────────────────────────────────

  const diffCfg = DIFFICULTY_CONFIG[story.difficulty];
  const panelVisible = !!(selectedWord || selectedPhrase || isTranslating);
  const currentDisplayKey = selectedPhrase || selectedWord;

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6 animate-fade-in pb-52">
      {/* Back link + stats */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Link
          href="/story"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Stories
        </Link>
        <div className="flex items-center gap-2 flex-wrap">
          {unknownWords.size > 0 && (
            <span className="text-xs bg-primary/10 text-primary border border-primary/30 px-2 py-1 rounded-full">
              {unknownWords.size} kata merah
            </span>
          )}
          {markedPhrases.length > 0 && (
            <span className="text-xs bg-primary/10 text-primary dark:text-primary border border-primary/30 px-2 py-1 rounded-full">
              {markedPhrases.length} frasa ditandai
            </span>
          )}
        </div>
      </div>

      {/* Story header */}
      <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full', diffCfg.bg, diffCfg.color)}>
            {diffCfg.label}
          </span>
          <span className="text-xs text-(--text-muted)">{story.topic}</span>
        </div>
        <h1 className="text-2xl font-bold text-(--text)">{story.title}</h1>
        <p className="text-sm text-(--text-secondary) mt-1">{story.subtitle}</p>

        {/* Usage hint */}
        <div className="mt-4 bg-(--bg-secondary) rounded-xl p-3 space-y-1">
          <p className="text-xs text-(--text-secondary)">
            <span className="font-semibold text-(--text)">Klik kata</span> → lihat terjemahan &amp; tandai merah jika belum tahu
          </p>
          <p className="text-xs text-(--text-secondary)">
            <span className="font-semibold text-(--text)">Blok / pilih teks</span> → tombol "Tandai Frasa" akan muncul → frasa disorot kuning
          </p>
          <p className="text-xs text-(--text-secondary)">
            <span className="font-semibold text-(--text)">Klik frasa kuning</span> → terjemahan frasa tersebut muncul
          </p>
        </div>
      </div>

      {/* Key Vocabulary */}
      {story.keyVocab.length > 0 && (
        <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-(--text-muted) mb-3">
            Kosakata Kunci
          </p>
          <div className="flex flex-wrap gap-2">
            {story.keyVocab.map((v, i) => (
              <button
                key={i}
                onClick={() => translate(v.word)}
                className="text-xs px-2.5 py-1 rounded-full bg-(--bg-secondary) border border-(--border) hover:border-primary/50 hover:bg-primary/5 transition-colors text-left"
              >
                <span className="font-semibold text-(--text)">{v.word}</span>
                <span className="text-(--text-muted) ml-1.5">= {v.translation}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Story body */}
      <div ref={storyRef} className="space-y-4 select-text">
        {story.turns.map((turn, idx) => (
          <p
            key={idx}
            className="text-(--text) leading-relaxed text-[15px]"
          >
            {renderParagraph(turn.text, `p${idx}`)}
          </p>
        ))}
      </div>

      {/* Unknown words summary */}
      {unknownWords.size > 0 && (
        <div className="bg-primary/5 border border-primary/30 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowSummary((s) => !s)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
              Kata yang Belum Dikuasai ({unknownWords.size})
            </p>
            {showSummary ? (
              <ChevronUp className="w-4 h-4 text-primary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-primary" />
            )}
          </button>
          {showSummary && (
            <div className="px-4 pb-4 flex flex-wrap gap-2">
              {[...unknownWords].map((word) => (
                <div
                  key={word}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30"
                >
                  <button
                    onClick={() => translate(word)}
                    className="text-primary hover:underline font-medium"
                  >
                    {word}
                  </button>
                  <button
                    onClick={() => toggleUnknown(word)}
                    className="text-primary hover:text-primary ml-0.5 leading-none"
                    title="Hapus tanda"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Marked phrases summary */}
      {markedPhrases.length > 0 && (
        <div className="bg-primary/5 border border-primary/30 rounded-xl p-4">
          <p className="text-xs font-semibold text-primary dark:text-primary uppercase tracking-wider mb-3">
            Frasa yang Ditandai ({markedPhrases.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {markedPhrases.map((phrase) => (
              <div
                key={phrase.id}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full bg-primary/10 border border-primary/30"
              >
                <button
                  onClick={() => translate(phrase.text, true)}
                  className="text-primary dark:text-primary hover:underline max-w-[200px] truncate"
                >
                  {phrase.text}
                </button>
                <button
                  onClick={() => removePhraseMark(phrase.id)}
                  className="text-primary hover:text-primary leading-none shrink-0"
                  title="Hapus tanda"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Floating "Tandai Frasa" button ─────────────────────────────────── */}
      {markButton && (
        <div
          style={{
            position: 'fixed',
            left: markButton.x,
            top: markButton.y,
            transform: 'translateX(-50%)',
            zIndex: 9999,
          }}
          className="flex items-center gap-1 bg-(--bg-card) border border-(--border) rounded-lg shadow-xl p-1"
        >
          <button
            onClick={handleMarkPhrase}
            className="text-xs px-3 py-1.5 rounded-md bg-primary text-white font-semibold hover:bg-primary transition-colors whitespace-nowrap"
          >
            Tandai Frasa
          </button>
          <button
            onClick={() => {
              window.getSelection()?.removeAllRanges();
              setMarkButton(null);
            }}
            className="p-1.5 rounded-md hover:bg-(--hover) text-(--text-secondary)"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* ── Translation Panel ──────────────────────────────────────────────── */}
      {panelVisible && (
        <div className="fixed bottom-4 right-4 w-80 bg-(--bg-card) border border-(--border) rounded-2xl shadow-2xl z-40 overflow-hidden">
          {/* Panel header */}
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-(--border)">
            <div className="flex items-center gap-2 min-w-0">
              {selectedPhrase ? (
                <span className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary dark:text-primary">
                  Frasa
                </span>
              ) : (
                <span className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Kata
                </span>
              )}
              <span className="font-semibold text-(--text) text-sm truncate">
                {currentDisplayKey}
              </span>
            </div>

            <div className="flex items-center gap-0.5 shrink-0">
              {/* Speak */}
              <button
                onClick={() => speakText(currentDisplayKey || '')}
                className="p-1.5 rounded-lg hover:bg-(--hover) text-(--text-secondary)"
                title="Ucapkan"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>

              {/* Mark as unknown (only for single words) */}
              {selectedWord && (
                <button
                  onClick={() => toggleUnknown(selectedWord)}
                  className={cn(
                    'p-1.5 rounded-lg transition-colors',
                    unknownWords.has(selectedWord)
                      ? 'bg-primary/10 text-primary hover:bg-primary/20'
                      : 'hover:bg-primary/10 text-(--text-secondary) hover:text-primary'
                  )}
                  title={
                    unknownWords.has(selectedWord) ? 'Hapus tanda merah' : 'Tandai tidak tahu (merah)'
                  }
                >
                  {unknownWords.has(selectedWord) ? (
                    <BookmarkX className="w-3.5 h-3.5" />
                  ) : (
                    <HelpCircle className="w-3.5 h-3.5" />
                  )}
                </button>
              )}

              {/* Remove phrase mark */}
              {selectedPhrase &&
                markedPhrases.some(
                  (p) => p.text.toLowerCase() === selectedPhrase
                ) && (
                  <button
                    onClick={() => {
                      const p = markedPhrases.find(
                        (p) => p.text.toLowerCase() === selectedPhrase
                      );
                      if (p) removePhraseMark(p.id);
                    }}
                    className="p-1.5 rounded-lg hover:bg-primary/10 text-(--text-secondary) hover:text-primary transition-colors"
                    title="Hapus tanda frasa"
                  >
                    <BookmarkX className="w-3.5 h-3.5" />
                  </button>
                )}

              {/* Minimize toggle */}
              <button
                onClick={() => setPanelMinimized((m) => !m)}
                className="p-1.5 rounded-lg hover:bg-(--hover) text-(--text-secondary)"
              >
                {panelMinimized ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Close */}
              <button
                onClick={() => {
                  setSelectedWord(null);
                  setSelectedPhrase(null);
                  setTranslation(null);
                }}
                className="p-1.5 rounded-lg hover:bg-(--hover) text-(--text-secondary)"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Panel body */}
          {!panelMinimized && (
            <div className="p-3 space-y-2 max-h-72 overflow-y-auto">
              {/* Loading */}
              {isTranslating && (
                <div className="flex items-center gap-2 text-sm text-(--text-secondary)">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  Menerjemahkan...
                </div>
              )}

              {/* Error */}
              {translationError && !isTranslating && (
                <p className="text-sm text-primary">{translationError}</p>
              )}

              {/* Result */}
              {translation && !isTranslating && (
                <>
                  {/* Main translation */}
                  <p className="text-xl font-bold text-primary leading-tight">
                    {translation.translated}
                  </p>

                  {/* Meta */}
                  {(translation.partOfSpeech || translation.ipa) && (
                    <div className="flex items-center gap-2 flex-wrap">
                      {translation.partOfSpeech && (
                        <span className="text-xs bg-(--bg-secondary) text-(--text-muted) px-2 py-0.5 rounded-full">
                          {translation.partOfSpeech}
                        </span>
                      )}
                      {translation.ipa && (
                        <span className="text-xs text-(--text-muted) font-mono">
                          {translation.ipa}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Definition */}
                  {translation.definition && (
                    <p className="text-xs text-(--text-secondary) leading-relaxed">
                      {translation.definition}
                    </p>
                  )}

                  {/* Example */}
                  {translation.example && (
                    <div className="bg-(--bg-secondary) rounded-lg p-2.5">
                      <p className="text-xs text-(--text-secondary) italic leading-relaxed">
                        {translation.example}
                      </p>
                    </div>
                  )}

                  {/* Alternatives */}
                  {translation.alternatives && translation.alternatives.length > 0 && (
                    <div>
                      <p className="text-xs text-(--text-muted) mb-1.5">Alternatif:</p>
                      <div className="flex flex-wrap gap-1">
                        {translation.alternatives.map((alt, i) => (
                          <span
                            key={i}
                            className="text-xs bg-(--bg-secondary) text-(--text) px-2 py-0.5 rounded-full border border-(--border)"
                          >
                            {alt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mark as unknown button (single word) */}
                  {selectedWord && (
                    <button
                      onClick={() => toggleUnknown(selectedWord)}
                      className={cn(
                        'w-full text-xs py-2 rounded-lg font-semibold transition-colors mt-1',
                        unknownWords.has(selectedWord)
                          ? 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30'
                          : 'bg-(--bg-secondary) text-(--text-secondary) hover:bg-primary/10 hover:text-primary border border-(--border)'
                      )}
                    >
                      {unknownWords.has(selectedWord)
                        ? '✓ Ditandai Merah — Klik untuk hapus'
                        : 'Tandai Tidak Tahu (Merah)'}
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
