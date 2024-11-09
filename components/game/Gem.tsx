'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';
import { Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

interface GemProps {
  position: [number, number, number];
  pattern?: 'line' | 'zigzag' | 'wave';
}

export default function Gem({ position: initialPosition, pattern = 'line' }: GemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { worldPosition, collectGem, playerPosition } = useGameStore();
  const gemRef = useRef<THREE.Mesh>(null);
  const [isCollected, setIsCollected] = useState(false);
  const [baseY] = useState(initialPosition[1]);
  const [offset] = useState(Math.random() * Math.PI * 2);

  // Create gem materials with blue crystal appearance
  const gemMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#4169E1'), // Royal Blue base color
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.9, // High transmission for crystal look
    thickness: 0.5,
    envMapIntensity: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    ior: 2.5, // High Index of Refraction for crystal effect
    attenuationColor: new THREE.Color('#00BFFF'), // Deep Sky Blue
    attenuationDistance: 0.5,
    opacity: 0.9,
    transparent: true,
  });

  // Create inner glow material
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#00BFFF'),
    transparent: true,
    opacity: 0.5,
  });

  useFrame((state) => {
    if (groupRef.current && !isCollected) {
      // Base position following world movement
      const currentX = initialPosition[0] - worldPosition;
      groupRef.current.position.x = currentX;
      
      // Add pattern-specific movement
      switch (pattern) {
        case 'zigzag':
          groupRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 2 + offset) * 0.3;
          break;
        case 'wave':
          groupRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime + offset) * 0.2;
          groupRef.current.position.z = Math.cos(state.clock.elapsedTime + offset) * 0.2;
          break;
        default: // 'line'
          groupRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 2 + offset) * 0.1;
      }

      // Check collision with player
      const gemPosition = new THREE.Vector3(currentX, groupRef.current.position.y, groupRef.current.position.z);
      const playerPos = new THREE.Vector3(playerPosition.x, playerPosition.y, playerPosition.z);
      const distance = gemPosition.distanceTo(playerPos);

      if (distance < 1 && !isCollected) {
        handleCollect(state.camera);
      }

      // Rotation animation
      if (gemRef.current) {
        gemRef.current.rotation.y += 0.02;
        gemRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      }
    }
  });

  const handleCollect = (camera: THREE.Camera) => {
    if (!isCollected && gemRef.current && groupRef.current) {
      setIsCollected(true);
      
      // Hide the gem immediately
      gemRef.current.visible = false;
      groupRef.current.visible = false;
      
      // Get gem's screen position
      const gemWorldPos = new THREE.Vector3();
      gemRef.current.getWorldPosition(gemWorldPos);
      
      // Convert to screen coordinates
      const widthHalf = window.innerWidth / 2;
      const heightHalf = window.innerHeight / 2;
      const vector = gemWorldPos.project(camera);
      const x = (vector.x * widthHalf) + widthHalf;
      const y = -(vector.y * heightHalf) + heightHalf;

      // Create floating gem emoji with blue gem
      const gemElement = document.createElement('div');
      gemElement.className = 'fixed pointer-events-none z-50 text-2xl';
      gemElement.style.left = `${x}px`;
      gemElement.style.top = `${y}px`;
      gemElement.innerHTML = '💎';
      gemElement.style.filter = 'hue-rotate(220deg)'; // Adjust hue to make it blue
      document.body.appendChild(gemElement);

      // Animate to gem counter with scaling and rotation
      const gemCounter = document.querySelector('.gem-counter');
      if (gemCounter) {
        const rect = gemCounter.getBoundingClientRect();
        gemElement.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        gemElement.style.transform = 'rotate(360deg) scale(0.5)';
        gemElement.style.left = `${rect.left}px`;
        gemElement.style.top = `${rect.top}px`;
        gemElement.style.opacity = '0';

        setTimeout(() => {
          document.body.removeChild(gemElement);
          collectGem();
        }, 500);
      }
    }
  };

  // Don't render anything if collected
  if (isCollected) return null;

  return (
    <group ref={groupRef} position={initialPosition}>
      {/* Main gem */}
      <Icosahedron
        ref={gemRef}
        args={[0.3, 1]}
      >
        <primitive object={gemMaterial} attach="material" />
      </Icosahedron>

      {/* Inner glow */}
      <Icosahedron args={[0.2, 1]}>
        <primitive object={glowMaterial} attach="material" />
      </Icosahedron>

      {/* Blue point lights for glow effect */}
      <pointLight
        color="#4169E1"
        intensity={0.5}
        distance={1}
      />
      <pointLight
        color="#00BFFF"
        intensity={2}
        distance={0.2}
        position={[0.1, 0.1, 0.1]}
      />

      {/* Sparkle effect */}
      <pointLight
        color="#FFFFFF"
        intensity={1.5}
        distance={0.1}
        position={[0.2, 0.2, 0.2]}
      />
    </group>
  );
} 