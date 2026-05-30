// Types for AI Writing Practice feature

export interface Correction {
  original: string;
  corrected: string;
  explanation: string;
}

export interface SentenceClause {
  text: string;
  type: string;
  connector: string | null;
  subject: string;
  predicate: string;
  object: string | null;
  note: string;
}

export interface SentencePhrase {
  text: string;
  type: string;
  function: string;
}

export interface SentenceItem {
  sentence: string;
  tense: {
    used: string;
    isCorrect: boolean;
    shouldBe: string;
    explanation: string;
  };
  voice: {
    type: string;
    isAppropriate: boolean;
    suggestion: string;
    converted: string | null;
  };
  structure: {
    sentenceType: string;
    clauses: SentenceClause[];
    phrases: SentencePhrase[];
  };
  reduction: {
    possible: boolean;
    type: string;
    original: string;
    reduced: string;
    explanation: string;
  };
  wordClasses: {
    word: string;
    class: string;
    subclass: string;
    function: string;
  }[];
}

export interface SynonymEntry {
  word: string;
  meaning: string;
  formality: string;
  typicalUsage: string;
  example: string;
}

export interface WordEnhancement {
  wordUsed: string;
  wordClass: string;
  meaning: string;
  typicalUsage: string;
  synonyms: SynonymEntry[];
  bestAlternative: string;
  bestAlternativeReason: string;
}

export interface AdverbialClauseItem {
  text: string;
  connector: string;
  clauseFunction: string;
  isCorrect: boolean;
  issue: string;
  tip: string;
}

export interface AdverbialClauseAnalysis {
  found: boolean;
  count: number;
  summary: string;
  clauses: AdverbialClauseItem[];
  suggestions: string[];
}

export interface WritingFeedback {
  grammar:          { score: number; feedback: string; corrections: Correction[] };
  sentenceAnalysis: { summary: string; sentences: SentenceItem[] };
  vocabulary:       { score: number; feedback: string; suggestions: string[]; wordEnhancements: WordEnhancement[] };
  coherence:        { score: number; feedback: string };
  style:            { score: number; feedback: string };
  adverbialClause?: AdverbialClauseAnalysis;
  level:            { estimated: string; feedback: string };
  overallScore: number;
  correctedVersion: string;
  rewriteSuggestion: string;
}

export interface WritingHistoryEntry {
  id: string;
  date: string;
  text: string;
  feedback: WritingFeedback;
}

export type WritingTab = 'feedback' | 'analysis' | 'corrected' | 'rewrite';
export type WritingErrorType = 'too_long' | 'quota' | 'no_key' | 'network' | 'general' | null;
