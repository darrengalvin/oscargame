'use client';

import { useGameStore } from '@/store/gameStore';

export default function UI() {
  const { score, highScore } = useGameStore();

  return (
    <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start text-white">
      <div className="flex flex-col items-start space-y-2">
        <div className="text-xl md:text-2xl font-bold bg-black/30 px-3 py-1 rounded backdrop-blur-sm">
          Score: {score}
        </div>
        <div className="text-lg md:text-xl font-semibold bg-black/30 px-3 py-1 rounded backdrop-blur-sm">
          High Score: {highScore}
        </div>
      </div>
      
      {/* Mobile instructions - only show on small screens */}
      <div className="md:hidden text-sm text-right bg-black/30 px-3 py-1 rounded backdrop-blur-sm">
        <p>Tap screen to jump</p>
        <p>Hold longer for higher jumps</p>
      </div>

      {/* Desktop instructions - only show on larger screens */}
      <div className="hidden md:block text-sm text-right bg-black/30 px-3 py-1 rounded backdrop-blur-sm">
        <p>Space or ↑ to jump</p>
        <p>Hold longer for higher jumps</p>
      </div>
    </div>
  );
} 