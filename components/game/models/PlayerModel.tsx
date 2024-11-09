'use client';

import { useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { themes } from '@/config/themes';
import * as THREE from 'three';

// Prehistoric Theme Model
const DinosaurModel = ({ color = '#4A5568' }) => (
  <group>
    <mesh>
      <boxGeometry args={[1, 0.8, 0.6]} />
      <meshStandardMaterial color={color} />
    </mesh>
    {/* Spikes */}
    <mesh position={[0, 0.5, 0]}>
      <coneGeometry args={[0.2, 0.4, 4]} />
      <meshStandardMaterial color={color} />
    </mesh>
    {/* Tail */}
    <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
      <boxGeometry args={[0.6, 0.2, 0.2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  </group>
);

// Underwater Theme Model
const FishModel = ({ color = '#4682B4' }) => (
  <group>
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
    {/* Tail fin */}
    <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <coneGeometry args={[0.3, 0.6, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  </group>
);

// Space Theme Model
const AstronautModel = ({ color = '#FFFFFF' }) => (
  <group>
    {/* Helmet */}
    <mesh>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
    {/* Body */}
    <mesh position={[0, -0.5, 0]}>
      <boxGeometry args={[0.8, 0.8, 0.4]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.5} />
    </mesh>
  </group>
);

type ThemeName = keyof typeof themes;

type ModelMap = {
  [K in ThemeName]: ({ color }: { color?: string }) => JSX.Element;
};

const modelMap: ModelMap = {
  prehistoric: DinosaurModel,
  underwater: FishModel,
  space: AstronautModel,
  candy: DinosaurModel,
  jungle: DinosaurModel,
};

export default function PlayerModel() {
  const currentTheme = useGameStore((state) => state.currentTheme);
  const theme = themes[currentTheme];

  const ThemedModel = modelMap[currentTheme];
  return <ThemedModel />;
} 