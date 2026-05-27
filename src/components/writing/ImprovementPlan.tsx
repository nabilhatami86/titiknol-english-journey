'use client';

import { useState } from 'react';
import { TrendingUp, Target, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IeltsResult } from '@/types/ielts-writing';
import type { TaskType } from '@/app/api/ielts-writing/route';

const PRIORITY_STYLES = [
  {
    label: 'Prioritas Utama',
    border: 'border-l-primary',
    header: 'bg-primary/8',
    badge: 'bg-primary/15 text-primary',
    dot: 'bg-primary',
    num: 'bg-primary/20 text-primary',
    text: 'text-(--text)',
    sub: 'text-primary',
  },
  {
    label: 'Perlu Diperbaiki',
    border: 'border-l-primary/60',
    header: 'bg-primary/5',
    badge: 'bg-primary/10 text-primary/80',
    dot: 'bg-primary/70',
    num: 'bg-primary/15 text-primary',
    text: 'text-(--text)',
    sub: 'text-primary/80',
  },
  {
    label: 'Perlu Latihan',
    border: 'border-l-primary/30',
    header: 'bg-(--bg-secondary)',
    badge: 'bg-(--bg-secondary) text-(--text-secondary) border border-(--border)',
    dot: 'bg-primary/40',
    num: 'bg-(--bg-secondary) text-(--text-muted)',
    text: 'text-(--text-secondary)',
    sub: 'text-(--text-secondary)',
  },
  {
    label: 'Sudah Bagus',
    border: 'border-l-primary/20',
    header: 'bg-(--bg-secondary)',
    badge: 'bg-(--bg-secondary) text-(--text-muted) border border-(--border)',
    dot: 'bg-primary/20',
    num: 'bg-(--bg-secondary) text-(--text-muted)',
    text: 'text-(--text-muted)',
    sub: 'text-(--text-muted)',
  },
];

interface Props {
  result: IeltsResult;
  taskType: TaskType;
}

export function ImprovementPlan({ result, taskType }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const criteria = [
    {
      key: 'task',
      label: taskType === 'task1' ? 'Task Achievement' : 'Task Response',
      band: result.taskBand,
      improvement: result.taskImprovement,
    },
    {
      key: 'coherence',
      label: 'Coherence & Cohesion',
      band: result.coherenceBand,
      improvement: result.coherenceImprovement,
    },
    {
      key: 'lexical',
      label: 'Lexical Resource',
      band: result.lexicalBand,
      improvement: result.lexicalImprovement,
    },
    {
      key: 'grammar',
      label: 'Grammatical Range & Accuracy',
      band: result.grammarBand,
      improvement: result.grammarImprovement,
    },
  ].sort((a, b) => a.band - b.band);

  const weakest = criteria[0];

  return (
    <div className="bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden">
      <div className="flex items-center gap-2.5 p-4 border-b border-(--border)">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <TrendingUp className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-(--text)">Rencana Peningkatan Band Score</h3>
          <p className="text-xs text-(--text-muted)">
            Fokus utama: <span className="font-semibold text-primary">{weakest.label}</span> — Band {weakest.band} (terendah)
          </p>
        </div>
      </div>

      <div className="divide-y divide-(--border)">
        {criteria.map((c, i) => {
          if (!c.improvement?.steps?.length) return null;
          const s = PRIORITY_STYLES[i];
          const isOpen = expanded === c.key;

          return (
            <div key={c.key} className={cn('border-l-4', s.border)}>
              <button
                onClick={() => setExpanded(isOpen ? null : c.key)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-(--bg-secondary) transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className={cn('w-2 h-2 rounded-full shrink-0', s.dot)} />
                  <span className="text-sm font-semibold text-(--text) truncate">{c.label}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', s.badge)}>
                    {s.label}
                  </span>
                  <span className="text-xs font-semibold text-(--text-muted) whitespace-nowrap">
                    {c.band} → {c.improvement.targetBand}
                  </span>
                  {isOpen
                    ? <ChevronUp className="w-3.5 h-3.5 text-(--text-muted)" />
                    : <ChevronDown className="w-3.5 h-3.5 text-(--text-muted)" />
                  }
                </div>
              </button>

              {isOpen && (
                <div className={cn('px-4 pb-4 pt-1', s.header)}>
                  <p className={cn('text-xs font-semibold mb-2 flex items-center gap-1', s.sub)}>
                    <Target className="w-3 h-3" />
                    Langkah menuju Band {c.improvement.targetBand}:
                  </p>
                  <ul className="space-y-2">
                    {c.improvement.steps.map((step, j) => (
                      <li key={j} className={cn('text-xs flex items-start gap-2', s.text)}>
                        <span className={cn('shrink-0 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center mt-0.5', s.num)}>
                          {j + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-4 py-3 bg-(--bg-secondary) border-t border-(--border)">
        <p className="text-xs text-(--text-muted) flex items-start gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
          Klik setiap kriteria untuk melihat langkah spesifik. Prioritas Utama = paling menentukan kenaikan band.
        </p>
      </div>
    </div>
  );
}
