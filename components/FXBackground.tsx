
import React, { useState, useEffect } from 'react';
import { HeartData, SparkleData } from '../types';

interface FXBackgroundProps {
  onHeartSpawn: () => void;
}

export const FXBackground: React.FC<FXBackgroundProps> = ({ onHeartSpawn }) => {
  const [hearts, setHearts] = useState<HeartData[]>([]);
  const [sparkles, setSparkles] = useState<SparkleData[]>([]);

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const id = Date.now();
      const t = Math.random();
      let color = 'rgba(255,95,162,0.55)';
      if (t > 0.66) color = 'rgba(179,136,255,0.48)';
      else if (t > 0.33) color = 'rgba(255,209,102,0.32)';

      const newHeart: HeartData = {
        id,
        left: `${Math.random() * 100}vw`,
        size: `${12 + Math.random() * 20}px`,
        duration: `${6 + Math.random() * 8}s`,
        delay: '0s',
        color
      };

      setHearts(prev => [...prev.slice(-40), newHeart]);
      onHeartSpawn();
    }, 800);

    const sparkleInterval = setInterval(() => {
      const newSparkle: SparkleData = {
        id: Date.now() + Math.random(),
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        duration: `${2 + Math.random() * 3}s`
      };
      setSparkles(prev => [...prev.slice(-30), newSparkle]);
    }, 450);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(sparkleInterval);
    };
  }, [onHeartSpawn]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map(h => (
        <div
          key={h.id}
          className="absolute animate-float-up"
          style={{
            left: h.left,
            bottom: '-50px',
            width: h.size,
            height: h.size,
            backgroundColor: h.color,
            animationDuration: h.duration,
            borderRadius: '4px'
          }}
        >
          {/* Heart shapes using pseudo-style in line */}
          <div className="absolute w-full h-full bg-inherit rounded-full" style={{ left: '-50%', top: '0' }} />
          <div className="absolute w-full h-full bg-inherit rounded-full" style={{ left: '0', top: '-50%' }} />
        </div>
      ))}

      {sparkles.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: s.left,
            top: s.top,
            width: '2px',
            height: '2px',
            boxShadow: '0 0 10px 2px rgba(255,255,255,0.4)',
            animationDuration: s.duration
          }}
        />
      ))}
    </div>
  );
};
