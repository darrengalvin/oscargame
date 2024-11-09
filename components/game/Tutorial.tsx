'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);

  const steps = [
    {
      title: "Welcome to Candy Land! 🍬",
      content: "Jump through platforms and collect gems to unlock exciting new themes!",
      image: "candy-tutorial.gif"
    },
    {
      title: "Collect Gems 💎",
      content: "Regular gems give 1 point, special items give 10 points! Get bonus points for perfect jumps!",
      image: "gems-tutorial.gif"
    },
    {
      title: "Unlock New Worlds 🌟",
      content: "Use your gems in the shop to unlock prehistoric, underwater, space, and jungle themes!",
      image: "themes-tutorial.gif"
    }
  ];

  useEffect(() => {
    const tutorialShown = localStorage.getItem('tutorialShown');
    if (tutorialShown) {
      setShowTutorial(false);
    }
  }, []);

  const completeTutorial = () => {
    localStorage.setItem('tutorialShown', 'true');
    setShowTutorial(false);
  };

  return (
    <AnimatePresence>
      {showTutorial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-b from-purple-600 to-indigo-600 rounded-2xl p-8 max-w-md mx-4"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-white/90 mb-6">
                {steps[currentStep].content}
              </p>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-6">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  className={`px-4 py-2 rounded-lg ${
                    currentStep === 0
                      ? 'bg-white/10 text-white/50 cursor-not-allowed'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  disabled={currentStep === 0}
                >
                  Previous
                </button>
                
                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="px-4 py-2 bg-white text-purple-600 rounded-lg font-bold hover:bg-white/90"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={completeTutorial}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold hover:from-green-600 hover:to-emerald-600"
                  >
                    Let&apos;s Play!
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 