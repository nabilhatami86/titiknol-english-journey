import {
  GitBranch, CircleDot, Sparkles, Lightbulb, BookOpen, CheckCircle2,
} from 'lucide-react';
import type { WritingFeedback } from '@/types/writingPractice';

type Props = {
  sentenceAnalysis: WritingFeedback['sentenceAnalysis'];
  adverbialClause: WritingFeedback['adverbialClause'];
};

export function AnalysisTab({ sentenceAnalysis, adverbialClause }: Props) {
  if (!sentenceAnalysis) {
    return <p className="text-center text-sm text-(--text-muted) py-8">No analysis available.</p>;
  }

  return (
    <div className="space-y-4">

      <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4 flex items-start gap-3">
        <GitBranch className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-(--text-secondary) leading-relaxed">{sentenceAnalysis.summary}</p>
      </div>

      {/* Adverbial Clause block */}
      {adverbialClause && (
        <div className="border border-(--border) rounded-2xl overflow-hidden bg-(--bg-card)">
          <div className="px-4 py-3 bg-(--bg-secondary)/40 border-b border-(--border) flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm font-bold text-(--text)">Adverbial Clause</span>
            </div>
            {adverbialClause.found ? (
              <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">
                {adverbialClause.count} found
              </span>
            ) : (
              <span className="text-xs bg-(--bg-secondary) text-(--text-muted) px-2.5 py-1 rounded-full font-semibold">
                Not used
              </span>
            )}
          </div>
          <div className="p-4 space-y-3">
            <p className="text-sm text-(--text-secondary) leading-relaxed">{adverbialClause.summary}</p>
            {adverbialClause.clauses.length > 0 && (
              <div className="space-y-2">
                {adverbialClause.clauses.map((cl, ci) => (
                  <div key={ci} className={`rounded-xl border p-3 space-y-1.5 text-xs ${cl.isCorrect ? 'border-primary/20 bg-primary/5' : 'border-(--border) bg-(--bg-card)'}`}>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold font-mono text-[11px]">
                        {cl.connector}
                      </span>
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[11px] font-semibold">
                        {cl.clauseFunction}
                      </span>
                      {cl.isCorrect ? (
                        <span className="text-primary flex items-center gap-0.5 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3 h-3" /> Correct
                        </span>
                      ) : (
                        <span className="text-(--text-muted) flex items-center gap-0.5 font-semibold text-[11px]">✕ Incorrect</span>
                      )}
                    </div>
                    <p className="text-(--text) italic">&ldquo;{cl.text}&rdquo;</p>
                    {cl.issue && <p className="text-primary leading-snug">{cl.issue}</p>}
                    <p className="text-(--text-secondary) leading-snug flex items-start gap-1">
                      <Lightbulb className="w-3 h-3 shrink-0 text-primary mt-0.5" /> {cl.tip}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {adverbialClause.suggestions.length > 0 && (
              <div className="space-y-1.5 pt-1 border-t border-(--border)">
                <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Suggestions</p>
                {adverbialClause.suggestions.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-(--text-secondary)">
                    <span className="shrink-0 text-primary font-bold mt-0.5">→</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Per-sentence cards */}
      {sentenceAnalysis.sentences.map((s, idx) => (
        <div key={idx} className="border border-(--border) rounded-2xl overflow-hidden bg-(--bg-card)">
          <div className="px-4 py-3 bg-(--bg-secondary)/40 border-b border-(--border)">
            <span className="text-xs font-bold text-primary mr-2">#{idx + 1}</span>
            <span className="text-sm text-(--text) italic">&ldquo;{s.sentence}&rdquo;</span>
          </div>

          <div className="divide-y divide-(--border)">
            {/* Tense */}
            <div className="px-4 py-3 space-y-2">
              <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wider flex items-center gap-1.5">
                <CircleDot className="w-3 h-3 text-primary" /> Tense
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">
                  {s.tense.used}
                </span>
                {s.tense.isCorrect ? (
                  <span className="text-primary flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                  </span>
                ) : (
                  <>
                    <span className="text-(--text-muted)">→ seharusnya</span>
                    <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">
                      {s.tense.shouldBe}
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-(--text-secondary) leading-snug">{s.tense.explanation}</p>
            </div>

            {/* Voice */}
            <div className="px-4 py-3 space-y-2">
              <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-primary" /> Voice (Aktif / Pasif)
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">
                  {s.voice.type}
                </span>
                {s.voice.isAppropriate
                  ? <span className="text-primary flex items-center gap-1 font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Tepat</span>
                  : <span className="text-(--text-muted) font-semibold text-[11px]">{s.voice.suggestion}</span>
                }
              </div>
              {s.voice.converted && (
                <div className="bg-(--bg-secondary) rounded-lg p-2.5 text-xs space-y-1">
                  <p className="text-(--text-muted) text-[11px]">Versi {s.voice.type === 'Active' ? 'Pasif' : 'Aktif'}:</p>
                  <p className="text-(--text) italic">&ldquo;{s.voice.converted}&rdquo;</p>
                </div>
              )}
            </div>

            {/* Structure */}
            <div className="px-4 py-3 space-y-2">
              <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wider flex items-center gap-1.5">
                <GitBranch className="w-3 h-3 text-primary" /> Structure
              </p>
              <span className="inline-block text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">
                {s.structure.sentenceType}
              </span>
              {s.structure.clauses.length > 0 && (
                <div className="space-y-1.5 mt-1">
                  {s.structure.clauses.map((cl, ci) => (
                    <div key={ci} className="bg-(--bg-secondary) rounded-lg p-2.5 text-[11px] space-y-0.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {cl.connector && (
                          <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold">
                            {cl.connector}
                          </span>
                        )}
                        <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-semibold">{cl.type}</span>
                      </div>
                      <p className="text-(--text) italic">&ldquo;{cl.text}&rdquo;</p>
                      <div className="flex flex-wrap gap-1.5 text-[10px] text-(--text-muted)">
                        <span>S: <span className="text-(--text)">{cl.subject}</span></span>
                        <span>P: <span className="text-(--text)">{cl.predicate}</span></span>
                        {cl.object && <span>O: <span className="text-(--text)">{cl.object}</span></span>}
                      </div>
                      {cl.note && <p className="text-(--text-secondary)">{cl.note}</p>}
                    </div>
                  ))}
                </div>
              )}
              {s.structure.phrases.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {s.structure.phrases.map((ph, pi) => (
                    <div key={pi} className="bg-(--bg-secondary) border border-(--border) rounded-lg px-2.5 py-1.5 text-[11px]">
                      <span className="font-semibold text-(--text)">{ph.text}</span>
                      <span className="text-(--text-muted) mx-1">·</span>
                      <span className="text-primary">{ph.type}</span>
                      <span className="text-(--text-muted) ml-1">({ph.function})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reduction */}
            <div className="px-4 py-3 space-y-2">
              <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-3 h-3 text-primary" /> Reduction / Omitting
              </p>
              {s.reduction.possible ? (
                <div className="space-y-1.5 text-xs">
                  <span className="inline-block bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold text-[11px]">
                    {s.reduction.type}
                  </span>
                  <div className="space-y-1 bg-(--bg-secondary) rounded-lg p-2.5">
                    <div className="flex flex-wrap items-start gap-1.5">
                      <span className="text-primary/50 line-through">{s.reduction.original}</span>
                      <span className="text-(--text-muted)">→</span>
                      <span className="text-(--text) font-semibold">{s.reduction.reduced}</span>
                    </div>
                  </div>
                  <p className="text-(--text-secondary) leading-snug">{s.reduction.explanation}</p>
                </div>
              ) : (
                <p className="text-xs text-(--text-muted) italic">Tidak ada reduction yang natural untuk kalimat ini.</p>
              )}
            </div>

            {/* Word Classes */}
            {s.wordClasses.length > 0 && (
              <div className="px-4 py-3 space-y-2">
                <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-primary" /> Kelas Kata (Word Classes)
                </p>
                <div className="space-y-1.5">
                  {s.wordClasses.map((wc, wi) => (
                    <div key={wi} className="flex flex-wrap items-baseline gap-1.5 text-xs">
                      <span className="font-mono font-bold text-(--text) bg-(--bg-secondary) px-2 py-0.5 rounded">{wc.word}</span>
                      <span className="text-(--text-muted)">→</span>
                      <span className="text-primary font-semibold">{wc.class}</span>
                      {wc.subclass && <span className="text-(--text-muted) text-[11px]">({wc.subclass})</span>}
                      <span className="text-(--text-muted)">·</span>
                      <span className="text-(--text-secondary) text-[11px]">{wc.function}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
