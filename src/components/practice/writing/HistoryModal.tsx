import { History, X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WritingHistoryEntry } from '@/types/writingPractice';
import { scoreColor, levelColors } from './utils';

interface Props {
  history: WritingHistoryEntry[];
  onClose: () => void;
  onLoad: (entry: WritingHistoryEntry) => void;
}

export function HistoryModal({ history, onClose, onLoad }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-(--bg-card)/95 backdrop-blur-md rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl border border-primary/20">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-(--border) shrink-0 bg-linear-to-r from-primary/6 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <History className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-bold text-(--text)">Writing History</span>
            {history.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">
                {history.length}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-(--hover) rounded-lg transition-colors">
            <X className="w-4 h-4 text-(--text-muted)" />
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 p-4 space-y-2.5">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 gap-2.5">
              <div className="w-12 h-12 rounded-full bg-(--bg-secondary) flex items-center justify-center">
                <Clock className="w-6 h-6 text-(--text-muted) opacity-40" />
              </div>
              <p className="text-sm font-semibold text-(--text-muted)">No history yet</p>
              <p className="text-xs text-(--text-muted) text-center max-w-50">
                Checked writings will be saved here automatically.
              </p>
            </div>
          ) : (
            history.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onLoad(entry)}
                className="w-full text-left p-4 rounded-2xl border border-(--border) hover:border-primary/30 hover:bg-(--hover) transition-all space-y-2.5 group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-(--text-muted) flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {entry.date}
                  </span>
                  <span className={cn('text-2xl font-black leading-none', scoreColor(entry.feedback.overallScore))}>
                    {entry.feedback.overallScore}
                    <span className="text-xs font-normal text-(--text-muted)">/100</span>
                  </span>
                </div>
                <p className="text-sm text-(--text-secondary) line-clamp-2 leading-relaxed">
                  {entry.text}
                </p>
                <span className={cn(
                  'inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border border-primary/20',
                  levelColors[entry.feedback.level.estimated] ?? levelColors.A1,
                )}>
                  {entry.feedback.level.estimated}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
