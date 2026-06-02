"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BookOpen, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { grammarTopics, type POS, type GrammarBlock } from "@/data/grammarGuide";

// ── Warna per POS ──────────────────────────────────────────────
const POS_STYLE: Record<POS, { pill: string; panel: string; label: string }> = {
  noun:        { pill: "bg-primary/10 text-primary dark:bg-primary dark:text-primary",          panel: "bg-primary/10 border-primary/30 text-primary dark:bg-primary/40 dark:border-primary/50 dark:text-primary",          label: "Noun" },
  verb:        { pill: "bg-primary/10 text-primary dark:bg-primary dark:text-primary",        panel: "bg-primary/10 border-primary/30 text-primary dark:bg-primary/40 dark:border-primary/50 dark:text-primary",        label: "Verb" },
  modal:       { pill: "bg-primary/10 text-primary dark:bg-primary dark:text-primary",    panel: "bg-primary/10 border-primary/30 text-primary dark:bg-primary/40 dark:border-primary/50 dark:text-primary",    label: "Modal Verb" },
  adjective:   { pill: "bg-primary/10 text-primary dark:bg-primary dark:text-primary",    panel: "bg-primary/10 border-primary/30 text-primary dark:bg-primary/40 dark:border-primary/50 dark:text-primary",    label: "Adjective" },
  adverb:      { pill: "bg-primary/10 text-primary dark:bg-primary dark:text-primary",    panel: "bg-primary/10 border-primary/30 text-primary dark:bg-primary/40 dark:border-primary/50 dark:text-primary",    label: "Adverb" },
  pronoun:     { pill: "bg-primary/10 text-primary dark:bg-primary dark:text-primary",            panel: "bg-primary/10 border-primary/30 text-primary dark:bg-primary/40 dark:border-primary/50 dark:text-primary",              label: "Pronoun" },
  article:     { pill: "bg-primary/10 text-primary dark:bg-primary dark:text-primary",        panel: "bg-primary/10 border-primary/30 text-primary dark:bg-primary/60 dark:border-primary/50 dark:text-primary",        label: "Article" },
  quantifier:  { pill: "bg-primary/10 text-primary dark:bg-primary dark:text-primary",            panel: "bg-primary/10 border-primary/30 text-primary dark:bg-primary/40 dark:border-primary/50 dark:text-primary",              label: "Quantifier" },
  preposition: { pill: "bg-primary/10 text-primary dark:bg-primary dark:text-primary",            panel: "bg-primary/10 border-primary/30 text-primary dark:bg-primary/40 dark:border-primary/50 dark:text-primary",              label: "Preposition" },
  conjunction: { pill: "bg-primary/10 text-primary dark:bg-primary dark:text-primary",        panel: "bg-primary/10 border-primary/30 text-primary dark:bg-primary/40 dark:border-primary/50 dark:text-primary",        label: "Conjunction" },
  possessive:  { pill: "bg-primary/10 text-primary dark:bg-primary dark:text-primary",            panel: "bg-primary/10 border-primary/30 text-primary dark:bg-primary/40 dark:border-primary/50 dark:text-primary",              label: "Possessive" },
  none:        { pill: "", panel: "", label: "" },
};

type ActiveWord = { sentenceIdx: number; wordIdx: number };

// ── Helper: highlight kata dalam kalimat ──────────────────────
function HighlightedSentence({ sentence, highlight }: { sentence: string; highlight?: string }) {
  if (!highlight || !sentence.includes(highlight)) {
    return <span>{sentence}</span>;
  }
  const idx = sentence.indexOf(highlight);
  return (
    <>
      <span>{sentence.slice(0, idx)}</span>
      <span className="font-bold text-primary underline underline-offset-2 decoration-2">
        {highlight}
      </span>
      <span>{sentence.slice(idx + highlight.length)}</span>
    </>
  );
}

// ── Render satu block konten ───────────────────────────────────
function RenderBlock({ block }: { block: GrammarBlock }) {
  switch (block.type) {
    case "text":
      return (
        <p className="text-sm text-(--text-secondary) leading-relaxed">
          {block.value}
        </p>
      );

    case "bullets":
      return (
        <div className="space-y-1">
          {block.title && (
            <p className="text-sm font-medium text-(--text)">{block.title}</p>
          )}
          <ul className="space-y-1 pl-1">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-(--text-secondary) leading-relaxed">
                <span className="text-primary font-bold shrink-0 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "example":
      return (
        <div className="rounded-xl border border-(--border) overflow-hidden">
          <div className="bg-(--bg-secondary) px-4 py-3">
            <p className="text-sm font-semibold text-(--text) font-mono">
              <HighlightedSentence sentence={block.sentence} highlight={block.highlight} />
            </p>
          </div>
          <div className="px-4 py-3 bg-(--bg-card)">
            <p className="text-xs text-(--text-secondary) leading-relaxed">
              <span className="font-semibold text-(--text)">Kenapa? </span>
              {block.note}
            </p>
          </div>
        </div>
      );

    case "wrongright":
      return (
        <div className="space-y-1.5">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-primary/5 border border-primary/20 px-3 py-2">
              <p className="text-xs font-bold text-primary/60 mb-1">Salah</p>
              <p className="text-sm text-(--text) font-mono line-through opacity-60">{block.wrong}</p>
            </div>
            <div className="rounded-lg bg-primary/10 border border-primary/30 px-3 py-2">
              <p className="text-xs font-bold text-primary mb-1">Benar</p>
              <p className="text-sm text-primary font-mono font-semibold">{block.right}</p>
            </div>
          </div>
          {block.note && (
            <p className="text-xs text-(--text-secondary) leading-relaxed px-1">{block.note}</p>
          )}
        </div>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-(--border)">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-(--bg-secondary) border-b border-(--border)">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-3 py-2 text-left text-xs font-semibold text-(--text) uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className={cn(
                    "border-b border-(--border) last:border-0",
                    ri % 2 === 0 ? "bg-(--bg-card)" : "bg-(--bg-secondary)/50"
                  )}
                >
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-(--text-secondary) font-mono text-xs leading-relaxed">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}

// ── Halaman utama ─────────────────────────────────────────────
export default function GrammarTopicPage() {
  const params = useParams();
  const topic = grammarTopics.find((t) => t.id === params.topic);
  const [active, setActive] = useState<ActiveWord | null>(null);

  if (!topic) {
    return (
      <div className="p-6 text-center text-(--text-secondary)">
        <p>Topik tidak ditemukan.</p>
        <Link href="/grammar-guide" className="text-primary underline mt-2 inline-block">
          Kembali ke Grammar Guide
        </Link>
      </div>
    );
  }

  const handleWordClick = (sIdx: number, wIdx: number, pos: POS) => {
    if (pos === "none") return;
    if (active?.sentenceIdx === sIdx && active?.wordIdx === wIdx) {
      setActive(null);
    } else {
      setActive({ sentenceIdx: sIdx, wordIdx: wIdx });
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">

      {/* Back + Title */}
      <div className="flex items-center gap-3">
        <Link
          href="/grammar-guide"
          className="p-2 rounded-lg hover:bg-(--bg-secondary) transition-colors text-(--text-secondary)"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <topic.icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-(--text)">{topic.title}</h1>
            <p className="text-sm text-(--text-secondary)">{topic.shortDefinition}</p>
          </div>
        </div>
      </div>

      {/* Sections — Reference Guide */}
      <div className="space-y-4">
        {topic.sections.map((section) => (
          <section
            key={section.letter}
            className="bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden"
          >
            {/* Section header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-(--border) bg-(--bg-secondary)/60">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                {section.letter}
              </span>
              <h2 className="font-semibold text-(--text) text-sm">{section.title}</h2>
            </div>

            {/* Section content */}
            <div className="px-5 py-4 space-y-4">
              {section.blocks.map((block, i) => (
                <RenderBlock key={i} block={block} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Annotated sentences — interactive practice */}
      {topic.sentences.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="font-semibold text-(--text) flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Contoh Kalimat Interaktif
            </h2>
            <p className="text-xs text-(--text-secondary) mt-1">
              Klik kata yang berwarna untuk lihat penjelasannya.
            </p>
          </div>

          <div className="space-y-4">
            {topic.sentences.map((sentence, sIdx) => {
              const activeWord =
                active?.sentenceIdx === sIdx ? sentence.words[active.wordIdx] : null;
              const activeStyle = activeWord ? POS_STYLE[activeWord.pos] : null;

              return (
                <div
                  key={sIdx}
                  className="bg-(--bg-card) border border-(--border) rounded-xl p-5 space-y-4"
                >
                  {/* Words */}
                  <div className="flex flex-wrap gap-2 items-center">
                    {sentence.words.map((w, wIdx) => {
                      const isActive =
                        active?.sentenceIdx === sIdx && active?.wordIdx === wIdx;
                      const style = POS_STYLE[w.pos];
                      const isClickable = w.pos !== "none";

                      return (
                        <button
                          key={wIdx}
                          onClick={() => handleWordClick(sIdx, wIdx, w.pos)}
                          disabled={!isClickable}
                          className={cn(
                            "px-2.5 py-1 rounded-lg text-sm font-semibold transition-all select-none",
                            isClickable
                              ? cn(
                                  style.pill,
                                  "cursor-pointer hover:scale-105 hover:shadow-sm active:scale-95",
                                  isActive &&
                                    "ring-2 ring-offset-2 ring-current scale-105 shadow-md"
                                )
                              : "text-(--text) font-normal cursor-default px-1"
                          )}
                        >
                          {w.word}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation panel */}
                  {activeWord && activeStyle && (
                    <div
                      className={cn(
                        "rounded-xl border p-4 space-y-1.5 transition-all",
                        activeStyle.panel
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                            {activeStyle.label}
                          </span>
                          <span className="font-bold text-base">
                            &ldquo;{activeWord.word}&rdquo;
                          </span>
                        </div>
                        <button
                          onClick={() => setActive(null)}
                          className="text-current opacity-50 hover:opacity-100 text-lg leading-none"
                          aria-label="Tutup"
                        >
                          ×
                        </button>
                      </div>
                      <p className="text-sm leading-relaxed opacity-90">
                        {activeWord.reason}
                      </p>
                    </div>
                  )}

                  {/* Translation */}
                  <p className="text-sm text-(--text-secondary) italic border-t border-(--border) pt-3">
                    <Globe2 className="w-3.5 h-3.5 text-primary/60 inline mr-1 shrink-0" />{sentence.translation}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Navigation to other topics */}
      <section className="space-y-3">
        <h2 className="font-semibold text-(--text)">Topik Lainnya</h2>
        <div className="flex flex-wrap gap-2">
          {grammarTopics
            .filter((t) => t.id !== topic.id)
            .map((t) => (
              <Link
                key={t.id}
                href={`/grammar-guide/${t.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-(--bg-card) border border-(--border) text-sm text-(--text-secondary) hover:border-primary/40 hover:text-(--text) transition-all"
              >
                <t.icon className="w-3.5 h-3.5" />
                {t.title.split(" ")[0]}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
