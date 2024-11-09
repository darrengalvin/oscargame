'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';
import { Box } from '@react-three/drei';

export default function Blocks() {
  const blocks = useGameStore((state) => state.blocks);
  const worldPosition = useGameStore((state) => state.worldPosition);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = -worldPosition;
    }
  });

  return (
    <group ref={groupRef}>
      {blocks.map((block) => (
        <Box
          key={block.id}
          position={[
            block.position.x,
            block.position.y + (block.type === 'moving' 
              ? Math.sin(Date.now() * 0.003) * 0.5 
              : 0),
            block.position.z
          ]}
          args={[2, 0.5, 1]}
        >
          <meshStandardMaterial 
            color={block.type === 'moving' ? '#4a9eff' : '#2c5282'}
            metalness={0.5}
            roughness={0.5}
            opacity={0.9}
            transparent
          />
        </Box>
      ))}
    </group>
  );
} 