'use client';

import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function DinosaurModel({ scale = 1, ...props }) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF('/models/dinosaur.glb');

  return (
    <group ref={group} {...props} scale={[scale, scale, scale]}>
      <mesh
        geometry={nodes.body.geometry}
        material={materials.dinosaur}
      />
      {/* Add more mesh components based on your model */}
    </group>
  );
} 