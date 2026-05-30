export interface EssayTopic {
  id: string;
  title: string;
  type: 'causes-effects' | 'solution' | 'argument' | 'pros-cons' | 'discussion';
  mi1Hint?: string;
  mi2Hint?: string;
}

export const ESSAY_TOPICS: EssayTopic[] = [
  {
    id: '1',
    title: 'The causes and effects of slavery in America',
    type: 'causes-effects',
  },
  {
    id: '2',
    title: 'Early divorce in families, how does it affect developing children?',
    type: 'discussion',
  },
  {
    id: '3',
    title: 'What are the effects of Apple releasing the same product every year?',
    type: 'causes-effects',
  },
  {
    id: '4',
    title: 'The causes and effects of students hating school',
    type: 'causes-effects',
  },
  {
    id: '5',
    title: 'Solution to address global warming',
    type: 'solution',
    mi1Hint: 'Transition to Renewable Energy',
    mi2Hint: 'Stronger Governmental Regulations',
  },
  {
    id: '6',
    title: 'Internet must be limited to students',
    type: 'argument',
  },
  {
    id: '7',
    title: 'Pros and cons of globalization',
    type: 'pros-cons',
  },
];
