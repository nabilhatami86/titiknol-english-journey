'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Circle, Trophy, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type GrammarTopic =
  | 'Parts of Speech'
  | 'Adjective vs Adverb'
  | 'Subject-Verb Agreement'
  | 'Modal + Base Verb'
  | 'Present Continuous'
  | 'Present Perfect'
  | 'Countable vs Uncountable'
  | 'Pronouns';

type MistakeType =
  | 'Agreement error'
  | 'Tense error'
  | 'Word form error'
  | 'Preposition error'
  | 'Structure error'
  | 'No error';

type BaseQuestion = {
  id: string;
  section: 'A' | 'B' | 'C' | 'D';
  topic: GrammarTopic;
  prompt: string;
  partOfSpeech: string;
  verbType: 'Linking verb' | 'Action verb' | 'Modal construction' | 'N/A';
  requiredTense: string;
  rule: string;
  explanation: string;
  additionalExample: string;
  contrastExample: string;
};

type ChoiceQuestion = BaseQuestion & {
  type: 'choice';
  options: string[];
  correctIndex: number;
  correctedSentence: string;
  optionExplanations: string[];
  optionMistakeTypes: MistakeType[];
};

type FixQuestion = BaseQuestion & {
  type: 'fix';
  wrongSentence: string;
  acceptedAnswers: string[];
  correctedSentence: string;
  defaultMistakeType: MistakeType;
};

type TranslationQuestion = BaseQuestion & {
  type: 'translation';
  sourceSentence: string;
  acceptedAnswers: string[];
  correctedSentence: string;
  defaultMistakeType: MistakeType;
};

type Question = ChoiceQuestion | FixQuestion | TranslationQuestion;

type EvaluationRow = {
  question: Question;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
  mistakeType: MistakeType;
};

const normalize = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[.?!]+$/g, '');

const questions: Question[] = [
  // A. Multiple choice (15)
  {
    id: 'A1',
    section: 'A',
    type: 'choice',
    topic: 'Parts of Speech',
    prompt: 'Choose the adjective in this sentence: "The clever student answered quickly."',
    options: ['student', 'clever', 'answered', 'quickly'],
    correctIndex: 1,
    partOfSpeech: 'Adjective',
    verbType: 'Action verb',
    requiredTense: 'Simple past (answered)',
    rule: 'An adjective modifies a noun; an adverb modifies a verb, adjective, or another adverb.',
    explanation: '"Clever" describes the noun "student", so it is an adjective.',
    correctedSentence: 'The clever student answered quickly.',
    optionExplanations: [
      '"Student" is a noun.',
      '"Clever" describes the noun "student", so it is correct.',
      '"Answered" is a verb.',
      '"Quickly" is an adverb modifying the verb "answered".',
    ],
    optionMistakeTypes: ['Word form error', 'No error', 'Word form error', 'Word form error'],
    additionalExample: 'She wore a beautiful dress.',
    contrastExample: '"Beautiful" (adjective) vs "beautifully" (adverb).',
  },
  {
    id: 'A2',
    section: 'A',
    type: 'choice',
    topic: 'Adjective vs Adverb',
    prompt: 'She speaks English very ____.',
    options: ['good', 'well', 'better', 'goodly'],
    correctIndex: 1,
    partOfSpeech: 'Adverb',
    verbType: 'Action verb',
    requiredTense: 'Simple present',
    rule: 'Use an adverb to modify an action verb.',
    explanation: '"Speaks" is an action verb, so we need the adverb "well".',
    correctedSentence: 'She speaks English very well.',
    optionExplanations: [
      '"Good" is an adjective, not an adverb.',
      '"Well" is the correct adverb form.',
      '"Better" is comparative, not needed here.',
      '"Goodly" is unnatural/incorrect in this structure.',
    ],
    optionMistakeTypes: ['Word form error', 'No error', 'Structure error', 'Word form error'],
    additionalExample: 'He drives carefully.',
    contrastExample: 'She is a careful driver. / She drives carefully.',
  },
  {
    id: 'A3',
    section: 'A',
    type: 'choice',
    topic: 'Subject-Verb Agreement',
    prompt: 'The list of items ____ on the desk.',
    options: ['are', 'is', 'were', 'be'],
    correctIndex: 1,
    partOfSpeech: 'Subject + linking verb',
    verbType: 'Linking verb',
    requiredTense: 'Simple present',
    rule: 'The main subject controls the verb; prepositional phrases do not.',
    explanation: 'The main subject is "list" (singular), so the verb is "is".',
    correctedSentence: 'The list of items is on the desk.',
    optionExplanations: [
      '"Are" is plural; subject is singular.',
      '"Is" agrees with singular subject "list".',
      '"Were" is past plural and wrong tense.',
      '"Be" is base form, not finite in this sentence.',
    ],
    optionMistakeTypes: ['Agreement error', 'No error', 'Tense error', 'Structure error'],
    additionalExample: 'The number of students is increasing.',
    contrastExample: 'A number of students are absent.',
  },
  {
    id: 'A4',
    section: 'A',
    type: 'choice',
    topic: 'Modal + Base Verb',
    prompt: 'You must ____ your homework tonight.',
    options: ['to finish', 'finishing', 'finish', 'finished'],
    correctIndex: 2,
    partOfSpeech: 'Modal + verb',
    verbType: 'Modal construction',
    requiredTense: 'Modal form',
    rule: 'A modal verb is followed by base verb (V1) without "to".',
    explanation: 'After "must", use the base form "finish".',
    correctedSentence: 'You must finish your homework tonight.',
    optionExplanations: [
      'Modal + "to + V" is incorrect.',
      'Modal + V-ing is incorrect.',
      'Base form "finish" is correct.',
      'Past form after modal is incorrect.',
    ],
    optionMistakeTypes: ['Structure error', 'Structure error', 'No error', 'Structure error'],
    additionalExample: 'She can speak Japanese.',
    contrastExample: 'He wants to finish (want + to + V1), but he must finish (modal + V1).',
  },
  {
    id: 'A5',
    section: 'A',
    type: 'choice',
    topic: 'Present Continuous',
    prompt: 'Look! The children ____ in the yard.',
    options: ['play', 'are playing', 'played', 'have played'],
    correctIndex: 1,
    partOfSpeech: 'Auxiliary + main verb',
    verbType: 'Action verb',
    requiredTense: 'Present continuous',
    rule: 'Present continuous = am/is/are + V-ing for actions happening now.',
    explanation: '"Look!" signals an action happening now, so use present continuous.',
    correctedSentence: 'Look! The children are playing in the yard.',
    optionExplanations: [
      'Simple present does not match the "right now" context.',
      'Are + playing is correct present continuous.',
      'Simple past is wrong time reference.',
      'Present perfect is wrong aspect here.',
    ],
    optionMistakeTypes: ['Tense error', 'No error', 'Tense error', 'Tense error'],
    additionalExample: 'I am studying now.',
    contrastExample: 'I study every day (habit) vs I am studying now (current action).',
  },
  {
    id: 'A6',
    section: 'A',
    type: 'choice',
    topic: 'Present Perfect',
    prompt: 'She ____ her report already.',
    options: ['finish', 'finished', 'has finished', 'is finishing'],
    correctIndex: 2,
    partOfSpeech: 'Auxiliary + past participle',
    verbType: 'Action verb',
    requiredTense: 'Present perfect',
    rule: 'Present perfect = has/have + V3.',
    explanation: '"Already" commonly fits present perfect for completed result now.',
    correctedSentence: 'She has finished her report already.',
    optionExplanations: [
      'Base form without auxiliary is incomplete here.',
      'Simple past is possible in some contexts, but target pattern is present perfect.',
      'Has + finished (V3) is correct.',
      'Present continuous changes meaning to ongoing action.',
    ],
    optionMistakeTypes: ['Structure error', 'Tense error', 'No error', 'Tense error'],
    additionalExample: 'They have visited Bali three times.',
    contrastExample: 'She finished the report yesterday (specific past) vs She has finished the report (result now).',
  },
  {
    id: 'A7',
    section: 'A',
    type: 'choice',
    topic: 'Countable vs Uncountable',
    prompt: 'There isn’t ____ information in this file.',
    options: ['many', 'much', 'a few', 'several'],
    correctIndex: 1,
    partOfSpeech: 'Quantifier + noun',
    verbType: 'N/A',
    requiredTense: 'N/A',
    rule: 'Use "much" with uncountable nouns in negative/question forms.',
    explanation: '"Information" is uncountable, so use "much".',
    correctedSentence: 'There isn’t much information in this file.',
    optionExplanations: [
      '"Many" is for countable plural nouns.',
      '"Much" is correct for uncountable noun.',
      '"A few" is for countable plural nouns.',
      '"Several" is for countable plural nouns.',
    ],
    optionMistakeTypes: ['Word form error', 'No error', 'Word form error', 'Word form error'],
    additionalExample: 'We don’t have much time.',
    contrastExample: 'Many books / much money.',
  },
  {
    id: 'A8',
    section: 'A',
    type: 'choice',
    topic: 'Pronouns',
    prompt: 'This bag is not mine. It is ____.',
    options: ['her', 'she', 'hers', 'herself'],
    correctIndex: 2,
    partOfSpeech: 'Possessive pronoun',
    verbType: 'Linking verb',
    requiredTense: 'Simple present',
    rule: 'Use possessive pronoun (mine, yours, hers) when no noun follows.',
    explanation: 'After "is" and without a noun, use "hers".',
    correctedSentence: 'This bag is not mine. It is hers.',
    optionExplanations: [
      '"Her" is a possessive adjective; it needs a noun.',
      '"She" is a subject pronoun.',
      '"Hers" is correct possessive pronoun.',
      '"Herself" is reflexive and incorrect here.',
    ],
    optionMistakeTypes: ['Structure error', 'Word form error', 'No error', 'Word form error'],
    additionalExample: 'That laptop is ours.',
    contrastExample: 'Her book is new. / The book is hers.',
  },
  {
    id: 'A9',
    section: 'A',
    type: 'choice',
    topic: 'Subject-Verb Agreement',
    prompt: 'Each student ____ a notebook.',
    options: ['have', 'has', 'having', 'are having'],
    correctIndex: 1,
    partOfSpeech: 'Subject + verb',
    verbType: 'Action verb',
    requiredTense: 'Simple present',
    rule: 'Indefinite pronouns like "each/everyone" take singular verbs.',
    explanation: '"Each student" is grammatically singular, so use "has".',
    correctedSentence: 'Each student has a notebook.',
    optionExplanations: [
      '"Have" is plural form.',
      '"Has" is singular and correct.',
      '"Having" cannot be main finite verb here.',
      'Progressive form is unnecessary and incorrect for this meaning.',
    ],
    optionMistakeTypes: ['Agreement error', 'No error', 'Structure error', 'Structure error'],
    additionalExample: 'Everyone wants to pass the exam.',
    contrastExample: 'All students have notebooks.',
  },
  {
    id: 'A10',
    section: 'A',
    type: 'choice',
    topic: 'Modal + Base Verb',
    prompt: 'He can ____ very fast.',
    options: ['runs', 'running', 'run', 'ran'],
    correctIndex: 2,
    partOfSpeech: 'Modal + verb',
    verbType: 'Modal construction',
    requiredTense: 'Modal form',
    rule: 'After modal verbs, use base form (V1).',
    explanation: '"Can" must be followed by "run", not inflected forms.',
    correctedSentence: 'He can run very fast.',
    optionExplanations: [
      'Third-person singular form after modal is wrong.',
      'V-ing after modal is wrong.',
      'Base verb is correct.',
      'Past form after modal is wrong.',
    ],
    optionMistakeTypes: ['Structure error', 'Structure error', 'No error', 'Structure error'],
    additionalExample: 'They might arrive late.',
    contrastExample: 'He runs every day. / He can run every day.',
  },
  {
    id: 'A11',
    section: 'A',
    type: 'choice',
    topic: 'Adjective vs Adverb',
    prompt: 'The soup tastes ____.',
    options: ['well', 'good', 'betterly', 'goodly'],
    correctIndex: 1,
    partOfSpeech: 'Subject complement (adjective)',
    verbType: 'Linking verb',
    requiredTense: 'Simple present',
    rule: 'After linking verbs (be, seem, taste, look, feel), use adjective, not adverb.',
    explanation: '"Tastes" is a linking verb here; it links "soup" to quality "good".',
    correctedSentence: 'The soup tastes good.',
    optionExplanations: [
      '"Well" is adverb; linking verbs need adjective complement.',
      '"Good" is adjective and correct.',
      'Incorrect word form.',
      'Incorrect word form.',
    ],
    optionMistakeTypes: ['Word form error', 'No error', 'Word form error', 'Word form error'],
    additionalExample: 'She looks tired.',
    contrastExample: 'She sings well (action verb) / She looks good (linking verb).',
  },
  {
    id: 'A12',
    section: 'A',
    type: 'choice',
    topic: 'Present Continuous',
    prompt: 'I ____ to my teacher right now.',
    options: ['talk', 'am talking', 'talked', 'have talked'],
    correctIndex: 1,
    partOfSpeech: 'Auxiliary + V-ing',
    verbType: 'Action verb',
    requiredTense: 'Present continuous',
    rule: 'Use present continuous for action happening at the moment.',
    explanation: '"Right now" requires present continuous: am + talking.',
    correctedSentence: 'I am talking to my teacher right now.',
    optionExplanations: [
      'Simple present does not match immediate time marker.',
      'Am talking is correct.',
      'Simple past is wrong time.',
      'Present perfect changes meaning to completed experience.',
    ],
    optionMistakeTypes: ['Tense error', 'No error', 'Tense error', 'Tense error'],
    additionalExample: 'They are waiting outside now.',
    contrastExample: 'I talk to my teacher every Monday (habit).',
  },
  {
    id: 'A13',
    section: 'A',
    type: 'choice',
    topic: 'Present Perfect',
    prompt: 'We ____ that movie twice.',
    options: ['watch', 'watched', 'have watched', 'are watching'],
    correctIndex: 2,
    partOfSpeech: 'Auxiliary + V3',
    verbType: 'Action verb',
    requiredTense: 'Present perfect',
    rule: 'Use present perfect for life experience with unspecified time.',
    explanation: 'Experience count ("twice") commonly uses have + watched.',
    correctedSentence: 'We have watched that movie twice.',
    optionExplanations: [
      'Base form without auxiliary is incomplete.',
      'Simple past is usually for specific past time.',
      'Have watched is correct.',
      'Present continuous gives ongoing meaning.',
    ],
    optionMistakeTypes: ['Structure error', 'Tense error', 'No error', 'Tense error'],
    additionalExample: 'I have visited Singapore three times.',
    contrastExample: 'I watched it last night (specific past).',
  },
  {
    id: 'A14',
    section: 'A',
    type: 'choice',
    topic: 'Countable vs Uncountable',
    prompt: 'She bought ____ apples and ____ milk.',
    options: ['many / many', 'much / much', 'many / much', 'much / many'],
    correctIndex: 2,
    partOfSpeech: 'Quantifiers',
    verbType: 'Action verb',
    requiredTense: 'Simple past',
    rule: 'Many is for countable plural nouns; much is for uncountable nouns.',
    explanation: '"Apples" is countable plural -> many. "Milk" is uncountable -> much.',
    correctedSentence: 'She bought many apples and much milk.',
    optionExplanations: [
      'Second quantifier is wrong for uncountable milk.',
      'First quantifier is wrong for countable apples.',
      'Both quantifiers match noun types.',
      'Both quantifiers are reversed.',
    ],
    optionMistakeTypes: ['Word form error', 'Word form error', 'No error', 'Word form error'],
    additionalExample: 'We need many chairs and much water.',
    contrastExample: 'A few apples / a little milk.',
  },
  {
    id: 'A15',
    section: 'A',
    type: 'choice',
    topic: 'Pronouns',
    prompt: 'My brother and ____ are going to school.',
    options: ['me', 'I', 'myself', 'mine'],
    correctIndex: 1,
    partOfSpeech: 'Subject pronoun',
    verbType: 'Action verb',
    requiredTense: 'Present continuous (going)',
    rule: 'Use subject pronoun in subject position.',
    explanation: 'The pronoun is part of the subject, so it must be "I".',
    correctedSentence: 'My brother and I are going to school.',
    optionExplanations: [
      '"Me" is object pronoun, not subject.',
      '"I" is correct subject pronoun.',
      '"Myself" is reflexive, not simple subject pronoun.',
      '"Mine" is possessive pronoun.',
    ],
    optionMistakeTypes: ['Structure error', 'No error', 'Word form error', 'Word form error'],
    additionalExample: 'Sarah and I have finished the task.',
    contrastExample: 'Teacher called my brother and me. (object position)',
  },

  // B. Choose correct word (7)
  {
    id: 'B1',
    section: 'B',
    type: 'choice',
    topic: 'Adjective vs Adverb',
    prompt: 'She sings very ____ (good / well).',
    options: ['good', 'well'],
    correctIndex: 1,
    partOfSpeech: 'Adverb',
    verbType: 'Action verb',
    requiredTense: 'Simple present',
    rule: 'Action verbs are modified by adverbs.',
    explanation: 'Sings (action verb) needs adverb "well".',
    correctedSentence: 'She sings very well.',
    optionExplanations: ['"Good" is adjective.', '"Well" is adverb and correct.'],
    optionMistakeTypes: ['Word form error', 'No error'],
    additionalExample: 'He writes neatly.',
    contrastExample: 'He is a good singer. / He sings well.',
  },
  {
    id: 'B2',
    section: 'B',
    type: 'choice',
    topic: 'Subject-Verb Agreement',
    prompt: 'The news ____ surprising. (is / are)',
    options: ['is', 'are'],
    correctIndex: 0,
    partOfSpeech: 'Noun + linking verb',
    verbType: 'Linking verb',
    requiredTense: 'Simple present',
    rule: 'Some nouns ending in -s are singular (news, physics, mathematics).',
    explanation: '"News" is singular in grammar, so use "is".',
    correctedSentence: 'The news is surprising.',
    optionExplanations: ['Singular agreement is correct.', 'Plural verb is incorrect with singular noun.'],
    optionMistakeTypes: ['No error', 'Agreement error'],
    additionalExample: 'Mathematics is difficult for him.',
    contrastExample: 'The books are expensive.',
  },
  {
    id: 'B3',
    section: 'B',
    type: 'choice',
    topic: 'Modal + Base Verb',
    prompt: 'You should ____ early. (sleep / sleeping)',
    options: ['sleep', 'sleeping'],
    correctIndex: 0,
    partOfSpeech: 'Modal + verb',
    verbType: 'Modal construction',
    requiredTense: 'Modal form',
    rule: 'Modal + base verb (V1) without -ing.',
    explanation: 'After "should", use base form "sleep".',
    correctedSentence: 'You should sleep early.',
    optionExplanations: ['Base form is correct after modal.', 'V-ing is incorrect after modal.'],
    optionMistakeTypes: ['No error', 'Structure error'],
    additionalExample: 'We should study more.',
    contrastExample: 'We are sleeping now. (be + V-ing pattern)',
  },
  {
    id: 'B4',
    section: 'B',
    type: 'choice',
    topic: 'Present Continuous',
    prompt: 'They ____ in the library now. (study / are studying)',
    options: ['study', 'are studying'],
    correctIndex: 1,
    partOfSpeech: 'Auxiliary + V-ing',
    verbType: 'Action verb',
    requiredTense: 'Present continuous',
    rule: 'Use present continuous for action happening now.',
    explanation: '"Now" points to ongoing action, so "are studying" is required.',
    correctedSentence: 'They are studying in the library now.',
    optionExplanations: ['Simple present is habitual, not immediate action.', 'Present continuous is correct.'],
    optionMistakeTypes: ['Tense error', 'No error'],
    additionalExample: 'I am reading now.',
    contrastExample: 'I read every evening.',
  },
  {
    id: 'B5',
    section: 'B',
    type: 'choice',
    topic: 'Present Perfect',
    prompt: 'He ____ his keys. (lost / has lost)',
    options: ['lost', 'has lost'],
    correctIndex: 1,
    partOfSpeech: 'Auxiliary + V3',
    verbType: 'Action verb',
    requiredTense: 'Present perfect',
    rule: 'Present perfect (has/have + V3) emphasizes present result.',
    explanation: 'The target form is present perfect: has lost.',
    correctedSentence: 'He has lost his keys.',
    optionExplanations: ['Simple past lacks the present-result focus.', 'Has lost is correct present perfect.'],
    optionMistakeTypes: ['Tense error', 'No error'],
    additionalExample: 'I have finished my lunch.',
    contrastExample: 'He lost his keys yesterday. (specific past)',
  },
  {
    id: 'B6',
    section: 'B',
    type: 'choice',
    topic: 'Countable vs Uncountable',
    prompt: 'I need ____ water. (many / much)',
    options: ['many', 'much'],
    correctIndex: 1,
    partOfSpeech: 'Quantifier + noun',
    verbType: 'N/A',
    requiredTense: 'N/A',
    rule: 'Use much with uncountable nouns.',
    explanation: '"Water" is uncountable, so use "much".',
    correctedSentence: 'I need much water.',
    optionExplanations: ['Many is for countable plural nouns.', 'Much is correct with uncountable noun.'],
    optionMistakeTypes: ['Word form error', 'No error'],
    additionalExample: 'Do you have much time?',
    contrastExample: 'Do you have many books?',
  },
  {
    id: 'B7',
    section: 'B',
    type: 'choice',
    topic: 'Pronouns',
    prompt: 'This is ____ pen. (my / mine)',
    options: ['my', 'mine'],
    correctIndex: 0,
    partOfSpeech: 'Possessive adjective',
    verbType: 'N/A',
    requiredTense: 'N/A',
    rule: 'Use possessive adjective before a noun; possessive pronoun stands alone.',
    explanation: 'Because "pen" follows, use possessive adjective "my".',
    correctedSentence: 'This is my pen.',
    optionExplanations: ['My is correct before noun.', 'Mine cannot directly modify a noun.'],
    optionMistakeTypes: ['No error', 'Structure error'],
    additionalExample: 'That is her notebook.',
    contrastExample: 'That notebook is mine.',
  },

  // C. Fix sentence (5)
  {
    id: 'C1',
    section: 'C',
    type: 'fix',
    topic: 'Subject-Verb Agreement',
    prompt: 'Fix the sentence:',
    wrongSentence: 'She go to school every day.',
    acceptedAnswers: ['She goes to school every day.'],
    correctedSentence: 'She goes to school every day.',
    partOfSpeech: 'Subject + verb',
    verbType: 'Action verb',
    requiredTense: 'Simple present',
    rule: 'Third-person singular in simple present takes -s/-es.',
    explanation: 'Subject "She" requires verb form "goes" in simple present.',
    defaultMistakeType: 'Agreement error',
    additionalExample: 'He watches TV at night.',
    contrastExample: 'I go to school every day.',
  },
  {
    id: 'C2',
    section: 'C',
    type: 'fix',
    topic: 'Modal + Base Verb',
    prompt: 'Fix the sentence:',
    wrongSentence: 'They can to swim very fast.',
    acceptedAnswers: ['They can swim very fast.'],
    correctedSentence: 'They can swim very fast.',
    partOfSpeech: 'Modal + verb',
    verbType: 'Modal construction',
    requiredTense: 'Modal form',
    rule: 'Modal + base verb; no "to" after modal.',
    explanation: 'After "can", use base verb "swim" directly.',
    defaultMistakeType: 'Structure error',
    additionalExample: 'You must leave now.',
    contrastExample: 'They want to swim. (want + to + V1)',
  },
  {
    id: 'C3',
    section: 'C',
    type: 'fix',
    topic: 'Present Continuous',
    prompt: 'Fix the sentence:',
    wrongSentence: 'I am study now.',
    acceptedAnswers: ['I am studying now.'],
    correctedSentence: 'I am studying now.',
    partOfSpeech: 'Auxiliary + V-ing',
    verbType: 'Action verb',
    requiredTense: 'Present continuous',
    rule: 'Present continuous requires be + V-ing.',
    explanation: 'With "am", the main verb must be in -ing form.',
    defaultMistakeType: 'Structure error',
    additionalExample: 'She is cooking now.',
    contrastExample: 'I study every night.',
  },
  {
    id: 'C4',
    section: 'C',
    type: 'fix',
    topic: 'Present Perfect',
    prompt: 'Fix the sentence:',
    wrongSentence: 'We has finished the project.',
    acceptedAnswers: ['We have finished the project.'],
    correctedSentence: 'We have finished the project.',
    partOfSpeech: 'Auxiliary + V3',
    verbType: 'Action verb',
    requiredTense: 'Present perfect',
    rule: 'Use have with I/you/we/they and has with he/she/it.',
    explanation: 'Subject "We" takes auxiliary "have", not "has".',
    defaultMistakeType: 'Agreement error',
    additionalExample: 'They have completed the task.',
    contrastExample: 'She has completed the task.',
  },
  {
    id: 'C5',
    section: 'C',
    type: 'fix',
    topic: 'Adjective vs Adverb',
    prompt: 'Fix the sentence:',
    wrongSentence: 'He drives very careful.',
    acceptedAnswers: ['He drives very carefully.'],
    correctedSentence: 'He drives very carefully.',
    partOfSpeech: 'Adverb',
    verbType: 'Action verb',
    requiredTense: 'Simple present',
    rule: 'Use adverb to modify an action verb.',
    explanation: '"Drives" is action verb, so modifier must be adverb "carefully".',
    defaultMistakeType: 'Word form error',
    additionalExample: 'They speak politely.',
    contrastExample: 'He is a careful driver.',
  },

  // D. Translation (3)
  {
    id: 'D1',
    section: 'D',
    type: 'translation',
    topic: 'Present Continuous',
    prompt: 'Translate into English:',
    sourceSentence: 'Mereka sedang belajar sekarang.',
    acceptedAnswers: ['They are studying now.', 'They are learning now.'],
    correctedSentence: 'They are studying now.',
    partOfSpeech: 'Auxiliary + V-ing',
    verbType: 'Action verb',
    requiredTense: 'Present continuous',
    rule: 'Sedang + sekarang -> present continuous.',
    explanation: 'The sentence refers to ongoing action at this moment.',
    defaultMistakeType: 'Tense error',
    additionalExample: 'Kami sedang makan sekarang = We are eating now.',
    contrastExample: 'They study every day. (habit, simple present)',
  },
  {
    id: 'D2',
    section: 'D',
    type: 'translation',
    topic: 'Present Perfect',
    prompt: 'Translate into English:',
    sourceSentence: 'Dia sudah menyelesaikan tugasnya.',
    acceptedAnswers: ['She has finished her assignment.', 'He has finished his assignment.', 'She has completed her assignment.', 'He has completed his assignment.'],
    correctedSentence: 'She has finished her assignment.',
    partOfSpeech: 'Auxiliary + V3',
    verbType: 'Action verb',
    requiredTense: 'Present perfect',
    rule: 'Sudah + result now -> has/have + V3.',
    explanation: 'Completed action with present relevance uses present perfect.',
    defaultMistakeType: 'Tense error',
    additionalExample: 'Saya sudah makan = I have eaten.',
    contrastExample: 'She finished her assignment yesterday. (specific past)',
  },
  {
    id: 'D3',
    section: 'D',
    type: 'translation',
    topic: 'Modal + Base Verb',
    prompt: 'Translate into English:',
    sourceSentence: 'Kamu harus belajar lebih rajin.',
    acceptedAnswers: ['You must study harder.', 'You should study harder.'],
    correctedSentence: 'You must study harder.',
    partOfSpeech: 'Modal + verb',
    verbType: 'Modal construction',
    requiredTense: 'Modal form',
    rule: 'Modal (must/should) is followed by base verb.',
    explanation: 'After "must/should", verb must remain in base form.',
    defaultMistakeType: 'Structure error',
    additionalExample: 'Kamu harus datang tepat waktu = You must come on time.',
    contrastExample: 'You are studying harder now. (different structure and meaning)',
  },
];

const extraPracticeByTopic: Record<GrammarTopic, string[]> = {
  'Adjective vs Adverb': [
    '1) She looks ____ (happy / happily).',
    '2) He answered the question ____ (correct / correctly).',
    '3) The soup smells ____ (good / well).',
    '4) They worked ____ (hard / hardly) to finish on time.',
    '5) Rewrite: "He speaks polite." -> make it correct.',
  ],
  'Subject-Verb Agreement': [
    '1) Each student ____ (have/has) a laptop.',
    '2) The list of names ____ (is/are) on the board.',
    '3) My friends ____ (likes/like) this class.',
    '4) Everyone ____ (want/wants) to pass.',
    '5) Rewrite: "She go to school every day."',
  ],
  'Modal + Base Verb': [
    '1) You must ____ (to finish/finish) your work.',
    '2) He can ____ (runs/run) fast.',
    '3) We should ____ (studying/study) tonight.',
    '4) Rewrite: "They can to speak English."',
    '5) Make one sentence with "might + base verb".',
  ],
  'Present Continuous': [
    '1) Look! The baby ____ (is crying/cries).',
    '2) I ____ (am reading/read) now.',
    '3) They ____ (are playing/play) at the moment.',
    '4) Rewrite: "She is cook now."',
    '5) Make one negative sentence in present continuous.',
  ],
  'Present Perfect': [
    '1) She ____ (has finished/finished) her task.',
    '2) We ____ (have seen/saw) that movie twice.',
    '3) He ____ not ____ (has / eaten) yet.',
    '4) Rewrite: "They has completed the project."',
    '5) Write one sentence with "have + V3".',
  ],
  'Countable vs Uncountable': [
    '1) There isn’t ____ (many/much) milk.',
    '2) I have ____ (many/much) books.',
    '3) We need ____ (a little/a few) sugar.',
    '4) Rewrite: "There are many information here."',
    '5) Classify: advice, chairs, water, coins.',
  ],
  Pronouns: [
    '1) This bag is ____ (her/hers).',
    '2) ____ (I/Me) and Rina are classmates.',
    '3) The teacher called Tom and ____ (I/me).',
    '4) Rewrite: "This is mine pen."',
    '5) Make two sentences: one with "my", one with "mine".',
  ],
  'Parts of Speech': [
    '1) Identify the adverb: "He runs quickly."',
    '2) Identify the adjective: "The red car is new."',
    '3) Identify the pronoun: "She likes coffee."',
    '4) Identify the noun: "Knowledge is power."',
    '5) Label each word class: "They can swim well."',
  ],
};

function getWeaknessSummary(rows: EvaluationRow[]) {
  const wrong = rows.filter((r) => !r.isCorrect);
  const counts = new Map<GrammarTopic, number>();
  wrong.forEach((r) => {
    counts.set(r.question.topic, (counts.get(r.question.topic) ?? 0) + 1);
  });
  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  const weakest = sorted[0]?.[0] ?? 'Parts of Speech';
  return { sorted, weakest };
}

export default function GrammarEvaluatorPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = questions.length;
  const answered = useMemo(() => Object.keys(answers).filter((k) => answers[k]?.trim()).length, [answers]);

  const evaluation: EvaluationRow[] = useMemo(() => {
    if (!submitted) return [];
    return questions.map((q) => {
      const userRaw = answers[q.id] ?? '';
      if (q.type === 'choice') {
        const selectedIndex = Number(userRaw);
        const isCorrect = selectedIndex === q.correctIndex;
        return {
          question: q,
          isCorrect,
          userAnswer: userRaw === '' ? 'No answer' : q.options[selectedIndex] ?? 'No answer',
          correctAnswer: q.options[q.correctIndex],
          mistakeType: isCorrect ? 'No error' : q.optionMistakeTypes[selectedIndex] ?? 'Structure error',
        };
      }

      const normalized = normalize(userRaw);
      const isCorrect = q.acceptedAnswers.some((a) => normalize(a) === normalized);
      return {
        question: q,
        isCorrect,
        userAnswer: userRaw || 'No answer',
        correctAnswer: q.correctedSentence,
        mistakeType: isCorrect ? 'No error' : q.defaultMistakeType,
      };
    });
  }, [answers, submitted]);

  const score = evaluation.filter((e) => e.isCorrect).length;
  const percent = total === 0 ? 0 : Math.round((score / total) * 100);
  const weakness = getWeaknessSummary(evaluation);

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Practice
        </Link>
        <p className="text-sm text-(--text-secondary)">
          Progress: <span className="font-semibold text-(--text)">{answered}/{total}</span>
        </p>
      </div>

      <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-6 space-y-2">
        <h1 className="text-2xl font-bold text-(--text)">Grammar Evaluator Test (30 Questions)</h1>
        <p className="text-sm text-(--text-secondary)">
          Sections: A (Multiple Choice), B (Choose Correct Word), C (Fix the Sentence), D (Translation).
        </p>
      </div>

      <div className="space-y-6">
        {(['A', 'B', 'C', 'D'] as const).map((sec) => {
          const sectionQuestions = questions.filter((q) => q.section === sec);
          const titleMap: Record<typeof sec, string> = {
            A: 'A. Multiple Choice (15)',
            B: 'B. Choose Correct Word (7)',
            C: 'C. Fix the Sentence (5)',
            D: 'D. Translation (3)',
          };
          return (
            <section key={sec} className="bg-(--bg-card) border border-(--border) rounded-2xl p-5 space-y-4">
              <h2 className="text-lg font-semibold text-(--text)">{titleMap[sec]}</h2>
              <div className="space-y-4">
                {sectionQuestions.map((q) => {
                  const qEval = evaluation.find((e) => e.question.id === q.id);
                  const isDone = Boolean(answers[q.id]?.trim());
                  return (
                    <div key={q.id} className="border border-(--border) rounded-xl p-4 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-(--text)">{q.id}. {q.prompt}</p>
                          {q.type === 'fix' && (
                            <p className="text-sm text-(--text-secondary) mt-1 italic">{q.wrongSentence}</p>
                          )}
                          {q.type === 'translation' && (
                            <p className="text-sm text-(--text-secondary) mt-1 italic">{q.sourceSentence}</p>
                          )}
                        </div>
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-(--text-muted) mt-0.5 shrink-0" />
                        )}
                      </div>

                      {q.type === 'choice' && (
                        <div className="grid sm:grid-cols-2 gap-2">
                          {q.options.map((opt, idx) => {
                            const selected = answers[q.id] === String(idx);
                            return (
                              <button
                                key={`${q.id}-${idx}`}
                                type="button"
                                disabled={submitted}
                                onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: String(idx) }))}
                                className={cn(
                                  'text-left text-sm rounded-lg border px-3 py-2 transition-colors',
                                  submitted
                                    ? idx === q.correctIndex
                                      ? 'border-primary/50 bg-primary/10 dark:bg-primary/40'
                                      : selected
                                        ? 'border-primary/50 bg-primary/10 dark:bg-primary/40'
                                        : 'border-(--border) opacity-80'
                                    : selected
                                      ? 'border-primary bg-primary/10 text-primary'
                                      : 'border-(--border) hover:border-primary/40'
                                )}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {(q.type === 'fix' || q.type === 'translation') && (
                        <textarea
                          value={answers[q.id] ?? ''}
                          disabled={submitted}
                          onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                          placeholder="Type your answer..."
                          className="w-full min-h-[80px] rounded-lg border border-(--border) bg-(--bg-secondary) px-3 py-2 text-sm text-(--text) focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      )}

                      {submitted && qEval && (
                        <div className={cn(
                          'rounded-lg border p-3 text-sm space-y-2',
                          qEval.isCorrect ? 'border-primary/40 bg-primary/5' : 'border-primary/40 bg-primary/5'
                        )}>
                          <p className={cn('font-semibold', qEval.isCorrect ? 'text-primary' : 'text-primary')}>
                            {qEval.isCorrect ? 'Correct' : 'Incorrect'}
                          </p>
                          <p><span className="font-medium">Your answer:</span> {qEval.userAnswer}</p>
                          <p><span className="font-medium">Correct answer:</span> {qEval.correctAnswer}</p>
                          <p><span className="font-medium">Grammar rule:</span> {q.rule}</p>
                          <p><span className="font-medium">Part of speech involved:</span> {q.partOfSpeech}</p>
                          <p><span className="font-medium">Verb type:</span> {q.verbType}</p>
                          <p><span className="font-medium">Required tense:</span> {q.requiredTense}</p>
                          <p><span className="font-medium">Error category:</span> {qEval.mistakeType}</p>
                          <p><span className="font-medium">Why:</span> {q.explanation}</p>
                          {!qEval.isCorrect && (
                            <p><span className="font-medium">Corrected full sentence:</span> {q.correctedSentence}</p>
                          )}
                          {q.type === 'choice' && (
                            <div className="space-y-1">
                              <p className="font-medium">Why each option:</p>
                              {q.options.map((op, idx) => (
                                <p key={`${q.id}-exp-${idx}`} className="text-(--text-secondary)">
                                  {String.fromCharCode(65 + idx)}. {op}: {q.optionExplanations[idx]}
                                </p>
                              ))}
                            </div>
                          )}
                          <p><span className="font-medium">Mini-rule:</span> {q.rule}</p>
                          <p><span className="font-medium">Additional example:</span> {q.additionalExample}</p>
                          <p><span className="font-medium">Contrast example:</span> {q.contrastExample}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={answered < total}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium',
            answered < total
              ? 'bg-(--bg-secondary) text-(--text-muted) cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary-dark'
          )}
        >
          Submit & Get Full Evaluation
        </button>
      ) : (
        <section className="bg-(--bg-card) border border-(--border) rounded-2xl p-6 space-y-3">
          <h2 className="text-lg font-semibold text-(--text) flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" /> Final Result
          </h2>
          <p className="text-sm text-(--text-secondary)">
            Total score: <span className="font-semibold text-(--text)">{score}/{total}</span>
          </p>
          <p className="text-sm text-(--text-secondary)">
            Percentage: <span className="font-semibold text-(--text)">{percent}%</span>
          </p>

          {weakness.sorted.length > 0 ? (
            <div className="space-y-2 pt-1">
              <p className="text-sm font-medium text-(--text)">Weakness analysis</p>
              {weakness.sorted.map(([topic, count]) => (
                <p key={topic} className="text-sm text-(--text-secondary)">
                  - {topic}: {count} mistake(s)
                </p>
              ))}
              <p className="text-sm text-(--text-secondary)">
                Suggested focus: Review <span className="font-medium text-(--text)">{weakness.weakest}</span> first, then re-check sentence structure (subject, verb type, tense marker, and modifier position).
              </p>
              <p className="text-sm font-medium text-(--text)">5 extra practice questions ({weakness.weakest})</p>
              {extraPracticeByTopic[weakness.weakest].map((q, i) => (
                <p key={`${weakness.weakest}-extra-${i}`} className="text-sm text-(--text-secondary)">
                  {q}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-sm text-(--text-secondary)">
              Great work. No major weakness detected from this attempt.
            </p>
          )}
        </section>
      )}

      {submitted && (
        <button
          onClick={() => {
            setAnswers({});
            setSubmitted(false);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-(--border) text-sm hover:bg-(--hover)"
        >
          <XCircle className="w-4 h-4" /> Reset Test
        </button>
      )}
    </div>
  );
}

