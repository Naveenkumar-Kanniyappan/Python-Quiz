import React from 'react';
import { Trophy, RotateCcw, Star } from 'lucide-react';
import { RoundResult } from '../types/Quiz';

interface FinalResultProps {
  allRoundResults: RoundResult[];
  onRestartQuiz: () => void;
}

const FinalResult: React.FC<FinalResultProps> = ({ allRoundResults, onRestartQuiz }) => {
  const totalScore = allRoundResults.reduce((acc, round) => acc + round.score, 0);
  const totalQuestions = allRoundResults.reduce((acc, round) => acc + round.total, 0);
  const overallPercentage = Math.round((totalScore / totalQuestions) * 100);

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Exceptional', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (percentage >= 80) return { level: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (percentage >= 70) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 60) return { level: 'Fair', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { level: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const performance = getPerformanceLevel(overallPercentage);

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="flex justify-center">
          <Trophy className="w-20 h-20 text-yellow-500 animate-bounce" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Quiz Complete! 🎓
        </h2>
        <div className={`inline-block px-6 py-3 rounded-full ${performance.bg} border border-opacity-20`}>
          <span className={`text-lg font-semibold ${performance.color}`}>
            Performance Level: {performance.level}
          </span>
        </div>
      </div>

      {/* Overall Score Display */}
      <div className="score-summary bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Final Score</h3>
        <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {totalScore}/{totalQuestions}
        </div>
        <div className="text-2xl font-semibold text-gray-600">
          {overallPercentage}% Overall
        </div>
      </div>

      {/* Round by Round Results */}
      <div className="results-breakdown">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Round by Round Performance</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <th className="p-4 text-left font-semibold">Round</th>
                <th className="p-4 text-left font-semibold">Difficulty</th>
                <th className="p-4 text-center font-semibold">Score</th>
                <th className="p-4 text-center font-semibold">Total</th>
                <th className="p-4 text-center font-semibold">Percentage</th>
                <th className="p-4 text-center font-semibold">Performance</th>
              </tr>
            </thead>
            <tbody>
              {allRoundResults.map((round, index) => {
                const roundPercentage = Math.round((round.score / round.total) * 100);
                const roundPerformance = getPerformanceLevel(roundPercentage);
                
                return (
                  <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition-colors`}>
                    <td className="p-4 font-semibold text-indigo-600">Round {round.round}</td>
                    <td className="p-4 capitalize font-medium text-gray-700">{round.difficulty}</td>
                    <td className="p-4 text-center font-bold text-lg text-gray-800">{round.score}</td>
                    <td className="p-4 text-center text-gray-600">{round.total}</td>
                    <td className="p-4 text-center font-semibold text-lg text-indigo-600">{roundPercentage}%</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${roundPerformance.bg} ${roundPerformance.color}`}>
                        <Star className="w-3 h-3" />
                        <span>{roundPerformance.level}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-6">
        <button
          onClick={onRestartQuiz}
          className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center space-x-2 mx-auto"
        >
          <RotateCcw className="w-6 h-6" />
          <span>Start New Quiz</span>
        </button>
      </div>
    </div>
  );
};

export default FinalResult;