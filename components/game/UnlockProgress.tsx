'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

const THEME_PRICES = {
  prehistoric: 100,
  underwater: 150,
  space: 200,
  jungle: 250,
};

export default function UnlockProgress({ theme, price }: { theme: string; price: number }) {
  const gems = useGameStore((state) => state.gems);
  const progress = Math.min(gems / price * 100, 100);

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between text-xs text-white/70 mb-1">
        <span>{gems} / {price} gems</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <div className="h-2 bg-black/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
        />
      </div>
    </div>
  );
} 