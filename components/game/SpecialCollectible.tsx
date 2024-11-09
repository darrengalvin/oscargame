'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';
import { Sphere, Html } from '@react-three/drei';
import { themes } from '@/config/themes';

export default function SpecialCollectible() {
  const groupRef = useRef<THREE.Group>(null);
  const { worldPosition, currentTheme, collectSpecialItem } = useGameStore();
  const theme = themes[currentTheme];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = -worldPosition;
      // Floating animation
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.002;
      // Rotation animation
      groupRef.current.rotation.y += 0.01;
    }
  });

  const specialItem = theme.collectibles.find(c => c.points === 10);
  if (!specialItem) return null;

  return (
    <group ref={groupRef}>
      <Sphere args={[0.5, 32, 32]} onClick={() => collectSpecialItem(currentTheme, specialItem.type)}>
        <meshStandardMaterial
          color={specialItem.color}
          emissive={specialItem.color}
          emissiveIntensity={0.5}
          metalness={1}
          roughness={0}
        />
        <Html>
          <div className="px-2 py-1 bg-black/50 text-white rounded text-sm whitespace-nowrap">
            {specialItem.type}
          </div>
        </Html>
      </Sphere>
      {/* Glow effect */}
      <pointLight
        color={specialItem.color}
        intensity={2}
        distance={3}
      />
    </group>
  );
} 