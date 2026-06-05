export type ModuleTrack =
  | "reading"
  | "speaking"
  | "grammar"
  | "listening"
  | "writing";

export type ModuleExerciseType =
  | "multiple-choice"
  | "fill-the-gap"
  | "true-false-not-given"
  | "short-answer"
  | "task";

export interface ModuleExercise {
  id: string;
  type: ModuleExerciseType;
  question: string;
  options?: string[];
  correctAnswer?: string;
  reason?: string;
  sampleAnswer?: string;
  section?: "middle" | "final" | "quiz" | "part1" | "part2" | "part3";
  imageUrl?: string;
  grammarType?: string;    // "NC" | "AC" | "AVC" | "INV" | "COMP" | "RED" | "CAUS" | "SV"
  grammarNote?: string;    // short hint shown in the question card
  lessonRef?: { day: number; topic: string };  // link to the lesson where this is taught
}

export interface ModuleMaterialSection {
  title: string;
  points: string[];
  imageUrl?: string;
}

/** A single line in a listening script. Speaker = dialogue, no speaker = narration/note. */
export interface ListeningLine {
  speaker?: string; // "Receptionist", "A", "B" — omit for notes/narration
  text: string; // prose with {{b:N}} markers for numbered blanks
  bold?: boolean; // section header within notes
  indent?: boolean; // indented bullet item in notes
}

export interface ListeningMCQQuestion {
  question: string;
  options: string[]; // e.g. ['A. A health club', 'B. A class', 'C. A game', 'D. A dentist']
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
}

/** One audio section (e.g. Audio 1, Audio 2, Audio 3). */
export interface ListeningAudio {
  title: string; // "Audio 1: Free time."
  instruction: string; // "Fill the blank spaces while listening to the recording."
  type: "dialogue" | "notes" | "table" | "mcq";
  lines: ListeningLine[];
  tableRows?: { label: string; value: string }[]; // for type='table'
  answers: Record<number, string>; // blank number → correct answer (or Q number → 'A'/'B'/'C'/'D' for mcq)
  questions?: ListeningMCQQuestion[]; // for type='mcq'
}

export interface ModuleLesson {
  id: string;
  track: ModuleTrack;
  day: number;
  title: string;
  subtitle: string;
  overview: string;
  tutor?: string;
  passage?: string[];
  audioUrl?: string;
  audioTracks?: {
    title: string;
    url: string;
  }[];
  materialSections: ModuleMaterialSection[];
  exercises: ModuleExercise[];
  listeningAudios?: ListeningAudio[];
}
