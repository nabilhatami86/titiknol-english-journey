'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Youtube, Play, Clock, FileText,
  RotateCcw, ChevronDown, ChevronUp, Info,
  CheckCircle2, XCircle, KeyRound, Send, Trophy,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────────

type TestType = 'ielts' | 'toefl';
type Step = 'setup' | 'watch' | 'result';

interface Section {
  label: string;
  range: string;
  from: number;
  to: number;
  description: string;
}

// ── Config ────────────────────────────────────────────────────────────

const IELTS_SECTIONS: Section[] = [
  { label: 'Section 1', range: 'Q 1–10', from: 1, to: 10, description: 'Conversation in everyday social context' },
  { label: 'Section 2', range: 'Q 11–20', from: 11, to: 20, description: 'Monologue in everyday social context' },
  { label: 'Section 3', range: 'Q 21–30', from: 21, to: 30, description: 'Conversation in educational/training context' },
  { label: 'Section 4', range: 'Q 31–40', from: 31, to: 40, description: 'Academic lecture / monologue' },
];

const TOEFL_SECTIONS: Section[] = [
  { label: 'Conversation 1', range: 'Q 1–5', from: 1, to: 5, description: 'Campus conversation' },
  { label: 'Lecture 1', range: 'Q 6–11', from: 6, to: 11, description: 'Academic lecture' },
  { label: 'Conversation 2', range: 'Q 12–17', from: 12, to: 17, description: 'Campus conversation' },
  { label: 'Lecture 2', range: 'Q 18–23', from: 18, to: 23, description: 'Academic lecture with discussion' },
  { label: 'Lecture 3', range: 'Q 24–28', from: 24, to: 28, description: 'Academic lecture' },
];

const TIPS: Record<TestType, string[]> = {
  ielts: [
    'Soal dan audio ada di video YouTube — baca soal sebelum audio mulai',
    'Perhatikan spelling; maksimal 3 kata per jawaban',
    'Jawaban mengikuti urutan yang didengar',
    'Distractor biasanya muncul — perhatikan koreksi pembicara',
    'Answer key biasanya di deskripsi video atau ditampilkan di akhir',
  ],
  toefl: [
    'Soal dan audio ada di video YouTube — langsung jawab',
    'Catat kata kunci: contrast, example, definition',
    'Perhatikan tone pembicara: skeptis, antusias, ragu',
    'Answer key biasanya di deskripsi video atau ditampilkan di akhir',
    'Fokus pada main idea dan purpose, bukan detail kecil',
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function normalizeAnswer(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

function parseAnswerKey(raw: string, total: number): Record<number, string> {
  const key: Record<number, string> = {};
  const lines = raw.split(/[\n,]/).map(s => s.trim()).filter(Boolean);
  lines.forEach((line, i) => {
    const withNum = line.match(/^(\d+)[.):\s]+(.+)$/);
    if (withNum) {
      key[parseInt(withNum[1])] = withNum[2].trim();
    } else if (i + 1 <= total) {
      key[i + 1] = line;
    }
  });
  return key;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function bandFromScore(pct: number): string {
  if (pct >= 97) return '9.0';
  if (pct >= 93) return '8.5';
  if (pct >= 87) return '8.0';
  if (pct >= 80) return '7.5';
  if (pct >= 73) return '7.0';
  if (pct >= 67) return '6.5';
  if (pct >= 60) return '6.0';
  if (pct >= 53) return '5.5';
  if (pct >= 47) return '5.0';
  if (pct >= 40) return '4.5';
  return '4.0';
}

// ── Page ──────────────────────────────────────────────────────────────

export default function IeltsListeningPage() {
  const [testType, setTestType] = useState<TestType>('ielts');
  const [step, setStep] = useState<Step>('setup');

  // Setup step
  const [urlInput, setUrlInput] = useState('');
  const [keyInput, setKeyInput] = useState('');
  const [urlError, setUrlError] = useState('');
  const [showTips, setShowTips] = useState(false);
  const [showKeyHelp, setShowKeyHelp] = useState(false);

  // Watch step
  const [videoId, setVideoId] = useState<string | null>(null);
  const [answerKey, setAnswerKey] = useState<Record<number, string>>({});
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({ 0: true });

  // Timer
  const [timerOn, setTimerOn] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalTime = testType === 'ielts' ? 30 * 60 : 41 * 60;

  useEffect(() => {
    if (timerOn) {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerOn]);

  const sections = testType === 'ielts' ? IELTS_SECTIONS : TOEFL_SECTIONS;
  const totalQ = sections[sections.length - 1].to;
  const hasKey = Object.keys(answerKey).length > 0;

  const handleStart = () => {
    const id = extractVideoId(urlInput.trim());
    if (!id) { setUrlError('URL tidak valid. Pastikan link YouTube yang benar.'); return; }
    setUrlError('');
    const key = parseAnswerKey(keyInput, totalQ);
    setVideoId(id);
    setAnswerKey(key);
    setAnswers({});
    setElapsed(0);
    setTimerOn(false);
    setOpenSections({ 0: true });
    setStep('watch');
  };

  const handleSubmit = () => {
    setTimerOn(false);
    setStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setVideoId(null);
    setAnswers({});
    setAnswerKey({});
    setKeyInput('');
    setUrlInput('');
    setElapsed(0);
    setTimerOn(false);
    setStep('setup');
  };

  const setAnswer = (n: number, val: string) =>
    setAnswers(prev => ({ ...prev, [n]: val }));

  const toggleSection = (i: number) =>
    setOpenSections(prev => ({ ...prev, [i]: !prev[i] }));

  const answeredCount = Object.values(answers).filter(v => v.trim()).length;

  // ── RESULT ────────────────────────────────────────────────────────
  if (step === 'result') {
    const keyEntries = Object.keys(answerKey).length;
    const checked = keyEntries > 0;
    let correct = 0;
    let wrong = 0;

    if (checked) {
      for (let n = 1; n <= totalQ; n++) {
        if (!answerKey[n]) continue;
        const userAns = normalizeAnswer(answers[n] ?? '');
        const correctAns = normalizeAnswer(answerKey[n]);
        if (userAns === correctAns) correct++;
        else wrong++;
      }
    }

    const scorePct = keyEntries > 0 ? Math.round((correct / keyEntries) * 100) : 0;
    const band = bandFromScore(scorePct);

    return (
      <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-5 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <button onClick={handleReset} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Mulai Ulang
          </button>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
            {testType.toUpperCase()} Result
          </span>
        </div>

        {/* Score card */}
        {checked ? (
          <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-6 text-center space-y-2">
            <Trophy className="w-8 h-8 text-primary mx-auto" />
            <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-widest">Skor Kamu</p>
            <div className="text-5xl font-black text-primary">{correct} <span className="text-2xl text-(--text-muted)">/ {keyEntries}</span></div>
            <p className="text-sm text-(--text-secondary)">{scorePct}% benar · Estimasi Band <span className="font-bold text-primary">{band}</span></p>
            <div className="h-2 bg-(--bg-secondary) rounded-full overflow-hidden mx-auto max-w-xs mt-2">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${scorePct}%` }} />
            </div>
            <p className="text-xs text-(--text-muted)">Waktu: {formatTime(elapsed)}</p>
          </div>
        ) : (
          <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-6 text-center space-y-2">
            <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-widest">Jawaban Tersimpan</p>
            <div className="text-5xl font-black text-primary">{answeredCount} <span className="text-2xl text-(--text-muted)">/ {totalQ}</span></div>
            <p className="text-sm text-(--text-secondary)">Answer key tidak dimasukkan — tidak bisa dihitung otomatis.</p>
            <p className="text-xs text-(--text-muted)">Cek jawaban kamu secara manual dari video atau deskripsi.</p>
          </div>
        )}

        {/* Per-question result */}
        {checked && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wide">Detail Jawaban</p>
            {sections.map((section, si) => (
              <div key={si} className="bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection(si)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-(--bg-secondary) transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-(--text)">{section.label}</span>
                    <span className="text-xs text-(--text-muted)">{section.range}</span>
                    {(() => {
                      const sCorrect = Array.from({ length: section.to - section.from + 1 }, (_, i) => i + section.from)
                        .filter(n => answerKey[n] && normalizeAnswer(answers[n] ?? '') === normalizeAnswer(answerKey[n])).length;
                      const sTotal = Array.from({ length: section.to - section.from + 1 }, (_, i) => i + section.from)
                        .filter(n => answerKey[n]).length;
                      return sTotal > 0 ? (
                        <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-semibold border',
                          sCorrect === sTotal ? 'bg-primary/10 text-primary border-primary/20' : 'bg-(--bg-secondary) text-(--text-muted) border-(--border)'
                        )}>
                          {sCorrect}/{sTotal}
                        </span>
                      ) : null;
                    })()}
                  </div>
                  {openSections[si] ? <ChevronUp className="w-4 h-4 text-(--text-muted)" /> : <ChevronDown className="w-4 h-4 text-(--text-muted)" />}
                </button>

                {openSections[si] && (
                  <div className="px-4 pb-4 border-t border-(--border) pt-3 space-y-2">
                    {Array.from({ length: section.to - section.from + 1 }, (_, i) => {
                      const n = i + section.from;
                      const userAns = answers[n]?.trim() ?? '';
                      const correctAns = answerKey[n] ?? '';
                      const isCorrect = correctAns && normalizeAnswer(userAns) === normalizeAnswer(correctAns);
                      const isWrong = correctAns && userAns && !isCorrect;
                      const noAnswer = !userAns && correctAns;

                      return (
                        <div key={n} className={cn('flex items-start gap-3 text-sm p-2 rounded-lg',
                          isCorrect ? 'bg-primary/5' : isWrong ? 'bg-(--bg-secondary)' : ''
                        )}>
                          <span className="text-xs font-bold text-(--text-muted) w-5 shrink-0 mt-0.5">{n}.</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              {isCorrect && (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                                  <span className="text-primary font-semibold">{userAns}</span>
                                </>
                              )}
                              {isWrong && (
                                <>
                                  <XCircle className="w-3.5 h-3.5 text-(--text-muted) shrink-0" />
                                  <span className="line-through text-(--text-muted)">{userAns}</span>
                                  <span className="text-xs text-(--text-muted)">→</span>
                                  <span className="font-semibold text-(--text)">{correctAns}</span>
                                </>
                              )}
                              {noAnswer && (
                                <>
                                  <span className="text-(--text-muted) italic text-xs">tidak dijawab</span>
                                  <span className="text-xs text-(--text-muted)">→</span>
                                  <span className="font-semibold text-(--text)">{correctAns}</span>
                                </>
                              )}
                              {!correctAns && userAns && (
                                <span className="text-(--text-secondary)">{userAns} <span className="text-xs text-(--text-muted)">(no key)</span></span>
                              )}
                              {!correctAns && !userAns && (
                                <span className="text-(--text-muted) italic text-xs">—</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-(--border) bg-(--bg-card) text-sm font-semibold text-(--text) hover:bg-(--bg-secondary) transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Latihan Lagi
        </button>
      </div>
    );
  }

  // ── WATCH step ────────────────────────────────────────────────────
  if (step === 'watch') {
    return (
      <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <button onClick={() => setStep('setup')} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Setup
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              {testType.toUpperCase()}
            </span>
            {hasKey && (
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
                <KeyRound className="w-3 h-3" /> Key ✓
              </span>
            )}
            <button
              onClick={() => setTimerOn(v => !v)}
              className={cn('flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors',
                timerOn ? 'bg-primary/10 border-primary/30 text-primary' : 'border-(--border) text-(--text-muted) hover:border-primary/30'
              )}
            >
              <Clock className="w-3 h-3" />
              {formatTime(elapsed)} {timerOn ? '⏸' : '▶'}
            </button>
          </div>
        </div>

        {/* YouTube embed */}
        <div className="rounded-xl overflow-hidden border border-(--border) aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Listening Practice"
          />
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-(--text-muted)">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              {answeredCount} / {totalQ} terjawab
            </span>
            <button onClick={() => setAnswers({})} className="flex items-center gap-1 hover:text-primary transition-colors">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
          <div className="h-1.5 bg-(--bg-secondary) rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(answeredCount / totalQ) * 100}%` }} />
          </div>
        </div>

        {/* Answer sheet */}
        <div className="space-y-2">
          {sections.map((section, si) => (
            <div key={si} className="bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection(si)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-(--bg-secondary) transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-(--text)">{section.label}</span>
                  <span className="text-xs text-(--text-muted)">{section.range}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-muted) border border-(--border)">
                    {Array.from({ length: section.to - section.from + 1 }, (_, i) => i + section.from).filter(n => answers[n]?.trim()).length}/{section.to - section.from + 1}
                  </span>
                </div>
                {openSections[si] ? <ChevronUp className="w-4 h-4 text-(--text-muted)" /> : <ChevronDown className="w-4 h-4 text-(--text-muted)" />}
              </button>

              {openSections[si] && (
                <div className="px-4 pb-4 border-t border-(--border) pt-3">
                  <p className="text-xs text-(--text-muted) mb-3 italic">{section.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {Array.from({ length: section.to - section.from + 1 }, (_, i) => {
                      const n = i + section.from;
                      return (
                        <div key={n} className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-(--text-muted) w-5 shrink-0 text-right">{n}.</span>
                          <input
                            type="text"
                            value={answers[n] ?? ''}
                            onChange={e => setAnswer(n, e.target.value)}
                            placeholder="—"
                            className={cn(
                              'w-full px-2 py-1.5 rounded-lg border text-xs text-(--text) bg-(--bg-secondary) focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors',
                              answers[n]?.trim() ? 'border-primary/30' : 'border-(--border)'
                            )}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={answeredCount === 0}
          className={cn(
            'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all',
            answeredCount > 0 ? 'bg-primary text-white hover:opacity-90' : 'bg-(--bg-secondary) text-(--text-muted) cursor-not-allowed'
          )}
        >
          <Send className="w-4 h-4" />
          {hasKey ? 'Submit & Cek Jawaban' : 'Simpan Jawaban'}
        </button>
        {!hasKey && (
          <p className="text-center text-xs text-(--text-muted)">
            Answer key tidak dimasukkan — jawaban tersimpan tapi tidak bisa dihitung otomatis.
          </p>
        )}
      </div>
    );
  }

  // ── SETUP step ────────────────────────────────────────────────────
  return (
    <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-5 animate-fade-in">
      <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Practice
      </Link>

      <div>
        <h1 className="text-xl font-bold text-(--text) flex items-center gap-2">
          <Youtube className="w-5 h-5 text-primary" /> IELTS / TOEFL Listening Lab
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          Tempel link YouTube + masukkan answer key → tonton → isi jawaban → cek skor otomatis.
        </p>
      </div>

      {/* Test type toggle */}
      <div className="flex gap-2">
        {(['ielts', 'toefl'] as TestType[]).map(t => (
          <button
            key={t}
            onClick={() => setTestType(t)}
            className={cn(
              'flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all',
              testType === t
                ? 'bg-primary text-white border-primary'
                : 'bg-(--bg-card) border-(--border) text-(--text-secondary) hover:border-primary/40'
            )}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* YouTube URL */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-(--text) flex items-center gap-2">
          <Youtube className="w-4 h-4 text-primary" /> YouTube URL
        </label>
        <input
          type="text"
          value={urlInput}
          onChange={e => { setUrlInput(e.target.value); setUrlError(''); }}
          onKeyDown={e => e.key === 'Enter' && handleStart()}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full px-3 py-2.5 rounded-xl border border-(--border) bg-(--bg-card) text-(--text) text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {urlError && <p className="text-xs text-primary">{urlError}</p>}
        <p className="text-xs text-(--text-muted)">
          Cari: &quot;{testType.toUpperCase()} Listening Practice Test with answers&quot; atau &quot;Cambridge IELTS {testType === 'ielts' ? '17' : 'Official'}&quot;
        </p>
      </div>

      {/* Answer Key input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-(--text) flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-primary" /> Answer Key
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted) border border-(--border)">opsional</span>
          </label>
          <button
            onClick={() => setShowKeyHelp(v => !v)}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <Info className="w-3 h-3" /> Cara input
          </button>
        </div>

        {showKeyHelp && (
          <div className="bg-(--bg-secondary) rounded-xl p-3 text-xs text-(--text-secondary) space-y-1.5 border border-(--border)">
            <p className="font-semibold text-(--text)">Format yang diterima:</p>
            <p>• Satu per baris: <code className="bg-(--bg-card) px-1 rounded">mountain</code> (Q1), <code className="bg-(--bg-card) px-1 rounded">B</code> (Q2), dst</p>
            <p>• Dengan nomor: <code className="bg-(--bg-card) px-1 rounded">1. mountain</code> atau <code className="bg-(--bg-card) px-1 rounded">1) mountain</code></p>
            <p>• Dipisah koma: <code className="bg-(--bg-card) px-1 rounded">mountain, B, C, swimming, 6</code></p>
            <p className="text-(--text-muted) pt-1">Answer key biasanya ada di deskripsi video atau muncul di akhir video.</p>
          </div>
        )}

        <textarea
          value={keyInput}
          onChange={e => setKeyInput(e.target.value)}
          placeholder={`Contoh (satu per baris atau pisah koma):\nmountain\nB\nC\nswimming pool\n6 days\n...`}
          rows={6}
          className="w-full px-3 py-2.5 rounded-xl border border-(--border) bg-(--bg-card) text-(--text) text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
        />
        {keyInput.trim() && (
          <p className="text-xs text-primary">
            ✓ {parseAnswerKey(keyInput, totalQ) && Object.keys(parseAnswerKey(keyInput, totalQ)).length} jawaban terdeteksi
          </p>
        )}
      </div>

      {/* Tips */}
      <div className="bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden">
        <button
          onClick={() => setShowTips(v => !v)}
          className="w-full flex items-center justify-between p-4 hover:bg-(--bg-secondary) transition-colors"
        >
          <span className="text-sm font-semibold text-(--text) flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" /> Tips {testType.toUpperCase()} Listening
          </span>
          {showTips ? <ChevronUp className="w-4 h-4 text-(--text-muted)" /> : <ChevronDown className="w-4 h-4 text-(--text-muted)" />}
        </button>
        {showTips && (
          <ul className="px-4 pb-4 space-y-1.5 border-t border-(--border) pt-3">
            {TIPS[testType].map((tip, i) => (
              <li key={i} className="text-xs text-(--text-secondary) flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                {tip}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Start button */}
      <button
        onClick={handleStart}
        disabled={!urlInput.trim()}
        className={cn(
          'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all',
          urlInput.trim() ? 'bg-primary text-white hover:opacity-90' : 'bg-(--bg-secondary) text-(--text-muted) cursor-not-allowed'
        )}
      >
        <Play className="w-4 h-4" />
        Mulai Latihan
      </button>
    </div>
  );
}
