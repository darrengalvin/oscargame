'use client';

import { useGameStore } from '@/store/gameStore';

export default function TouchControls() {
  const { startJump, endJump } = useGameStore();

  return (
    <div 
      className="fixed bottom-0 left-0 w-full h-1/3 bg-transparent touch-none md:hidden"
      onTouchStart={(e) => {
        e.preventDefault();
        startJump();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        endJump();
      }}
    >
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/50 text-center">
        <div className="w-20 h-20 border-2 border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
          <span className="transform -translate-y-1">↑</span>
        </div>
        <p className="mt-2 text-sm">Tap & Hold to Jump</p>
      </div>
    </div>
  );
} 