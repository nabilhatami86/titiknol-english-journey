import { History, X, Clock } from 'lucide-react';
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
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-(--bg-card) rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl border border-(--border)">
        <div className="flex items-center justify-between p-4 border-b border-(--border) shrink-0">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-primary" />
            <span className="font-bold text-(--text)">Writing History</span>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-(--hover) rounded-lg transition-colors">
            <X className="w-4 h-4 text-(--text-muted)" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-14 text-(--text-muted)">
              <Clock className="w-10 h-10 mx-auto mb-3 opacity-25" />
              <p className="text-sm font-medium">No history yet</p>
              <p className="text-xs mt-1">Checked writings will be saved here automatically.</p>
            </div>
          ) : (
            history.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onLoad(entry)}
                className="w-full text-left p-4 rounded-xl border border-(--border) hover:bg-(--hover) transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-(--text-muted) flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {entry.date}
                  </span>
                  <span className={`text-sm font-bold ${scoreColor(entry.feedback.overallScore)}`}>
                    {entry.feedback.overallScore}/100
                  </span>
                </div>
                <p className="text-sm text-(--text-secondary) line-clamp-2">{entry.text}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[entry.feedback.level.estimated] ?? levelColors.A1}`}>
                    {entry.feedback.level.estimated}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
