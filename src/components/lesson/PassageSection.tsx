'use client';

import type { ReactNode } from 'react';
import { BookText, Volume2, MessageCircle, Braces, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import TTSPlayer from '@/components/tts/TTSPlayer';
import type { ModuleLesson } from '@/types/module';

interface Props {
  lesson: ModuleLesson;
  showGrammarMode: boolean;
  setShowGrammarMode: (v: boolean) => void;
  showTranslation: boolean;
  setShowTranslation: (v: boolean) => void;
  setGrammarPopup: (v: { word: string; label: string; reason: string; color: string; bg: string } | null) => void;
  blankAnswers: Record<string, string>;
  setBlankAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  blankChecked: Record<string, boolean>;
  setBlankChecked: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  renderClickableText: (text: string, showSuffix?: boolean) => ReactNode;
  renderGrammarPassage: (text: string) => ReactNode[];
}

function BlankLine({
  paragraph,
  idx,
  lessonId,
  isListening,
  blankAnswers,
  setBlankAnswers,
  blankChecked,
  setBlankChecked,
  renderClickableText,
}: {
  paragraph: string;
  idx: number;
  lessonId: string;
  isListening: boolean;
  blankAnswers: Record<string, string>;
  setBlankAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  blankChecked: Record<string, boolean>;
  setBlankChecked: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  renderClickableText: (text: string, showSuffix?: boolean) => ReactNode;
}) {
  const speakerMatch = paragraph.match(/^(Sam|Jane):\s*/);
  const speaker = speakerMatch?.[1];
  const isSam = speaker === 'Sam';

  const blankRegex = /\{\{blank:([^}]+)\}\}/g;
  type Seg = { type: 'text'; value: string } | { type: 'blank'; answer: string; id: string };
  const segments: Seg[] = [];
  let lastIndex = 0;
  let blankCount = 0;
  let match: RegExpExecArray | null;
  const rx = new RegExp(blankRegex.source, 'g');
  while ((match = rx.exec(paragraph)) !== null) {
    if (match.index > lastIndex) segments.push({ type: 'text', value: paragraph.slice(lastIndex, match.index) });
    segments.push({ type: 'blank', answer: match[1], id: `${idx}-${blankCount++}` });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < paragraph.length) segments.push({ type: 'text', value: paragraph.slice(lastIndex) });

  const isFullBlank = segments.filter(s => s.type === 'blank').length === 1 &&
    segments.filter(s => s.type === 'text').every(s => /^[A-Za-z]+:\s*$/.test((s as { value: string }).value) || !(s as { value: string }).value.trim());

  const blankInput = (seg: { type: 'blank'; answer: string; id: string }, sIdx: number) => {
    const bId = seg.id;
    const userAnswer = blankAnswers[bId] || '';
    const isChecked = blankChecked[bId] === true;
    const correctAnswer = seg.answer;
    const isCorrect = isChecked && userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
    const isWrong = isChecked && !isCorrect;
    return (
      <span key={sIdx} className="inline-flex flex-col items-center">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => {
            setBlankAnswers(prev => ({ ...prev, [bId]: e.target.value }));
            if (blankChecked[bId]) setBlankChecked(prev => ({ ...prev, [bId]: false }));
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') setBlankChecked(prev => ({ ...prev, [bId]: true })); }}
          placeholder={isFullBlank ? 'Tulis kalimat lengkap...' : '...'}
          className={cn(
            'border-b-2 bg-transparent outline-none text-center text-sm px-1 py-0.5 transition-colors',
            isFullBlank ? 'min-w-48 w-full' : 'min-w-16',
            !isChecked && 'border-primary/40 focus:border-primary',
            isCorrect && 'border-primary/50 text-primary',
            isWrong && 'border-primary/50 text-primary',
          )}
          style={isFullBlank ? {} : { width: `${Math.max(correctAnswer.length * 9, 60)}px` }}
        />
        {isCorrect && <span className="text-[10px] text-primary font-medium mt-0.5">Benar!</span>}
        {isWrong && <span className="text-[10px] text-primary mt-0.5">{correctAnswer}</span>}
      </span>
    );
  };

  const checkBtn = (
    <button
      onClick={() => {
        const blankIds = segments.filter(s => s.type === 'blank').map(s => (s as { id: string }).id);
        setBlankChecked(prev => { const next = { ...prev }; blankIds.forEach(id => { next[id] = true; }); return next; });
      }}
      className="ml-1 text-xs px-2 py-0.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors shrink-0"
    >Cek</button>
  );

  if (isListening && speaker) {
    return (
      <div className="flex items-start gap-2 py-0.5">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 text-primary text-[10px] font-bold shrink-0 mt-0.5">
          {speaker[0]}
        </span>
        <div className="flex flex-wrap items-end gap-x-1 gap-y-2 text-sm leading-7 text-(--text-secondary) flex-1">
          {segments.map((seg, sIdx) => {
            if (seg.type === 'text') {
              if (sIdx === 0 && seg.value.startsWith(speaker)) {
                const rest = seg.value.slice(speaker.length + 2);
                return (
                  <span key={sIdx}>
                    <span className={cn('font-semibold', isSam ? 'text-primary' : 'text-primary')}>{speaker}: </span>
                    {renderClickableText(rest)}
                  </span>
                );
              }
              return <span key={sIdx}>{renderClickableText(seg.value)}</span>;
            }
            return blankInput(seg as { type: 'blank'; answer: string; id: string }, sIdx);
          })}
          {segments.some(s => s.type === 'blank') && checkBtn}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-end gap-x-1 gap-y-2 text-sm leading-7 text-(--text-secondary) py-0.5">
      {segments.map((seg, sIdx) => {
        if (seg.type === 'text') return <span key={sIdx}>{renderClickableText(seg.value)}</span>;
        return blankInput(seg as { type: 'blank'; answer: string; id: string }, sIdx);
      })}
      {segments.some(s => s.type === 'blank') && checkBtn}
    </div>
  );
}

export function PassageSection({
  lesson,
  showGrammarMode,
  setShowGrammarMode,
  showTranslation,
  setShowTranslation,
  setGrammarPopup,
  blankAnswers,
  setBlankAnswers,
  blankChecked,
  setBlankChecked,
  renderClickableText,
  renderGrammarPassage,
}: Props) {
  if (!lesson.passage || lesson.passage.length === 0) return null;

  const splitSentences = (text: string): string[] => {
    const safe = text.replace(/\b(Mr|Mrs|Ms|Dr|Prof|Sr|Jr|Vs|No|St|etc|i\.e|e\.g)\./gi, '$1<<P>>');
    const marked = safe
      .replace(/([a-z0-9])([.!?]+)\s+([A-Z])/g, '$1$2\n$3')
      .replace(/([!?]+)\s+([A-Z])/g, '$1\n$2');
    return marked.split('\n').map(s => s.replace(/<<P>>/g, '.').trim()).filter(Boolean);
  };

  return (
    <>
      {lesson.track === 'listening' && (
        <TTSPlayer text={lesson.passage.join('\n')} label="Listen to Audio" />
      )}

      <section className="space-y-4">
        {/* Header row */}
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-(--text) flex items-center gap-2 flex-1 min-w-0">
            {lesson.track === 'reading' && <BookText className="w-5 h-5 text-primary shrink-0" />}
            {lesson.track === 'listening' && <Volume2 className="w-5 h-5 text-primary shrink-0" />}
            {lesson.track === 'speaking' && <MessageCircle className="w-5 h-5 text-primary shrink-0" />}
            <span className="truncate">
              {{ reading: 'Full Reading Passage', speaking: 'Sample Script', grammar: 'Grammar Examples', listening: 'Listening Script', writing: 'Writing Examples' }[lesson.track]}
            </span>
          </h2>
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {lesson.track === 'reading' && (
              <button
                type="button"
                onClick={() => { setShowGrammarMode(!showGrammarMode); setGrammarPopup(null); }}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors whitespace-nowrap',
                  showGrammarMode
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'bg-(--bg-secondary) border-(--border) text-(--text-muted) hover:text-(--text-secondary)'
                )}
              >
                <Braces className="w-3.5 h-3.5" />
                {showGrammarMode ? 'Kelas Kata ON' : 'Kelas Kata'}
              </button>
            )}
            {lesson.track === 'reading' && lesson.passage.some(p => p.startsWith('(') && p.endsWith(')')) && (
              <button
                type="button"
                onClick={() => setShowTranslation(!showTranslation)}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors whitespace-nowrap',
                  showTranslation
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'bg-(--bg-secondary) border-(--border) text-(--text-muted) hover:text-(--text-secondary)'
                )}
              >
                {showTranslation ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                {showTranslation ? 'Sembunyikan' : 'Terjemahan'}
              </button>
            )}
          </div>
        </div>

        {/* Passage body */}
        <div className={cn(
          'bg-(--bg-card) border border-(--border) rounded-xl p-3 sm:p-5',
          lesson.track === 'reading' ? 'space-y-5' : 'space-y-4'
        )}>
          {lesson.passage.map((paragraph, idx) => {
            const key = `${lesson.id}-p-${idx}`;

            // Section header (--- Title ---)
            if (paragraph.startsWith('---') && paragraph.endsWith('---')) {
              const headerText = paragraph.replace(/^-+\s*/, '').replace(/\s*-+$/, '');
              const sectionNum = headerText.match(/^(\d+)\.\s*/)?.[1];
              const normalizedHeader = headerText.toLowerCase();
              const matchedAudio = lesson.track === 'listening' && lesson.audioTracks?.length
                ? lesson.audioTracks.find(t => {
                    const title = t.title.toLowerCase();
                    if (normalizedHeader.includes('recreation') && title.includes('recreation')) return true;
                    if (normalizedHeader.includes('looking for a place to eat') && title.includes('looking for place to eat')) return true;
                    if (normalizedHeader.includes('the weather') && title.includes('weather')) return true;
                    return false;
                  })
                : null;
              return (
                <div key={key} className="pt-4 pb-2 border-b border-(--border) first:pt-0 space-y-3">
                  <div className="flex items-center gap-2">
                    {sectionNum && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold shrink-0">
                        {sectionNum}
                      </span>
                    )}
                    <p className="text-sm font-bold text-primary uppercase tracking-wider">
                      {sectionNum ? headerText.replace(/^\d+\.\s*/, '') : headerText}
                    </p>
                  </div>
                  {matchedAudio && (
                    <div className="bg-(--bg-secondary) border border-(--border) rounded-lg p-3">
                      <audio controls preload="none" className="w-full">
                        <source src={matchedAudio.url} type="audio/mpeg" />
                        Browser kamu tidak mendukung pemutar audio.
                      </audio>
                    </div>
                  )}
                </div>
              );
            }

            // Indonesian translation line (handled inline with English)
            if (paragraph.startsWith('(') && paragraph.endsWith(')')) return null;

            // Empty spacer
            if (!paragraph.trim()) return <div key={key} className="h-2" />;

            // Blank fill-in lines
            if (paragraph.includes('{{blank:')) {
              return (
                <BlankLine
                  key={key}
                  paragraph={paragraph}
                  idx={idx}
                  lessonId={lesson.id}
                  isListening={lesson.track === 'listening'}
                  blankAnswers={blankAnswers}
                  setBlankAnswers={setBlankAnswers}
                  blankChecked={blankChecked}
                  setBlankChecked={setBlankChecked}
                  renderClickableText={renderClickableText}
                />
              );
            }

            // Listening: speaker lines
            if (lesson.track === 'listening') {
              const speakerMatch = paragraph.match(/^(Sam|Jane):\s*(.*)/);
              if (speakerMatch) {
                const speaker = speakerMatch[1];
                const text = speakerMatch[2];
                const isSam = speaker === 'Sam';
                return (
                  <div key={key} className="flex items-start gap-2 py-0.5">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 text-primary text-[10px] font-bold shrink-0 mt-0.5">
                      {speaker[0]}
                    </span>
                    <div className="text-sm leading-7 text-(--text-secondary)">
                      <span className={cn('font-semibold', isSam ? 'text-primary' : 'text-primary')}>{speaker}: </span>
                      {renderClickableText(text)}
                    </div>
                  </div>
                );
              }
            }

            // Reading paragraphs
            if (lesson.track === 'reading') {
              const readingParaIdx = lesson.passage!.slice(0, idx).filter(p =>
                p.trim() && !p.startsWith('---') && !p.startsWith('(') && !p.includes('{{blank:')
              ).length + 1;

              const nextParagraph = lesson.passage?.[idx + 1];
              const hasTranslation = nextParagraph?.startsWith('(') && nextParagraph?.endsWith(')');

              if (showTranslation && hasTranslation) {
                const translationText = nextParagraph!.slice(1, -1);
                const engSentences = splitSentences(paragraph);
                const idSentences = splitSentences(translationText);
                return (
                  <div key={key} className="flex gap-3">
                    <span className="text-xs text-primary/40 font-mono mt-1.5 shrink-0 select-none w-4 text-right">{readingParaIdx}</span>
                    <div className="flex-1 divide-y divide-(--border)/40">
                      {engSentences.map((sentence, sIdx) => (
                        <div key={sIdx} className="py-2 first:pt-0 last:pb-0">
                          <p className="text-sm leading-7 text-(--text) text-justify">{renderClickableText(sentence)}</p>
                          {idSentences[sIdx] && (
                            <p className="mt-1 text-[13px] leading-[1.7] text-(--text-secondary) italic pl-3 border-l-2 border-primary/30">
                              {idSentences[sIdx]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <div key={key} className="flex gap-3">
                  <span className={cn('font-mono shrink-0 select-none w-4 text-right', showGrammarMode ? 'text-xs text-primary/60 mt-3' : 'text-xs text-primary/40 mt-1.5')}>
                    {readingParaIdx}
                  </span>
                  {showGrammarMode ? (
                    <div className="text-sm leading-10 text-(--text-secondary) text-justify flex flex-wrap items-end gap-x-0">
                      {renderGrammarPassage(paragraph)}
                    </div>
                  ) : (
                    <p className="text-sm leading-7 text-(--text-secondary) text-justify first-letter:text-lg first-letter:font-semibold first-letter:text-(--text)">
                      {renderClickableText(paragraph, true)}
                    </p>
                  )}
                </div>
              );
            }

            // Speaking: structured lines
            if (lesson.track === 'speaking') {
              const stepMatch = paragraph.match(/^(\d+)\.\s+(.+)/);
              if (stepMatch) {
                return (
                  <div key={key} className="flex items-start gap-2.5 py-1">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold shrink-0 mt-0.5">
                      {stepMatch[1]}
                    </span>
                    <p className="text-sm leading-7 text-(--text-secondary) font-medium">{renderClickableText(stepMatch[2])}</p>
                  </div>
                );
              }
              if (paragraph.startsWith('   ')) {
                return (
                  <div key={key} className="pl-8 py-0.5">
                    <div className="flex items-start gap-2">
                      <span className="text-(--text-muted) mt-1 shrink-0 text-[10px]">○</span>
                      <p className="text-sm leading-7 text-(--text-secondary)">{renderClickableText(paragraph.trim())}</p>
                    </div>
                  </div>
                );
              }
              if (paragraph.startsWith('"') && paragraph.endsWith('"')) {
                return (
                  <div key={key} className="py-1.5 pl-3 border-l-2 border-primary/30 ml-1 bg-primary/5 rounded-r-lg pr-3">
                    <p className="text-sm leading-7 text-(--text-secondary) italic">{renderClickableText(paragraph)}</p>
                  </div>
                );
              }
              if (paragraph.endsWith(':')) {
                return (
                  <div key={key} className="pt-2 pb-1">
                    <p className="text-sm font-semibold text-(--text)">{renderClickableText(paragraph)}</p>
                  </div>
                );
              }
            }

            // Fallback
            return (
              <p key={key} className="text-sm leading-7 text-(--text-secondary)">
                {renderClickableText(paragraph)}
              </p>
            );
          })}
        </div>
      </section>

      {/* Legacy single audio (listening without audioTracks) */}
      {lesson.track === 'listening' && (!lesson.audioTracks || lesson.audioTracks.length === 0) && lesson.audioUrl && (
        <section className="space-y-4">
          <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4">
            <audio controls preload="none" className="w-full">
              <source src={lesson.audioUrl} type="audio/mpeg" />
              Browser kamu tidak mendukung pemutar audio.
            </audio>
          </div>
        </section>
      )}
    </>
  );
}