'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sky, Cloud, Stars, useTexture } from '@react-three/drei';
import { useGameStore } from '@/store/gameStore';
import * as THREE from 'three';

export default function Environment() {
  const cloudsRef = useRef<THREE.Group>(null);
  const mountainsRef = useRef<THREE.Group>(null);
  const worldPosition = useGameStore((state) => state.worldPosition);

  // Create repeating patterns for ground
  const groundPattern = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#228B22';
      context.fillRect(0, 0, 128, 128);
      
      // Add some texture
      context.fillStyle = '#1a6b1a';
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * 128;
        const y = Math.random() * 128;
        const size = 2 + Math.random() * 4;
        context.fillRect(x, y, size, size);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(100, 100);
    return texture;
  }, []);

  useFrame(() => {
    if (cloudsRef.current) {
      cloudsRef.current.position.x = -worldPosition * 0.5;
    }
    if (mountainsRef.current) {
      mountainsRef.current.position.x = -worldPosition * 0.3;
    }
  });

  return (
    <>
      {/* Dynamic sky with sun position based on score */}
      <Sky
        distance={450000}
        sunPosition={[Math.sin(worldPosition * 0.001) * 2, 1, 0]}
        inclination={0.5}
        azimuth={0.25}
      />

      {/* Stars that become visible during "night" */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Clouds with parallax effect */}
      <group ref={cloudsRef}>
        {[...Array(20)].map((_, i) => (
          <Cloud
            key={i}
            position={[
              (i - 10) * 4,
              Math.sin(i) * 2 + 8,
              -5 - Math.random() * 10
            ]}
            opacity={0.5}
            speed={0.4}
            width={1 + Math.random() * 3}
            depth={Math.random() * 0.5}
          />
        ))}
      </group>

      {/* Textured ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial 
          map={groundPattern}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Mountains with more detail */}
      <group ref={mountainsRef}>
        {[...Array(15)].map((_, i) => {
          const height = 10 + Math.random() * 15;
          return (
            <group key={i} position={[(i - 7) * 20, -2, -20]}>
              <mesh>
                <coneGeometry args={[5 + Math.random() * 5, height, 8]} />
                <meshStandardMaterial 
                  color="#4A5568"
                  metalness={0.2}
                  roughness={1}
                  flatShading
                />
              </mesh>
              {/* Snow caps */}
              <mesh position={[0, height * 0.4, 0]}>
                <coneGeometry args={[3, height * 0.2, 8]} />
                <meshStandardMaterial 
                  color="white"
                  metalness={0.1}
                  roughness={0.8}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Fog for depth */}
      <fog attach="fog" args={['#87CEEB', 30, 100]} />
    </>
  );
} 