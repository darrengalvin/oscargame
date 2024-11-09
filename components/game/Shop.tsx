'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { themes } from '@/config/themes';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import UnlockProgress from './UnlockProgress';

const THEME_PRICES = {
  candy: 0,
  prehistoric: 100,
  underwater: 150,
  space: 200,
  jungle: 250,
} as const;

const THEME_IMAGES = {
  candy: 'https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=800&auto=format',
  prehistoric: 'https://images.unsplash.com/photo-1584844115436-473887b1e327?w=800&auto=format',
  underwater: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&auto=format',
  space: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format',
  jungle: 'https://images.unsplash.com/photo-1590094744345-5b7a2069e103?w=800&auto=format',
} as const;

type ThemeKey = keyof typeof THEME_PRICES;

export default function Shop() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const { gems, unlockedThemes, unlockTheme, currentTheme, changeTheme } = useGameStore();

  return (
    <>
      {/* Shop Button with Gem Count */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-gradient-to-r from-violet-600 to-indigo-600 
                   text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl
                   transform transition-all duration-200 flex items-center gap-3
                   hover:scale-105 active:scale-95"
      >
        <div className="relative">
          <span className="text-2xl">💎</span>
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold
                          rounded-full w-5 h-5 flex items-center justify-center">
            {gems}
          </span>
        </div>
        <span className="font-semibold">Shop</span>
      </button>

      {/* Shop Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 
                       overflow-y-auto py-10 px-4"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="max-w-4xl mx-auto bg-gradient-to-b from-gray-900 to-gray-800 
                         rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Shop Header */}
              <div className="p-6 bg-gradient-to-r from-violet-600 to-indigo-600">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-white">Theme Shop</h2>
                  <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg">
                    <span className="text-2xl">💎</span>
                    <span className="text-xl font-bold text-white">{gems}</span>
                  </div>
                </div>
                
                {/* How to Get Gems Guide */}
                <div className="mt-4 bg-black/20 rounded-lg p-4 text-white/90">
                  <h3 className="font-semibold mb-2">How to Earn Gems:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Collect gems while playing (1 gem each)</li>
                    <li>• Perfect platform jump (no double jump) (+3 gems)</li>
                    <li>• Collect special items (+10 gems)</li>
                    <li>• Collect 3 gems in a row (+5 bonus gems)</li>
                  </ul>
                </div>
              </div>

              {/* Themes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* Always show Candy Land first */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-xl overflow-hidden ring-4 ring-yellow-400"
                >
                  <div className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold z-10">
                    Free Starter Theme!
                  </div>
                  {/* Theme Image */}
                  <div className="relative h-48">
                    <Image
                      src={THEME_IMAGES.candy}
                      alt="Candy Land"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  {/* Theme Info */}
                  <div className="p-4 bg-black/40">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white">
                        Candy Land
                      </h3>
                      {THEME_PRICES.candy > 0 && (
                        <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full">
                          <span className="text-yellow-300">💎</span>
                          <span className="text-white font-bold">
                            {THEME_PRICES.candy}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Theme Features */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <span>🎮</span>
                        <span>Candy character</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <span>✨</span>
                        <span>Special collectibles</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    {unlockedThemes.includes('candy') ? (
                      <button
                        onClick={() => {
                          changeTheme('candy');
                          setIsOpen(false);
                        }}
                        className={`w-full py-2 px-4 rounded-lg font-bold transition-all
                          ${
                            currentTheme === 'candy'
                              ? 'bg-yellow-400 text-black'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                      >
                        {currentTheme === 'candy' ? 'Selected' : 'Select'}
                      </button>
                    ) : (
                      <button
                        onClick={() => unlockTheme('candy')}
                        disabled={gems < THEME_PRICES.candy}
                        className={`w-full py-2 px-4 rounded-lg font-bold
                          ${
                            gems >= THEME_PRICES.candy
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600'
                              : 'bg-gray-500 text-white/50 cursor-not-allowed'
                          }`}
                      >
                        {THEME_PRICES.candy === 0
                          ? 'Free'
                          : `Unlock for 💎${THEME_PRICES.candy}`}
                      </button>
                    )}
                  </div>
                </motion.div>

                {/* Show other themes with locked overlay if not unlocked */}
                {Object.entries(themes)
                  .filter(([key]) => key !== 'candy')
                  .map(([themeKey, theme]) => (
                    <motion.div
                      key={themeKey}
                      whileHover={{ scale: 1.02 }}
                      className={`relative rounded-xl overflow-hidden ${
                        currentTheme === themeKey
                          ? 'ring-4 ring-yellow-400'
                          : 'ring-1 ring-white/20'
                      }`}
                    >
                      {!unlockedThemes.includes(themeKey) && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10">
                          {/* Theme name banner at top */}
                          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-violet-600/80 to-indigo-600/80 py-2 px-4">
                            <h3 className="text-xl font-bold text-white text-center">
                              {theme.displayName}
                            </h3>
                          </div>
                          
                          {/* Lock icon */}
                          <div className="absolute top-16 right-4 bg-black/60 p-2 rounded-full">
                            <span className="text-2xl">🔒</span>
                          </div>
                          
                          {/* Gem requirement banner */}
                          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2
                                          bg-gradient-to-r from-violet-600/80 to-indigo-600/80 py-3 px-4">
                            <div className="flex items-center justify-center gap-3">
                              <span className="text-2xl">💎</span>
                              <span className="text-white font-bold text-lg">
                                {THEME_PRICES[themeKey]} gems needed
                              </span>
                            </div>
                            <UnlockProgress theme={themeKey} price={THEME_PRICES[themeKey]} />
                          </div>
                        </div>
                      )}
                      {/* Theme Image */}
                      <div className="relative h-48">
                        <Image
                          src={THEME_IMAGES[themeKey]}
                          alt={theme.displayName}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>
                      {/* Theme Info */}
                      <div className="p-4 bg-black/40">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-white">
                            {theme.displayName}
                          </h3>
                          {THEME_PRICES[themeKey] > 0 && (
                            <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full">
                              <span className="text-yellow-300">💎</span>
                              <span className="text-white font-bold">
                                {THEME_PRICES[themeKey]}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Theme Features */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-white/80 text-sm">
                            <span>🎮</span>
                            <span>{theme.playerModel} character</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/80 text-sm">
                            <span>✨</span>
                            <span>Special collectibles</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        {unlockedThemes.includes(themeKey) ? (
                          <button
                            onClick={() => {
                              changeTheme(themeKey);
                              setIsOpen(false);
                            }}
                            className={`w-full py-2 px-4 rounded-lg font-bold transition-all
                              ${
                                currentTheme === themeKey
                                  ? 'bg-yellow-400 text-black'
                                  : 'bg-white/10 text-white hover:bg-white/20'
                              }`}
                          >
                            {currentTheme === themeKey ? 'Selected' : 'Select'}
                          </button>
                        ) : (
                          <button
                            onClick={() => unlockTheme(themeKey)}
                            disabled={gems < THEME_PRICES[themeKey]}
                            className={`w-full py-2 px-4 rounded-lg font-bold
                              ${
                                gems >= THEME_PRICES[themeKey]
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600'
                                  : 'bg-gray-500 text-white/50 cursor-not-allowed'
                              }`}
                          >
                            {THEME_PRICES[themeKey] === 0
                              ? 'Free'
                              : `Unlock for 💎${THEME_PRICES[themeKey]}`}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
              </div>

              {/* Close Button */}
              <div className="p-6 bg-black/20">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-white/10 rounded-lg text-white 
                             hover:bg-white/20 transition-colors font-semibold"
                >
                  Close Shop
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 