import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface NotificationPopupProps {
  show: boolean;
  isCorrect: boolean;
  message: string;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ show, isCorrect, message }) => {
  if (!show) return null;

  return (
    <div className={`fixed top-4 left-4 z-50 transform transition-all duration-500 ${
      show ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
    }`}>
      <div className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm ${
        isCorrect 
          ? 'bg-emerald-500/90 text-white border border-emerald-400' 
          : 'bg-red-500/90 text-white border border-red-400'
      }`}>
        {isCorrect ? (
          <CheckCircle className="w-6 h-6 animate-pulse" />
        ) : (
          <XCircle className="w-6 h-6 animate-pulse" />
        )}
        <span className="font-semibold text-sm">{message}</span>
      </div>
    </div>
  );
};

export default NotificationPopup;