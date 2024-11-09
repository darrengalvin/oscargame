'use client';

import { useGameStore } from '@/store/gameStore';
import { themes } from '@/config/themes';

export default function ThemeSelector() {
  const { currentTheme, changeTheme } = useGameStore();

  return (
    <div className="absolute top-4 right-4 z-10">
      <select
        value={currentTheme}
        onChange={(e) => changeTheme(e.target.value)}
        className="bg-black/30 text-white px-4 py-2 rounded backdrop-blur-sm border border-white/20"
      >
        {Object.values(themes).map((theme) => (
          <option key={theme.name} value={theme.name}>
            {theme.displayName}
          </option>
        ))}
      </select>
    </div>
  );
} 