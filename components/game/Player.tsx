'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';
import PlayerModel from './models/PlayerModel';
import type { Group } from 'three';

export default function Player() {
  const ref = useRef<Group>(null);
  const { 
    playerPosition, 
    isPlaying, 
    startJump,
    endJump,
    updateGameState,
    isJumping,
    isJumpHeld 
  } = useGameStore();

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.code === 'Space' || event.code === 'ArrowUp') && !event.repeat) {
      event.preventDefault();
      startJump();
    }
  }, [startJump]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
      event.preventDefault();
      endJump();
    }
  }, [endJump]);

  useEffect(() => {
    // Only add keyboard listeners on desktop
    if (window.matchMedia('(min-width: 768px)').matches) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [handleKeyDown, handleKeyUp]);

  useFrame((state, delta) => {
    if (!ref.current || !isPlaying) return;
    
    updateGameState(delta);
    
    // Update player position
    ref.current.position.x = playerPosition.x;
    ref.current.position.y = playerPosition.y;
    ref.current.position.z = playerPosition.z;

    // Add rotation and tilt when jumping
    if (isJumping) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 8) * 0.2;
      if (isJumpHeld) {
        ref.current.scale.y = 1.2;
        ref.current.scale.x = 0.9;
      } else {
        ref.current.scale.y = 1;
        ref.current.scale.x = 1;
      }
    } else {
      ref.current.rotation.z = 0;
      ref.current.scale.setScalar(1);
    }
  });

  return (
    <group
      ref={ref}
      position={[playerPosition.x, playerPosition.y, playerPosition.z]}
    >
      <PlayerModel />
    </group>
  );
}

