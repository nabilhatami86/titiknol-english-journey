'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronLeft, RotateCcw, Check, X, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface Vocab {
  word: string;
  category: 'Addition' | 'Contrast' | 'Concession' | 'Result';
  meaning: string;
  englishDef: string;
  example: string;
  tip: string;
}

interface Token { id: number; text: string }

interface ArrangeItem {
  correct: string[];
  marker: string;
  sentence: string;
}

interface TranslateQ {
  sentence: string;
  marker: string;
  correct: string;
  options: string[];
}

type Phase = 'learn' | 'arrange' | 'translate' | 'done';

/* ─── Vocab Data ─────────────────────────────────────────────────────────── */

const VOCAB: Vocab[] = [
  { word: 'Furthermore', category: 'Addition', meaning: 'Selain itu / Lebih dari itu', englishDef: 'Used to add a point that strengthens what was just said.', example: 'She is talented. Furthermore, she practises every single day.', tip: 'Starts a new sentence. More emphatic than "also".' },
  { word: 'Moreover', category: 'Addition', meaning: 'Terlebih lagi / Bahkan', englishDef: 'Introduces an additional, often stronger point.', example: 'The hotel was expensive. Moreover, the service was poor.', tip: 'Slightly more formal than "furthermore"; adds an even stronger point.' },
  { word: 'In addition', category: 'Addition', meaning: 'Ditambah lagi / Selain itu', englishDef: 'Adds extra information without special emphasis.', example: 'The course covers grammar. In addition, students practise speaking weekly.', tip: 'Neutral addition — very common in academic and formal writing.' },
  { word: 'However', category: 'Contrast', meaning: 'Namun / Akan tetapi', englishDef: 'Introduces a contrasting or unexpected fact.', example: 'He studied hard. However, he did not pass the exam.', tip: 'Always followed by a comma when it starts a sentence.' },
  { word: 'Nevertheless', category: 'Contrast', meaning: 'Meskipun demikian / Tetap saja', englishDef: 'Despite what was said, something is still true.', example: 'The task was difficult. Nevertheless, the team finished it on time.', tip: 'Stronger than "however". Implies determination in the face of obstacles.' },
  { word: 'On the other hand', category: 'Contrast', meaning: 'Di sisi lain / Sebaliknya', englishDef: 'Presents a contrasting point or alternative perspective.', example: 'City life is exciting. On the other hand, it can be very stressful.', tip: 'Use when balancing two sides of one argument.' },
  { word: 'In contrast', category: 'Contrast', meaning: 'Berbeda dengan itu / Sebaliknya', englishDef: 'Shows how two things are clearly different.', example: 'Cats are independent. In contrast, dogs need constant attention.', tip: 'More specific than "however" — directly compares two different things.' },
  { word: 'Even though', category: 'Concession', meaning: 'Meskipun / Walaupun', englishDef: 'Introduces a surprising contrast within one sentence.', example: 'Even though it was raining, they continued the outdoor event.', tip: 'Connects two clauses in ONE sentence — not two separate sentences.' },
  { word: 'Although', category: 'Concession', meaning: 'Walaupun / Meskipun', englishDef: 'Similar to "even though"; introduces a concession within a sentence.', example: 'Although she was tired, she completed all her assignments.', tip: 'Interchangeable with "even though"; "even though" is slightly stronger.' },
  { word: 'Therefore', category: 'Result', meaning: 'Oleh karena itu / Dengan demikian', englishDef: 'Introduces a logical conclusion or result.', example: 'He missed the bus. Therefore, he arrived late to the meeting.', tip: 'Formal. Common in academic writing for logical deduction.' },
  { word: 'Consequently', category: 'Result', meaning: 'Akibatnya / Sebagai akibatnya', englishDef: 'Something happened as a direct result of something else.', example: 'She skipped breakfast. Consequently, she felt dizzy before noon.', tip: 'Emphasises a direct cause-and-effect relationship.' },
  { word: 'As a result', category: 'Result', meaning: 'Sebagai hasilnya / Akibatnya', englishDef: 'Introduces the effect or outcome of a previous action.', example: 'They trained every day. As a result, they won the competition.', tip: 'Very common in academic writing. Interchangeable with "consequently".' },
];

/* ─── Arrange Data ───────────────────────────────────────────────────────── */

const ARRANGE_DATA: ArrangeItem[] = [
  { correct: ['The', 'food', 'was', 'delicious.', 'Furthermore,', 'the', 'price', 'was', 'very', 'affordable.'], marker: 'Furthermore,', sentence: 'The food was delicious. Furthermore, the price was very affordable.' },
  { correct: ['He', 'worked', 'all', 'night.', 'However,', 'his', 'report', 'was', 'not', 'complete.'], marker: 'However,', sentence: 'He worked all night. However, his report was not complete.' },
  { correct: ['Even though', 'it', 'was', 'cold,', 'they', 'went', 'for', 'a', 'morning', 'run.'], marker: 'Even though', sentence: 'Even though it was cold, they went for a morning run.' },
  { correct: ['She', 'failed', 'the', 'first', 'test.', 'Consequently,', 'she', 'studied', 'harder.'], marker: 'Consequently,', sentence: 'She failed the first test. Consequently, she studied harder.' },
  { correct: ['The', 'plan', 'was', 'risky.', 'Nevertheless,', 'the', 'team', 'decided', 'to', 'proceed.'], marker: 'Nevertheless,', sentence: 'The plan was risky. Nevertheless, the team decided to proceed.' },
  { correct: ['Although', 'the', 'movie', 'was', 'long,', 'everyone', 'enjoyed', 'watching', 'it.'], marker: 'Although', sentence: 'Although the movie was long, everyone enjoyed watching it.' },
];

/* ─── Translate Data ─────────────────────────────────────────────────────── */

const TRANSLATE_QS: TranslateQ[] = [
  { sentence: 'She is talented. Furthermore, she practises every single day.', marker: 'Furthermore', correct: 'Selain itu / Lebih dari itu', options: ['Selain itu / Lebih dari itu', 'Namun / Akan tetapi', 'Akibatnya / Sebagai akibatnya', 'Meskipun / Walaupun'] },
  { sentence: 'The hotel was expensive. Moreover, the service was poor.', marker: 'Moreover', correct: 'Terlebih lagi / Bahkan', options: ['Oleh karena itu / Dengan demikian', 'Terlebih lagi / Bahkan', 'Di sisi lain / Sebaliknya', 'Berbeda dengan itu / Sebaliknya'] },
  { sentence: 'The course covers grammar. In addition, students practise speaking weekly.', marker: 'In addition', correct: 'Ditambah lagi / Selain itu', options: ['Meskipun demikian / Tetap saja', 'Namun / Akan tetapi', 'Ditambah lagi / Selain itu', 'Sebagai hasilnya / Akibatnya'] },
  { sentence: 'He studied hard. However, he did not pass the exam.', marker: 'However', correct: 'Namun / Akan tetapi', options: ['Namun / Akan tetapi', 'Selain itu / Lebih dari itu', 'Walaupun / Meskipun', 'Terlebih lagi / Bahkan'] },
  { sentence: 'The task was difficult. Nevertheless, the team finished it on time.', marker: 'Nevertheless', correct: 'Meskipun demikian / Tetap saja', options: ['Oleh karena itu / Dengan demikian', 'Ditambah lagi / Selain itu', 'Meskipun demikian / Tetap saja', 'Akibatnya / Sebagai akibatnya'] },
  { sentence: 'City life is exciting. On the other hand, it can be very stressful.', marker: 'On the other hand', correct: 'Di sisi lain / Sebaliknya', options: ['Sebagai hasilnya / Akibatnya', 'Di sisi lain / Sebaliknya', 'Meskipun / Walaupun', 'Terlebih lagi / Bahkan'] },
  { sentence: 'Cats are independent. In contrast, dogs need constant attention.', marker: 'In contrast', correct: 'Berbeda dengan itu / Sebaliknya', options: ['Ditambah lagi / Selain itu', 'Berbeda dengan itu / Sebaliknya', 'Namun / Akan tetapi', 'Oleh karena itu / Dengan demikian'] },
  { sentence: 'Even though it was raining, they continued the outdoor event.', marker: 'Even though', correct: 'Meskipun / Walaupun', options: ['Akibatnya / Sebagai akibatnya', 'Terlebih lagi / Bahkan', 'Meskipun / Walaupun', 'Meskipun demikian / Tetap saja'] },
  { sentence: 'Although she was tired, she completed all her assignments.', marker: 'Although', correct: 'Walaupun / Meskipun', options: ['Namun / Akan tetapi', 'Walaupun / Meskipun', 'Di sisi lain / Sebaliknya', 'Selain itu / Lebih dari itu'] },
  { sentence: 'He missed the bus. Therefore, he arrived late to the meeting.', marker: 'Therefore', correct: 'Oleh karena itu / Dengan demikian', options: ['Meskipun / Walaupun', 'Berbeda dengan itu / Sebaliknya', 'Oleh karena itu / Dengan demikian', 'Ditambah lagi / Selain itu'] },
  { sentence: 'She skipped breakfast. Consequently, she felt dizzy before noon.', marker: 'Consequently', correct: 'Akibatnya / Sebagai akibatnya', options: ['Akibatnya / Sebagai akibatnya', 'Meskipun demikian / Tetap saja', 'Terlebih lagi / Bahkan', 'Walaupun / Meskipun'] },
  { sentence: 'They trained every day. As a result, they won the competition.', marker: 'As a result', correct: 'Sebagai hasilnya / Akibatnya', options: ['Namun / Akan tetapi', 'Di sisi lain / Sebaliknya', 'Selain itu / Lebih dari itu', 'Sebagai hasilnya / Akibatnya'] },
];

/* ─── Deterministic Shuffle ──────────────────────────────────────────────── */

function deterministicShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── Pre-shuffled Arrange ───────────────────────────────────────────────── */

const ARRANGE_SHUFFLED = ARRANGE_DATA.map((item, i) => ({
  ...item,
  shuffled: deterministicShuffle(
    item.correct.map((text, j) => ({ id: j, text })),
    i * 17 + 7
  ),
}));

/* ─── Category Styles ────────────────────────────────────────────────────── */

const CAT_STYLES: Record<string, string> = {
  Addition:   'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Contrast:   'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  Concession: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Result:     'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function VocabTrainerPage() {
  const [phase, setPhase] = useState<Phase>('learn');

  /* Phase 1 */
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  /* Phase 2 */
  const [arrIdx, setArrIdx] = useState(0);
  const [bank, setBank] = useState<Token[]>(() => ARRANGE_SHUFFLED[0].shuffled);
  const [placed, setPlaced] = useState<Token[]>([]);
  const [arrResult, setArrResult] = useState<boolean | null>(null);
  const [arrScore, setArrScore] = useState(0);

  /* Phase 3 */
  const [transIdx, setTransIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [transScore, setTransScore] = useState(0);

  /* ── Phase 1 handlers ── */
  const card = VOCAB[cardIdx];
  const goNext = () => { setCardIdx(i => Math.min(i + 1, VOCAB.length - 1)); setFlipped(false); };
  const goPrev = () => { setCardIdx(i => Math.max(i - 1, 0)); setFlipped(false); };

  /* ── Phase 2 handlers ── */
  const currentArr = ARRANGE_SHUFFLED[arrIdx];

  const placeToken = (token: Token) => {
    if (arrResult !== null) return;
    setBank(b => b.filter(t => t.id !== token.id));
    setPlaced(p => [...p, token]);
  };

  const removeToken = (token: Token) => {
    if (arrResult !== null) return;
    setPlaced(p => p.filter(t => t.id !== token.id));
    setBank(b => [...b, token]);
  };

  const checkArrange = () => {
    const isCorrect = placed.map(t => t.text).join(' ') === currentArr.correct.join(' ');
    setArrResult(isCorrect);
    if (isCorrect) setArrScore(s => s + 1);
  };

  const nextArrange = () => {
    const next = arrIdx + 1;
    if (next >= ARRANGE_SHUFFLED.length) {
      setPhase('translate');
    } else {
      setArrIdx(next);
      setBank(ARRANGE_SHUFFLED[next].shuffled);
      setPlaced([]);
      setArrResult(null);
    }
  };

  const resetArrange = () => {
    setBank(currentArr.shuffled);
    setPlaced([]);
    setArrResult(null);
  };

  /* ── Phase 3 handlers ── */
  const currentQ = TRANSLATE_QS[transIdx];

  const chooseOption = (idx: number) => {
    if (chosen !== null) return;
    setChosen(idx);
    if (currentQ.options[idx] === currentQ.correct) setTransScore(s => s + 1);
  };

  const nextTranslate = () => {
    const next = transIdx + 1;
    if (next >= TRANSLATE_QS.length) {
      setPhase('done');
    } else {
      setTransIdx(next);
      setChosen(null);
    }
  };

  /* ── Reset all ── */
  const resetAll = () => {
    setPhase('learn');
    setCardIdx(0); setFlipped(false);
    setArrIdx(0); setBank(ARRANGE_SHUFFLED[0].shuffled); setPlaced([]); setArrResult(null); setArrScore(0);
    setTransIdx(0); setChosen(null); setTransScore(0);
  };

  /* ── Highlight marker in sentence ── */
  const highlight = (sentence: string, marker: string) => {
    const idx = sentence.indexOf(marker);
    if (idx === -1) return <span>{sentence}</span>;
    return (
      <>
        {sentence.slice(0, idx)}
        <mark className="bg-yellow-200 dark:bg-yellow-700/50 text-yellow-900 dark:text-yellow-100 px-0.5 rounded not-italic">
          {marker}
        </mark>
        {sentence.slice(idx + marker.length)}
      </>
    );
  };

  const phases = ['learn', 'arrange', 'translate'] as const;
  const phaseLabels = ['1. Learn', '2. Arrange', '3. Translate'];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/practice" className="p-2 rounded-lg hover:bg-(--hover) text-(--text-secondary)">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-(--text)">Vocab Trainer</h1>
          <p className="text-sm text-(--text-muted)">Discourse &amp; Linking Words</p>
        </div>
      </div>

      {/* Phase Stepper */}
      {phase !== 'done' && (
        <div className="flex items-center gap-2">
          {phases.map((p, i) => {
            const active = phase === p;
            const done = phases.indexOf(phase) > i;
            return (
              <div key={p} className="flex items-center gap-2">
                <div className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors',
                  active ? 'bg-primary text-white' :
                  done   ? 'bg-primary/20 text-primary' :
                           'bg-(--bg-secondary) text-(--text-muted)'
                )}>
                  {phaseLabels[i]}
                </div>
                {i < 2 && <ChevronRight className="w-3 h-3 text-(--text-muted)" />}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Phase 1: Learn ── */}
      {phase === 'learn' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-(--text-muted)">
            <span>Card {cardIdx + 1} / {VOCAB.length}</span>
            <span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold', CAT_STYLES[card.category])}>
              {card.category}
            </span>
          </div>

          <div
            className={cn(
              'cursor-pointer rounded-2xl border border-(--border) p-6 min-h-[280px] transition-all select-none',
              flipped ? 'bg-primary/5 border-primary/20' : 'bg-(--bg-secondary) hover:shadow-md'
            )}
            onClick={() => setFlipped(f => !f)}
          >
            {!flipped ? (
              <div className="flex flex-col items-center justify-center h-full gap-5 text-center min-h-[230px]">
                <p className="text-4xl font-bold text-(--text)">{card.word}</p>
                <p className="text-sm text-(--text-muted) italic max-w-xs">"{card.example}"</p>
                <p className="text-xs text-(--text-muted) mt-2 border border-(--border) px-3 py-1 rounded-full">
                  Tap to see meaning
                </p>
              </div>
            ) : (
              <div className="space-y-4 min-h-[230px]">
                <div className="flex items-center justify-between">
                  <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', CAT_STYLES[card.category])}>
                    {card.category}
                  </span>
                  <span className="text-sm font-bold text-(--text)">{card.word}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary leading-tight">{card.meaning}</p>
                  <p className="text-sm text-(--text-secondary) mt-1">{card.englishDef}</p>
                </div>
                <div className="bg-(--bg) rounded-xl p-3 border border-(--border)">
                  <p className="text-xs font-semibold text-(--text-muted) mb-1">Example</p>
                  <p className="text-sm text-(--text) italic">{card.example}</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 border border-amber-200 dark:border-amber-800">
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">Tip</p>
                  <p className="text-sm text-amber-800 dark:text-amber-200">{card.tip}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={cardIdx === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-(--border) text-sm text-(--text-secondary) hover:bg-(--hover) disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            {cardIdx === VOCAB.length - 1 ? (
              <button
                onClick={() => setPhase('arrange')}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90"
              >
                Start Arrange <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={goNext}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-(--border) text-sm text-(--text-secondary) hover:bg-(--hover)"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setPhase('arrange')}
            className="w-full text-xs text-(--text-muted) hover:text-(--text) py-1"
          >
            Skip to Arrange →
          </button>
        </div>
      )}

      {/* ── Phase 2: Arrange ── */}
      {phase === 'arrange' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-(--text-muted)">
            <span>Question {arrIdx + 1} / {ARRANGE_SHUFFLED.length}</span>
            <span>Score: {arrScore} / {arrIdx + (arrResult !== null ? 1 : 0)}</span>
          </div>

          <div className="rounded-2xl border border-(--border) bg-(--bg-secondary) p-5 space-y-4">
            <p className="text-sm text-(--text)">
              Susun kata-kata berikut menjadi kalimat yang benar.{' '}
              <span className="font-bold text-primary">Marker: {currentArr.marker}</span>
            </p>

            {/* Answer area */}
            <div className="min-h-[56px] bg-(--bg) rounded-xl border-2 border-dashed border-(--border) p-3 flex flex-wrap gap-2">
              {placed.length === 0 && (
                <span className="text-xs text-(--text-muted) self-center">Klik kata di bawah untuk menyusun kalimat…</span>
              )}
              {placed.map(token => (
                <button
                  key={token.id}
                  onClick={() => removeToken(token)}
                  disabled={arrResult !== null}
                  className={cn(
                    'px-2.5 py-1.5 rounded-lg text-sm font-medium border transition-colors',
                    token.text === currentArr.marker
                      ? 'bg-primary/10 text-primary border-primary/30'
                      : 'bg-(--bg-secondary) text-(--text) border-(--border)',
                    arrResult !== null && 'cursor-default'
                  )}
                >
                  {token.text}
                </button>
              ))}
            </div>

            {/* Word bank */}
            <div className="flex flex-wrap gap-2">
              {bank.map(token => (
                <button
                  key={token.id}
                  onClick={() => placeToken(token)}
                  disabled={arrResult !== null}
                  className={cn(
                    'px-2.5 py-1.5 rounded-lg text-sm font-medium border transition-colors',
                    token.text === currentArr.marker
                      ? 'bg-primary/20 text-primary border-primary/40 font-bold'
                      : 'bg-(--bg) text-(--text) border-(--border) hover:bg-(--hover)',
                    arrResult !== null && 'opacity-40 cursor-default'
                  )}
                >
                  {token.text}
                </button>
              ))}
            </div>

            {arrResult !== null && (
              <div className={cn(
                'rounded-xl p-3 text-sm font-medium flex items-start gap-2',
                arrResult
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200'
              )}>
                {arrResult
                  ? <Check className="w-4 h-4 mt-0.5 shrink-0" />
                  : <X className="w-4 h-4 mt-0.5 shrink-0" />}
                <span>
                  {arrResult ? 'Benar!' : <>Jawaban benar: <em>{currentArr.sentence}</em></>}
                </span>
              </div>
            )}

            <div className="flex gap-2">
              {arrResult === null ? (
                <>
                  <button
                    onClick={resetArrange}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-(--border) text-sm text-(--text-secondary) hover:bg-(--hover)"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset
                  </button>
                  <button
                    onClick={checkArrange}
                    disabled={bank.length > 0}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-40"
                  >
                    <Check className="w-4 h-4" /> Cek Jawaban
                  </button>
                </>
              ) : (
                <button
                  onClick={nextArrange}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90"
                >
                  {arrIdx + 1 < ARRANGE_SHUFFLED.length ? 'Soal Berikutnya' : 'Lanjut ke Translate'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Phase 3: Translate ── */}
      {phase === 'translate' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-(--text-muted)">
            <span>Question {transIdx + 1} / {TRANSLATE_QS.length}</span>
            <span>Score: {transScore} / {transIdx + (chosen !== null ? 1 : 0)}</span>
          </div>

          <div className="rounded-2xl border border-(--border) bg-(--bg-secondary) p-5 space-y-4">
            <p className="text-sm text-(--text-muted)">
              Apa arti kata yang disorot dalam kalimat berikut?
            </p>

            <p className="text-base text-(--text) leading-relaxed bg-(--bg) rounded-xl p-4 border border-(--border)">
              {highlight(currentQ.sentence, currentQ.marker)}
            </p>

            <div className="space-y-2">
              {currentQ.options.map((opt, i) => {
                const isCorrect = opt === currentQ.correct;
                const isChosen = chosen === i;
                return (
                  <button
                    key={i}
                    onClick={() => chooseOption(i)}
                    disabled={chosen !== null}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors',
                      chosen === null
                        ? 'bg-(--bg) border-(--border) hover:bg-(--hover) text-(--text)'
                        : isChosen && isCorrect
                          ? 'bg-green-100 border-green-400 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                          : isChosen && !isCorrect
                            ? 'bg-rose-100 border-rose-400 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200'
                            : isCorrect
                              ? 'bg-green-50 border-green-300 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                              : 'bg-(--bg) border-(--border) text-(--text-muted) opacity-50'
                    )}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {chosen !== null && (
              <button
                onClick={nextTranslate}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90"
              >
                {transIdx + 1 < TRANSLATE_QS.length ? 'Soal Berikutnya' : 'Lihat Hasil'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Done ── */}
      {phase === 'done' && (
        <div className="text-center space-y-6 py-8">
          <div className="w-20 h-20 mx-auto bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
            <Trophy className="w-10 h-10 text-yellow-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-(--text)">Selesai!</h2>
            <p className="text-(--text-muted) mt-1">Kamu sudah menyelesaikan semua latihan</p>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            <div className="bg-(--bg-secondary) rounded-2xl p-4 border border-(--border)">
              <p className="text-3xl font-bold text-primary">{arrScore}/{ARRANGE_SHUFFLED.length}</p>
              <p className="text-xs text-(--text-muted) mt-1">Arrange Score</p>
            </div>
            <div className="bg-(--bg-secondary) rounded-2xl p-4 border border-(--border)">
              <p className="text-3xl font-bold text-primary">{transScore}/{TRANSLATE_QS.length}</p>
              <p className="text-xs text-(--text-muted) mt-1">Translate Score</p>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={resetAll}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-(--border) text-sm font-semibold text-(--text) hover:bg-(--hover)"
            >
              <RotateCcw className="w-4 h-4" /> Ulangi
            </button>
            <Link
              href="/practice"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90"
            >
              Kembali ke Practice
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
