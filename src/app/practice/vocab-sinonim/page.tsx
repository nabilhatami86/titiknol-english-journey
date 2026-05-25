'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Lock, CheckCircle2, XCircle, Star, Trophy,
  RotateCcw, ChevronRight, Lightbulb, BookOpen, Flame, KeyRound,
} from 'lucide-react';
import { cn, shuffleArray } from '@/lib/utils';
import { vocabulary as allWords } from '@/data/vocabulary';
import type { VocabWord } from '@/types/vocab';

// ═══════════════════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════════════════

type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

interface StageProgress {
  status: 'locked' | 'unlocked' | 'completed';
  bestScore: number; // out of STAGE_SIZE
  attempts: number;
}

interface LevelProgress {
  stages: StageProgress[];
}

type ProgressMap = Record<CefrLevel, LevelProgress>;

interface Question {
  id: string;
  type: 'synonym-find' | 'meaning-match' | 'odd-one-out';
  prompt: string;
  targetWord: string;
  partOfSpeech: VocabWord['partOfSpeech'];
  options: string[];
  correctAnswer: string;
  hint: string; // Indonesian meaning
}

// ═══════════════════════════════════════════════════════════════════
//  CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const STAGE_SIZE = 8;
const PASS_SCORE = 5; // minimum to unlock next stage
const STORAGE_KEY = 'vocab-sinonim-progress';
const UNLOCK_CODE = 'TNJOURNEY';

const CEFR_CONFIG: Record<CefrLevel, {
  label: string;
  desc: string;
  color: string;
  badge: string;
  border: string;
  ring: string;
  difficulty: VocabWord['difficulty'][];
  wordSlice: [number, number]; // slice of that difficulty pool
  stageCount: number;
}> = {
  A1: {
    label: 'A1', desc: 'Pemula — Kosakata dasar sehari-hari',
    color: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    border: 'border-emerald-400', ring: 'ring-emerald-400',
    difficulty: ['basic'], wordSlice: [0, 48], stageCount: 6,
  },
  A2: {
    label: 'A2', desc: 'Dasar — Kalimat & topik sederhana',
    color: 'text-teal-600 dark:text-teal-400',
    badge: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300',
    border: 'border-teal-400', ring: 'ring-teal-400',
    difficulty: ['basic'], wordSlice: [48, 96], stageCount: 6,
  },
  B1: {
    label: 'B1', desc: 'Menengah — Topik familiar & umum',
    color: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    border: 'border-blue-400', ring: 'ring-blue-400',
    difficulty: ['basic'], wordSlice: [96, 144], stageCount: 6,
  },
  B2: {
    label: 'B2', desc: 'Atas-menengah — Teks kompleks',
    color: 'text-violet-600 dark:text-violet-400',
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
    border: 'border-violet-400', ring: 'ring-violet-400',
    difficulty: ['basic', 'intermediate'], wordSlice: [144, 192], stageCount: 6,
  },
  C1: {
    label: 'C1', desc: 'Mahir — Bahasa kompleks & nuanced',
    color: 'text-orange-600 dark:text-orange-400',
    badge: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
    border: 'border-orange-400', ring: 'ring-orange-400',
    difficulty: ['intermediate', 'advanced'], wordSlice: [0, 48], stageCount: 5,
  },
  C2: {
    label: 'C2', desc: 'Sangat mahir — Level native speaker',
    color: 'text-rose-600 dark:text-rose-400',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
    border: 'border-rose-400', ring: 'ring-rose-400',
    difficulty: ['advanced', 'intermediate'], wordSlice: [0, 40], stageCount: 4,
  },
};

const LEVEL_ORDER: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const POS_LABEL: Record<VocabWord['partOfSpeech'], string> = {
  noun:      'n.',
  verb:      'v.',
  adjective: 'adj.',
  adverb:    'adv.',
  phrase:    'phrase',
};

const POS_COLOR: Record<VocabWord['partOfSpeech'], string> = {
  noun:      'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  verb:      'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
  adjective: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  adverb:    'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  phrase:    'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300',
};

// ═══════════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════════

function getWordPoolForLevel(level: CefrLevel): VocabWord[] {
  const cfg = CEFR_CONFIG[level];
  const pool = allWords
    .filter(w => cfg.difficulty.includes(w.difficulty) && w.synonyms.length >= 2)
    .slice(...cfg.wordSlice);
  return pool;
}

// Deterministic seed-based shuffle (stable per level+stage, not random)
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildStageQuestions(level: CefrLevel, stageIdx: number): Question[] {
  const pool = getWordPoolForLevel(level);
  if (pool.length === 0) return [];

  // Deterministically pick words for this stage
  const seed = LEVEL_ORDER.indexOf(level) * 1000 + stageIdx * 100;
  const shuffled = seededShuffle(pool, seed);
  const stageWords = shuffled.slice(0, STAGE_SIZE);

  return stageWords.map((word, i): Question => {
    const qType: Question['type'] =
      i % 3 === 0 ? 'synonym-find'
      : i % 3 === 1 ? 'meaning-match'
      : word.synonyms.length >= 3 ? 'odd-one-out' : 'synonym-find';

    const correctSynonym = word.synonyms[0];
    // Distractors: words from whole vocab that are NOT synonyms of this word
    const distractors = seededShuffle(
      allWords.filter(w => w.word !== word.word && !word.synonyms.includes(w.word)),
      seed + i,
    ).slice(0, 3).map(w => w.word);

    if (qType === 'synonym-find') {
      return {
        id: `${level}-s${stageIdx}-q${i}`,
        type: 'synonym-find',
        prompt: `Which word is closest in meaning to:`,
        targetWord: word.word,
        partOfSpeech: word.partOfSpeech,
        options: shuffleArray([correctSynonym, ...distractors]),
        correctAnswer: correctSynonym,
        hint: word.meaning.en,
      };
    }

    if (qType === 'meaning-match') {
      return {
        id: `${level}-s${stageIdx}-q${i}`,
        type: 'meaning-match',
        prompt: `Choose the word that means:`,
        targetWord: `"${word.meaning.en}"`,
        partOfSpeech: word.partOfSpeech,
        options: shuffleArray([word.word, ...distractors]),
        correctAnswer: word.word,
        hint: word.meaning.en,
      };
    }

    // odd-one-out: 3 real synonyms + 1 distractor, find the distractor
    const synonymOptions = seededShuffle([...word.synonyms], seed + i).slice(0, 3);
    const oddOne = distractors[0];
    return {
      id: `${level}-s${stageIdx}-q${i}`,
      type: 'odd-one-out',
      prompt: `Of the words related to "${word.word}", which one does NOT share the same meaning?`,
      targetWord: word.word,
      partOfSpeech: word.partOfSpeech,
      options: shuffleArray([...synonymOptions, oddOne]),
      correctAnswer: oddOne,
      hint: word.meaning.en,
    };
  });
}

function buildInitialProgress(): ProgressMap {
  const map = {} as ProgressMap;
  for (const level of LEVEL_ORDER) {
    const count = CEFR_CONFIG[level].stageCount;
    map[level] = {
      stages: Array.from({ length: count }, (_, i) => ({
        status: level === 'A1' && i === 0 ? 'unlocked' : 'locked',
        bestScore: 0,
        attempts: 0,
      })),
    };
  }
  return map;
}

function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return buildInitialProgress();
    const saved = JSON.parse(raw) as ProgressMap;
    // Merge with defaults in case new levels were added
    const defaults = buildInitialProgress();
    for (const level of LEVEL_ORDER) {
      if (!saved[level]) saved[level] = defaults[level];
    }
    return saved;
  } catch {
    return buildInitialProgress();
  }
}

function saveProgress(p: ProgressMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function totalCompleted(p: ProgressMap): number {
  return LEVEL_ORDER.reduce((acc, lvl) =>
    acc + p[lvl].stages.filter(s => s.status === 'completed').length, 0);
}

function totalStages(): number {
  return LEVEL_ORDER.reduce((acc, lvl) => acc + CEFR_CONFIG[lvl].stageCount, 0);
}

// ═══════════════════════════════════════════════════════════════════
//  COMPONENT
// ═══════════════════════════════════════════════════════════════════

type View = 'levels' | 'stages' | 'practice' | 'result';

export default function VocabSinonimPage() {
  const [progress, setProgress] = useState<ProgressMap | null>(null);
  const [view, setView] = useState<View>('levels');
  const [activeLevel, setActiveLevel] = useState<CefrLevel | null>(null);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [codeStatus, setCodeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Load from localStorage on mount
  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const score = useMemo(() =>
    answers.filter((a, i) => a !== null && questions[i] && a === questions[i].correctAnswer).length,
    [answers, questions],
  );

  if (!progress) return null; // wait for hydration

  const startStage = (level: CefrLevel, stageIdx: number) => {
    const qs = buildStageQuestions(level, stageIdx);
    setActiveLevel(level);
    setActiveStage(stageIdx);
    setQuestions(qs);
    setCurrentQ(0);
    setSelected(null);
    setAnswers(new Array(qs.length).fill(null));
    setShowHint(false);
    setView('practice');
  };

  const handleSelect = (opt: string) => {
    if (selected !== null) return;
    setSelected(opt);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = selected;
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowHint(false);
    } else {
      // Calculate final score from newAnswers
      const finalScore = newAnswers.filter((a, i) => a !== null && questions[i] && a === questions[i].correctAnswer).length;
      finishStage(finalScore, newAnswers);
    }
  };

  const finishStage = (finalScore: number, finalAnswers: (string | null)[]) => {
    setAnswers(finalAnswers);
    if (!activeLevel) return;
    const passed = finalScore >= PASS_SCORE;
    const newProgress = JSON.parse(JSON.stringify(progress)) as ProgressMap;
    const stages = newProgress[activeLevel].stages;
    const stage = stages[activeStage];

    stage.attempts += 1;
    if (finalScore > stage.bestScore) stage.bestScore = finalScore;
    if (passed) {
      stage.status = 'completed';
      // Unlock next stage in this level
      if (activeStage + 1 < stages.length) {
        stages[activeStage + 1].status = 'unlocked';
      } else {
        // Unlock next CEFR level's stage 0
        const nextLevelIdx = LEVEL_ORDER.indexOf(activeLevel) + 1;
        if (nextLevelIdx < LEVEL_ORDER.length) {
          const nextLevel = LEVEL_ORDER[nextLevelIdx];
          newProgress[nextLevel].stages[0].status = 'unlocked';
        }
      }
    }

    saveProgress(newProgress);
    setProgress(newProgress);
    setView('result');
  };

  const handleUnlockCode = () => {
    if (codeInput.trim().toUpperCase() !== UNLOCK_CODE) {
      setCodeStatus('error');
      return;
    }
    const newProgress = JSON.parse(JSON.stringify(progress)) as ProgressMap;
    for (const level of LEVEL_ORDER) {
      newProgress[level].stages = newProgress[level].stages.map(s => ({
        ...s,
        status: s.status === 'completed' ? 'completed' : 'unlocked',
      }));
    }
    saveProgress(newProgress);
    setProgress(newProgress);
    setCodeStatus('success');
    setCodeInput('');
  };

  // ── LEVELS VIEW ────────────────────────────────────────────────────
  if (view === 'levels') {
    const done = totalCompleted(progress);
    const total = totalStages();
    return (
      <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-5 animate-fade-in">
        <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Practice
        </Link>

        <div>
          <h1 className="text-xl font-bold text-(--text) flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> Latihan Sinonim & Makna
          </h1>
          <p className="text-sm text-(--text-secondary) mt-1">
            Latih kemampuan mengenali kata mirip (sinonim) dari level A1 hingga C2. Selesaikan setiap tahap untuk membuka level berikutnya.
          </p>
        </div>

        {/* Overall progress */}
        <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-(--text-muted) uppercase tracking-wide">Progress Keseluruhan</span>
            <span className="text-sm font-bold text-primary">{done} / {total} stage</span>
          </div>
          <div className="h-2.5 rounded-full bg-(--bg-secondary) overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${(done / total) * 100}%` }} />
          </div>
        </div>

        {/* Unlock code */}
        <div className="border border-(--border) rounded-xl overflow-hidden">
          <button
            onClick={() => { setShowCodeInput(!showCodeInput); setCodeStatus('idle'); setCodeInput(''); }}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-(--hover) transition-colors"
          >
            <span className="flex items-center gap-2 text-sm text-(--text-muted)">
              <KeyRound className="w-4 h-4" /> Punya kode akses?
            </span>
            <span className="text-xs text-(--text-muted)">{showCodeInput ? '▲' : '▼'}</span>
          </button>
          {showCodeInput && (
            <div className="border-t border-(--border) px-4 py-3 space-y-2">
              {codeStatus === 'success' && (
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Semua stage berhasil dibuka!
                </p>
              )}
              {codeStatus === 'error' && (
                <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Kode salah, coba lagi.
                </p>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={codeInput}
                  onChange={e => { setCodeInput(e.target.value); setCodeStatus('idle'); }}
                  onKeyDown={e => e.key === 'Enter' && handleUnlockCode()}
                  placeholder="Masukkan kode..."
                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-(--border) bg-(--bg-secondary) text-(--text) focus:outline-none focus:border-primary/60 uppercase tracking-widest"
                />
                <button
                  onClick={handleUnlockCode}
                  disabled={!codeInput.trim()}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                    codeInput.trim() ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-(--bg-secondary) text-(--text-muted) cursor-not-allowed',
                  )}
                >
                  Buka
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Level cards */}
        <div className="grid gap-3">
          {LEVEL_ORDER.map((lvl, lvlIdx) => {
            const cfg = CEFR_CONFIG[lvl];
            const lvlProgress = progress[lvl];
            const completedCount = lvlProgress.stages.filter(s => s.status === 'completed').length;
            const isLocked = lvlProgress.stages.every(s => s.status === 'locked');
            const isAllDone = completedCount === cfg.stageCount;
            const prevLevel = lvlIdx > 0 ? LEVEL_ORDER[lvlIdx - 1] : null;
            const prevDone = prevLevel ? progress[prevLevel].stages.every(s => s.status === 'completed') : true;

            return (
              <button
                key={lvl}
                onClick={() => !isLocked && (setActiveLevel(lvl), setView('stages'))}
                disabled={isLocked}
                className={cn(
                  'w-full text-left rounded-2xl border-2 p-4 transition-all',
                  isLocked
                    ? 'border-(--border) opacity-50 cursor-not-allowed'
                    : isAllDone
                    ? cn('cursor-pointer hover:shadow-md', cfg.border)
                    : cn('cursor-pointer hover:shadow-md', cfg.border),
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black border-2 shrink-0',
                    isLocked ? 'border-(--border) bg-(--bg-secondary) text-(--text-muted)' : cn(cfg.border, cfg.color),
                  )}>
                    {isLocked ? <Lock className="w-6 h-6" /> : lvl}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', isLocked ? 'bg-(--bg-secondary) text-(--text-muted)' : cfg.badge)}>
                        {cfg.label}
                      </span>
                      {isAllDone && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 flex items-center gap-1"><Trophy className="w-3 h-3" /> Selesai!</span>}
                      {!isLocked && !isAllDone && prevDone && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 flex items-center gap-1"><Flame className="w-3 h-3" /> Aktif</span>}
                    </div>
                    <p className="text-sm text-(--text-secondary) mt-0.5">{cfg.desc}</p>
                    {!isLocked && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-(--bg-secondary) overflow-hidden">
                          <div className={cn('h-full rounded-full transition-all', isAllDone ? 'bg-green-500' : 'bg-primary')} style={{ width: `${(completedCount / cfg.stageCount) * 100}%` }} />
                        </div>
                        <span className="text-xs text-(--text-muted) shrink-0">{completedCount}/{cfg.stageCount}</span>
                      </div>
                    )}
                  </div>
                  {!isLocked && <ChevronRight className={cn('w-5 h-5 shrink-0', cfg.color)} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── STAGES VIEW ────────────────────────────────────────────────────
  if (view === 'stages' && activeLevel) {
    const cfg = CEFR_CONFIG[activeLevel];
    const lvlProgress = progress[activeLevel];
    return (
      <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-5 animate-fade-in">
        <button onClick={() => setView('levels')} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Semua Level
        </button>

        <div className="flex items-center gap-3">
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black border-2 shrink-0', cfg.border, cfg.color)}>
            {activeLevel}
          </div>
          <div>
            <h1 className="text-xl font-bold text-(--text)">Level {activeLevel}</h1>
            <p className="text-sm text-(--text-secondary)">{cfg.desc}</p>
          </div>
        </div>

        <div className="grid gap-3">
          {lvlProgress.stages.map((stage, sIdx) => {
            const isLocked = stage.status === 'locked';
            const isDone = stage.status === 'completed';
            const pct = stage.bestScore > 0 ? Math.round((stage.bestScore / STAGE_SIZE) * 100) : 0;
            const stars = stage.bestScore >= 8 ? 3 : stage.bestScore >= 6 ? 2 : stage.bestScore >= PASS_SCORE ? 1 : 0;

            return (
              <button
                key={sIdx}
                onClick={() => !isLocked && startStage(activeLevel, sIdx)}
                disabled={isLocked}
                className={cn(
                  'w-full text-left rounded-xl border p-4 transition-all',
                  isLocked ? 'border-(--border) opacity-40 cursor-not-allowed bg-(--bg-secondary)'
                  : isDone ? cn('border-2 hover:shadow-sm cursor-pointer', cfg.border)
                  : 'border-2 border-primary/40 hover:shadow-sm cursor-pointer bg-primary/5',
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0',
                    isLocked ? 'bg-(--bg-secondary) text-(--text-muted)'
                    : isDone ? cn('text-white', cfg.badge.includes('emerald') ? 'bg-emerald-500' : cfg.badge.includes('teal') ? 'bg-teal-500' : cfg.badge.includes('blue') ? 'bg-blue-500' : cfg.badge.includes('violet') ? 'bg-violet-500' : cfg.badge.includes('orange') ? 'bg-orange-500' : 'bg-rose-500')
                    : 'bg-primary text-white',
                  )}>
                    {isLocked ? <Lock className="w-4 h-4" /> : isDone ? <CheckCircle2 className="w-5 h-5" /> : sIdx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-(--text)">Stage {sIdx + 1}</span>
                      {stage.attempts > 0 && (
                        <span className="text-xs text-(--text-muted)">{stage.attempts}× dicoba</span>
                      )}
                    </div>
                    {stage.bestScore > 0 && (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-0.5">
                          {[1, 2, 3].map(n => (
                            <Star key={n} className={cn('w-3.5 h-3.5', n <= stars ? 'text-amber-400 fill-amber-400' : 'text-(--border)')} />
                          ))}
                        </div>
                        <span className="text-xs text-(--text-secondary)">{stage.bestScore}/{STAGE_SIZE} ({pct}%)</span>
                      </div>
                    )}
                    {!isLocked && stage.bestScore === 0 && (
                      <p className="text-xs text-(--text-muted) mt-0.5">{STAGE_SIZE} soal · perlu {PASS_SCORE}+ untuk lanjut</p>
                    )}
                  </div>
                  {!isLocked && <ChevronRight className={cn('w-4 h-4 shrink-0', cfg.color)} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── PRACTICE VIEW ──────────────────────────────────────────────────
  if (view === 'practice' && activeLevel) {
    const cfg = CEFR_CONFIG[activeLevel];
    const q = questions[currentQ];
    if (!q) return null;

    return (
      <div className="p-4 lg:p-6 max-w-xl mx-auto space-y-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => setView('stages')} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Keluar
          </button>
          <div className="flex items-center gap-2">
            <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', cfg.badge)}>{activeLevel}</span>
            <span className="text-xs text-(--text-muted)">Stage {activeStage + 1}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs text-(--text-muted) mb-1.5">
            <span>Soal {currentQ + 1} / {questions.length}</span>
            <span>{answers.filter(a => a !== null).length} dijawab</span>
          </div>
          <div className="h-2 rounded-full bg-(--bg-secondary) overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${((currentQ) / questions.length) * 100}%` }} />
          </div>
        </div>

        {/* Question type badge */}
        <div className="flex items-center gap-2">
          <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full',
            q.type === 'synonym-find' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
            : q.type === 'meaning-match' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
            : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
          )}>
            {q.type === 'synonym-find' ? 'Cari Sinonim'
             : q.type === 'meaning-match' ? 'Tebak dari Makna'
             : 'Temukan yang Berbeda'}
          </span>
        </div>

        {/* Question card */}
        <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-5 text-center">
          <p className="text-sm text-(--text-secondary) mb-2">{q.prompt}</p>
          <p className="text-2xl font-black text-primary tracking-wide">{q.targetWord}</p>
          <span className={cn('inline-block mt-2 text-[11px] font-bold px-2.5 py-0.5 rounded-full tracking-wide', POS_COLOR[q.partOfSpeech])}>
            {POS_LABEL[q.partOfSpeech]}
          </span>
          {q.type === 'synonym-find' && (
            <button onClick={() => setShowHint(!showHint)} className="mt-2 text-xs text-(--text-muted) hover:text-primary transition-colors underline underline-offset-2">
              {showHint ? 'Sembunyikan hint' : 'Tampilkan hint (arti)'}
            </button>
          )}
          {showHint && (
            <p className="mt-2 text-sm text-(--text-secondary) italic">{q.hint}</p>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-2.5">
          {q.options.map((opt, oIdx) => {
            const isSelected = selected === opt;
            const isCorrect = opt === q.correctAnswer;
            const showResult = selected !== null;

            return (
              <button
                key={oIdx}
                onClick={() => handleSelect(opt)}
                disabled={selected !== null}
                className={cn(
                  'flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left text-sm transition-all font-medium',
                  !showResult && 'border-(--border) hover:border-primary/50 hover:bg-primary/5 text-(--text)',
                  showResult && isCorrect && 'border-green-400 bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300',
                  showResult && isSelected && !isCorrect && 'border-red-400 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 line-through opacity-80',
                  showResult && !isSelected && !isCorrect && 'border-(--border) opacity-40',
                  isSelected && !showResult && 'border-primary bg-primary/10 text-primary',
                )}
              >
                <span className={cn(
                  'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0',
                  !showResult && isSelected ? 'bg-primary text-white' : 'bg-(--bg-secondary) text-(--text-muted)',
                  showResult && isCorrect && 'bg-green-500 text-white',
                  showResult && isSelected && !isCorrect && 'bg-red-400 text-white',
                )}>
                  {showResult && isCorrect ? <CheckCircle2 className="w-4 h-4" /> :
                   showResult && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> :
                   String.fromCharCode(65 + oIdx)}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation + Next */}
        {selected !== null && (
          <div className="space-y-3 animate-fade-in">
            <div className={cn(
              'flex items-start gap-2 rounded-xl px-4 py-3 border',
              selected === q.correctAnswer
                ? 'bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-800'
                : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
            )}>
              <Lightbulb className={cn('w-4 h-4 mt-0.5 shrink-0', selected === q.correctAnswer ? 'text-green-500' : 'text-amber-500')} />
              <div className="text-xs leading-relaxed">
                {selected === q.correctAnswer
                  ? <span className="text-green-700 dark:text-green-300 font-medium">Correct! "{q.correctAnswer}" {q.type === 'synonym-find' ? `is a synonym of "${q.targetWord}"` : q.type === 'meaning-match' ? `means "${q.hint}"` : `is not a synonym of "${q.targetWord}"`}.</span>
                  : <span className="text-amber-800 dark:text-amber-300">The correct answer is <strong>"{q.correctAnswer}"</strong>. {q.type === 'odd-one-out' ? `"${selected}" is actually a synonym of "${q.targetWord}".` : `"${q.correctAnswer}" means: ${q.hint}.`}</span>
                }
              </div>
            </div>

            <button onClick={handleNext}
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors"
            >
              {currentQ < questions.length - 1 ? 'Soal Berikutnya →' : 'Lihat Hasil'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── RESULT VIEW ────────────────────────────────────────────────────
  if (view === 'result' && activeLevel) {
    const cfg = CEFR_CONFIG[activeLevel];
    const passed = score >= PASS_SCORE;
    const pct = Math.round((score / STAGE_SIZE) * 100);
    const stars = score >= 8 ? 3 : score >= 6 ? 2 : score >= PASS_SCORE ? 1 : 0;
    const isLastStage = activeStage === cfg.stageCount - 1;
    const isLastLevel = activeLevel === 'C2';
    const nextStageAvailable = passed && !isLastStage;
    const nextLevelAvailable = passed && isLastStage && !isLastLevel;

    return (
      <div className="p-4 lg:p-6 max-w-xl mx-auto space-y-5 animate-fade-in">
        <button onClick={() => setView('stages')} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Stage List
        </button>

        {/* Score card */}
        <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-6 text-center">
          <div className={cn('w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4',
            passed ? 'border-green-400 bg-green-50 dark:bg-green-950/30' : 'border-red-400 bg-red-50 dark:bg-red-950/30',
          )}>
            {passed ? <Trophy className="w-10 h-10 text-amber-500" /> : <RotateCcw className="w-10 h-10 text-red-500" />}
          </div>

          <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', cfg.badge)}>{activeLevel} · Stage {activeStage + 1}</span>
          <p className="text-5xl font-black text-primary mt-3">{score}<span className="text-lg font-semibold text-(--text-muted)">/{STAGE_SIZE}</span></p>

          {/* Stars */}
          <div className="flex justify-center gap-1 my-3">
            {[1, 2, 3].map(n => (
              <Star key={n} className={cn('w-7 h-7', n <= stars ? 'text-amber-400 fill-amber-400' : 'text-(--border)')} />
            ))}
          </div>

          <p className="text-sm font-semibold text-(--text) mb-1">
            {passed ? (score === STAGE_SIZE ? '🎉 Sempurna!' : '✅ Lulus!') : '❌ Belum Lulus'}
          </p>
          <p className="text-xs text-(--text-secondary)">
            {passed
              ? nextLevelAvailable ? `Level ${activeLevel} selesai! Level ${LEVEL_ORDER[LEVEL_ORDER.indexOf(activeLevel) + 1]} terbuka.`
                : nextStageAvailable ? `Stage ${activeStage + 2} terbuka!`
                : isLastLevel && isLastStage ? 'Luar biasa! Kamu sudah menyelesaikan semua level!'
                : 'Stage ini sudah diselesaikan.'
              : `Perlu ${PASS_SCORE} benar untuk lulus. Kamu dapat ${score}. Coba lagi!`}
          </p>

          {/* Progress bar */}
          <div className="h-2.5 rounded-full bg-(--bg-secondary) overflow-hidden mt-4 max-w-xs mx-auto">
            <div className={cn('h-full rounded-full transition-all', passed ? 'bg-green-500' : 'bg-red-400')}
              style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-(--text-muted) mt-1">{pct}% benar</p>
        </div>

        {/* Per-question result */}
        <div className="bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden">
          <p className="px-4 py-3 text-xs font-semibold text-(--text-muted) uppercase tracking-wide border-b border-(--border)">Detail Jawaban</p>
          <div className="divide-y divide-(--border)">
            {questions.map((q, i) => {
              const userAns = answers[i];
              const correct = userAns === q.correctAnswer;
              return (
                <div key={q.id} className="px-4 py-2.5 flex items-start gap-3">
                  <div className={cn('w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5',
                    correct ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
                  )}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="text-(--text) font-medium truncate">{q.prompt} <span className="text-primary">"{q.targetWord}"</span></p>
                    <p className={cn('mt-0.5', correct ? 'text-green-600 dark:text-green-400' : 'text-red-500')}>
                      {correct ? `✓ ${userAns}` : `✗ Kamu: ${userAns ?? '—'} → Benar: ${q.correctAnswer}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid gap-2">
          {!passed && (
            <button onClick={() => startStage(activeLevel, activeStage)}
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Coba Lagi Stage {activeStage + 1}
            </button>
          )}
          {nextStageAvailable && (
            <button onClick={() => startStage(activeLevel, activeStage + 1)}
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              Stage {activeStage + 2} <ChevronRight className="w-4 h-4" />
            </button>
          )}
          {nextLevelAvailable && (
            <button onClick={() => { setActiveLevel(LEVEL_ORDER[LEVEL_ORDER.indexOf(activeLevel) + 1]); setView('stages'); }}
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              Lanjut ke {LEVEL_ORDER[LEVEL_ORDER.indexOf(activeLevel) + 1]} <ChevronRight className="w-4 h-4" />
            </button>
          )}
          <button onClick={() => setView('stages')}
            className="w-full py-2.5 rounded-xl border border-(--border) text-(--text-secondary) text-sm hover:bg-(--hover) transition-colors"
          >
            Pilih Stage Lain
          </button>
        </div>
      </div>
    );
  }

  return null;
}
