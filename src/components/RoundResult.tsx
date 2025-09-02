import React from 'react';
import { Trophy, RotateCcw, ArrowRight } from 'lucide-react';
import { RoundResult as RoundResultType } from '../types/Quiz';

interface RoundResultProps {
  roundResult: RoundResultType;
  onNextRound: () => void;
  onRestartQuiz: () => void;
  isLastRound: boolean;
}

const RoundResult: React.FC<RoundResultProps> = ({ 
  roundResult, 
  onNextRound, 
  onRestartQuiz,
  isLastRound 
}) => {
  const percentage = Math.round((roundResult.score / roundResult.total) * 100);
  const isPerfectScore = roundResult.score === roundResult.total;

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Round {roundResult.round} Complete!
        </h2>
        <p className="text-lg text-gray-600">
          Difficulty: <span className="font-semibold capitalize text-blue-600">{roundResult.difficulty}</span>
        </p>
      </div>

      {/* Score Circle */}
      <div className="score-display flex justify-center mb-8">
        <div className={`score-circle w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-2xl border-8 ${
          isPerfectScore 
            ? 'bg-gradient-to-br from-emerald-400 to-teal-500 border-emerald-300 text-white' 
            : 'bg-gradient-to-br from-blue-400 to-indigo-500 border-blue-300 text-white'
        }`}>
          <span className="text-4xl font-bold">{roundResult.score}</span>
          <span className="text-lg opacity-90">out of {roundResult.total}</span>
          <span className="text-sm font-medium mt-1">{percentage}%</span>
        </div>
      </div>

      {isPerfectScore ? (
        <div className="perfect-score space-y-6">
          <div className="flex justify-center">
            <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />
          </div>
          <h3 className="text-2xl font-bold text-yellow-600 animate-pulse">
            Perfect Score! 🎉
          </h3>
          <p className="text-lg text-gray-600">
            Outstanding! You got all questions correct in this round!
          </p>
          {!isLastRound && (
            <button
              onClick={onNextRound}
              className="btn-next px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center space-x-2 mx-auto"
            >
              <span>Continue to Next Round</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      ) : (
        <div className="review-section space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Review Your Answers</h3>
          
          <div className="overflow-x-auto">
            <table className="results-table w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <th className="p-4 text-left font-semibold">Question</th>
                  <th className="p-4 text-left font-semibold">Your Answer</th>
                  <th className="p-4 text-left font-semibold">Correct Answer</th>
                  <th className="p-4 text-center font-semibold">Result</th>
                </tr>
              </thead>
              <tbody>
                {roundResult.answers.map((answer, index) => (
                  <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                    <td className="p-4 text-sm text-gray-800 max-w-md">
                      {answer.question.length > 60 ? `${answer.question.slice(0, 60)}...` : answer.question}
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-700">{answer.userAnswer}</td>
                    <td className="p-4 text-sm font-medium text-gray-700">{answer.correctAnswer}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        answer.isCorrect 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {answer.isCorrect ? '✅ Correct' : '❌ Incorrect'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!isLastRound && (
              <button
                onClick={onNextRound}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <span>Continue to Next Round</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
            
            <button
              onClick={onRestartQuiz}
              className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Try This Round Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoundResult;