
import React, { useState } from 'react';

interface LetterSectionProps {
  onYes: () => void;
  onCopy: () => void;
  onToggleMusic: () => void;
  isMusicPlaying: boolean;
  heartCount: number;
}

export const LetterSection: React.FC<LetterSectionProps> = ({ 
  onYes, onCopy, onToggleMusic, isMusicPlaying, heartCount 
}) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0, absolute: false });

  const moveNo = () => {
    const randomX = Math.floor(Math.random() * 150) - 75;
    const randomY = Math.floor(Math.random() * 150) - 75;
    setNoPos({ x: randomX, y: randomY, absolute: true });
  };

  const handleCopy = async () => {
    const text = `NITYA 💘\nI made a cinematic valentine website for you.\nYou are the best part of my every day. 🫶\n\nHappy Valentine’s, my favorite person.`;
    await navigator.clipboard.writeText(text);
    onCopy();
  };

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black/20 p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="text-white/90 leading-relaxed space-y-4 text-base md:text-lg">
        <p>Dear <strong className="text-white">NITYA</strong>,</p>
        <p>
          You make my days softer, my mind calmer, and my heart louder (in the best way). 
          If love had a soundtrack, your laugh would be the part I replay on a loop forever.
        </p>
        <p>
          I’m incredibly grateful for you — for your presence, your vibe, and that unique magic you carry effortlessly.
        </p>
        <p className="font-semibold text-pink-300">So… will you be my Valentine? 💗</p>
        <div className="font-pacifico text-2xl mt-4 text-white/95">— from SHAURYA 🫶</div>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <button 
          onClick={onYes}
          className="px-8 py-3 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 font-bold text-white shadow-lg shadow-pink-500/20 hover:-translate-y-1 transition-all active:scale-95"
        >
          YES 😚
        </button>
        <button 
          onMouseEnter={moveNo}
          onClick={moveNo}
          style={noPos.absolute ? { transform: `translate(${noPos.x}px, ${noPos.y}px)` } : {}}
          className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 font-bold text-white hover:bg-white/10 transition-all active:scale-95"
        >
          NO 😤
        </button>
        <button 
          onClick={handleCopy}
          className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10 transition-all"
        >
          Copy a cute message 📩
        </button>
        <button 
          onClick={onToggleMusic}
          className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10 transition-all"
        >
          Music: {isMusicPlaying ? 'ON 🎶' : 'OFF 🔇'}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {['You + Me = ♾️', 'My favorite person 🧸', 'Hug delivery pending 🤍', 'My best "yes" 💍'].map(tag => (
          <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 hover:text-white/90 transition-colors">
            {tag}
          </span>
        ))}
      </div>

      <div className="space-y-3 mt-4">
        {[
          { emoji: '💗', title: 'Reason #1', text: 'Your smile fixes my mood instantly.' },
          { emoji: '🌙', title: 'Reason #2', text: 'You feel like peace on a noisy day.' },
          { emoji: '✨', title: 'Reason #3', text: 'With you, even small moments feel cinematic.' }
        ].map(reason => (
          <div key={reason.title} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 items-start">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center flex-shrink-0">
              {reason.emoji}
            </div>
            <div>
              <div className="font-bold text-sm text-white">{reason.title}</div>
              <div className="text-xs text-white/50">{reason.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-white/10 text-[10px] md:text-xs text-white/40 uppercase tracking-widest">
        <span>Infinite Love v1.4</span>
        <span className="text-pink-400 font-bold">Hearts: {heartCount}</span>
      </div>
    </div>
  );
};
