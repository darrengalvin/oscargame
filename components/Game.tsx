'use client';

import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';
import Player from './game/Player';
import Obstacles from './game/Obstacles';
import Blocks from './game/Blocks';
import Environment from './game/Environment';
import UI from './game/UI';
import TouchControls from './game/TouchControls';
import Shop from './game/Shop';
import Collectibles from './game/Collectibles';
import SpecialCollectible from './game/SpecialCollectible';
import Gem from './game/Gem';

export default function Game() {
  const { isPlaying, initializeProgress } = useGameStore();
  const startGame = useGameStore((state) => state.startGame);

  // Initialize saved progress when component mounts
  useEffect(() => {
    initializeProgress();
  }, [initializeProgress]);

  // Generate gem patterns
  const gemPatterns = [
    // Line of 3 gems
    ...[...Array(10)].map((_, i) => (
      <Gem 
        key={`line-${i}`} 
        position={[i * 8, 2, 0]} 
        pattern="line"
      />
    )),
    // Zigzag pattern
    ...[...Array(8)].map((_, i) => (
      <Gem 
        key={`zigzag-${i}`} 
        position={[i * 10 + 15, 1.5 + (i % 2), 0]} 
        pattern="zigzag"
      />
    )),
    // Wave pattern
    ...[...Array(6)].map((_, i) => (
      <Gem 
        key={`wave-${i}`} 
        position={[i * 12 + 30, 2, 0]} 
        pattern="wave"
      />
    ))
  ];

  return (
    <div className="w-full h-screen relative">
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <Environment />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Player />
        <Obstacles />
        <Blocks />
        <Collectibles />
        <SpecialCollectible />
        {gemPatterns}
      </Canvas>
      
      {/* UI Elements */}
      <UI />
      <TouchControls />
      <Shop />
      
      {!isPlaying && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={() => startGame()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
} 