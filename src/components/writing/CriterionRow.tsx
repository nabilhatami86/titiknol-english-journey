import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ImprovementTips } from '@/types/ielts-writing';

function bandLabel(b: number) {
  if (b >= 9) return 'Expert';
  if (b >= 8) return 'Very Good';
  if (b >= 7) return 'Good';
  if (b >= 6) return 'Competent';
  if (b >= 5) return 'Modest';
  if (b >= 4) return 'Limited';
  return 'Very Limited';
}

function bandColor(b: number) {
  if (b >= 7) return 'text-primary';
  if (b >= 5.5) return 'text-(--text)';
  return 'text-(--text-muted)';
}

function bandBarColor(b: number) {
  if (b >= 7) return 'bg-primary';
  if (b >= 5.5) return 'bg-primary/50';
  return 'bg-primary/25';
}

interface CriterionRowProps {
  label: string;
  band: number;
  feedback: string;
  improvement?: ImprovementTips;
  open: boolean;
  onToggle: () => void;
}

export function CriterionRow({ label, band, feedback, improvement, open, onToggle }: CriterionRowProps) {
  return (
    <div className="rounded-xl border border-(--border) bg-(--bg-card) p-4">
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-sm font-semibold text-(--text) shrink-0">{label}</span>
          <div className="flex-1 h-2 bg-(--bg-secondary) rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all', bandBarColor(band))}
              style={{ width: `${((band / 9) * 100).toFixed(0)}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right">
            <span className={cn('text-lg font-bold', bandColor(band))}>{band}</span>
            <span className={cn('text-[10px] block font-medium', bandColor(band))}>{bandLabel(band)}</span>
          </div>
          {open
            ? <ChevronUp className="w-4 h-4 text-(--text-muted)" />
            : <ChevronDown className="w-4 h-4 text-(--text-muted)" />
          }
        </div>
      </button>

      {open && (
        <div className="mt-3 border-t border-(--border) pt-3 space-y-3">
          <p className="text-sm text-(--text-secondary) leading-relaxed">{feedback}</p>
          {improvement?.steps?.length && band < 9 && (
            <div className="bg-(--bg-secondary) rounded-lg p-3 space-y-2">
              <p className="text-xs font-semibold text-primary flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                Cara naik ke Band {improvement.targetBand}:
              </p>
              <ul className="space-y-1.5">
                {improvement.steps.map((step, i) => (
                  <li key={i} className="text-xs text-(--text-secondary) flex items-start gap-2">
                    <span className="shrink-0 w-4 h-4 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
