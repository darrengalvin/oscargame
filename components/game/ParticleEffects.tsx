'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';
import { themes } from '@/config/themes';
import * as THREE from 'three';

export default function ParticleEffects() {
  const particlesRef = useRef<THREE.Points>();
  const { currentTheme, isJumping, playerPosition } = useGameStore();
  const theme = themes[currentTheme];

  useEffect(() => {
    // Create particle system
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      vertices.push(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({
      size: 0.1,
      color: theme.particleEffects.jump === 'dust' ? '#8B4513' :
             theme.particleEffects.jump === 'bubbles' ? '#87CEEB' :
             '#FFFFFF'
    });

    if (particlesRef.current) {
      particlesRef.current.geometry = geometry;
      particlesRef.current.material = material;
    }
  }, [currentTheme]);

  useFrame((state) => {
    if (particlesRef.current && isJumping) {
      // Animate particles based on theme
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.1; // Fall down
        if (positions[i + 1] < -2) {
          positions[i + 1] = 2; // Reset position
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return <points ref={particlesRef} />;
} 