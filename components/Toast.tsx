
import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="px-6 py-3 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-3">
        <span className="text-pink-400">💞</span>
        <span className="text-sm font-medium text-white/90">{message}</span>
      </div>
    </div>
  );
};
