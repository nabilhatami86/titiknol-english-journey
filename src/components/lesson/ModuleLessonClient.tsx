'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, BookText, Languages, X, Volume2, Braces,
  BookOpen, Headphones, MessageCircle, PenLine, GraduationCap,
  Sparkles, ChevronDown,
} from 'lucide-react';
import type { ModuleLesson } from '@/types/module';
import { cn } from '@/lib/utils';
import DayNavigation from '@/components/DayNavigation';
import { SectionPoints } from './SectionPoints';
import { PassageSection } from './PassageSection';
import { ExerciseSection } from './ExerciseSection';
import { getSuffixHint, analyzePOS } from './lessonAnalyze';

interface TranslationResult {
  translated: string;
  alternatives?: string[];
  context?: string;
  partOfSpeech?: string;
  ipa?: string;
  definition?: string;
  example?: string;
}

interface Props {
  lesson: ModuleLesson;
  backHref?: string;
  backLabel?: string;
  prevHref?: string;
  prevLabel?: string;
  prevTitle?: string;
  nextHref?: string;
  nextLabel?: string;
  nextTitle?: string;
}

const TRACK_META: Record<string, { icon: React.ElementType; label: string; accent: string; iconBg: string }> = {
  reading:   { icon: BookOpen,       label: 'Reading',   accent: 'from-primary/20 via-primary/5 to-transparent',  iconBg: 'bg-primary/15' },
  grammar:   { icon: Braces,         label: 'Grammar',   accent: 'from-primary/20 via-primary/5 to-transparent',  iconBg: 'bg-primary/15' },
  listening: { icon: Headphones,     label: 'Listening', accent: 'from-primary/20 via-primary/5 to-transparent',  iconBg: 'bg-primary/15' },
  speaking:  { icon: MessageCircle,  label: 'Speaking',  accent: 'from-primary/20 via-primary/5 to-transparent',  iconBg: 'bg-primary/15' },
  writing:   { icon: PenLine,        label: 'Writing',   accent: 'from-primary/20 via-primary/5 to-transparent',  iconBg: 'bg-primary/15' },
};

const SECTION_LETTERS = 'ABCDEFGHIJ'.split('');

export default function ModuleLessonClient({
  lesson,
  backHref = '/tn-basic-cource',
  backLabel = 'Back to TN Basic Cource',
  prevHref, prevLabel, prevTitle,
  nextHref, nextLabel, nextTitle,
}: Props) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [translation, setTranslation] = useState<TranslationResult | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string>('');
  const [translationCache, setTranslationCache] = useState<Record<string, TranslationResult>>({});
  const [blockText, setBlockText] = useState<string>('');
  const [blankAnswers, setBlankAnswers] = useState<Record<string, string>>({});
  const [blankChecked, setBlankChecked] = useState<Record<string, boolean>>({});
  const [showTranslation, setShowTranslation] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [showGrammarMode, setShowGrammarMode] = useState(false);
  const [grammarPopup, setGrammarPopup] = useState<{ word: string; label: string; reason: string; color: string; bg: string } | null>(null);
  const [showQuizGame, setShowQuizGame] = useState(false);
  const [openSections, setOpenSections] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(lesson.materialSections.map((_, i) => [i, true]))
  );
  const quizGameRef = useRef<HTMLDivElement>(null);

  const trackMeta = TRACK_META[lesson.track] ?? TRACK_META.reading;
  const TrackIcon = trackMeta.icon;
  const isMiddleTest = lesson.day === 10 || lesson.day === 10.5;

  const completedCount = useMemo(
    () => lesson.exercises.filter(exercise => {
      if (exercise.type === 'multiple-choice') return Boolean(selectedOptions[exercise.id]);
      return Boolean(notes[exercise.id]?.trim());
    }).length,
    [lesson.exercises, notes, selectedOptions]
  );

  const progressPercent = lesson.exercises.length > 0
    ? Math.round((completedCount / lesson.exercises.length) * 100)
    : 0;

  const tokenize = useCallback((text: string) => text.split(/(\s+|[^A-Za-z'-]+)/g).filter(p => p !== ''), []);

  const speakWord = useCallback((word: string) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = 'en-US'; u.rate = 0.85;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Natural')));
    if (preferred) u.voice = preferred;
    window.speechSynthesis.speak(u);
  }, []);

  const handlePassageMouseUp = useCallback(async () => {
    const sel = window.getSelection();
    const text = sel?.toString().trim().replace(/\s+/g, ' ');
    if (!text || text.split(/\s+/).length < 2) return;
    const displayText = text.length > 50 ? text.slice(0, 50) + '…' : text;
    setSelectedWord(displayText); setBlockText(text); setTranslationError('');
    if (translationCache[text]) { setTranslation(translationCache[text]); return; }
    setIsTranslating(true); setTranslation(null);
    try {
      const res = await fetch(`/api/translate?text=${encodeURIComponent(text)}`);
      const data = await res.json();
      if (!data.translated) throw new Error('no translation');
      const result: TranslationResult = { translated: data.translated };
      setTranslation(result);
      setTranslationCache(prev => ({ ...prev, [text]: result }));
    } catch { setTranslationError('Terjemahan gagal dimuat.'); }
    finally { setIsTranslating(false); }
  }, [translationCache]);

  const translateWord = useCallback(async (word: string) => {
    const cleaned = word.toLowerCase().replace(/^'+|'+$/g, '');
    if (!cleaned) return;
    setBlockText(''); setSelectedWord(cleaned); setTranslationError('');
    if (translationCache[cleaned]) { setTranslation(translationCache[cleaned]); return; }
    setIsTranslating(true); setTranslation(null);
    try {
      const res = await fetch(`/api/translate?word=${encodeURIComponent(cleaned)}`);
      const data = await res.json();
      if (res.status === 404 || data.error === 'not_found') {
        const r: TranslationResult = { translated: 'Tidak ditemukan' };
        setTranslation(r); setTranslationCache(prev => ({ ...prev, [cleaned]: r })); return;
      }
      if (!res.ok || data.error) throw new Error(data.message || 'failed');
      const result: TranslationResult = {
        translated: data.translated, partOfSpeech: data.partOfSpeech || '',
        ipa: data.ipa || '', definition: data.definition || '',
        example: data.example || '', alternatives: data.alternatives || [],
      };
      setTranslation(result); setTranslationCache(prev => ({ ...prev, [cleaned]: result }));
    } catch { setTranslationError('Terjemahan gagal dimuat. Coba klik ulang.'); }
    finally { setIsTranslating(false); }
  }, [translationCache]);

  const renderClickableText = useCallback((text: string, showSuffixHints = false) => {
    return tokenize(text).map((part, idx) => {
      const isWord = /^[A-Za-z][A-Za-z'-]*$/.test(part);
      if (!isWord) return <span key={`t-${idx}`}>{part}</span>;
      const cleaned = part.toLowerCase().replace(/^'+|'+$/g, '');
      const isActive = selectedWord === cleaned;
      const hint = showSuffixHints ? getSuffixHint(part) : null;
      return (
        <button key={`w-${idx}`} type="button" onClick={() => translateWord(part)}
          className={cn('rounded px-0.5 transition-colors', isActive ? 'bg-primary/15 text-primary' : 'hover:bg-primary/10 hover:text-primary')}
        >
          {hint ? <>{hint.stem}<span className={cn('underline underline-offset-[3px] decoration-2', hint.deco)}>{hint.suffix}</span></> : part}
        </button>
      );
    });
  }, [selectedWord, tokenize, translateWord]);

  const renderGrammarPassage = useCallback((text: string) => {
    const FUNC_LABELS = new Set(['Det','Prep','Pronoun','Refl. Pron','Rel. Pron','Indef. Pron','Modal','BE','Have','Do/Does/Did','Coord. Conj','Sub. Conj','Adv. Conj','to-inf']);
    const allTokens = text.split(/(\s+|[^A-Za-z'-]+)/g).filter(t => t !== '');
    const wordTokens = allTokens.filter(t => /^[A-Za-z][A-Za-z'-]*$/.test(t));
    let wordIdx = 0;
    return allTokens.map((token, i) => {
      if (!/^[A-Za-z][A-Za-z'-]*$/.test(token)) return <span key={`gp-${i}`}>{token}</span>;
      const ci = wordIdx++;
      const posInfo = analyzePOS(token, wordTokens[ci - 1] ?? '', wordTokens[ci + 1] ?? '');
      const hint = FUNC_LABELS.has(posInfo.label) ? null : getSuffixHint(token);
      return (
        <button key={`gp-${i}`} type="button" onClick={() => setGrammarPopup({ word: token, ...posInfo })}
          className="inline-flex flex-col items-center mx-0.5 align-bottom cursor-pointer group"
        >
          <span className={cn('text-sm font-medium px-0.5 rounded group-hover:opacity-80', posInfo.color)}>
            {hint ? <>{hint.stem}<span className={cn('underline underline-offset-[3px] decoration-2', hint.deco)}>{hint.suffix}</span></> : token}
          </span>
          <span className={cn('text-[8px] font-bold px-1 rounded leading-tight', posInfo.bg)}>{posInfo.label}</span>
        </button>
      );
    });
  }, []);

  return (
    <div className="min-h-screen" onMouseUp={handlePassageMouseUp} onTouchEnd={handlePassageMouseUp}>

      {/* ── Sticky progress bar ─────────────────────────────────── */}
      {lesson.exercises.length > 0 && (
        <div className="sticky top-0 z-30 h-0.5 w-full bg-(--bg-secondary)">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-7 animate-fade-in">

        {/* ── Top nav bar ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-4">
          <Link href={backHref}
            className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> {backLabel}
          </Link>

          {lesson.exercises.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-(--text-muted)">
              <div className="flex gap-0.5">
                {lesson.exercises.slice(0, Math.min(lesson.exercises.length, 12)).map((_, i) => (
                  <div key={i} className={cn(
                    'w-1.5 h-1.5 rounded-full transition-colors',
                    i < completedCount ? 'bg-primary' : 'bg-(--border)'
                  )} />
                ))}
                {lesson.exercises.length > 12 && <span className="text-[10px] ml-1">+{lesson.exercises.length - 12}</span>}
              </div>
              <span className="font-semibold text-(--text)">{completedCount}/{lesson.exercises.length}</span>
            </div>
          )}
        </div>

        {/* ── Hero card ────────────────────────────────────────────── */}
        <div className={cn(
          'relative rounded-2xl overflow-hidden border',
          isMiddleTest ? 'border-primary/40 bg-(--bg-card)' : 'border-(--border) bg-(--bg-card)'
        )}>
          {/* gradient overlay */}
          <div className={cn('absolute inset-0 bg-gradient-to-br pointer-events-none', trackMeta.accent)} />

          {/* decorative circles */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary/5 pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-primary/5 pointer-events-none" />

          <div className="relative p-6 sm:p-8">
            {/* Track + day metadata row */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border',
                isMiddleTest
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'bg-primary/10 text-primary border-primary/20'
              )}>
                <TrackIcon className="w-3 h-3" />
                {isMiddleTest ? 'Middle Test' : trackMeta.label}
              </span>
              {!isMiddleTest && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-(--bg-secondary) text-(--text-muted) border border-(--border)">
                  Day {lesson.day}
                </span>
              )}
              {lesson.tutor && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-(--bg-secondary) text-(--text-secondary) border border-(--border)">
                  <GraduationCap className="w-3 h-3" /> {lesson.tutor}
                </span>
              )}
            </div>

            {/* Title + icon */}
            <div className="flex items-start gap-4">
              <div className={cn(
                'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20',
                trackMeta.iconBg
              )}>
                <TrackIcon className="w-6 h-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-(--text) leading-tight">{lesson.title}</h1>
                <p className="text-sm text-(--text-secondary) mt-1.5 font-medium">
                  {renderClickableText(lesson.subtitle)}
                </p>
              </div>
            </div>

            {/* Overview */}
            {lesson.overview && (
              <p className="mt-5 text-sm text-(--text-secondary) leading-relaxed border-t border-(--border)/50 pt-4">
                {renderClickableText(lesson.overview)}
              </p>
            )}
          </div>
        </div>

        {/* ── Material sections ────────────────────────────────────── */}
        <section className="space-y-3">
          {/* Section heading */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookText className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-base font-bold text-(--text) tracking-tight">Material</h2>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-(--border) to-transparent" />
            <span className="text-xs text-(--text-muted) font-medium">{lesson.materialSections.length} section{lesson.materialSections.length !== 1 ? 's' : ''}</span>
          </div>

          <div className={cn(lesson.track === 'listening' ? 'grid md:grid-cols-2 gap-3' : 'space-y-2.5')}>
            {lesson.materialSections.map((section, si) => {
              const isOpen = openSections[si] !== false;
              return (
                <div key={section.title} className="bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden transition-colors hover:border-primary/20">
                  {/* Section header — clickable toggle */}
                  <button
                    onClick={() => setOpenSections(prev => ({ ...prev, [si]: !isOpen }))}
                    className="w-full flex items-center gap-3 px-5 py-3.5 bg-linear-to-r from-primary/[0.06] to-transparent hover:from-primary/10 transition-all text-left"
                  >
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center leading-none">
                      {SECTION_LETTERS[si] ?? (si + 1)}
                    </span>
                    <h3 className="font-semibold text-(--text) text-sm flex-1">{section.title}</h3>
                    <ChevronDown className={cn('w-4 h-4 text-(--text-muted) transition-transform duration-200 shrink-0', isOpen && 'rotate-180')} />
                  </button>

                  {/* Section body */}
                  {isOpen && (
                    <div className="border-t border-(--border)/60">
                      <div className="p-5">
                        <SectionPoints
                          points={section.points}
                          title={section.title}
                          track={lesson.track}
                          imageUrl={section.imageUrl}
                          renderClickableText={renderClickableText}
                          translateWord={translateWord}
                          setShowQuizGame={setShowQuizGame}
                          quizGameRef={quizGameRef}
                        />
                      </div>
                      {section.imageUrl && (
                        <div className="px-5 pb-5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={section.imageUrl} alt={section.title} className="w-full rounded-xl border border-(--border) object-contain" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Passage ──────────────────────────────────────────────── */}
        <PassageSection
          lesson={lesson}
          showGrammarMode={showGrammarMode}
          setShowGrammarMode={setShowGrammarMode}
          showTranslation={showTranslation}
          setShowTranslation={setShowTranslation}
          setGrammarPopup={setGrammarPopup}
          blankAnswers={blankAnswers}
          setBlankAnswers={setBlankAnswers}
          blankChecked={blankChecked}
          setBlankChecked={setBlankChecked}
          renderClickableText={renderClickableText}
          renderGrammarPassage={renderGrammarPassage}
        />

        {/* ── Exercises ────────────────────────────────────────────── */}
        {lesson.exercises.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-base font-bold text-(--text) tracking-tight">Exercises</h2>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-(--border) to-transparent" />
              {lesson.exercises.length > 0 && (
                <span className={cn(
                  'text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors',
                  completedCount === lesson.exercises.length
                    ? 'bg-primary/15 text-primary border-primary/30'
                    : 'bg-(--bg-secondary) text-(--text-muted) border-(--border)'
                )}>
                  {completedCount}/{lesson.exercises.length}
                </span>
              )}
            </div>
            <ExerciseSection
              lesson={lesson}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              notes={notes}
              setNotes={setNotes}
              submittedAnswers={submittedAnswers}
              setSubmittedAnswers={setSubmittedAnswers}
              showQuizGame={showQuizGame}
              setShowQuizGame={setShowQuizGame}
              quizGameRef={quizGameRef}
              renderClickableText={renderClickableText}
            />
          </section>
        )}

        {/* ── Day navigation ───────────────────────────────────────── */}
        <DayNavigation
          prevHref={prevHref} prevLabel={prevLabel} prevTitle={prevTitle}
          nextHref={nextHref} nextLabel={nextLabel} nextTitle={nextTitle}
        />
      </div>

      {/* ── Grammar mode popup (bottom-left on mobile, bottom-right on desktop) ── */}
      {grammarPopup && (
        <div className="fixed left-3 right-3 bottom-3 lg:left-auto lg:right-4 lg:bottom-4 lg:w-[min(92vw,440px)] z-50 animate-fade-in">
          <div className="bg-(--bg-card)/95 backdrop-blur-md border border-primary/30 rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden">
            <div className="flex items-start justify-between gap-2 px-4 pt-3.5 pb-2.5 bg-gradient-to-r from-primary/10 to-transparent border-b border-primary/15">
              <div className="flex items-center gap-2.5 flex-wrap min-w-0">
                <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <Braces className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-base font-bold text-(--text)">{grammarPopup.word}</span>
                <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded-full', grammarPopup.bg)}>
                  {grammarPopup.label}
                </span>
              </div>
              <button type="button" onClick={() => setGrammarPopup(null)} className="p-1.5 rounded-lg hover:bg-(--hover) shrink-0 transition-colors">
                <X className="w-3.5 h-3.5 text-(--text-muted)" />
              </button>
            </div>
            <div className="px-4 py-3.5">
              <p className="text-sm text-(--text-secondary) leading-relaxed">{grammarPopup.reason}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Translation popup ────────────────────────────────────── */}
      {selectedWord && (
        <div className="fixed right-3 bottom-3 lg:right-4 lg:bottom-4 z-40 w-[min(92vw,380px)] animate-fade-in">
          <div className="bg-(--bg-card)/95 backdrop-blur-md border border-(--border) rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 px-4 pt-3.5 pb-2.5 border-b border-(--border) bg-(--bg-secondary)/50">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Languages className="w-3.5 h-3.5 text-primary" />
                </div>
                <p className="text-sm font-bold text-(--text) truncate">{selectedWord}</p>
                {!blockText && (
                  <button type="button" onClick={() => speakWord(selectedWord)}
                    className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors shrink-0"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-primary" />
                  </button>
                )}
              </div>
              <button type="button"
                onClick={() => { setSelectedWord(null); setTranslation(null); setTranslationError(''); setBlockText(''); }}
                className="p-1.5 rounded-lg hover:bg-(--hover) shrink-0 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-(--text-muted)" />
              </button>
            </div>

            {/* Body */}
            <div className="px-4 py-3.5 space-y-2.5">
              {isTranslating && (
                <div className="flex items-center gap-2.5 py-1">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent animate-spin shrink-0" />
                  <p className="text-sm text-(--text-secondary)">Menerjemahkan...</p>
                </div>
              )}

              {!isTranslating && translation && (
                <>
                  {(translation.partOfSpeech || translation.ipa) && (
                    <div className="flex items-center gap-2 flex-wrap">
                      {translation.partOfSpeech && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium italic border border-primary/20">
                          {translation.partOfSpeech}
                        </span>
                      )}
                      {translation.ipa && (
                        <span className="text-xs text-(--text-muted) font-mono bg-(--bg-secondary) px-2 py-0.5 rounded-md">
                          {translation.ipa}
                        </span>
                      )}
                    </div>
                  )}

                  {translation.definition && (
                    <div className="space-y-0.5">
                      <p className="text-[10px] text-(--text-muted) uppercase tracking-widest font-semibold">Definition</p>
                      <p className="text-xs text-(--text-secondary) leading-relaxed">{translation.definition}</p>
                    </div>
                  )}

                  <div className="rounded-xl bg-primary/8 border border-primary/20 px-3 py-2.5">
                    <p className="text-[10px] text-primary/60 uppercase tracking-widest font-semibold mb-0.5">Terjemahan</p>
                    <p className="text-sm font-bold text-primary">{translation.translated}</p>
                  </div>

                  {translation.example && (
                    <div className="space-y-0.5">
                      <p className="text-[10px] text-(--text-muted) uppercase tracking-widest font-semibold">Example</p>
                      <p className="text-xs text-(--text-secondary) italic leading-relaxed pl-2 border-l-2 border-primary/25">
                        &quot;{translation.example}&quot;
                      </p>
                    </div>
                  )}

                  {translation.alternatives && translation.alternatives.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-[10px] text-(--text-muted) uppercase tracking-widest font-semibold">Arti lain</p>
                      <div className="flex flex-wrap gap-1.5">
                        {translation.alternatives.map(alt => (
                          <span key={alt} className="text-xs px-2 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-secondary) border border-(--border)">
                            {alt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {!isTranslating && translationError && (
                <p className="text-xs text-primary/80 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2">{translationError}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
