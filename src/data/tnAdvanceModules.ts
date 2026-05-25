import type { ModuleLesson } from "@/types/module";
import { tnAdvanceSpeakingLessons } from "@/data/speaking/tnAdvanceSpeaking";
import { advanceGrammarLessons } from "@/data/grammar/tnAdvanceGrammar";
import { advanceWritingLessons } from "@/data/writing/tnAdvanceWriting";
import { advanceReadingLessons } from "@/data/reading/tnAdvanceReading";

export interface AdvanceTrackInfo {
  track: ModuleLesson["track"];
  title: string;
  description: string;
}

export const tnAdvanceTracks: AdvanceTrackInfo[] = [
  {
    track: "grammar",
    title: "Grammar Advanced",
    description: "Noun Clause, Adverbial Clause, Causative Verb, Comparative, Inversion, dan Conditional Sentence — tata bahasa tingkat lanjut.",
  },
  {
    track: "speaking",
    title: "Speaking Advanced",
    description: "Scholarship Interview, Describing Comparison, Opinions, Proposing Solutions, Speculating Future — komunikasi akademik & profesional.",
  },
  {
    track: "reading",
    title: "Reading Advanced",
    description: "Teks akademik dan profesional tingkat lanjut — strategi reading comprehension untuk IELTS dan ujian profisiensi.",
  },
  {
    track: "writing",
    title: "Writing Advanced",
    description: "Academic writing, essay structure, argumentative writing, dan report writing untuk kebutuhan akademik dan profesional.",
  },
];

const allAdvanceLessons: ModuleLesson[] = [
  ...advanceGrammarLessons,
  ...tnAdvanceSpeakingLessons,
  ...advanceReadingLessons,
  ...advanceWritingLessons,
];

export const tnAdvanceLessons = allAdvanceLessons;

export const getTnAdvanceLessonsByTrack = (track: string) =>
  allAdvanceLessons.filter((l) => l.track === track).sort((a, b) => a.day - b.day);

export const getTnAdvanceLesson = (track: string, day: number) =>
  allAdvanceLessons.find((l) => l.track === track && l.day === day) ?? null;

export const getTnAdvanceLessonById = (id: string) =>
  allAdvanceLessons.find((l) => l.id === id) ?? null;

// legacy — grammar only, kept for compatibility
export const getTnAdvanceLessonsByDay = () =>
  [...advanceGrammarLessons].sort((a, b) => a.day - b.day);
