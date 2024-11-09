'use client';

import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface DinosaurGLTF extends THREE.Object3D {
  nodes: {
    body: THREE.Mesh<THREE.BufferGeometry, THREE.Material>
  };
  materials: {
    dinosaur: THREE.Material
  };
}

export default function DinosaurModel({ scale = 1, ...props }) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/models/dinosaur.glb') as unknown as DinosaurGLTF;

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