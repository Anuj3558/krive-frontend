import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';



const alertStyles = {
  error: 'bg-red-100 border-red-400 text-red-700',
  success: 'bg-green-100 border-green-400 text-green-700',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
  info: 'bg-blue-100 border-blue-400 text-blue-700',
};

const alertIcons = {
  error: XCircle,
  success: CheckCircle,
  warning: AlertCircle,
  info: Info,
};

export const EnhancedAlert = ({ type, message, onClose }) => {
  const Icon = alertIcons[type];

  return (
    <div className={`${alertStyles[type]} px-4 py-3 rounded relative flex items-center`} role="alert">
      <Icon className="w-5 h-5 mr-2" />
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          aria-label="Close"
        >
          <span className="text-2xl">&times;</span>
        </button>
      )}
    </div>
  );
};
