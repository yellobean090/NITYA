
import React from 'react';
import { PhotoMemory } from '../types';

interface GallerySectionProps {
  onPhotoClick: (url: string) => void;
}

const MEMORIES: PhotoMemory[] = [
  { id: 1, url: 'https://picsum.photos/seed/NITYA1/600/800', caption: 'NITYA ✨' },
  { id: 2, url: 'https://picsum.photos/seed/NITYA2/600/800', caption: 'That smile 💗' },
  { id: 3, url: 'https://picsum.photos/seed/NITYA3/600/800', caption: 'Us 🫶' },
  { id: 4, url: 'https://picsum.photos/seed/NITYA4/600/800', caption: 'Forever vibes ♾️' },
];

export const GallerySection: React.FC<GallerySectionProps> = ({ onPhotoClick }) => {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-6 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-right-4 duration-1000 delay-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/80">Photo Memories</h2>
        <span className="text-[10px] text-white/40">Tap to expand</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {MEMORIES.map((photo) => (
          <div 
            key={photo.id}
            onClick={() => onPhotoClick(photo.url)}
            className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 cursor-pointer bg-white/5"
          >
            <img 
              src={photo.url} 
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-2 left-3 right-3 text-[10px] font-medium text-white/90 drop-shadow-md opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              {photo.caption}
            </div>
          </div>
        ))}
      </div>
      
      <p className="mt-4 text-[10px] text-white/30 text-center italic">
        "Every frame tells a story I never want to finish."
      </p>
    </div>
  );
};
