'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  PenLine,
} from 'lucide-react';
import { vocabulary } from '@/data/vocabulary';
import { useVocabStore } from '@/store/useVocabStore';
import { shuffleArray, cn } from '@/lib/utils';
import type { VocabWord } from '@/types/vocab';

interface BlankItem {
  word: VocabWord;
  sentence: string;
  blankedSentence: string;
  answer: string;
}

function generateBlanks(words: VocabWord[], count: number = 10): BlankItem[] {
  const eligible = words.filter((w) => w.examples.length > 0);
  const selected = shuffleArray(eligible).slice(0, count);
  return selected.map((word) => {
    const sentence = word.examples[0];
    const regex = new RegExp(`\\b${word.word}\\b`, 'i');
    const blankedSentence = sentence.replace(regex, '_____');
    return {
      word,
      sentence,
      blankedSentence,
      answer: word.word.toLowerCase(),
    };
  });
}

export default function FillBlanksPage() {
  const markAsLearned = useVocabStore((s) => s.markAsLearned);
  const addQuizScore = useVocabStore((s) => s.addQuizScore);

  const [items, setItems] = useState(() => generateBlanks(vocabulary));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = items[currentIndex];

  const handleCheck = () => {
    if (!userInput.trim()) return;
    const correct = userInput.trim().toLowerCase() === current.answer;
    setIsChecked(true);
    setIsCorrect(correct);
    if (correct) {
      setScore((s) => s + 1);
      markAsLearned(current.word.id);
    }
    setResults((prev) => [...prev, correct]);
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((i) => i + 1);
      setUserInput('');
      setIsChecked(false);
      setIsCorrect(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setIsFinished(true);
      addQuizScore(score, items.length);
    }
  };

  const handleRestart = () => {
    setItems(generateBlanks(vocabulary));
    setCurrentIndex(0);
    setUserInput('');
    setIsChecked(false);
    setIsCorrect(false);
    setScore(0);
    setIsFinished(false);
    setResults([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!isChecked) handleCheck();
      else handleNext();
    }
  };

  if (isFinished) {
    const percentage = Math.round((score / items.length) * 100);
    return (
      <div className="p-4 lg:p-6 max-w-lg mx-auto text-center space-y-6 animate-fade-in">
        <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-8">
          <Trophy className={cn('w-16 h-16 mx-auto mb-4', percentage >= 70 ? 'text-accent' : 'text-(--text-muted)')} />
          <h1 className="text-2xl font-bold text-(--text) mb-2">Exercise Complete!</h1>
          <p className="text-4xl font-bold text-primary mb-1">
            {score} / {items.length}
          </p>
          <p className="text-sm text-(--text-secondary) mb-6">{percentage}% correct</p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {results.map((correct, i) => (
              <div
                key={i}
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium',
                  correct
                    ? 'bg-primary/10 text-primary dark:bg-primary dark:text-primary'
                    : 'bg-primary/10 text-primary dark:bg-primary dark:text-primary'
                )}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 px-4 py-2 border border-(--border) text-(--text-secondary) rounded-lg font-medium text-sm hover:bg-(--hover) transition-colors"
            >
              Back to Practice
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          {currentIndex + 1} / {items.length}
        </span>
      </div>

      {/* Progress */}
      <div className="h-2 rounded-full bg-(--bg-secondary) overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-6 lg:p-8">
        <div className="flex items-center gap-2 mb-4">
          <PenLine className="w-5 h-5 text-accent" />
          <p className="text-sm text-(--text-muted)">Fill in the blank with the correct word</p>
        </div>

        {/* Hint */}
        <p className="text-sm text-(--text-secondary) mb-2">
          Meaning: <span className="font-medium text-(--text)">{current.word.meaning.en}</span>
        </p>
        <p className="text-sm text-primary/80 italic mb-4">{current.word.meaning.id}</p>

        {/* Sentence with blank */}
        <p className="text-lg text-(--text) mb-6 leading-relaxed">
          {current.blankedSentence}
        </p>

        {/* Input */}
        <div className="space-y-4">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type the missing word..."
            disabled={isChecked}
            autoFocus
            className={cn(
              'w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors',
              !isChecked && 'border-(--border) bg-(--bg-secondary) text-(--text) focus:ring-primary/50 focus:border-primary',
              isChecked && isCorrect && 'border-primary/50 bg-primary/10 text-primary dark:bg-primary dark:text-primary',
              isChecked && !isCorrect && 'border-primary/50 bg-primary/10 text-primary dark:bg-primary dark:text-primary'
            )}
          />

          {isChecked && (
            <div className={cn(
              'flex items-center gap-2 text-sm p-3 rounded-lg',
              isCorrect
                ? 'bg-primary/10 text-primary dark:bg-primary dark:text-primary'
                : 'bg-primary/10 text-primary dark:bg-primary dark:text-primary'
            )}>
              {isCorrect ? (
                <><CheckCircle className="w-4 h-4" /> Correct!</>
              ) : (
                <><XCircle className="w-4 h-4" /> The answer is: <span className="font-bold">{current.word.word}</span></>
              )}
            </div>
          )}

          {!isChecked ? (
            <button
              onClick={handleCheck}
              disabled={!userInput.trim()}
              className="w-full px-4 py-3 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-dark transition-colors"
            >
              {currentIndex < items.length - 1 ? (
                <>Next <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>See Results <Trophy className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
