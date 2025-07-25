export enum Screen {
  Welcome,
  Register,
  Quiz,
  Results,
  Admin,
  Interview,
}

export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Answer {
  questionId: number;
  questionText: string;
  options: string[];
  selectedOptionIndex: number;
  correctAnswerIndex: number;
  isCorrect: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  answers: Answer[];
  timestamp: number;
  interviewTranscript?: ChatMessage[];
}

export interface Applicant {
  name: string;
  contact: string;
  position: string;
  attempts: number;
  results: QuizResult[];
}

export type Language = 'en' | 'fr' | 'rw';
export type Theme = 'light' | 'dark';