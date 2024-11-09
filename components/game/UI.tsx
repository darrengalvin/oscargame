'use client';

import { useGameStore } from '@/store/gameStore';

export default function UI() {
  const { score, highScore, gems } = useGameStore();

  return (
    <div className="absolute top-0 left-0 w-full p-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col items-start space-y-2">
          <div className="text-xl md:text-2xl font-bold bg-black/30 px-3 py-1 rounded backdrop-blur-sm text-white">
            Score: {score}
          </div>
          <div className="text-lg md:text-xl font-semibold bg-black/30 px-3 py-1 rounded backdrop-blur-sm text-white">
            High Score: {highScore}
          </div>
          <div className="gem-counter text-lg md:text-xl font-semibold bg-black/30 px-3 py-1 rounded backdrop-blur-sm text-white flex items-center gap-2">
            <span className="text-yellow-300">💎</span>
            Gems: {gems}
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-black/30 px-4 py-2 rounded backdrop-blur-sm text-white">
          <p className="md:hidden">Tap to jump • Collect gems • Unlock themes</p>
          <p className="hidden md:block">Space/Up to jump • Collect gems • Unlock themes</p>
        </div>
      </div>
    </div>
  );
} 