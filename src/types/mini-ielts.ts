export interface QuestionType {
  count: string;
  type: string;
}

export interface TestItem {
  id: string;
  slug: string;
  title: string;
  image: string;
  total: string;
  questionTypes: QuestionType[];
  url: string;
}

export interface QuestionSection {
  heading: string;
  paragraphs: string[];
}

export interface TestDetail {
  title: string;
  image: string;
  url: string;
  sections: QuestionSection[];
}
