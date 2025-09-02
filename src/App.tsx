import React, { useState, useEffect, useCallback } from 'react';
import { Code } from 'lucide-react';
import HomePage from './components/HomePage';
import QuizSection from './components/QuizSection';
import RoundResult from './components/RoundResult';
import FinalResult from './components/FinalResult';
import NotificationPopup from './components/NotificationPopup';
import { getRandomQuestions } from './data/quizData';
import { Difficulty, QuizState, Question, UserAnswer, RoundResult as RoundResultType } from './types/Quiz';

const QUESTIONS_PER_ROUND = 10;
const TOTAL_ROUNDS = 5;
const TIME_PER_QUESTION = 300; // 5 minutes

function App() {
  const [state, setState] = useState<QuizState>({
    currentSection: 'home',
    difficulty: null,
    currentRound: 1,
    currentQuestionIndex: 0,
    score: 0,
    selectedOption: '',
    userAnswers: [],
    allRoundResults: [],
    timeLeft: TIME_PER_QUESTION,
    showNotification: false,
    notificationMessage: '',
    isCorrectAnswer: false,
  });

  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [answerResult, setAnswerResult] = useState('');
  const [showNextButton, setShowNextButton] = useState(false);

  // Timer effect
  useEffect(() => {
    if (state.currentSection === 'quiz-section' && state.timeLeft > 0) {
      const interval = setInterval(() => {
        setState(prev => {
          const newTimeLeft = prev.timeLeft - 1;
          if (newTimeLeft <= 0) {
            // Time's up - auto submit
            handleTimeUp();
            return { ...prev, timeLeft: 0 };
          }
          return { ...prev, timeLeft: newTimeLeft };
        });
      }, 1000);

      setTimer(interval);
      return () => clearInterval(interval);
    }
  }, [state.currentSection, state.currentQuestionIndex]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  // Show notification
  const showNotification = useCallback((message: string, isCorrect: boolean) => {
    setState(prev => ({
      ...prev,
      showNotification: true,
      notificationMessage: message,
      isCorrectAnswer: isCorrect,
    }));

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        showNotification: false,
      }));
    }, 2000);
  }, []);

  const handleTimeUp = () => {
    if (timer) clearInterval(timer);
    
    const currentQuestion = currentQuestions[state.currentQuestionIndex];
    const userAnswer: UserAnswer = {
      question: currentQuestion.question,
      userAnswer: 'No answer (time expired)',
      correctAnswer: currentQuestion.answer,
      isCorrect: false,
    };

    setState(prev => ({
      ...prev,
      userAnswers: [...prev.userAnswers, userAnswer],
    }));

    setAnswerResult('⏰ Time expired! The correct answer is: ' + currentQuestion.answer);
    setShowNextButton(true);
    showNotification('Time expired!', false);
  };

  const startQuiz = (difficulty: Difficulty) => {
    const questions = getRandomQuestions(difficulty, QUESTIONS_PER_ROUND);
    setCurrentQuestions(questions);
    
    setState({
      currentSection: 'quiz-section',
      difficulty,
      currentRound: 1,
      currentQuestionIndex: 0,
      score: 0,
      selectedOption: '',
      userAnswers: [],
      allRoundResults: [],
      timeLeft: TIME_PER_QUESTION,
      showNotification: false,
      notificationMessage: '',
      isCorrectAnswer: false,
    });

    setAnswerResult('');
    setShowNextButton(false);
  };

  const submitAnswer = (selectedAnswer: string) => {
    if (timer) clearInterval(timer);

    const currentQuestion = currentQuestions[state.currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    const userAnswer: UserAnswer = {
      question: currentQuestion.question,
      userAnswer: selectedAnswer,
      correctAnswer: currentQuestion.answer,
      isCorrect,
    };

    setState(prev => ({
      ...prev,
      userAnswers: [...prev.userAnswers, userAnswer],
      score: isCorrect ? prev.score + 1 : prev.score,
    }));

    if (isCorrect) {
      setAnswerResult('✅ Correct! Well done!');
      showNotification('Correct!', true);
    } else {
      setAnswerResult(`❌ Incorrect. The correct answer is: ${currentQuestion.answer}`);
      showNotification('Incorrect!', false);
    }

    setShowNextButton(true);
  };

  const nextQuestion = () => {
    const nextIndex = state.currentQuestionIndex + 1;
    
    if (nextIndex >= currentQuestions.length) {
      finishRound();
    } else {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex,
        timeLeft: TIME_PER_QUESTION,
      }));
      
      setAnswerResult('');
      setShowNextButton(false);
    }
  };

  const finishRound = () => {
    if (timer) clearInterval(timer);

    const roundResult: RoundResultType = {
      round: state.currentRound,
      difficulty: state.difficulty!,
      score: state.score,
      total: currentQuestions.length,
      answers: state.userAnswers,
    };

    setState(prev => ({
      ...prev,
      allRoundResults: [...prev.allRoundResults, roundResult],
      currentSection: 'round-result',
    }));
  };

  const nextRound = () => {
    if (state.currentRound >= TOTAL_ROUNDS) {
      setState(prev => ({
        ...prev,
        currentSection: 'final-result',
      }));
      return;
    }

    const questions = getRandomQuestions(state.difficulty!, QUESTIONS_PER_ROUND);
    setCurrentQuestions(questions);

    setState(prev => ({
      ...prev,
      currentSection: 'quiz-section',
      currentRound: prev.currentRound + 1,
      currentQuestionIndex: 0,
      score: 0,
      userAnswers: [],
      timeLeft: TIME_PER_QUESTION,
    }));

    setAnswerResult('');
    setShowNextButton(false);
  };

  const restartQuiz = () => {
    if (timer) clearInterval(timer);
    
    setState({
      currentSection: 'home',
      difficulty: null,
      currentRound: 1,
      currentQuestionIndex: 0,
      score: 0,
      selectedOption: '',
      userAnswers: [],
      allRoundResults: [],
      timeLeft: TIME_PER_QUESTION,
      showNotification: false,
      notificationMessage: '',
      isCorrectAnswer: false,
    });

    setCurrentQuestions([]);
    setAnswerResult('');
    setShowNextButton(false);
  };

  const currentRoundResult = state.allRoundResults[state.allRoundResults.length - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <NotificationPopup
        show={state.showNotification}
        isCorrect={state.isCorrectAnswer}
        message={state.notificationMessage}
      />
      
      <div className="quiz-container w-full max-w-6xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="header bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-shadow">
                Python Mastery Quiz
              </h1>
              <p className="text-blue-100 text-lg">
                Test your Python knowledge with our challenging quiz
              </p>
            </div>
            <div className="python-logo mt-4 sm:mt-0 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-blue-800 font-bold text-2xl shadow-lg">
              <Code className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="content-section p-8">
          {state.currentSection === 'home' && (
            <HomePage onStartQuiz={startQuiz} />
          )}

          {state.currentSection === 'quiz-section' && (
            <QuizSection
              questions={currentQuestions}
              currentQuestionIndex={state.currentQuestionIndex}
              timeLeft={state.timeLeft}
              onSubmitAnswer={submitAnswer}
              onNextQuestion={nextQuestion}
              showNextButton={showNextButton}
              answerResult={answerResult}
            />
          )}

          {state.currentSection === 'round-result' && currentRoundResult && (
            <RoundResult
              roundResult={currentRoundResult}
              onNextRound={nextRound}
              onRestartQuiz={restartQuiz}
              isLastRound={state.currentRound >= TOTAL_ROUNDS}
            />
          )}

          {state.currentSection === 'final-result' && (
            <FinalResult
              allRoundResults={state.allRoundResults}
              onRestartQuiz={restartQuiz}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;