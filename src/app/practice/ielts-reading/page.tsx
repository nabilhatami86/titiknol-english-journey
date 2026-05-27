'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, Trophy, BookOpenText,
  AlertCircle, Loader2, CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Pagination } from '@/components/ui/Pagination';
import {
  parseReadingTest, isCorrectReading,
  type ParsedReadingTest, type ParsedQSection,
} from './parser';

const TOTAL_TESTS = 170;
const PER_PAGE = 30;

function bandFromScore(n: number): string {
  if (n >= 39) return '9.0'; if (n >= 37) return '8.5'; if (n >= 35) return '8.0';
  if (n >= 33) return '7.5'; if (n >= 30) return '7.0'; if (n >= 27) return '6.5';
  if (n >= 23) return '6.0'; if (n >= 19) return '5.5'; if (n >= 15) return '5.0';
  if (n >= 13) return '4.5'; if (n >= 10) return '4.0'; return '3.5';
}

// ── One rendered question section (TFNG buttons or text input) ──────────
function QuestionSectionBlock({
  section, answers, onChange, submitted, answerKey,
}: {
  section: ParsedQSection;
  answers: Record<number, string>;
  onChange: (n: number, v: string) => void;
  submitted: boolean;
  answerKey: Record<number, string>;
}) {
  const correct = submitted
    ? section.questions.filter(q => isCorrectReading(q.number, answers[q.number] ?? '', answerKey)).length
    : null;

  const tfOpts = section.type === 'tfng'
    ? [{ label: 'TRUE', short: 'T' }, { label: 'FALSE', short: 'F' }, { label: 'NOT GIVEN', short: 'NG' }]
    : section.type === 'yn'
    ? [{ label: 'YES', short: 'Y' }, { label: 'NO', short: 'N' }, { label: 'NOT GIVEN', short: 'NG' }]
    : null;

  return (
    <div className="space-y-2">
      {/* Section header */}
      <div className="flex items-start justify-between gap-2 pt-1">
        <div>
          <p className="text-xs font-bold text-primary uppercase tracking-wide">{section.label}</p>
          {section.instruction && (
            <p className="text-[11px] text-(--text-secondary) mt-0.5 leading-snug italic">
              {section.instruction}
            </p>
          )}
        </div>
        {correct !== null && (
          <span className={cn(
            'shrink-0 text-xs font-bold px-2 py-0.5 rounded-full mt-0.5',
            correct === section.questions.length ? 'bg-primary/15 text-primary' : 'bg-(--bg-secondary) text-(--text-muted)',
          )}>
            {correct}/{section.questions.length}
          </span>
        )}
      </div>

      {/* Each question */}
      {section.questions.map(q => {
        const ok = submitted ? isCorrectReading(q.number, answers[q.number] ?? '', answerKey) : null;
        const correctAns = answerKey[q.number] ?? '';
        const selected = answers[q.number] ?? '';

        return (
          <div key={q.number} className={cn(
            'rounded-xl border overflow-hidden',
            submitted
              ? ok ? 'border-primary/25 bg-primary/5' : 'border-(--border) bg-(--bg-card)'
              : 'border-(--border) bg-(--bg-card)',
          )}>
            <div className="p-3 space-y-2">
              {/* Question number + text */}
              <div className="flex items-start gap-2">
                <span className={cn(
                  'text-xs font-bold shrink-0 mt-0.5 w-5',
                  ok === true ? 'text-primary' : ok === false ? 'text-(--text-muted)' : 'text-primary',
                )}>
                  {q.number}.
                </span>
                {q.text && (
                  <p className="text-sm text-(--text) leading-snug flex-1">{q.text}</p>
                )}
              </div>

              {/* Answer input by type */}
              <div className="ml-5">
                {tfOpts ? (
                  /* TFNG / YNG buttons */
                  <div className="flex gap-1.5 flex-wrap">
                    {tfOpts.map(opt => {
                      const isSel = selected === opt.label;
                      const isOptCorrect = submitted && correctAns.toUpperCase() === opt.label;
                      const isOptWrong = submitted && isSel && !isOptCorrect;
                      return (
                        <button
                          key={opt.label}
                          onClick={() => !submitted && onChange(q.number, opt.label)}
                          disabled={submitted}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all',
                            submitted
                              ? isOptCorrect
                                ? 'bg-primary/15 border-primary/40 text-primary'
                                : isOptWrong
                                ? 'bg-(--bg-secondary) border-(--border) text-(--text-muted) line-through opacity-60'
                                : 'bg-(--bg-secondary) border-(--border) text-(--text-muted) opacity-30'
                              : isSel
                              ? 'bg-primary text-white border-primary'
                              : 'bg-(--bg-secondary) border-(--border) text-(--text-secondary) hover:border-primary/40',
                          )}
                        >
                          {opt.short}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* Text input */
                  <input
                    type="text"
                    value={selected}
                    onChange={e => !submitted && onChange(q.number, e.target.value)}
                    readOnly={submitted}
                    placeholder="jawaban..."
                    className={cn(
                      'w-full px-2.5 py-1.5 text-sm rounded-lg border outline-none transition-colors',
                      submitted
                        ? ok
                          ? 'bg-primary/8 border-primary/30 text-primary font-semibold'
                          : 'bg-(--bg-secondary) border-(--border) text-(--text-muted) line-through'
                        : 'bg-(--bg-secondary) border-(--border) focus:border-primary text-(--text)',
                    )}
                  />
                )}
              </div>

              {/* Wrong answer feedback */}
              {submitted && ok === false && correctAns && (
                <div className="ml-5 flex items-center gap-1.5 bg-primary/5 border border-primary/20 rounded-lg px-2.5 py-1.5">
                  <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                  <span className="text-xs text-primary font-semibold">{correctAns}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Fallback: plain numbered inputs when sections couldn't be parsed ─────
function FallbackAnswers({
  range, answers, onChange, submitted, answerKey,
}: {
  range: [number, number];
  answers: Record<number, string>;
  onChange: (n: number, v: string) => void;
  submitted: boolean;
  answerKey: Record<number, string>;
}) {
  const nums = Array.from({ length: range[1] - range[0] + 1 }, (_, i) => range[0] + i);
  return (
    <div className="space-y-2">
      {nums.map(n => {
        const ok = submitted ? isCorrectReading(n, answers[n] ?? '', answerKey) : null;
        const correctAns = answerKey[n] ?? '';
        return (
          <div key={n} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={cn('text-xs font-bold w-6 shrink-0 text-right', ok === true ? 'text-primary' : ok === false ? 'text-(--text-muted)' : 'text-(--text-secondary)')}>
                {n}.
              </span>
              <input
                type="text"
                value={answers[n] ?? ''}
                onChange={e => !submitted && onChange(n, e.target.value)}
                readOnly={submitted}
                placeholder="jawaban..."
                className={cn(
                  'flex-1 px-2.5 py-1.5 text-sm rounded-lg border outline-none transition-colors',
                  submitted
                    ? ok ? 'bg-primary/8 border-primary/30 text-primary font-semibold' : 'bg-(--bg-secondary) border-(--border) text-(--text-muted) line-through'
                    : 'bg-(--bg-secondary) border-(--border) focus:border-primary text-(--text)',
                )}
              />
            </div>
            {submitted && ok === false && correctAns && (
              <div className="ml-8 flex items-center gap-1.5 bg-primary/5 border border-primary/20 rounded-lg px-2.5 py-1.5">
                <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                <span className="text-xs text-primary font-semibold">{correctAns}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function IeltsReadingPage() {
  const [view, setView] = useState<'list' | 'test'>('list');
  const [listPage, setListPage] = useState(1);
  const [testNumber, setTestNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [parsedTest, setParsedTest] = useState<ParsedReadingTest | null>(null);
  const [passageIdx, setPassageIdx] = useState(0);
  const [mobileTab, setMobileTab] = useState<'passage' | 'soal'>('passage');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalPages = Math.ceil(TOTAL_TESTS / PER_PAGE);
  const passage = parsedTest?.passages[passageIdx];

  const onChange = (n: number, v: string) => setAnswers(prev => ({ ...prev, [n]: v }));

  const handleSelect = async (n: number) => {
    setTestNumber(n); setView('test'); setLoading(true);
    setError(''); setParsedTest(null); setAnswers({}); setSubmitted(false);
    setPassageIdx(0); setMobileTab('passage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const res = await fetch(`/api/practicepte-reading?n=${n}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setParsedTest(parseReadingTest(data.html as string));
    } catch (e) {
      setError((e as Error).message || 'Gagal memuat test');
    } finally {
      setLoading(false);
    }
  };

  const passageScore = (idx: number) => {
    if (!parsedTest) return 0;
    const p = parsedTest.passages[idx];
    let c = 0;
    for (let q = p.range[0]; q <= p.range[1]; q++) {
      if (isCorrectReading(q, answers[q] ?? '', parsedTest.answerKey)) c++;
    }
    return c;
  };

  const totalCorrect = parsedTest ? parsedTest.passages.reduce((s, _, i) => s + passageScore(i), 0) : 0;
  const totalQCount = parsedTest ? parsedTest.passages.reduce((s, p) => s + (p.range[1] - p.range[0] + 1), 0) : 0;

  const passageAnswered = (idx: number) => {
    if (!parsedTest) return 0;
    const p = parsedTest.passages[idx];
    return Array.from({ length: p.range[1] - p.range[0] + 1 }, (_, j) => p.range[0] + j)
      .filter(q => (answers[q] ?? '').trim()).length;
  };

  // ── List View ──────────────────────────────────────────────────────────
  if (view === 'list') {
    const start = (listPage - 1) * PER_PAGE;
    const visible = Array.from({ length: Math.min(PER_PAGE, TOTAL_TESTS - start) }, (_, i) => start + i + 1);
    return (
      <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
        <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Practice
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
            <BookOpenText className="w-6 h-6 text-primary" /> IELTS Reading Practice
          </h1>
          <p className="text-sm text-(--text-secondary) mt-1">{TOTAL_TESTS} latihan · 3 passages · 40 soal per test</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {visible.map(n => (
            <button key={n} onClick={() => handleSelect(n)}
              className="group border border-(--border) hover:border-primary/40 hover:bg-(--hover) rounded-xl p-4 text-left transition-colors">
              <p className="text-xs text-primary font-semibold mb-1">Test</p>
              <p className="text-3xl font-extrabold text-(--text) group-hover:text-primary transition-colors leading-none">{n}</p>
              <p className="text-xs text-(--text-muted) mt-2">40 soal · 3 passages</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs text-primary">Mulai <ArrowRight className="w-3 h-3" /></span>
            </button>
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination page={listPage} totalPages={totalPages}
            onChange={p => { setListPage(p); window.scrollTo({ top: 0 }); }}
            maxVisible={totalPages} className="mt-2" />
        )}
      </div>
    );
  }

  // ── Test View ──────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-[calc(100svh-60px)] animate-fade-in">

      {/* Top bar */}
      <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-b border-(--border) bg-(--bg-card)">
        <button onClick={() => setView('list')} className="inline-flex items-center gap-1 text-xs text-primary hover:underline shrink-0">
          <ArrowLeft className="w-3.5 h-3.5" /> Semua Test
        </button>
        <div className="flex-1 flex items-center gap-1.5 justify-center overflow-x-auto">
          {parsedTest
            ? parsedTest.passages.map((p, i) => {
                const pTotal = p.range[1] - p.range[0] + 1;
                const pScore = submitted ? passageScore(i) : null;
                const pAns = submitted ? null : passageAnswered(i);
                return (
                  <button key={i} onClick={() => { setPassageIdx(i); setMobileTab('passage'); }}
                    className={cn('flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border-2 transition-all shrink-0',
                      passageIdx === i ? 'bg-primary text-white border-primary' : 'bg-(--bg-secondary) border-(--border) text-(--text-secondary) hover:border-primary/40')}>
                    P{p.number}
                    {pScore !== null ? <span className="text-[10px] opacity-80">{pScore}/{pTotal}</span>
                      : pAns !== null && pAns > 0 ? <span className="text-[10px] opacity-60">{pAns}/{pTotal}</span> : null}
                  </button>
                );
              })
            : <span className="text-xs text-(--text-muted)">Test {testNumber}</span>}
        </div>
        {submitted
          ? <div className="shrink-0 flex items-center gap-1 text-xs font-bold text-primary"><Trophy className="w-3.5 h-3.5" /><span>{totalCorrect}/{totalQCount}</span></div>
          : parsedTest && !loading
          ? <button onClick={() => { setSubmitted(true); setPassageIdx(0); setMobileTab('soal'); }}
              className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-primary text-white hover:opacity-90 transition-opacity">
              <CheckCircle2 className="w-3.5 h-3.5" /> Submit
            </button>
          : null}
      </div>

      {/* Score banner */}
      {submitted && parsedTest && (
        <div className="shrink-0 px-4 py-2.5 bg-primary/5 border-b border-primary/20">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-base font-extrabold text-primary">{totalCorrect}</span>
              <span className="text-xs text-(--text-muted)">/ {totalQCount}</span>
            </div>
            <div className="h-4 w-px bg-(--border)" />
            <span className="text-xs text-(--text-secondary)">Band: <strong className="text-primary text-sm">{bandFromScore(totalCorrect)}</strong></span>
            <div className="flex items-center gap-3 ml-auto">
              {parsedTest.passages.map((p, i) => (
                <div key={i} className="text-center">
                  <p className="text-[10px] text-(--text-muted) font-semibold">P{p.number}</p>
                  <p className="text-xs font-bold text-primary">{passageScore(i)}<span className="text-(--text-muted) font-normal">/{p.range[1] - p.range[0] + 1}</span></p>
                </div>
              ))}
              <button onClick={() => setView('list')} className="text-xs text-primary underline ml-1">Selesai</button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-(--text-secondary)">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-sm">Memuat soal...</span>
        </div>
      )}
      {error && (
        <div className="flex-1 flex items-start p-4">
          <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 w-full">
            <AlertCircle className="w-5 h-5 shrink-0 text-primary" />
            <div><p className="text-sm font-medium text-(--text)">Gagal memuat test</p><p className="text-xs text-(--text-secondary)">{error}</p></div>
            <button onClick={() => handleSelect(testNumber)} className="ml-auto text-xs text-primary underline">Coba Lagi</button>
          </div>
        </div>
      )}

      {/* Mobile tabs */}
      {passage && !loading && (
        <div className="shrink-0 flex lg:hidden border-b border-(--border)">
          {(['passage', 'soal'] as const).map(tab => {
            const pTotal = passage.range[1] - passage.range[0] + 1;
            const pAns = Array.from({ length: pTotal }, (_, j) => passage.range[0] + j).filter(q => (answers[q] ?? '').trim()).length;
            return (
              <button key={tab} onClick={() => setMobileTab(tab)}
                className={cn('flex-1 py-2 text-xs font-bold transition-colors',
                  mobileTab === tab ? 'border-b-2 border-primary text-primary bg-primary/5' : 'text-(--text-muted)')}>
                {tab === 'passage' ? 'Passage' : `Soal (${pAns}/${pTotal})`}
              </button>
            );
          })}
        </div>
      )}

      {/* Split panels */}
      {passage && !loading && (
        <div className="flex-1 flex overflow-hidden">

          {/* Left: Passage text */}
          <div className={cn('w-full lg:w-[55%] lg:border-r border-(--border) overflow-y-auto p-4 lg:p-5', mobileTab !== 'passage' && 'hidden lg:block')}>
            <div className="mb-4">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Passage {passage.number}</span>
              <h2 className="text-base font-bold text-(--text) mt-0.5">{passage.title}</h2>
              <p className="text-xs text-(--text-muted) mt-0.5">Q{passage.range[0]}–Q{passage.range[1]}</p>
            </div>
            <div
              className="text-[15px] leading-[1.8] text-(--text) overflow-x-auto [&_p]:mb-4 [&_p]:leading-[1.8] [&_h2]:text-base [&_h2]:font-bold [&_h2]:mt-7 [&_h2]:mb-3 [&_h2]:border-t [&_h2]:border-(--border) [&_h2]:pt-5 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-2.5 [&_h3]:border-t [&_h3]:border-(--border) [&_h3]:pt-4 [&>*:first-child]:mt-0 [&>*:first-child]:border-t-0 [&>*:first-child]:pt-0 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol]:space-y-1.5 [&_li]:leading-[1.7] [&_blockquote]:border-l-[3px] [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-(--text-secondary) [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_table]:text-sm [&_th]:border [&_th]:border-(--border) [&_th]:px-3 [&_th]:py-2 [&_th]:bg-primary/5 [&_th]:font-semibold [&_th]:text-left [&_td]:border [&_td]:border-(--border) [&_td]:px-3 [&_td]:py-2 [&_hr]:border-(--border) [&_hr]:my-6"
              dangerouslySetInnerHTML={{ __html: passage.textHtml || passage.html }}
            />
            <button onClick={() => setMobileTab('soal')} className="lg:hidden mt-5 w-full py-2.5 rounded-xl text-xs font-bold bg-primary/10 text-primary">
              Kerjakan Soal →
            </button>
          </div>

          {/* Right: Questions + inline answers */}
          <div className={cn('w-full lg:w-[45%] overflow-y-auto p-3 lg:p-4 space-y-4', mobileTab !== 'soal' && 'hidden lg:block')}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-primary uppercase tracking-wide">Q{passage.range[0]}–Q{passage.range[1]}</p>
              <span className="text-xs text-(--text-muted)">
                {Array.from({ length: passage.range[1] - passage.range[0] + 1 }, (_, j) => passage.range[0] + j).filter(q => (answers[q] ?? '').trim()).length}
                /{passage.range[1] - passage.range[0] + 1} dijawab
              </span>
            </div>

            {passage.sections.length > 0
              ? passage.sections.map((sec, si) => (
                  <QuestionSectionBlock
                    key={si}
                    section={sec}
                    answers={answers}
                    onChange={onChange}
                    submitted={submitted}
                    answerKey={parsedTest!.answerKey}
                  />
                ))
              : <FallbackAnswers
                  range={passage.range}
                  answers={answers}
                  onChange={onChange}
                  submitted={submitted}
                  answerKey={parsedTest!.answerKey}
                />
            }

            {/* Passage nav */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-(--border)">
              <button onClick={() => { setPassageIdx(p => Math.max(0, p - 1)); setMobileTab('passage'); }}
                disabled={passageIdx === 0}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-(--border) text-(--text-secondary) hover:bg-(--bg-secondary) disabled:opacity-30 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Prev
              </button>
              {parsedTest && passageIdx < parsedTest.passages.length - 1
                ? <button onClick={() => { setPassageIdx(p => p + 1); setMobileTab('passage'); }}
                    className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-bold bg-primary text-white hover:opacity-90 transition-opacity">
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                : !submitted
                ? <button onClick={() => { setSubmitted(true); setPassageIdx(0); setMobileTab('soal'); }}
                    className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-bold bg-primary text-white hover:opacity-90 transition-opacity">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Submit
                  </button>
                : <button onClick={() => setView('list')} className="text-xs text-primary underline">Selesai</button>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
