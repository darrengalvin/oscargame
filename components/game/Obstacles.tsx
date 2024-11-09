'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';
import { Box } from '@react-three/drei';

export default function Obstacles() {
  const obstacles = useGameStore((state) => state.obstacles);
  const worldPosition = useGameStore((state) => state.worldPosition);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x = -worldPosition;
    }
  });

  return (
    <group ref={groupRef}>
      {obstacles.map((obstacle) => (
        <Box
          key={obstacle.id}
          position={[obstacle.position.x, obstacle.position.y, obstacle.position.z]}
          args={[1, 2, 1]}
        >
          <meshStandardMaterial color="green" />
        </Box>
      ))}
    </group>
  );
} 