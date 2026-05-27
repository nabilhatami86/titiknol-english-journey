// Reusable feedback blocks shared across IELTS Writing, Letter Review, etc.

// ── Correction list (grammar / structure corrections) ─────────────────────────

interface CorrectionItem {
  original: string;
  corrected: string;
  explanation: string;
}

export function CorrectionList({ items, feedback }: { items: CorrectionItem[]; feedback?: string }) {
  return (
    <div className="space-y-3">
      {feedback && <p className="text-xs text-(--text-secondary)">{feedback}</p>}
      {items.map((c, i) => (
        <div key={i} className="rounded-lg bg-(--bg-secondary) p-3 space-y-1 text-xs">
          <p className="text-(--text-muted) line-through">"{c.original}"</p>
          <p className="text-primary font-semibold">→ "{c.corrected}"</p>
          <p className="text-(--text-muted)">{c.explanation}</p>
        </div>
      ))}
    </div>
  );
}

// ── Vocabulary enhancements ───────────────────────────────────────────────────

interface VocabItem {
  used: string;
  better: string;
  reason: string;
}

export function VocabList({ items, feedback }: { items: VocabItem[]; feedback?: string }) {
  return (
    <div className="space-y-3">
      {feedback && <p className="text-xs text-(--text-secondary)">{feedback}</p>}
      {items.map((v, i) => (
        <div key={i} className="flex items-start gap-2 text-xs rounded-lg bg-(--bg-secondary) px-3 py-2">
          <span className="text-(--text-muted) line-through shrink-0">"{v.used}"</span>
          <span className="text-(--text-muted) shrink-0">→</span>
          <span className="font-semibold text-primary shrink-0">"{v.better}"</span>
          <span className="text-(--text-muted) flex-1">{v.reason}</span>
        </div>
      ))}
    </div>
  );
}

// ── Tone / flagged phrases ────────────────────────────────────────────────────

interface FlaggedPhrase {
  phrase: string;
  suggestion: string;
  reason: string;
}

export function FlaggedPhraseList({ items, feedback }: { items: FlaggedPhrase[]; feedback?: string }) {
  return (
    <div className="space-y-3">
      {feedback && <p className="text-xs text-(--text-secondary)">{feedback}</p>}
      {items.map((f, i) => (
        <div key={i} className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-xs space-y-1">
          <p className="font-semibold text-primary">"{f.phrase}"</p>
          <p className="text-(--text)">
            → Lebih baik: <span className="font-semibold text-primary">"{f.suggestion}"</span>
          </p>
          <p className="text-(--text-muted)">{f.reason}</p>
        </div>
      ))}
    </div>
  );
}

// ── Score badge (small colored number next to a label) ───────────────────────

export function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80 ? 'text-primary' :
    score >= 60 ? 'text-(--text)' :
    'text-(--text-muted)';
  return (
    <span className={`text-xs font-bold ml-1 ${color}`}>{score}/100</span>
  );
}
