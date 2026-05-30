import { BookOpen, Layers, Target, Sparkles, Star } from 'lucide-react';
import type { WritingFeedback } from '@/types/writingPractice';
import { Section } from '../ScoreBar';
import { levelColors } from '../utils';

export function FeedbackTab({ feedback }: { feedback: WritingFeedback }) {
  return (
    <div className="space-y-3">

      <Section title="Grammar" icon={BookOpen} score={feedback.grammar.score} feedback={feedback.grammar.feedback}>
        {feedback.grammar.corrections.length > 0 && (
          <div className="space-y-2 mt-1">
            {feedback.grammar.corrections.map((c, i) => (
              <div key={i} className="bg-(--bg-card) border border-(--border) rounded-lg p-3 text-xs space-y-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-primary/60 line-through">{c.original}</span>
                  <span className="text-(--text-muted)">→</span>
                  <span className="text-(--text) font-semibold">{c.corrected}</span>
                </div>
                <p className="text-(--text-muted) leading-snug">{c.explanation}</p>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Vocabulary" icon={Layers} score={feedback.vocabulary.score} feedback={feedback.vocabulary.feedback}>
        {feedback.vocabulary.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {feedback.vocabulary.suggestions.map((s, i) => (
              <span key={i} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">{s}</span>
            ))}
          </div>
        )}

        {feedback.vocabulary.wordEnhancements?.length > 0 && (
          <div className="mt-3 space-y-3">
            <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Upgrade Vocabulary Kamu</p>
            {feedback.vocabulary.wordEnhancements.map((w, i) => (
              <div key={i} className="border border-(--border) rounded-2xl overflow-hidden bg-(--bg-card)">
                <div className="px-4 py-3 bg-(--bg-secondary)/40 border-b border-(--border) space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-(--text) text-sm">{w.wordUsed}</span>
                    <span className="text-[11px] bg-(--bg-secondary) border border-(--border) text-(--text-muted) px-2 py-0.5 rounded-full">
                      {w.wordClass}
                    </span>
                    <span className="text-xs text-(--text-muted) min-w-0 break-words">— {w.meaning}</span>
                  </div>
                  <p className="text-[11px] text-(--text-muted) italic">Biasa dipakai: {w.typicalUsage}</p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-(--text-muted)">Terbaik untuk konteks ini:</span>
                    <span className="bg-primary text-white text-xs font-bold px-2.5 py-0.5 rounded-full">{w.bestAlternative}</span>
                    <span className="text-[11px] text-(--text-muted) min-w-0 break-words">— {w.bestAlternativeReason}</span>
                  </div>
                </div>

                <div className="divide-y divide-(--border)">
                  {w.synonyms.map((s, j) => (
                    <div key={j} className={`px-4 py-3 text-xs space-y-1.5 ${s.word === w.bestAlternative ? 'bg-primary/5' : ''}`}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`font-bold text-sm ${s.word === w.bestAlternative ? 'text-primary' : 'text-(--text)'}`}>
                          {s.word}
                          {s.word === w.bestAlternative && (
                            <span className="ml-1.5 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full font-semibold">Best</span>
                          )}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-primary/10 text-primary">
                          {s.formality}
                        </span>
                      </div>
                      <p className="text-(--text-secondary) leading-snug">{s.meaning}</p>
                      <p className="text-[11px] text-(--text-muted) flex items-start gap-1">
                        <span className="shrink-0 mt-0.5 text-primary">📌</span>
                        <span>Dipakai untuk: <span className="text-(--text-secondary)">{s.typicalUsage}</span></span>
                      </p>
                      <p className="text-(--text-secondary) italic bg-(--bg-secondary) rounded-lg px-3 py-1.5 leading-snug">
                        &ldquo;{s.example}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Coherence & Clarity" icon={Target} score={feedback.coherence.score} feedback={feedback.coherence.feedback} />
      <Section title="Writing Style" icon={Sparkles} score={feedback.style.score} feedback={feedback.style.feedback} />

      <div className="border border-(--border) rounded-xl p-4 bg-(--bg-card) flex items-start gap-3">
        <Star className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-(--text) mb-1">
            Estimated Level:{' '}
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${levelColors[feedback.level.estimated] ?? 'bg-primary/10 text-primary'}`}>
              {feedback.level.estimated}
            </span>
          </p>
          <p className="text-sm text-(--text-secondary) leading-relaxed">{feedback.level.feedback}</p>
        </div>
      </div>
    </div>
  );
}
