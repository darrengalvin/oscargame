'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';
import { themes } from '@/config/themes';
import { Sphere } from '@react-three/drei';

export default function Collectibles() {
  const groupRef = useRef<THREE.Group>(null);
  const { collectibles, worldPosition, currentTheme } = useGameStore();
  const theme = themes[currentTheme];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = -worldPosition;
      // Add floating animation
      groupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.002;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {collectibles.map((collectible) => (
        <Sphere
          key={collectible.id}
          position={[collectible.position.x, collectible.position.y, collectible.position.z]}
          args={[0.3, 16, 16]}
        >
          <meshStandardMaterial
            color={theme.collectibles.find(c => c.type === collectible.type)?.color || '#FFD700'}
            emissive={theme.collectibles.find(c => c.type === collectible.type)?.color || '#FFD700'}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      ))}
    </group>
  );
} 