import type { RefObject } from 'react';
import { Trophy, Target, CheckCircle2, Lightbulb } from 'lucide-react';
import type { WritingFeedback, WritingTab } from '@/types/writingPractice';
import { ScoreBar } from './ScoreBar';
import { FeedbackTab } from './tabs/FeedbackTab';
import { AnalysisTab } from './tabs/AnalysisTab';
import { scoreColor, scoreBg, levelColors } from './utils';

interface Props {
  feedback: WritingFeedback;
  activeTab: WritingTab;
  setActiveTab: (tab: WritingTab) => void;
  feedbackRef: RefObject<HTMLDivElement | null>;
}

export function FeedbackPanel({ feedback, activeTab, setActiveTab, feedbackRef }: Props) {
  return (
    <div ref={feedbackRef} className="space-y-4 animate-fade-in">

      {/* Overall score card */}
      <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="font-bold text-(--text)">Overall Score</span>
          </div>
          <span className={`text-4xl font-black ${scoreColor(feedback.overallScore)}`}>
            {feedback.overallScore}
            <span className="text-sm font-normal text-(--text-muted)">/100</span>
          </span>
        </div>
        <div className="h-3 bg-(--bg-secondary) rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${scoreBg(feedback.overallScore)}`}
            style={{ width: `${feedback.overallScore}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${levelColors[feedback.level.estimated] ?? levelColors.A1}`}>
            <Target className="w-3.5 h-3.5" />
            {feedback.level.estimated} Level
          </span>
          <span className="text-xs text-(--text-muted)">
            {feedback.overallScore >= 85 ? '🎉 Excellent!' : feedback.overallScore >= 65 ? '👍 Good work' : '📚 Keep practicing'}
          </span>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4 space-y-2.5">
        <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider mb-3">Score Breakdown</p>
        {[
          { label: 'Grammar',    score: feedback.grammar.score },
          { label: 'Vocabulary', score: feedback.vocabulary.score },
          { label: 'Coherence',  score: feedback.coherence.score },
          { label: 'Style',      score: feedback.style.score },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 text-xs">
            <span className="w-20 text-(--text-secondary) shrink-0">{item.label}</span>
            <ScoreBar score={item.score} />
          </div>
        ))}
      </div>

      {/* Tab switcher */}
      <div className="grid grid-cols-2 sm:flex gap-1 bg-(--bg-secondary) rounded-xl p-1">
        {(['feedback', 'analysis', 'corrected', 'rewrite'] as WritingTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-xs font-semibold py-1.5 rounded-lg transition-all ${
              activeTab === tab
                ? 'bg-(--bg-card) text-primary shadow-sm'
                : 'text-(--text-muted) hover:text-(--text)'
            }`}
          >
            {tab === 'feedback' ? 'Feedback' : tab === 'analysis' ? 'Analysis' : tab === 'corrected' ? 'Corrected' : 'Rewrite'}
          </button>
        ))}
      </div>

      {activeTab === 'feedback' && <FeedbackTab feedback={feedback} />}
      {activeTab === 'analysis' && (
        <AnalysisTab
          sentenceAnalysis={feedback.sentenceAnalysis}
          adverbialClause={feedback.adverbialClause}
        />
      )}

      {activeTab === 'corrected' && (
        <div className="bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-(--border) bg-(--bg-secondary)/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-semibold text-(--text)">Grammar-Corrected Version</span>
          </div>
          <div className="p-5">
            <p className="text-sm text-(--text) leading-relaxed whitespace-pre-wrap break-words">{feedback.correctedVersion}</p>
          </div>
        </div>
      )}

      {activeTab === 'rewrite' && (
        <div className="bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-(--border) bg-(--bg-secondary)/30">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold text-(--text)">Native-Level Rewrite</span>
          </div>
          <div className="p-5">
            <p className="text-xs text-(--text-muted) italic mb-3">How a native English speaker might write this:</p>
            <p className="text-sm text-(--text) leading-relaxed whitespace-pre-wrap break-words">{feedback.rewriteSuggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
}
