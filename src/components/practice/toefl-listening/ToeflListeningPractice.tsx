"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Headphones,
  Pause,
  Play,
  RotateCcw,
  Trophy,
  Volume2,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  ToeflOption,
  ToeflQuestion,
  ToeflSample,
} from "@/data/toefl-listening/toeflListeningSamples";

const AUDIO_BASE_PATH = "/audio/listening-toefl";

function fmtTime(seconds: number) {
  const safe = Number.isFinite(seconds) ? seconds : 0;
  return `${Math.floor(safe / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(safe % 60)
    .toString()
    .padStart(2, "0")}`;
}

function normalizeAnswer(value: string) {
  return value
    .trim()
    .toUpperCase()
    .replace(/[\s,.-]+/g, "");
}

function isCorrectAnswer(given: string, correct: string, alts?: string[]) {
  const g = normalizeAnswer(given);
  if (g === normalizeAnswer(correct)) return true;
  if (alts && alts.some((a) => g === normalizeAnswer(a))) return true;
  return false;
}

function AudioPlayer({ fileName }: { fileName: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
  }, [rate]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setLoadError(true));
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  if (loadError) {
    return (
      <p className="text-xs text-(--text-muted) italic">
        Audio tidak ditemukan. Pastikan file ada di{" "}
        <code className="rounded bg-(--bg-secondary) px-1">
          {AUDIO_BASE_PATH}/
        </code>
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <audio
        ref={audioRef}
        src={`${AUDIO_BASE_PATH}/${fileName}`}
        onTimeUpdate={() => setCurrent(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => setPlaying(false)}
        onError={() => setLoadError(true)}
      />

      <div
        className="h-2.5 cursor-pointer overflow-hidden rounded-full border border-(--border) bg-(--bg-secondary)"
        onClick={seek}
      >
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${duration ? (current / duration) * 100 : 0}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="w-11 text-xs tabular-nums text-(--text-muted)">
          {fmtTime(current)}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const audio = audioRef.current;
              if (audio)
                audio.currentTime = Math.max(0, audio.currentTime - 10);
            }}
            className="rounded-lg p-1.5 text-(--text-secondary) transition-colors hover:bg-(--bg-secondary)"
            title="Rewind 10 seconds"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={toggle}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-opacity hover:opacity-90"
            title={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="ml-0.5 h-4 w-4" />
            )}
          </button>
          <select
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="rounded-lg border border-(--border) bg-(--bg-card) px-1.5 py-1 text-xs text-(--text-secondary) focus:outline-none"
            title="Playback speed"
          >
            {[0.75, 0.9, 1, 1.1, 1.25].map((speed) => (
              <option key={speed} value={speed}>
                {speed}x
              </option>
            ))}
          </select>
        </div>
        <span className="w-11 text-right text-xs tabular-nums text-(--text-muted)">
          {fmtTime(duration)}
        </span>
      </div>
    </div>
  );
}

function SampleCard({
  sample,
  onSelect,
}: {
  sample: ToeflSample;
  onSelect: (sample: ToeflSample) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(sample)}
      className="group w-full rounded-xl border border-(--border) bg-(--bg-card) p-4 text-left transition-all hover:border-primary/40 hover:bg-primary/5"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Headphones className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-(--text) group-hover:text-primary">
            {sample.title}
          </h2>
          <p className="mt-1 text-xs text-(--text-muted)">
            {sample.questions.length} questions · {sample.audioPath}
          </p>
        </div>
        <ChevronDown className="-rotate-90 h-4 w-4 shrink-0 text-(--text-muted)" />
      </div>
    </button>
  );
}

function OptionButton({
  option,
  selected,
  correct,
  submitted,
  onSelect,
}: {
  option: ToeflOption;
  selected: boolean;
  correct: boolean;
  submitted: boolean;
  onSelect: () => void;
}) {
  const showRight = submitted && correct;
  const showWrong = submitted && selected && !correct;

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={submitted}
      className={cn(
        "w-full rounded-lg border px-3 py-2.5 text-left text-sm transition-all",
        !submitted &&
          !selected &&
          "border-(--border) bg-(--bg-secondary) text-(--text-secondary) hover:border-primary/40",
        !submitted &&
          selected &&
          "border-primary bg-primary/10 font-medium text-(--text)",
        showRight &&
          "border-green-500 bg-green-50 font-medium text-green-700 dark:bg-green-950/30 dark:text-green-400",
        showWrong &&
          "border-red-400 bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
        submitted &&
          !selected &&
          !correct &&
          "border-(--border) text-(--text-muted) opacity-60",
      )}
    >
      <span className="flex items-start gap-2">
        <span className="font-bold">{option.label}.</span>
        <span className="flex-1">{option.text}</span>
        {showRight && (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
        )}
        {showWrong && (
          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
        )}
      </span>
    </button>
  );
}

function QuestionCard({
  question,
  answer,
  submitted,
  onAnswer,
}: {
  question: ToeflQuestion;
  answer: string;
  submitted: boolean;
  onAnswer: (value: string) => void;
}) {
  const correct = submitted
    ? isCorrectAnswer(answer, question.answer, question.alts)
    : null;
  const isChoiceQuestion =
    question.type === undefined ||
    question.type === "mc" ||
    question.type === "multi";

  return (
    <div className="rounded-xl border border-(--border) bg-(--bg-card) p-4">
      <div className="mb-3 flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
          {question.n}
        </span>
        <p className="pt-0.5 text-sm font-semibold leading-relaxed text-(--text)">
          {question.prompt}
        </p>
      </div>

      {question.type === "ordering" && question.items && (
        <div className="mb-3 rounded-lg border border-(--border) bg-(--bg-secondary) p-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-(--text-muted)">
            Items
          </p>
          <div className="space-y-1.5 text-sm text-(--text-secondary)">
            {question.items.map((item, idx) => {
              if (typeof item === "string") {
                return <p key={item}>{item}</p>;
              }
              const content = item.text ?? String(item.answer ?? idx);
              const key = content || String(idx);
              return <p key={key}>{content}</p>;
            })}
          </div>
        </div>
      )}

      {question.type === "table" && question.items && question.categories && (
        <div className="mb-3 rounded-lg border border-(--border) bg-(--bg-secondary) p-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-(--text-muted)">
            Categories
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-(--text-secondary)">
            {(question.categories ?? []).map((cat, i) => (
              <div
                key={String(i)}
                className="rounded px-3 py-1 border border-(--border) bg-(--bg-card)"
              >
                <span className="font-bold">
                  {String.fromCharCode(65 + i)}.
                </span>
                <span className="ml-2">{cat}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 space-y-2">
            {(
              question.items as (string | { text: string; answer: string })[]
            ).map((item, idx) => {
              const content =
                typeof item === "string"
                  ? item
                  : (item.text ?? String(item.answer ?? idx));
              const key = content || String(idx);
              const sel = (answer ?? "")[idx] ?? "";
              return (
                <div key={key} className="flex items-center gap-3">
                  <p className="flex-1 text-sm text-(--text)">{content}</p>
                  <select
                    value={sel}
                    onChange={(e) => {
                      if (submitted) return;
                      const val = e.target.value;
                      const prev = (answer ?? "").split("");
                      // ensure length
                      while (prev.length < (question.items as any[]).length)
                        prev.push("");
                      prev[idx] = val;
                      onAnswer(prev.join(""));
                    }}
                    disabled={submitted}
                    className="rounded-lg border border-(--border) bg-(--bg-card) px-2 py-1 text-sm text-(--text-secondary)"
                  >
                    <option value="">—</option>
                    {(question.categories ?? []).map((_, ci) => (
                      <option key={ci} value={String.fromCharCode(65 + ci)}>
                        {String.fromCharCode(65 + ci)}
                      </option>
                    ))}
                  </select>
                  {submitted && (
                    <span className="text-xs text-(--text-muted)">
                      Correct: {question.answer[idx]} —{" "}
                      {(question.categories ?? [])[
                        (question.answer.charCodeAt(idx) ?? 65) - 65
                      ] ?? ""}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isChoiceQuestion && question.options ? (
        <div className="space-y-2">
          {question.options.map((option) => (
            <OptionButton
              key={option.label}
              option={option}
              selected={
                question.type === "multi"
                  ? (answer ?? "").includes(option.label)
                  : answer === option.label
              }
              correct={
                question.type === "multi"
                  ? (question.answer ?? "").includes(option.label)
                  : isCorrectAnswer(option.label, question.answer)
              }
              submitted={submitted}
              onSelect={() => {
                if (submitted) return;
                if (question.type === "multi") {
                  const prev = answer ?? "";
                  const has = prev.includes(option.label);
                  const next = has
                    ? prev.replace(option.label, "")
                    : prev + option.label;
                  const sorted = next.split("").sort().join("");
                  onAnswer(sorted);
                } else {
                  onAnswer(option.label);
                }
              }}
            />
          ))}
        </div>
      ) : (
        <input
          type="text"
          value={answer}
          onChange={(e) => onAnswer(e.target.value)}
          readOnly={submitted}
          placeholder={
            question.type === "ordering" ? "Example: BCA" : "Type your answer"
          }
          className={cn(
            "w-full rounded-lg border bg-(--bg-secondary) px-3 py-2.5 text-sm text-(--text) outline-none transition-colors",
            !submitted && "border-(--border) focus:border-primary",
            correct === true &&
              "border-green-500 text-green-700 dark:text-green-400",
            correct === false &&
              "border-red-400 text-red-600 dark:text-red-400",
          )}
        />
      )}

      {submitted && correct === false && (
        <p className="mt-2 text-xs font-semibold text-green-600 dark:text-green-400">
          Correct answer: {question.answer}
        </p>
      )}
    </div>
  );
}

function ScorePanel({ correct, total }: { correct: number; total: number }) {
  const percent = total ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="overflow-hidden rounded-xl border border-(--border) bg-(--bg-secondary)">
      <div className="flex items-center gap-3 border-b border-primary/20 bg-primary/5 px-5 py-4">
        <Trophy className="h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="font-bold text-(--text)">Hasil</p>
          <p className="text-xs text-(--text-muted)">
            TOEFL Listening practice score
          </p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-2xl font-extrabold text-primary">
            {correct}
            <span className="text-base font-semibold text-(--text-muted)">
              /{total}
            </span>
          </p>
          <p className="text-xs text-(--text-muted)">{percent}%</p>
        </div>
      </div>
    </div>
  );
}

export default function ToeflListeningPractice({
  samples,
}: {
  samples: ToeflSample[];
}) {
  const [selected, setSelected] = useState<ToeflSample | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const correctCount = useMemo(() => {
    if (!selected || !submitted) return 0;
    return selected.questions.filter((question) =>
      isCorrectAnswer(
        answers[question.n] ?? "",
        question.answer,
        question.alts,
      ),
    ).length;
  }, [answers, selected, submitted]);

  const answeredCount = Object.values(answers).filter((value) =>
    value.trim(),
  ).length;

  const handleSelectSample = (sample: ToeflSample) => {
    setSelected(sample);
    setAnswers({});
    setSubmitted(false);
  };

  const handleBack = () => {
    setSelected(null);
    setAnswers({});
    setSubmitted(false);
  };

  if (!selected) {
    return (
      <div className="mx-auto max-w-3xl space-y-5 p-4 lg:p-6">
        <div>
          <p className="text-sm font-semibold text-primary">TOEFL Listening</p>
          <h1 className="mt-1 text-2xl font-extrabold text-(--text)">
            Practice Samples
          </h1>
          <p className="mt-1 text-sm text-(--text-secondary)">
            Pilih audio, dengarkan, lalu jawab soal berdasarkan percakapan atau
            lecture.
          </p>
        </div>

        <div className="space-y-3">
          {samples.map((sample, idx) => (
            <SampleCard
              key={`${sample.id}-${idx}`}
              sample={sample}
              onSelect={handleSelectSample}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5 p-4 lg:p-6">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> All Samples
        </button>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          {selected.section} · {selected.questions.length} questions
        </span>
      </div>

      <div>
        <h1 className="text-xl font-bold text-(--text)">{selected.title}</h1>
        <p className="mt-0.5 text-sm text-(--text-secondary)">
          TOEFL Listening Practice
        </p>
      </div>

      {submitted && (
        <ScorePanel correct={correctCount} total={selected.questions.length} />
      )}

      <div className="overflow-hidden rounded-xl border border-(--border) bg-(--bg-card)">
        <div className="flex items-center gap-2 border-b border-(--border) bg-(--bg-secondary) px-4 py-3">
          <Volume2 className="h-4 w-4 shrink-0 text-primary" />
          <span className="text-sm font-semibold text-(--text)">Audio</span>
          <span className="ml-1 truncate text-xs text-(--text-muted)">
            {selected.audioPath}
          </span>
        </div>
        <div className="px-4 py-4">
          <AudioPlayer key={selected.audioPath} fileName={selected.audioPath} />
        </div>
      </div>

      <div className="space-y-3">
        {selected.questions.map((question) => (
          <QuestionCard
            key={question.n}
            question={question}
            answer={answers[question.n] ?? ""}
            submitted={submitted}
            onAnswer={(value) => {
              if (!submitted)
                setAnswers((prev) => ({ ...prev, [question.n]: value }));
            }}
          />
        ))}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={() => {
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          disabled={answeredCount === 0}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCircle2 className="h-4 w-4" /> Check Answers
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setSubmitted(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-(--border) px-6 py-3 text-sm font-semibold text-(--text-secondary) transition-colors hover:bg-(--bg-secondary)"
        >
          <RotateCcw className="h-4 w-4" /> Try Again
        </button>
      )}
    </div>
  );
}
