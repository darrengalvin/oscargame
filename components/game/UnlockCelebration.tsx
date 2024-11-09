'use client';

import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Props {
  theme: string;
  onClose: () => void;
}

export default function UnlockCelebration({ theme, onClose }: Props) {
  useEffect(() => {
    // Shoot confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Auto close after 3 seconds
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-2xl shadow-2xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            🎉 New Theme Unlocked! 🎉
          </h2>
          <p className="text-xl text-white/90 mb-6">
            You've unlocked the {theme} theme!
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-purple-600 rounded-lg font-bold hover:bg-white/90 transition-colors"
          >
            Let's Play!
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 