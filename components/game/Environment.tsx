'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  Sky, 
  Cloud, 
  Stars, 
  useTexture, 
  Environment as DreiEnvironment,
  Sparkles,
  shaderMaterial
} from '@react-three/drei';
import { 
  EffectComposer,
  Vignette,
  Bloom
} from '@react-three/postprocessing';
import { useGameStore } from '@/store/gameStore';
import { themes } from '@/config/themes';
import { ThemeName } from '@/types/theme';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { BlendFunction } from 'postprocessing';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      groundShaderMaterial: any; // Or define a more specific type if needed
    }
  }
}

// Custom shader for the ground effect
const GroundShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.2, 0.2),
    gridColor: new THREE.Color(0.4, 0.4, 0.4),
  },
  // Vertex shader
  /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  /*glsl*/ `
    uniform float time;
    uniform vec3 color;
    uniform vec3 gridColor;
    varying vec2 vUv;
    
    void main() {
      vec2 grid = abs(fract(vUv * 50.0 - 0.5) - 0.5) / fwidth(vUv * 50.0);
      float line = min(grid.x, grid.y);
      float gridMask = 1.0 - min(line, 1.0);
      
      // Add wave effect
      float wave = sin(vUv.x * 20.0 + time) * 0.5 + 0.5;
      
      vec3 finalColor = mix(color, gridColor, gridMask * wave);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ GroundShaderMaterial });

type ThemeBackgroundProps = {
  position: number;
};

type ThemeBackgroundComponent = ({ position }: ThemeBackgroundProps) => JSX.Element;

const ThemeBackgrounds: Record<ThemeName, ThemeBackgroundComponent> = {
  prehistoric: ({ position }: ThemeBackgroundProps) => (
    <group position={[-position * 0.3, 0, -20]}>
      {/* Enhanced prehistoric environment */}
      <Sparkles 
        count={50} 
        scale={50} 
        size={2} 
        speed={0.4} 
        opacity={0.1} 
        color="#FFA500" 
      />
      {[...Array(10)].map((_, i) => (
        <group key={i} position={[(i - 5) * 15, -2, 0]}>
          <mesh>
            <coneGeometry args={[4, 8, 6]} />
            <meshStandardMaterial 
              color="#8B4513"
              roughness={0.8}
              metalness={0.2}
              normalScale={new THREE.Vector2(1, 1)}
            />
          </mesh>
          {/* Add lava effect */}
          <mesh position={[0, 4, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial
              emissive="#FF4500"
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  ),

  underwater: ({ position }: ThemeBackgroundProps) => (
    <group position={[-position * 0.3, 0, -20]}>
      {/* Coral reefs */}
      {[...Array(15)].map((_, i) => (
        <group key={i} position={[(i - 7) * 8, -4, 0]}>
          <mesh>
            <sphereGeometry args={[1 + Math.random(), 8, 8]} />
            <meshStandardMaterial color="#FF7F50" />
          </mesh>
          {/* Seaweed */}
          {[...Array(3)].map((_, j) => (
            <mesh key={j} position={[Math.random() - 0.5, 2 + j, Math.random() - 0.5]}>
              <cylinderGeometry args={[0.1, 0.1, 2]} />
              <meshStandardMaterial color="#20B2AA" />
            </mesh>
          ))}
        </group>
      ))}
      {/* Bubbles */}
      {[...Array(30)].map((_, i) => (
        <mesh key={`bubble-${i}`} position={[
          (i - 15) * 4 + Math.sin(Date.now() * 0.001 + i) * 2,
          Math.sin(Date.now() * 0.001 + i) * 5,
          -10
        ]}>
          <sphereGeometry args={[0.2]} />
          <meshStandardMaterial transparent opacity={0.3} color="#87CEEB" />
        </mesh>
      ))}
    </group>
  ),

  candy: ({ position }: ThemeBackgroundProps) => (
    <group position={[-position * 0.3, 0, -20]}>
      {/* Lollipop trees */}
      {[...Array(10)].map((_, i) => (
        <group key={i} position={[(i - 5) * 12, -2, 0]}>
          <mesh position={[0, 3, 0]}>
            <sphereGeometry args={[2]} />
            <meshStandardMaterial color={`hsl(${i * 36}, 70%, 70%)`} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 4]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ))}
      {/* Cotton candy clouds */}
      {[...Array(8)].map((_, i) => (
        <mesh key={`cotton-${i}`} position={[(i - 4) * 15, 5, -5]}>
          <sphereGeometry args={[2]} />
          <meshStandardMaterial color="#FFB6C1" opacity={0.8} transparent />
        </mesh>
      ))}
    </group>
  ),

  space: ({ position }: ThemeBackgroundProps) => (
    <group position={[-position * 0.3, 0, -20]}>
      {/* Planets */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[(i - 2) * 20, Math.sin(i) * 5, -10]}>
          <sphereGeometry args={[2 + Math.random() * 2]} />
          <meshStandardMaterial 
            color={`hsl(${i * 72}, 70%, 50%)`}
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>
      ))}
      {/* Asteroids */}
      {[...Array(20)].map((_, i) => (
        <mesh key={`asteroid-${i}`} 
          position={[
            (i - 10) * 8,
            Math.sin(i) * 8,
            -15
          ]}
          rotation={[Math.random(), Math.random(), Math.random()]}
        >
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#808080" />
        </mesh>
      ))}
    </group>
  ),

  jungle: ({ position }: ThemeBackgroundProps) => (
    <group position={[-position * 0.3, 0, -20]}>
      {/* Dense trees */}
      {[...Array(20)].map((_, i) => (
        <group key={i} position={[(i - 10) * 6, -2, -5 - Math.random() * 10]}>
          <mesh position={[0, 3, 0]}>
            <sphereGeometry args={[2]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.5, 4]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          {/* Vines */}
          {[...Array(3)].map((_, j) => (
            <mesh key={j} position={[Math.random() - 0.5, 2 + j, Math.random() - 0.5]}>
              <cylinderGeometry args={[0.05, 0.05, 3]} />
              <meshStandardMaterial color="#32CD32" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
};

export default function Environment() {
  const cloudsRef = useRef<THREE.Group>(null);
  const worldPosition = useGameStore((state) => state.worldPosition);
  const currentTheme = useGameStore((state) => state.currentTheme);
  const theme = themes[currentTheme];
  const groundRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (cloudsRef.current) {
      cloudsRef.current.position.x = -worldPosition * 0.5;
    }
    if (groundRef.current) {
      groundRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  const ThemeBackground = ThemeBackgrounds[currentTheme];

  return (
    <>
      {/* Environment map for realistic reflections */}
      <DreiEnvironment
        preset={currentTheme === 'space' ? 'night' : 'sunset'}
        background={currentTheme !== 'space'}
      />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          intensity={0.5}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.9}
        />
        <Vignette
          offset={0.5}
          darkness={0.5}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>

      {/* Dynamic sky */}
      {currentTheme !== 'space' && (
        <Sky
          distance={450000}
          sunPosition={[
            Math.sin(worldPosition * 0.001) * 2,
            Math.abs(Math.cos(worldPosition * 0.001)),
            Math.cos(worldPosition * 0.001) * 2
          ]}
          inclination={0.5}
          azimuth={0.25}
          mieCoefficient={0.001}
          rayleigh={3}
          turbidity={10}
        />
      )}

      {/* Theme-specific background */}
      <ThemeBackground position={worldPosition} />

      {/* Advanced ground effect */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[1000, 1000, 100, 100]} />
        <groundShaderMaterial 
          ref={groundRef}
          color={new THREE.Color(theme.groundColor)}
          gridColor={new THREE.Color(theme.platformColors.normal)}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Volumetric fog */}
      <fog 
        attach="fog" 
        args={[
          theme.backgroundColor,
          currentTheme === 'underwater' ? 15 : 30,
          currentTheme === 'space' ? 100 : 50
        ]} 
      />

      {/* Ambient particles */}
      <Sparkles
        count={500}
        scale={50}
        size={1}
        speed={0.3}
        opacity={0.1}
        color={theme.particleEffects.jump}
      />
    </>
  );
} 