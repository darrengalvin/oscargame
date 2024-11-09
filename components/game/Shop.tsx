'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { themes } from '@/config/themes';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import UnlockProgress from './UnlockProgress';
import { ThemeName } from '@/types/theme';

const THEME_PRICES = {
  candy: 0,
  prehistoric: 100,
  underwater: 150,
  space: 200,
  jungle: 250,
} as const;

const THEME_IMAGES = {
  candy: 'https://images.unsplash.com/photo-1587583484084-6e47e9c107a9?w=800&auto=format',
  prehistoric: 'https://images.unsplash.com/photo-1619842504562-56aa49c95c67?w=800&auto=format',
  underwater: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&auto=format',
  space: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=800&auto=format',
  jungle: 'https://images.unsplash.com/photo-1536147116438-62679a5e01f2?w=800&auto=format',
} as const;

type ThemeKey = keyof typeof THEME_PRICES;

export default function Shop() {
  const [isOpen, setIsOpen] = useState(false);
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
                {Object.entries(themes).map(([themeKey, theme]) => {
                  const typedThemeKey = themeKey as ThemeName;
                  return (
                    <motion.div
                      key={themeKey}
                      whileHover={{ scale: 1.02 }}
                      className={`relative rounded-xl overflow-hidden ${
                        currentTheme === typedThemeKey
                          ? 'ring-4 ring-yellow-400'
                          : 'ring-1 ring-white/20'
                      }`}
                    >
                      {!unlockedThemes.includes(typedThemeKey) && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10">
                          {/* Theme name banner at top */}
                          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-violet-600/80 to-indigo-600/80 py-2 px-4">
                            <h3 className="text-xl font-bold text-white text-center">
                              {theme.displayName}
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
                                {THEME_PRICES[typedThemeKey as keyof typeof THEME_PRICES]} gems needed
                              </span>
                            </div>
                            <UnlockProgress theme={typedThemeKey} price={THEME_PRICES[typedThemeKey as keyof typeof THEME_PRICES]} />
                          </div>
                        </div>
                      )}
                      {/* Theme Image */}
                      <div className="relative h-48">
                        <Image
                          src={THEME_IMAGES[typedThemeKey as keyof typeof THEME_IMAGES]}
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
                          {THEME_PRICES[typedThemeKey as keyof typeof THEME_PRICES] > 0 && (
                            <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full">
                              <span className="text-yellow-300">💎</span>
                              <span className="text-white font-bold">
                                {THEME_PRICES[typedThemeKey as keyof typeof THEME_PRICES]}
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
                        {unlockedThemes.includes(typedThemeKey) ? (
                          <button
                            onClick={() => {
                              changeTheme(typedThemeKey);
                              setIsOpen(false);
                            }}
                            className={`w-full py-2 px-4 rounded-lg font-bold transition-all
                              ${
                                currentTheme === typedThemeKey
                                  ? 'bg-yellow-400 text-black'
                                  : 'bg-white/10 text-white hover:bg-white/20'
                              }`}
                          >
                            {currentTheme === typedThemeKey ? 'Selected' : 'Select'}
                          </button>
                        ) : (
                          <button
                            onClick={() => unlockTheme(typedThemeKey)}
                            disabled={gems < THEME_PRICES[typedThemeKey]}
                            className={`w-full py-2 px-4 rounded-lg font-bold
                              ${
                                gems >= THEME_PRICES[typedThemeKey]
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600'
                                  : 'bg-gray-500 text-white/50 cursor-not-allowed'
                              }`}
                          >
                            {THEME_PRICES[typedThemeKey] === 0
                              ? 'Free'
                              : `Unlock for 💎${THEME_PRICES[typedThemeKey]}`}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
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