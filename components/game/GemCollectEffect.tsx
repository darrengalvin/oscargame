'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GemEffectProps {
  position: { x: number; y: number };
  value: number;
}

export default function GemCollectEffect({ position, value }: GemEffectProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -50 }}
          exit={{ opacity: 0 }}
          className="fixed pointer-events-none text-yellow-300 font-bold text-lg"
          style={{ left: position.x, top: position.y }}
        >
          +{value}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 