export interface ImprovementTips {
  targetBand: number;
  steps: string[];
}

export interface IeltsResult {
  overallBand: number;
  taskBand: number;
  coherenceBand: number;
  lexicalBand: number;
  grammarBand: number;
  taskFeedback: string;
  coherenceFeedback: string;
  lexicalFeedback: string;
  grammarFeedback: string;
  taskImprovement?: ImprovementTips;
  coherenceImprovement?: ImprovementTips;
  lexicalImprovement?: ImprovementTips;
  grammarImprovement?: ImprovementTips;
  corrections: { original: string; corrected: string; explanation: string }[];
  vocabularyEnhancements: { used: string; better: string; reason: string }[];
  improvedEssay: string;
  generalFeedback: string;
}

export interface TaskPrompt {
  id: string;
  title: string;
  question: string;
  tips: string[];
}
