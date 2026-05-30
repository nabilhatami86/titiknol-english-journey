import type { WritingHistoryEntry } from '@/types/writingPractice';

export const STORAGE_KEY = 'ai_writing_history';

export const WRITING_TYPES = ['Journal', 'Essay', 'Story', 'Opinion', 'Description', 'Letter', 'Email'];

export const PROMPT_IDEAS = [
  'Describe your daily routine in detail.',
  'Write about your favorite place and why you love it.',
  'Tell a story about an unexpected friendship.',
  'Explain why learning English is important to you.',
  'Describe a challenge you recently overcame.',
  'Write about your dream job and how you plan to achieve it.',
  'Tell a story about your most memorable trip.',
  "Write your opinion about social media's effect on students.",
];

export function scoreColor(_s: number) {
  return 'text-primary';
}

export function scoreBg(_s: number) {
  return 'bg-primary';
}

export const levelColors: Record<string, string> = {
  A1: 'bg-primary/10 text-primary',
  A2: 'bg-primary/10 text-primary',
  B1: 'bg-primary/10 text-primary',
  B2: 'bg-primary/10 text-primary',
  C1: 'bg-primary/10 text-primary',
  C2: 'bg-primary/10 text-primary',
};

export function loadHistory(): WritingHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'); }
  catch { return []; }
}

export function saveEntry(entry: WritingHistoryEntry) {
  const list = [entry, ...loadHistory()].slice(0, 20);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
