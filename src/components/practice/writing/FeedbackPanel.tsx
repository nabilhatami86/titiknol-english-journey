import type { RefObject } from 'react';
import { Trophy, Target, CheckCircle2, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WritingFeedback, WritingTab } from '@/types/writingPractice';
import { ScoreBar } from './ScoreBar';
import { FeedbackTab } from './tabs/FeedbackTab';
import { AnalysisTab } from './tabs/AnalysisTab';
import { levelColors } from './utils';

interface Props {
  feedback: WritingFeedback;
  activeTab: WritingTab;
  setActiveTab: (tab: WritingTab) => void;
  feedbackRef: RefObject<HTMLDivElement | null>;
}

const TABS: { id: WritingTab; label: string }[] = [
  { id: 'feedback',  label: 'Feedback'  },
  { id: 'analysis',  label: 'Analysis'  },
  { id: 'corrected', label: 'Corrected' },
  { id: 'rewrite',   label: 'Rewrite'   },
];

export function FeedbackPanel({ feedback, activeTab, setActiveTab, feedbackRef }: Props) {
  const score = feedback.overallScore;
  const scoreLabel = score >= 85 ? '🎉 Excellent!' : score >= 65 ? '👍 Good work' : '📚 Keep practicing';

  return (
    <div ref={feedbackRef} className="space-y-4 animate-fade-in">

      {/* Overall score hero card */}
      <div className="relative rounded-2xl overflow-hidden border border-(--border) bg-(--bg-card)">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent pointer-events-none" />
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-primary/5 pointer-events-none" />

        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold text-(--text-muted) uppercase tracking-widest">Overall Score</span>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-1 leading-none">
                <span className="text-6xl font-black text-primary">{score}</span>
                <span className="text-xl font-semibold text-(--text-muted) mb-1">/100</span>
              </div>
              <p className="text-sm text-(--text-secondary) mt-2 font-medium">{scoreLabel}</p>
            </div>

            <span className={cn(
              'inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full border border-primary/25',
              levelColors[feedback.level.estimated] ?? levelColors.A1,
            )}>
              <Target className="w-3.5 h-3.5" />
              {feedback.level.estimated}
            </span>
          </div>

          <div className="mt-5 h-2 bg-primary/15 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-5 space-y-3">
        <p className="text-[10px] font-bold text-(--text-muted) uppercase tracking-widest">Score Breakdown</p>
        {[
          { label: 'Grammar',    score: feedback.grammar.score },
          { label: 'Vocabulary', score: feedback.vocabulary.score },
          { label: 'Coherence',  score: feedback.coherence.score },
          { label: 'Style',      score: feedback.style.score },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 text-xs">
            <span className="w-20 text-(--text-secondary) font-medium shrink-0">{item.label}</span>
            <ScoreBar score={item.score} />
          </div>
        ))}
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 bg-(--bg-secondary) rounded-2xl p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 text-xs font-semibold py-2 rounded-xl transition-all',
              activeTab === tab.id
                ? 'bg-(--bg-card) text-primary shadow-sm'
                : 'text-(--text-muted) hover:text-primary',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'feedback'  && <FeedbackTab feedback={feedback} />}
      {activeTab === 'analysis'  && (
        <AnalysisTab
          sentenceAnalysis={feedback.sentenceAnalysis}
          adverbialClause={feedback.adverbialClause}
        />
      )}

      {activeTab === 'corrected' && (
        <div className="bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-(--border) bg-gradient-to-r from-primary/[0.06] to-transparent">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-bold text-(--text)">Grammar-Corrected Version</span>
          </div>
          <div className="p-5">
            <p className="text-sm text-(--text) leading-relaxed whitespace-pre-wrap wrap-break-word">
              {feedback.correctedVersion}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'rewrite' && (
        <div className="bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-(--border) bg-gradient-to-r from-primary/[0.06] to-transparent">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Lightbulb className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-bold text-(--text)">Native-Level Rewrite</span>
          </div>
          <div className="p-5 space-y-3">
            <p className="text-xs text-(--text-muted) italic">
              How a native English speaker might write this:
            </p>
            <p className="text-sm text-(--text) leading-relaxed whitespace-pre-wrap wrap-break-word">
              {feedback.rewriteSuggestion}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
