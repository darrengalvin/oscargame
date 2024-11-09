'use client';

import { Canvas } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';
import Player from './game/Player';
import Obstacles from './game/Obstacles';
import Blocks from './game/Blocks';
import Environment from './game/Environment';
import UI from './game/UI';
import TouchControls from './game/TouchControls';

export default function Game() {
  const isPlaying = useGameStore((state) => state.isPlaying);
  const startGame = useGameStore((state) => state.startGame);

  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 60 }}
      >
        <Environment />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Player />
        <Obstacles />
        <Blocks />
      </Canvas>
      <UI />
      <TouchControls />
      
      {!isPlaying && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={startGame}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
} 