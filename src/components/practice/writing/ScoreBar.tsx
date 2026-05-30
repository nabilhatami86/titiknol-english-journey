'use client';

import { useState, type ElementType, type ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { scoreColor, scoreBg } from './utils';

export function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-3 flex-1">
      <span className={`text-sm font-bold min-w-[2.5rem] text-right ${scoreColor(score)}`}>{score}</span>
      <div className="flex-1 h-2 bg-(--bg-secondary) rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${scoreBg(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function Section({
  title,
  icon: Icon,
  score,
  feedback,
  children,
}: {
  title: string;
  icon: ElementType;
  score?: number;
  feedback: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-(--border) rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-(--hover) transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="font-semibold text-(--text) text-sm">{title}</span>
        </div>
        <div className="flex items-center gap-2 ml-2 shrink-0">
          {score !== undefined && (
            <span className={`text-xs font-bold ${scoreColor(score)}`}>{score}/100</span>
          )}
          {open
            ? <ChevronUp className="w-3.5 h-3.5 text-(--text-muted)" />
            : <ChevronDown className="w-3.5 h-3.5 text-(--text-muted)" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-2 space-y-3 border-t border-(--border) bg-(--bg-secondary)/20">
          <p className="text-sm text-(--text-secondary) leading-relaxed">{feedback}</p>
          {children}
        </div>
      )}
    </div>
  );
}
