import React from 'react';
import { Play, Trophy, Clock, BarChart3, Zap, Brain, Flame } from 'lucide-react';
import { Difficulty } from '../types/Quiz';

interface HomePageProps {
  onStartQuiz: (difficulty: Difficulty) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartQuiz }) => {
  return (
    <div className="text-center space-y-8">
      <div className="welcome-message space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Python Mastery Quiz!
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          Challenge yourself with our comprehensive Python quiz featuring 5 exciting rounds of 10 questions each. 
          Choose your difficulty level and test your Python knowledge under pressure!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        <div className="feature-card bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100">
          <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Timed Challenge</h3>
          <p className="text-gray-600">5 minutes per question to test your knowledge under pressure</p>
        </div>

        <div className="feature-card bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-100">
          <Trophy className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3">5 Exciting Rounds</h3>
          <p className="text-gray-600">50 questions total across 5 challenging rounds</p>
        </div>

        <div className="feature-card bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100">
          <BarChart3 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Detailed Analytics</h3>
          <p className="text-gray-600">Comprehensive feedback and performance tracking</p>
        </div>
      </div>

      <div className="difficulty-selection space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800">Choose Your Challenge Level</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div 
            onClick={() => onStartQuiz('basic')}
            className="difficulty-card cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
              <Zap className="w-12 h-12 mx-auto mb-4 group-hover:animate-pulse" />
              <h4 className="text-2xl font-bold mb-3">Basic</h4>
              <p className="text-emerald-100 mb-4">Perfect for beginners learning Python fundamentals</p>
              <div className="flex items-center justify-center space-x-2 bg-emerald-600/50 rounded-lg py-2">
                <Play className="w-5 h-5" />
                <span className="font-semibold">Start Basic Quiz</span>
              </div>
            </div>
          </div>

          <div 
            onClick={() => onStartQuiz('intermediate')}
            className="difficulty-card cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
              <Brain className="w-12 h-12 mx-auto mb-4 group-hover:animate-pulse" />
              <h4 className="text-2xl font-bold mb-3">Intermediate</h4>
              <p className="text-blue-100 mb-4">For developers with solid Python experience</p>
              <div className="flex items-center justify-center space-x-2 bg-blue-600/50 rounded-lg py-2">
                <Play className="w-5 h-5" />
                <span className="font-semibold">Start Intermediate Quiz</span>
              </div>
            </div>
          </div>

          <div 
            onClick={() => onStartQuiz('advanced')}
            className="difficulty-card cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-red-500 to-orange-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
              <Flame className="w-12 h-12 mx-auto mb-4 group-hover:animate-pulse" />
              <h4 className="text-2xl font-bold mb-3">Advanced</h4>
              <p className="text-red-100 mb-4">Ultimate challenge for Python experts</p>
              <div className="flex items-center justify-center space-x-2 bg-red-600/50 rounded-lg py-2">
                <Play className="w-5 h-5" />
                <span className="font-semibold">Start Advanced Quiz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;