'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { vocabulary } from '@/data/vocabulary';
import { useVocabStore } from '@/store/useVocabStore';
import { shuffleArray, cn } from '@/lib/utils';
import type { VocabWord } from '@/types/vocab';

interface QuizItem {
  word: VocabWord;
  options: string[];
  correctAnswer: string;
}

function generateQuiz(words: VocabWord[], count: number = 10): QuizItem[] {
  const selected = shuffleArray(words).slice(0, count);
  return selected.map((word) => {
    const correctAnswer = word.meaning.en;
    const wrongAnswers = shuffleArray(
      words.filter((w) => w.id !== word.id).map((w) => w.meaning.en)
    ).slice(0, 3);
    const options = shuffleArray([correctAnswer, ...wrongAnswers]);
    return { word, options, correctAnswer };
  });
}

export default function QuizPage() {
  const addQuizScore = useVocabStore((s) => s.addQuizScore);
  const markAsLearned = useVocabStore((s) => s.markAsLearned);

  const [quiz, setQuiz] = useState(() => generateQuiz(vocabulary));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState<(boolean | null)[]>([]);

  const current = quiz[currentIndex];

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return; // Already answered
    setSelectedAnswer(answer);
    const isCorrect = answer === current.correctAnswer;
    if (isCorrect) {
      setScore((s) => s + 1);
      markAsLearned(current.word.id);
    }
    setAnswers((prev) => [...prev, isCorrect]);
  };

  const handleNext = () => {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
      addQuizScore(score + (selectedAnswer === current.correctAnswer ? 0 : 0), quiz.length);
    }
  };

  const handleRestart = () => {
    setQuiz(generateQuiz(vocabulary));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
    setAnswers([]);
  };

  if (isFinished) {
    const percentage = Math.round((score / quiz.length) * 100);
    return (
      <div className="p-4 lg:p-6 max-w-lg mx-auto text-center space-y-6 animate-fade-in">
        <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-8">
          <Trophy className={cn('w-16 h-16 mx-auto mb-4', percentage >= 70 ? 'text-accent' : 'text-(--text-muted)')} />
          <h1 className="text-2xl font-bold text-(--text) mb-2">Quiz Complete!</h1>
          <p className="text-4xl font-bold text-primary mb-1">
            {score} / {quiz.length}
          </p>
          <p className="text-sm text-(--text-secondary) mb-6">{percentage}% correct</p>

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {answers.map((correct, i) => (
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
          {currentIndex + 1} / {quiz.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-(--bg-secondary) overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / quiz.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-6 lg:p-8">
        <p className="text-sm text-(--text-muted) mb-2">What does this word mean?</p>
        <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-1">{current.word.word}</h2>
        <p className="text-xs text-(--text-muted) mb-6">{current.word.pronunciation.ipa}</p>

        {/* Options */}
        <div className="space-y-3">
          {current.options.map((option, i) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === current.correctAnswer;
            const showResult = selectedAnswer !== null;

            return (
              <button
                key={i}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={cn(
                  'w-full text-left p-4 rounded-xl border text-sm transition-all',
                  !showResult && 'border-(--border) hover:border-primary/50 hover:bg-(--hover)',
                  showResult && isCorrect && 'border-primary/50 bg-primary/10 dark:bg-primary',
                  showResult && isSelected && !isCorrect && 'border-primary/50 bg-primary/10 dark:bg-primary',
                  showResult && !isSelected && !isCorrect && 'border-(--border) opacity-50'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    'text-(--text)',
                    showResult && isCorrect && 'text-primary dark:text-primary font-medium',
                    showResult && isSelected && !isCorrect && 'text-primary dark:text-primary'
                  )}>
                    {option}
                  </span>
                  {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-primary" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-primary" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Next button */}
        {selectedAnswer && (
          <button
            onClick={handleNext}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-dark transition-colors"
          >
            {currentIndex < quiz.length - 1 ? (
              <>Next Question <ArrowRight className="w-4 h-4" /></>
            ) : (
              <>See Results <Trophy className="w-4 h-4" /></>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
