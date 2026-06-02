"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp, MessageCircle, BookOpen, UtensilsCrossed, GraduationCap, ShoppingBag, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  conversations,
  situationMeta,
  type ConversationSituation,
} from "@/data/conversations";

type Filter = "all" | ConversationSituation;

const filters: { value: Filter; label: string; icon: React.ElementType }[] = [
  { value: "all", label: "Semua", icon: MessageCircle },
  { value: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  { value: "school", label: "School", icon: GraduationCap },
  { value: "shopping", label: "Shopping", icon: ShoppingBag },
  { value: "hospital", label: "Hospital", icon: Stethoscope },
];

const difficultyLabel: Record<string, string> = {
  basic: "Basic",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const difficultyColor: Record<string, string> = {
  basic: "bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary",
  intermediate: "bg-primary/10 text-primary dark:bg-primary/10 dark:text-primary",
  advanced: "bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary",
};

// Alternate sides: even index = left (A), odd index = right (B)
const bubbleColors = [
  "bg-primary/10 text-(--text) border border-primary/20",
  "bg-(--bg-secondary) text-(--text) border border-(--border)",
];

export default function ConversationsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState<Record<string, boolean>>({});

  const filtered =
    activeFilter === "all"
      ? conversations
      : conversations.filter((c) => c.situation === activeFilter);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const toggleTranslation = (id: string) => {
    setShowTranslation((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/practice"
          className="p-2 rounded-lg hover:bg-(--bg-secondary) transition-colors text-(--text-secondary)"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-primary" />
            Daily Conversations
          </h1>
          <p className="text-sm text-(--text-secondary) mt-0.5">
            Pelajari percakapan sehari-hari di berbagai situasi
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-3">
        {(Object.keys(situationMeta) as ConversationSituation[]).map((key) => {
          const meta = situationMeta[key];
          const count = conversations.filter((c) => c.situation === key).length;
          return (
            <div
              key={key}
              className="flex items-center gap-2 bg-(--bg-card) border border-(--border) rounded-lg px-3 py-2 text-sm"
            >
              <meta.icon className="w-4 h-4 text-(--text-secondary)" />
              <span className="text-(--text-secondary)">{meta.label}</span>
              <span className="font-semibold text-(--text)">{count} dialog</span>
            </div>
          );
        })}
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border",
              activeFilter === f.value
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-(--bg-card) text-(--text-secondary) border-(--border) hover:border-primary/40 hover:text-(--text)"
            )}
          >
            <f.icon className="w-4 h-4" />
            {f.label}
          </button>
        ))}
      </div>

      {/* Conversation cards */}
      <div className="space-y-4">
        {filtered.map((conv) => {
          const meta = situationMeta[conv.situation];
          const isOpen = expandedId === conv.id;
          const showTr = showTranslation[conv.id] ?? false;

          return (
            <div
              key={conv.id}
              className="bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden transition-all hover:shadow-md"
            >
              {/* Card header — clickable to expand */}
              <button
                className="w-full text-left p-5 flex items-start justify-between gap-4"
                onClick={() => toggleExpand(conv.id)}
              >
                <div className="flex items-start gap-4 min-w-0">
                  {/* Situation icon badge */}
                  <div
                    className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                      meta.color.replace("bg-", "bg-") + "/15"
                    )}
                  >
                    <meta.icon className="w-5 h-5 text-(--text-secondary)" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-base font-semibold text-(--text)">
                        {conv.title}
                      </h2>
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full",
                          difficultyColor[conv.difficulty]
                        )}
                      >
                        {difficultyLabel[conv.difficulty]}
                      </span>
                    </div>
                    <p className="text-sm text-(--text-secondary) mt-0.5">
                      {conv.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-(--text-secondary)">
                        {meta.label}
                      </span>
                      <span className="text-(--text-secondary) text-xs">·</span>
                      <span className="text-xs text-(--text-secondary)">
                        {conv.dialogue.length} baris dialog
                      </span>
                      <span className="text-(--text-secondary) text-xs">·</span>
                      <span className="text-xs text-(--text-secondary)">
                        {conv.keyExpressions.length} key expressions
                      </span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 text-(--text-secondary) mt-1">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div className="border-t border-(--border) px-5 pb-5 pt-4 space-y-5">
                  {/* Translation toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-(--text-secondary)">
                      Dialog Percakapan
                    </span>
                    <button
                      onClick={() => toggleTranslation(conv.id)}
                      className={cn(
                        "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all",
                        showTr
                          ? "bg-primary/10 text-primary border-primary/30"
                          : "bg-(--bg-secondary) text-(--text-secondary) border-(--border) hover:border-primary/30"
                      )}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      {showTr ? "Sembunyikan Terjemahan" : "Tampilkan Terjemahan"}
                    </button>
                  </div>

                  {/* Dialogue bubbles */}
                  <div className="space-y-3">
                    {conv.dialogue.map((line, i) => {
                      const isLeft = i % 2 === 0;
                      return (
                        <div
                          key={i}
                          className={cn(
                            "flex flex-col max-w-[85%]",
                            isLeft ? "items-start self-start" : "items-end self-end ml-auto"
                          )}
                        >
                          {/* Speaker label */}
                          <span className="text-xs font-semibold text-(--text-secondary) mb-1 px-1">
                            {line.speaker}
                            <span className="font-normal"> · {line.role}</span>
                          </span>
                          {/* Bubble */}
                          <div
                            className={cn(
                              "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                              isLeft
                                ? "rounded-tl-sm " + bubbleColors[0]
                                : "rounded-tr-sm " + bubbleColors[1]
                            )}
                          >
                            <p className="font-medium">{line.text}</p>
                            {showTr && (
                              <p className="text-(--text-secondary) text-xs mt-1.5 italic border-t border-current/10 pt-1.5">
                                {line.translation}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Key expressions */}
                  <div className="mt-2">
                    <h3 className="text-sm font-semibold text-(--text) mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 rounded-full bg-primary inline-block" />
                      Key Expressions
                    </h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {conv.keyExpressions.map((expr, i) => (
                        <div
                          key={i}
                          className="flex flex-col gap-0.5 bg-(--bg-secondary) rounded-lg px-3 py-2.5 border border-(--border)"
                        >
                          <span className="text-sm font-semibold text-primary">
                            &ldquo;{expr.phrase}&rdquo;
                          </span>
                          <span className="text-xs text-(--text-secondary)">
                            {expr.meaning}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-(--text-secondary)">
          <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Tidak ada percakapan ditemukan.</p>
        </div>
      )}
    </div>
  );
}
