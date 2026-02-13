
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface AIPoemGeneratorProps {
  onGenerated: () => void;
}

export const AIPoemGenerator: React.FC<AIPoemGeneratorProps> = ({ onGenerated }) => {
  const [poem, setPoem] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generatePoem = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Write a short, cinematic, and deeply romantic 4-line poem for a girl named Muskan. Mention stars, peace, and magic. Use a modern, soulful tone.",
        config: {
            systemInstruction: "You are a world-class romantic poet known for cinematic and modern metaphors.",
            temperature: 0.9,
        }
      });
      
      setPoem(response.text || "You are the magic in my reality.");
      onGenerated();
    } catch (error) {
      console.error(error);
      setPoem("In the quiet glow of the stars, Muskan, you are the peace my heart finally found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[22px] border border-white/10 bg-gradient-to-br from-pink-500/10 to-violet-500/10 p-6 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-pink-400">✨</span>
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/80">AI Love Note Generator</h2>
      </div>

      <div className="min-h-[80px] flex items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5 mb-4 text-center">
        {loading ? (
          <div className="animate-pulse text-white/40 text-sm">Consulting the stars...</div>
        ) : poem ? (
          <p className="text-sm italic leading-relaxed text-pink-100 font-light">
            {poem.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
          </p>
        ) : (
          <p className="text-xs text-white/30">Generate a unique note just for her</p>
        )}
      </div>

      <button 
        onClick={generatePoem}
        disabled={loading}
        className="w-full py-2.5 rounded-xl bg-white/10 border border-white/10 text-xs font-bold hover:bg-white/20 transition-all disabled:opacity-50"
      >
        {poem ? 'Generate Another ✨' : 'Generate Love Note'}
      </button>
    </div>
  );
};
