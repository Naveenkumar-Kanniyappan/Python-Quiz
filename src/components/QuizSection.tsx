import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, Send } from 'lucide-react';
import { Question, UserAnswer } from '../types/Quiz';

interface QuizSectionProps {
  questions: Question[];
  currentQuestionIndex: number;
  timeLeft: number;
  onSubmitAnswer: (answer: string) => void;
  onNextQuestion: () => void;
  showNextButton: boolean;
  answerResult: string;
}

const QuizSection: React.FC<QuizSectionProps> = ({
  questions,
  currentQuestionIndex,
  timeLeft,
  onSubmitAnswer,
  onNextQuestion,
  showNextButton,
  answerResult,
}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onSubmitAnswer(selectedOption);
    }
  };

  const handleNext = () => {
    setSelectedOption('');
    onNextQuestion();
  };

  useEffect(() => {
    setSelectedOption('');
  }, [currentQuestionIndex]);

  if (!currentQuestion) return null;

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 pb-6 border-b-2 border-gray-100">
        <div className="question-counter text-xl font-semibold text-blue-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="timer-container flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full border-2 border-gray-200">
          <Clock className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-gray-700">Time left:</span>
          <span className={`font-bold text-lg ${timeLeft <= 30 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar bg-gray-200 h-3 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="question-box bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 leading-relaxed">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(option.charAt(0))}
              className={`option-button text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedOption === option.charAt(0)
                  ? 'bg-blue-500 text-white border-blue-500 shadow-lg transform scale-105'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:shadow-md hover:-translate-y-1'
              }`}
            >
              <span className="font-medium">{option}</span>
            </button>
          ))}
        </div>

   

        {/* Navigation Buttons */}
        <div className="navigation-buttons flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          {!showNextButton ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className={`btn-submit w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                selectedOption
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:-translate-y-1'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
              <span>Submit Answer</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn-next w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <span>Next Question</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSection;