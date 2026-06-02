"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Trophy,
  XCircle,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { grammarExams } from "@/data/grammarExams";

const LABELS = ["A", "B", "C", "D"];

export default function GrammarExamPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const exam = grammarExams.find((item) => item.slug === slug);

  const shuffledQuestions = useMemo(() => {
    if (!exam) return [];
    return exam.questions;
  }, [exam]);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!exam) {
    return (
      <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-4">
        <Link
          href="/practice"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <div className="bg-(--bg-card) border border-(--border) rounded-xl p-6">
          <h1 className="text-xl font-bold text-(--text)">Paket ujian tidak ditemukan</h1>
        </div>
      </div>
    );
  }

  const total = shuffledQuestions.length;
  const answered = Object.keys(answers).length;
  const remaining = total - answered;
  const progress = Math.round((answered / total) * 100);

  const score = submitted
    ? shuffledQuestions.filter((q) => answers[q.id] === q.correctIndex).length
    : 0;
  const percent = submitted ? Math.round((score / total) * 100) : 0;

  const handleSelect = (id: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [id]: optionIndex }));
  };

  const handleSubmit = () => {
    if (answered < total) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetQuiz = () => {
    window.location.reload();
  };

  const scoreColor =
    percent >= 80
      ? "text-primary"
      : percent >= 60
      ? "text-primary"
      : "text-primary";

  const scoreBarColor =
    percent >= 80
      ? "bg-primary"
      : percent >= 60
      ? "bg-primary"
      : "bg-primary";

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-5 animate-fade-in">

      {/* Top nav */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/practice"
          className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>
        <span className="text-xs font-medium text-(--text-muted)">
          {answered}/{total} dijawab
        </span>
      </div>

      {/* Progress bar */}
      {!submitted && (
        <div className="w-full h-1.5 bg-(--bg-secondary) rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Header card */}
      <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-5 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-(--text) leading-snug">{exam.title}</h1>
            <p className="text-xs text-(--text-secondary) mt-0.5">{exam.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-(--bg-secondary) text-(--text-muted) border border-(--border)">
            {total} soal
          </span>
          {exam.duration && (
            <span className="px-2.5 py-1 rounded-full bg-(--bg-secondary) text-(--text-muted) border border-(--border)">
              ± {exam.duration}
            </span>
          )}
          {exam.sourcePdf && (
            <a
              href={exam.sourcePdf}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              Lihat PDF sumber ↗
            </a>
          )}
        </div>

        {/* Reading passage */}
        {exam.passage && (
          <div className="rounded-xl border border-(--border) bg-(--bg-secondary) p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-(--text-muted) mb-3">
              Reading Text
            </p>
            <div className="text-sm leading-relaxed text-(--text) whitespace-pre-line">
              {exam.passage}
            </div>
          </div>
        )}

        {/* Vocab list */}
        {exam.vocabList && exam.vocabList.length > 0 && (
          <div className="rounded-xl border border-(--border) bg-(--bg-secondary) p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-(--text-muted) mb-3">
              Useful Vocabularies
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {exam.vocabList.map((item) => (
                <div key={item.term} className="flex gap-1.5 text-sm">
                  <span className="font-semibold text-(--text) shrink-0">{item.term}</span>
                  <span className="text-(--text-secondary)">= {item.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Score result */}
        {submitted && (
          <div className="rounded-xl border border-(--border) bg-(--bg-secondary) p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="font-bold text-(--text)">Hasil Ujian</span>
              </div>
              <span className={cn("text-2xl font-bold", scoreColor)}>
                {percent}%
              </span>
            </div>
            <div className="w-full h-2 bg-(--border) rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-500", scoreBarColor)}
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-(--text-secondary)">
              <span>Benar: <span className="font-semibold text-primary">{score}</span></span>
              <span>Salah: <span className="font-semibold text-primary">{total - score}</span></span>
              <span>Total: <span className="font-semibold text-(--text)">{total}</span></span>
            </div>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {shuffledQuestions.map((q, idx) => {
          const selected = answers[q.id];
          const isAnswered = selected !== undefined;
          const isWrong = submitted && isAnswered && selected !== q.correctIndex;
          const isRight = submitted && isAnswered && selected === q.correctIndex;

          return (
            <section
              key={q.id}
              className={cn(
                "bg-(--bg-card) border rounded-2xl overflow-hidden transition-all",
                submitted && isWrong && "border-primary/30 dark:border-primary/50",
                submitted && isRight && "border-primary/30 dark:border-primary/50",
                (!submitted || !isAnswered) && "border-(--border)",
              )}
            >
              {/* Question header */}
              <div className="px-5 pt-4 pb-3 flex items-start gap-3">
                <span
                  className={cn(
                    "shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                    submitted && isRight && "bg-primary text-white",
                    submitted && isWrong && "bg-primary text-white",
                    !submitted && "bg-primary/10 text-primary",
                  )}
                >
                  {idx + 1}
                </span>
                <p className="font-medium text-(--text) text-sm leading-relaxed pt-0.5">
                  {q.question}
                </p>
              </div>

              {/* Options */}
              <div className="px-5 pb-4 space-y-2">
                {q.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isCorrectOpt = i === q.correctIndex;
                  return (
                    <button
                      key={`${q.id}-${i}`}
                      type="button"
                      onClick={() => handleSelect(q.id, i)}
                      disabled={submitted}
                      className={cn(
                        "w-full text-left rounded-xl border p-3 text-sm transition-all flex items-center gap-3",
                        // pre-submit states
                        !submitted && !isSelected && "border-(--border) hover:border-primary/40 hover:bg-primary/5",
                        !submitted && isSelected && "border-primary bg-primary/10 text-(--text)",
                        // post-submit states
                        submitted && isCorrectOpt && "border-primary/50 bg-primary/10 dark:bg-primary/30",
                        submitted && isSelected && !isCorrectOpt && "border-primary/30 bg-primary/10 dark:bg-primary/30",
                        submitted && !isSelected && !isCorrectOpt && "border-(--border) opacity-50",
                      )}
                    >
                      {/* Letter label */}
                      <span
                        className={cn(
                          "shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold",
                          !submitted && !isSelected && "bg-(--bg-secondary) text-(--text-muted)",
                          !submitted && isSelected && "bg-primary text-white",
                          submitted && isCorrectOpt && "bg-primary text-white",
                          submitted && isSelected && !isCorrectOpt && "bg-primary/30 text-white",
                          submitted && !isSelected && !isCorrectOpt && "bg-(--bg-secondary) text-(--text-muted)",
                        )}
                      >
                        {LABELS[i]}
                      </span>

                      <span className="flex-1">{opt}</span>

                      {/* Status icon */}
                      {submitted && isCorrectOpt && (
                        <CheckCircle2 className="shrink-0 w-4 h-4 text-primary" />
                      )}
                      {submitted && isSelected && !isCorrectOpt && (
                        <XCircle className="shrink-0 w-4 h-4 text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submit */}
              {submitted && (
                <div
                  className={cn(
                    "mx-5 mb-4 rounded-xl p-3 text-xs space-y-1.5",
                    isRight
                      ? "bg-primary/10 dark:bg-primary/30 border border-primary/30 dark:border-primary/50"
                      : "bg-primary/10 dark:bg-primary/30 border border-primary/30 dark:border-primary/50",
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    {isRight ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="font-semibold text-primary dark:text-primary">
                          Jawaban benar!
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="font-semibold text-primary dark:text-primary">
                          Jawaban salah — yang benar:{" "}
                          <span className="underline">{q.options[q.correctIndex]}</span>
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-(--text-secondary) leading-relaxed pl-5">
                    {q.reason}
                  </p>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Bottom action */}
      <div className="sticky bottom-4">
        {!submitted ? (
          <div className="flex items-center gap-3 bg-(--bg-card) border border-(--border) rounded-2xl p-3 shadow-lg">
            <div className="flex-1">
              {remaining > 0 ? (
                <p className="text-xs text-(--text-secondary)">
                  Masih <span className="font-semibold text-(--text)">{remaining} soal</span> belum dijawab
                </p>
              ) : (
                <p className="text-xs text-primary font-medium">Semua soal sudah dijawab!</p>
              )}
              <div className="w-full h-1 bg-(--bg-secondary) rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={remaining > 0}
              className={cn(
                "shrink-0 px-5 py-2 rounded-xl text-sm font-semibold transition-all",
                remaining > 0
                  ? "bg-(--bg-secondary) text-(--text-muted) cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary-dark shadow-sm",
              )}
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={resetQuiz}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-2xl text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Ulangi
            </button>
            <Link
              href="/practice"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-(--bg-card) border border-(--border) text-(--text) rounded-2xl text-sm font-semibold hover:bg-(--bg-secondary) transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
