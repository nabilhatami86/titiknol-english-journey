'use client';

import type { ReactNode } from 'react';
import { CheckCircle2, Circle, XCircle, Lightbulb, BookText } from 'lucide-react';
import { cn } from '@/lib/utils';
import ListeningAudioSection from '@/components/listening/ListeningAudioSection';
import type { ModuleLesson, ModuleExercise as Exercise } from '@/types/module';

interface Props {
  lesson: ModuleLesson;
  selectedOptions: Record<string, string>;
  setSelectedOptions: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  notes: Record<string, string>;
  setNotes: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  submittedAnswers: Record<string, boolean>;
  setSubmittedAnswers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  showQuizGame: boolean;
  setShowQuizGame: React.Dispatch<React.SetStateAction<boolean>>;
  quizGameRef: React.RefObject<HTMLDivElement | null>;
  renderClickableText: (text: string) => ReactNode;
}

function FeedbackBox({ isCorrect, correctAnswer, reason }: {
  isCorrect: boolean;
  correctAnswer?: string;
  reason?: string;
}) {
  return (
    <div className="rounded-lg px-4 py-3 text-sm flex items-start gap-2 bg-primary/10 border border-primary/30">
      {isCorrect
        ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
        : <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-primary" />}
      <div>
        <p className="font-medium text-primary">
          {isCorrect ? 'Benar!' : 'Salah!'}
          {!isCorrect && correctAnswer && (
            <span className="font-normal text-(--text-secondary)">
              {' '}Jawaban yang benar:{' '}
              <span className="font-semibold text-primary">{correctAnswer}</span>
            </span>
          )}
        </p>
        {reason && (
          <p className="mt-1 text-(--text-secondary) flex items-start gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
            {reason}
          </p>
        )}
      </div>
    </div>
  );
}

function ExerciseItem({
  exercise,
  index,
  startNum,
  exercises,
  selectedOptions,
  setSelectedOptions,
  notes,
  setNotes,
  submittedAnswers,
  setSubmittedAnswers,
  renderClickableText,
}: {
  exercise: Exercise;
  index: number;
  startNum: number;
  exercises: Exercise[];
  selectedOptions: Record<string, string>;
  setSelectedOptions: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  notes: Record<string, string>;
  setNotes: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  submittedAnswers: Record<string, boolean>;
  setSubmittedAnswers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  renderClickableText: (text: string) => ReactNode;
}) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const isDone =
    exercise.type === 'multiple-choice' ||
    exercise.type === 'fill-the-gap' ||
    exercise.type === 'true-false-not-given'
      ? Boolean(selectedOptions[exercise.id])
      : Boolean(notes[exercise.id]?.trim());

  return (
    <div className="bg-(--bg-card) border border-(--border) rounded-xl p-5 space-y-3">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-(--text-muted)">{startNum + index}.</span>
            {exercise.type === 'fill-the-gap' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary/15 text-primary border border-primary/25">
                Fill the Gap
              </span>
            )}
            {exercise.type === 'true-false-not-given' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary/15 text-primary border border-primary/25">
                T / F / NG
              </span>
            )}
            {exercise.question.startsWith('Terjemahkan: ') && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary/15 text-primary border border-primary/25">
                Terjemahkan
              </span>
            )}
          </div>
          {isDone
            ? <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            : <Circle className="w-4 h-4 text-(--text-muted) shrink-0" />}
        </div>
        {exercise.type !== 'fill-the-gap' && (
          <p className="text-sm text-(--text) font-medium leading-relaxed">
            {exercise.question.startsWith('Terjemahkan: ')
              ? renderClickableText(exercise.question.replace('Terjemahkan: ', ''))
              : renderClickableText(exercise.question)}
          </p>
        )}
      </div>

      {/* Multiple choice */}
      {exercise.type === 'multiple-choice' && exercise.options && (() => {
        const selected = selectedOptions[exercise.id];
        const hasAnswered = Boolean(selected);
        const isCorrect = hasAnswered && selected === exercise.correctAnswer;

        if (exercise.imageUrl) {
          const correctLetter = letters[exercise.options.indexOf(exercise.correctAnswer ?? '')];
          return (
            <div className="space-y-3">
              <img src={exercise.imageUrl} alt="Exercise options" className="w-full rounded-lg border border-(--border) object-contain" />
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${exercise.options.length}, 1fr)` }}>
                {exercise.options.map((option, oi) => {
                  const letter = letters[oi];
                  const isSelected = selected === option;
                  const isAnswer = option === exercise.correctAnswer;
                  return (
                    <button
                      key={option}
                      onClick={() => setSelectedOptions(prev => ({ ...prev, [exercise.id]: option }))}
                      className={cn(
                        'py-2 rounded-lg border text-sm font-bold transition-colors',
                        hasAnswered && exercise.correctAnswer
                          ? isAnswer ? 'border-primary/50 bg-primary/15 text-primary'
                            : isSelected ? 'border-primary/50 bg-primary/10 text-primary'
                            : 'border-(--border) text-(--text-muted)'
                          : isSelected ? 'border-primary bg-primary/10 text-primary'
                          : 'border-(--border) hover:border-primary/50 text-(--text-secondary)'
                      )}
                    >{letter}</button>
                  );
                })}
              </div>
              {hasAnswered && exercise.correctAnswer && (
                <FeedbackBox
                  isCorrect={isCorrect}
                  correctAnswer={!isCorrect ? `${correctLetter} — ${exercise.correctAnswer}` : undefined}
                  reason={exercise.reason}
                />
              )}
            </div>
          );
        }

        return (
          <div className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-2">
              {exercise.options.map((option, oi) => {
                const letter = letters[oi];
                const isSelected = selected === option;
                const isAnswer = option === exercise.correctAnswer;
                const showResult = hasAnswered && exercise.correctAnswer;
                return (
                  <button
                    key={option}
                    onClick={() => setSelectedOptions(prev => ({ ...prev, [exercise.id]: option }))}
                    className={cn(
                      'text-left text-sm px-3 py-2.5 rounded-lg border transition-colors',
                      showResult
                        ? isAnswer ? 'border-primary/50 bg-primary/10 text-primary font-medium'
                          : isSelected ? 'border-primary/50 bg-primary/10 text-primary'
                          : 'border-(--border) text-(--text-muted)'
                        : isSelected ? 'border-primary bg-primary/10 text-primary'
                        : 'border-(--border) hover:border-primary/50 text-(--text-secondary)'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className={cn(
                        'shrink-0 w-5 h-5 rounded-full border text-[10px] font-bold flex items-center justify-center',
                        showResult
                          ? isAnswer ? 'border-primary/50 text-primary'
                            : isSelected ? 'border-primary/50 text-primary'
                            : 'border-(--border) text-(--text-muted)'
                          : isSelected ? 'border-primary text-primary'
                          : 'border-(--border) text-(--text-muted)'
                      )}>{letter}</span>
                      {showResult && isAnswer && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-primary" />}
                      {showResult && isSelected && !isAnswer && <XCircle className="w-3.5 h-3.5 shrink-0 text-primary" />}
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
            {hasAnswered && exercise.correctAnswer && (
              <FeedbackBox
                isCorrect={isCorrect}
                correctAnswer={!isCorrect ? exercise.correctAnswer : undefined}
                reason={exercise.reason}
              />
            )}
          </div>
        );
      })()}

      {/* Fill the gap */}
      {exercise.type === 'fill-the-gap' && exercise.options && (() => {
        const ftgAll = exercises.filter(e => e.type === 'fill-the-gap');
        const allWords = [...new Set(ftgAll.flatMap(e => e.options ?? []))].sort();
        const usedElsewhere = new Set(
          ftgAll
            .filter(e => e.id !== exercise.id)
            .map(e => selectedOptions[e.id])
            .filter((w): w is string => Boolean(w))
        );
        const selected = selectedOptions[exercise.id];
        const hasAnswered = Boolean(selected);
        const isCorrect = hasAnswered && selected === exercise.correctAnswer;
        const displayOptions = hasAnswered ? allWords : allWords.filter(w => !usedElsewhere.has(w));

        // Separate instruction header from the actual sentence
        const paragraphs = exercise.question.split('\n\n');
        const sentence = paragraphs[paragraphs.length - 1];
        const instructionRaw = paragraphs.slice(0, -1).filter(l => !l.startsWith('Word Bank:')).join(' ').trim();

        // Split sentence on blank (any run of 3+ underscores)
        const blankMatch = sentence.match(/_{3,}/);
        const blankIdx = blankMatch?.index ?? -1;
        const sentBefore = blankIdx >= 0 ? sentence.slice(0, blankIdx) : sentence;
        const sentAfter  = blankIdx >= 0 ? sentence.slice(blankIdx + (blankMatch?.[0].length ?? 5)) : '';

        return (
          <div className="space-y-4">
            {instructionRaw && (
              <p className="text-xs text-(--text-muted) italic leading-relaxed">{instructionRaw}</p>
            )}

            {/* Sentence card with inline blank */}
            <div className="bg-primary/[0.03] border border-primary/15 rounded-xl px-4 py-3.5 text-sm leading-loose text-(--text)">
              {renderClickableText(sentBefore)}
              <span className={cn(
                'inline-flex items-center justify-center min-w-[90px] mx-1.5 px-3 py-0.5 rounded-lg border-2 font-bold transition-all duration-200 align-baseline',
                hasAnswered && isCorrect
                  ? 'border-primary/50 text-primary bg-primary/15'
                  : hasAnswered && !isCorrect
                    ? 'border-primary/30 text-primary/50 bg-primary/8 line-through decoration-2'
                    : selected
                      ? 'border-primary text-primary bg-primary/15'
                      : 'border-dashed border-(--border) text-(--text-muted) bg-(--bg-secondary)'
              )}>
                {selected ?? '· · ·'}
              </span>
              {renderClickableText(sentAfter)}
            </div>

            {/* Word bank */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-(--text-muted)">
                Word Bank · {displayOptions.length} kata tersisa
              </p>
              <div className="flex flex-wrap gap-2">
                {displayOptions.map(option => {
                  const isSelected = selected === option;
                  const isAnswer = option === exercise.correctAnswer;
                  const showResult = hasAnswered;
                  return (
                    <button
                      key={option}
                      disabled={hasAnswered}
                      onClick={() => { if (!hasAnswered) setSelectedOptions(prev => ({ ...prev, [exercise.id]: option })); }}
                      className={cn(
                        'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150',
                        showResult
                          ? isAnswer
                            ? 'border-primary/40 bg-primary/15 text-primary cursor-default'
                            : isSelected
                              ? 'border-primary/20 bg-primary/8 text-primary/50 line-through opacity-60 cursor-default'
                              : 'border-(--border) text-(--text-muted) opacity-35 cursor-not-allowed'
                          : isSelected
                            ? 'border-primary bg-primary/15 text-primary shadow-sm shadow-primary/15 -translate-y-0.5'
                            : 'border-(--border) bg-(--bg-card) hover:border-primary/50 hover:bg-primary/8 hover:text-primary text-(--text-secondary)'
                      )}
                    >
                      {showResult && isAnswer && <CheckCircle2 className="w-3 h-3 shrink-0" />}
                      {showResult && isSelected && !isAnswer && <XCircle className="w-3 h-3 shrink-0" />}
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {hasAnswered && exercise.correctAnswer && (
              <FeedbackBox
                isCorrect={isCorrect}
                correctAnswer={!isCorrect ? exercise.correctAnswer : undefined}
                reason={exercise.reason}
              />
            )}
          </div>
        );
      })()}

      {/* True / False / Not Given */}
      {exercise.type === 'true-false-not-given' && exercise.options && (() => {
        const selected = selectedOptions[exercise.id];
        const hasAnswered = Boolean(selected);
        const isCorrect = hasAnswered && selected === exercise.correctAnswer;

        const btnStyle = (option: string) => {
          const isSelected = selected === option;
          const isAnswer = option === exercise.correctAnswer;
          if (hasAnswered) {
            if (isAnswer) return 'border-2 font-semibold border-primary/50 bg-primary/15 text-primary';
            if (isSelected && !isAnswer) return 'border-2 border-primary/30 bg-primary/10 text-primary line-through opacity-70';
            return 'border border-(--border) text-(--text-muted) opacity-40';
          }
          if (isSelected) return 'border-2 font-semibold border-primary/30 bg-primary/10 text-primary';
          return 'border border-(--border) hover:border-primary/50 text-(--text-secondary) cursor-pointer';
        };

        return (
          <div className="space-y-3">
            <div className="flex gap-2 flex-wrap">
              {exercise.options.map(option => (
                <button
                  key={option}
                  disabled={hasAnswered}
                  onClick={() => { if (!hasAnswered) setSelectedOptions(prev => ({ ...prev, [exercise.id]: option })); }}
                  className={cn('px-4 py-2 rounded-lg text-sm transition-all', btnStyle(option))}
                >
                  {option === 'True' && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1.5" />}
                  {option === 'False' && <XCircle className="w-3.5 h-3.5 inline mr-1.5" />}
                  {option === 'Not Given' && <span className="mr-1.5 font-bold">?</span>}
                  {option}
                </button>
              ))}
            </div>
            {hasAnswered && exercise.correctAnswer && (
              <FeedbackBox
                isCorrect={isCorrect}
                correctAnswer={!isCorrect ? exercise.correctAnswer : undefined}
                reason={exercise.reason}
              />
            )}
          </div>
        );
      })()}

      {/* Short answer / Translate / Task */}
      {exercise.type !== 'multiple-choice' &&
        exercise.type !== 'fill-the-gap' &&
        exercise.type !== 'true-false-not-given' && (() => {
        if (exercise.type === 'short-answer' && exercise.correctAnswer) {
          const isTranslate = exercise.question.startsWith('Terjemahkan: ');
          const userInput = notes[exercise.id] ?? '';
          const isSubmitted = submittedAnswers[exercise.id] === true;
          const normalize = (s: string) =>
            s.toLowerCase().trim().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
          const isCorrect = isSubmitted && (() => {
            const n = normalize(userInput);
            const base = exercise.correctAnswer ?? '';
            const variants = [
              base,
              base.replace(/\bhe\b/g, 'she').replace(/\bhim\b/g, 'her').replace(/\bhis\b/g, 'her'),
              base.replace(/\bshe\b/g, 'he').replace(/\bher\b/g, 'him'),
            ].map(normalize);
            return variants.some(v => n === v);
          })();

          return (
            <div className="space-y-2">
              <div className="flex gap-2 items-end">
                {isTranslate ? (
                  <textarea
                    value={userInput}
                    onChange={(e) => {
                      setNotes(prev => ({ ...prev, [exercise.id]: e.target.value }));
                      if (submittedAnswers[exercise.id]) setSubmittedAnswers(prev => ({ ...prev, [exercise.id]: false }));
                    }}
                    placeholder="Tulis terjemahan kamu..."
                    rows={2}
                    className="flex-1 rounded-lg border border-(--border) bg-(--bg-secondary) px-3 py-2 text-sm text-(--text) focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => {
                      setNotes(prev => ({ ...prev, [exercise.id]: e.target.value }));
                      if (submittedAnswers[exercise.id]) setSubmittedAnswers(prev => ({ ...prev, [exercise.id]: false }));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setSubmittedAnswers(prev => ({ ...prev, [exercise.id]: true }));
                    }}
                    placeholder="Tulis jawaban..."
                    className="flex-1 rounded-lg border border-(--border) bg-(--bg-secondary) px-3 py-2 text-sm text-(--text) focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                )}
                <button
                  onClick={() => setSubmittedAnswers(prev => ({ ...prev, [exercise.id]: true }))}
                  className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
                >Cek</button>
              </div>
              {isSubmitted && (
                <FeedbackBox
                  isCorrect={isCorrect}
                  correctAnswer={!isCorrect ? exercise.correctAnswer : undefined}
                  reason={exercise.reason}
                />
              )}
            </div>
          );
        }

        if (exercise.type === 'short-answer' && exercise.sampleAnswer) {
          const isSubmitted = submittedAnswers[exercise.id] === true;
          return (
            <div className="space-y-2">
              <textarea
                value={notes[exercise.id] ?? ''}
                onChange={(e) => setNotes(prev => ({ ...prev, [exercise.id]: e.target.value }))}
                placeholder="Tulis terjemahan kamu..."
                className="w-full min-h-[80px] rounded-lg border border-(--border) bg-(--bg-secondary) px-3 py-2 text-sm text-(--text) focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                onClick={() => setSubmittedAnswers(prev => ({ ...prev, [exercise.id]: true }))}
                className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
              >Lihat Contoh Jawaban</button>
              {isSubmitted && (
                <div className="rounded-lg px-4 py-3 text-sm bg-primary/10 border border-primary/30 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-primary">Contoh jawaban:</p>
                    <p className="mt-0.5 text-(--text-secondary)">{exercise.sampleAnswer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        }

        return (
          <textarea
            value={notes[exercise.id] ?? ''}
            onChange={(e) => setNotes(prev => ({ ...prev, [exercise.id]: e.target.value }))}
            placeholder="Write your answer here..."
            className="w-full min-h-[90px] rounded-lg border border-(--border) bg-(--bg-secondary) px-3 py-2 text-sm text-(--text) focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        );
      })()}
    </div>
  );
}

function ExerciseList({
  exercises,
  startNum,
  selectedOptions,
  setSelectedOptions,
  notes,
  setNotes,
  submittedAnswers,
  setSubmittedAnswers,
  renderClickableText,
}: {
  exercises: Exercise[];
  startNum: number;
  selectedOptions: Record<string, string>;
  setSelectedOptions: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  notes: Record<string, string>;
  setNotes: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  submittedAnswers: Record<string, boolean>;
  setSubmittedAnswers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  renderClickableText: (text: string) => ReactNode;
}) {
  return (
    <div className="space-y-4">
      {exercises.map((exercise, index) => (
        <ExerciseItem
          key={exercise.id}
          exercise={exercise}
          index={index}
          startNum={startNum}
          exercises={exercises}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          notes={notes}
          setNotes={setNotes}
          submittedAnswers={submittedAnswers}
          setSubmittedAnswers={setSubmittedAnswers}
          renderClickableText={renderClickableText}
        />
      ))}
    </div>
  );
}

function SectionDivider({ label, primary }: { label: string; primary?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={cn('h-px flex-1', primary ? 'bg-primary/30' : 'bg-(--border)')} />
      <h2 className={cn(
        'text-sm font-semibold uppercase tracking-wider whitespace-nowrap px-2',
        primary ? 'text-primary' : 'text-(--text-secondary)'
      )}>
        {label}
      </h2>
      <div className={cn('h-px flex-1', primary ? 'bg-primary/30' : 'bg-(--border)')} />
    </div>
  );
}

export function ExerciseSection({
  lesson,
  selectedOptions,
  setSelectedOptions,
  notes,
  setNotes,
  submittedAnswers,
  setSubmittedAnswers,
  showQuizGame,
  setShowQuizGame,
  quizGameRef,
  renderClickableText,
}: Props) {
  const allExercises = lesson.exercises;
  if (allExercises.length === 0) return null;

  const middle  = allExercises.filter(e => e.section === 'middle');
  const final   = allExercises.filter(e => e.section === 'final');
  const quiz    = allExercises.filter(e => e.section === 'quiz');
  const part1   = allExercises.filter(e => e.section === 'part1');
  const part2   = allExercises.filter(e => e.section === 'part2');
  const part3   = allExercises.filter(e => e.section === 'part3');
  const regular = allExercises.filter(e => !e.section);
  const hasTest  = middle.length > 0 || final.length > 0;
  const hasParts = part1.length > 0 || part2.length > 0 || part3.length > 0;

  const sharedProps = {
    selectedOptions, setSelectedOptions,
    notes, setNotes,
    submittedAnswers, setSubmittedAnswers,
    renderClickableText,
  };

  const QuizGamePanel = quiz.length > 0 ? (
    <div ref={quizGameRef} className="mt-10 scroll-mt-6">
      {!showQuizGame ? (
        <button type="button" onClick={() => setShowQuizGame(true)} className="w-full group">
          <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/[0.03] px-6 py-5 transition-all group-hover:border-primary/50 group-hover:bg-primary/[0.07]">
            <span className="text-4xl select-none">🎮</span>
            <div className="flex-1 text-left">
              <p className="font-bold text-(--text)">Review Quiz</p>
              <p className="text-xs text-(--text-muted) mt-0.5">{quiz.length} soal pilihan ganda — uji pemahamanmu!</p>
            </div>
            <span className="text-sm font-semibold text-primary border border-primary/30 rounded-full px-4 py-1.5 group-hover:bg-primary/10 transition-colors whitespace-nowrap">
              Mulai →
            </span>
          </div>
        </button>
      ) : (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-primary/20" />
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider whitespace-nowrap">🎮 Review Quiz</h2>
            <div className="h-px flex-1 bg-primary/20" />
          </div>
          <p className="text-xs text-(--text-muted) text-center">{quiz.length} soal — pilih jawaban yang paling tepat!</p>
          <div className="space-y-4">
            {quiz.map((exercise, index) => {
              const chosen = selectedOptions[exercise.id];
              const isSubmitted = submittedAnswers[exercise.id];
              const isCorrect = chosen === exercise.correctAnswer;
              return (
                <div key={exercise.id} className="bg-(--bg-card) border border-(--border) rounded-xl p-5 space-y-3">
                  <p className="text-sm text-(--text) font-medium">{index + 1}. {exercise.question}</p>
                  <div className="space-y-2">
                    {exercise.options?.map(opt => {
                      const sel = chosen === opt;
                      const correct = opt === exercise.correctAnswer;
                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={!!isSubmitted}
                          onClick={() => setSelectedOptions(p => ({ ...p, [exercise.id]: opt }))}
                          className={cn(
                            'w-full text-left text-sm px-4 py-2.5 rounded-lg border transition-colors',
                            isSubmitted && correct ? 'bg-primary/10 border-primary/40 text-primary' :
                            isSubmitted && sel && !correct ? 'bg-primary/10 border-primary/40 text-primary' :
                            sel ? 'bg-primary/10 border-primary/40 text-primary' :
                            'bg-(--bg-secondary) border-(--border) text-(--text-secondary) hover:border-primary/30'
                          )}
                        >{opt}</button>
                      );
                    })}
                  </div>
                  {!isSubmitted && chosen && (
                    <button
                      type="button"
                      onClick={() => setSubmittedAnswers(p => ({ ...p, [exercise.id]: true }))}
                      className="text-xs font-semibold text-primary border border-primary/30 rounded-full px-4 py-1.5 hover:bg-primary/10 transition-colors"
                    >Cek Jawaban</button>
                  )}
                  {isSubmitted && (
                    <div className="text-xs rounded-lg px-3 py-2 border bg-primary/10 border-primary/20 text-primary">
                      <span className="font-bold">{isCorrect ? '✓ Benar!' : '✗ Salah.'}</span>
                      {!isCorrect && <span className="ml-1">Jawaban: <strong>{exercise.correctAnswer}</strong></span>}
                      {exercise.reason && <p className="mt-1 opacity-80">{exercise.reason}</p>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  ) : null;

  // Listening with listeningAudios
  if (lesson.listeningAudios && lesson.listeningAudios.length > 0) {
    const preEx  = allExercises.filter(e => e.section === 'quiz');
    const postEx = allExercises.filter(e => !e.section);
    return (
      <section className="space-y-6">
        {preEx.length > 0 && <ExerciseList exercises={preEx} startNum={1} {...sharedProps} />}
        {lesson.listeningAudios.map((audio, idx) => (
          <ListeningAudioSection key={audio.title} audio={audio} audioIndex={idx + 1} />
        ))}
        {postEx.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-(--text-muted) uppercase tracking-wide px-1">
              E. Listen to Jack asking Alice about her birthday
            </h3>
            <ExerciseList exercises={postEx} startNum={preEx.length + 1} {...sharedProps} />
          </div>
        )}
        {QuizGamePanel}
      </section>
    );
  }

  // Part 1 / Part 2 layout
  if (hasParts) {
    return (
      <div className="space-y-8">
        {regular.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-(--text)">Exercises</h2>
            <ExerciseList exercises={regular} startNum={1} {...sharedProps} />
          </section>
        )}
        {part1.length > 0 && (
          <section className="space-y-4">
            <SectionDivider label="Part 1" />
            <ExerciseList exercises={part1} startNum={regular.length + 1} {...sharedProps} />
          </section>
        )}
        {part2.length > 0 && (
          <section className="space-y-4">
            <SectionDivider label="Part 2" primary />
            <ExerciseList exercises={part2} startNum={regular.length + part1.length + 1} {...sharedProps} />
          </section>
        )}
        {part3.length > 0 && (
          <section className="space-y-4">
            <SectionDivider label="Part 3" primary />
            <ExerciseList exercises={part3} startNum={regular.length + part1.length + part2.length + 1} {...sharedProps} />
          </section>
        )}
        {QuizGamePanel}
      </div>
    );
  }

  // No test sections
  if (!hasTest) {
    return (
      <>
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-(--text)">Exercises</h2>
          <ExerciseList exercises={regular} startNum={1} {...sharedProps} />
        </section>
        {QuizGamePanel}
      </>
    );
  }

  // Only final + middle (no regular) → Part A / Part B
  if (regular.length === 0 && final.length > 0 && middle.length > 0) {
    return (
      <div className="space-y-8">
        <section className="space-y-4">
          <SectionDivider label="Part A" />
          <ExerciseList exercises={final} startNum={1} {...sharedProps} />
        </section>
        <section className="space-y-4">
          <SectionDivider label="Part B" primary />
          <ExerciseList exercises={middle} startNum={1} {...sharedProps} />
        </section>
        {QuizGamePanel}
      </div>
    );
  }

  // Three-group layout (regular + final + middle)
  const isThreeGroup = regular.length > 0 && hasTest;
  return (
    <div className="space-y-8">
      {isThreeGroup && final.length > 0 && (
        <section className="space-y-4">
          <ExerciseList exercises={final} startNum={1} {...sharedProps} />
        </section>
      )}
      {isThreeGroup && regular.length > 0 && (
        <section className="space-y-4">
          <ExerciseList exercises={regular} startNum={1} {...sharedProps} />
        </section>
      )}
      {middle.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-primary/30" />
            <h2 className="text-lg font-semibold text-primary flex items-center gap-2 whitespace-nowrap">
              <BookText className="w-5 h-5" /> Middle Test
            </h2>
            <div className="h-px flex-1 bg-primary/30" />
          </div>
          {!isThreeGroup && (
            <p className="text-xs text-(--text-muted) text-center">Tes tengah materi — cek pemahaman kamu sejauh ini!</p>
          )}
          <ExerciseList exercises={middle} startNum={1} {...sharedProps} />
        </section>
      )}
      {!isThreeGroup && final.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-primary/30" />
            <h2 className="text-lg font-semibold text-primary flex items-center gap-2 whitespace-nowrap">
              <CheckCircle2 className="w-5 h-5" /> Final Test
            </h2>
            <div className="h-px flex-1 bg-primary/30" />
          </div>
          <p className="text-xs text-(--text-muted) text-center">Tes akhir — uji semua materi yang sudah dipelajari!</p>
          <ExerciseList exercises={final} startNum={1} {...sharedProps} />
        </section>
      )}
      {QuizGamePanel}
    </div>
  );
}
