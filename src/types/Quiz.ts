export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface UserAnswer {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface RoundResult {
  round: number;
  difficulty: string;
  score: number;
  total: number;
  answers: UserAnswer[];
}

export type Difficulty = 'basic' | 'intermediate' | 'advanced';

export interface QuizState {
  currentSection: 'home' | 'quiz' | 'round-result' | 'final-result';
  difficulty: Difficulty | null;
  currentRound: number;
  currentQuestionIndex: number;
  score: number;
  selectedOption: string;
  userAnswers: UserAnswer[];
  allRoundResults: RoundResult[];
  timeLeft: number;
  showNotification: boolean;
  notificationMessage: string;
  isCorrectAnswer: boolean;
}