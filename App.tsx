
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FXBackground } from './components/FXBackground';
import { LetterSection } from './components/LetterSection';
import { GallerySection } from './components/GallerySection';
import { Lightbox } from './components/Lightbox';
import { Toast } from './components/Toast';
import { AIPoemGenerator } from './components/AIPoemGenerator';

const App: React.FC = () => {
  const [heartCount, setHeartCount] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleYes = () => {
    showToast("YAY!! 💖 NITYA said YES!");
    setHeartCount(prev => prev + 50);
    // Visual confetti logic would be handled by a specific event or component
    window.dispatchEvent(new CustomEvent('confetti-burst'));
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => showToast("Add a music.mp3 file to enable audio!"));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const incrementHearts = useCallback(() => {
    setHeartCount(prev => prev + 1);
  }, []);

  return (
    <div className="relative min-h-screen text-white/90 overflow-x-hidden selection:bg-pink-500/30">
      {/* Background Layers */}
      <div className="fixed inset-0 bg-[radial-gradient(900px_600px_at_15%_10%,_rgba(255,95,162,0.33),_transparent_60%),_radial-gradient(900px_600px_at_85%_15%,_rgba(179,136,255,0.28),_transparent_60%),_radial-gradient(1100px_800px_at_50%_95%,_rgba(255,209,102,0.16),_transparent_60%)] bg-[#0b0710] z-[-1]" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(1200px_700px_at_50%_35%,_transparent_60%,_rgba(0,0,0,0.52))] z-10" />
      <div className="grain" />
      
      <FXBackground onHeartSpawn={incrementHearts} />

      <main className="relative z-20 max-w-[980px] mx-auto px-4 py-10 md:py-16 flex flex-col gap-6">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 md:p-10 shadow-2xl backdrop-blur-xl group">
          <div className="absolute inset-[-40%] bg-[radial-gradient(closest-side,rgba(255,95,162,0.15),transparent_70%),radial-gradient(closest-side,rgba(179,136,255,0.12),transparent_70%),radial-gradient(closest-side,rgba(255,209,102,0.1),transparent_70%)] animate-drift pointer-events-none" />
          
          <div className="relative z-10 flex flex-wrap gap-3 items-center justify-between mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs md:text-sm text-white/70">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5fa2] shadow-[0_0_12px_rgba(255,95,162,0.6)]" />
              A cinematic Valentine gift • made for NITYA
            </div>
            <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs md:text-sm text-white/70">
              Today: {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} 💌
            </div>
          </div>

          <h1 className="relative z-10 font-playfair text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-4 text-white drop-shadow-2xl">
            NITYA, be my <span className="text-pink-400">Valentine</span> 💘
          </h1>
          <p className="relative z-10 text-white/70 text-base md:text-lg max-w-[65ch]">
            I tried to put the feeling into a little website — soft, romantic, and only for you. Every pixel is a promise, and every heart is a memory. ✨
          </p>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6">
          <LetterSection 
            onYes={handleYes} 
            onCopy={() => showToast("Copied! 📩")}
            onToggleMusic={toggleMusic}
            isMusicPlaying={isMusicPlaying}
            heartCount={heartCount}
          />
          
          <div className="flex flex-col gap-6">
            <GallerySection onPhotoClick={setLightboxImage} />
            <AIPoemGenerator onGenerated={() => showToast("Generated a soul-mate note ✨")} />
          </div>
        </div>
      </main>

      {/* Utilities */}
      <Lightbox imageUrl={lightboxImage} onClose={() => setLightboxImage(null)} />
      <Toast message={toastMessage} />
      <audio ref={audioRef} loop src="https://github.com/yellobean090/NITYA/raw/refs/heads/main/Mood%20%E2%99%AB%20Top%20English%20Acoustic%20Love%20Songs%202023%20%F0%9F%8D%83%20Chill%20Music%20Cover%20of%20Popular%20Songs%20%5BNsN3av1ywzc%5D.mp3" />
    </div>
  );
};

export default App;
