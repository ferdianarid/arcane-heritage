export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation?: string | null;
}

export interface QuizResultQuestion extends Question {
  userAnswer?: number | null;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  questions: QuizResultQuestion[];
}

export interface QuizPlayerProps {
  questions: Question[];
  category: {
    id: string;
    name: string;
  };
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation?: string | null;
  category: {
    id: string;
    name: string;
  };
  createdAt: Date;
}

export interface QuizCategories {
  id: string;
  name: string;
}
