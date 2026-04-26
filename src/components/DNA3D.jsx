import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const DNATheme = {
  primary: '#2e7d32', // Darker green for depth
  glow: '#81c784' // Lighter green for glow
};

const Helix = () => {
  const groupRef = useRef();
  
  // Create geometry instance
  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.2, 16, 16), []);
  const matPrimary = useMemo(() => new THREE.MeshPhysicalMaterial({ 
    color: DNATheme.primary, 
    emissive: DNATheme.glow,
    emissiveIntensity: 0.5,
    roughness: 0.2,
    metalness: 0.8,
  }), []);

  const numPairs = 40;
  const radius = 2;
  const heightStep = 0.4;
  const angleStep = 0.3;

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.2;
    groupRef.current.rotation.x = Math.PI / 2; // Lie horizontally
  });

  return (
    <group ref={groupRef}>
      {[...Array(numPairs)].map((_, i) => {
        const y = (i - numPairs / 2) * heightStep;
        const angle = i * angleStep;

        const x1 = Math.cos(angle) * radius;
        const z1 = Math.sin(angle) * radius;

        const x2 = Math.cos(angle + Math.PI) * radius;
        const z2 = Math.sin(angle + Math.PI) * radius;

        return (
          <group key={i}>
            <mesh geometry={sphereGeo} material={matPrimary} position={[x1, y, z1]} />
            <mesh geometry={sphereGeo} material={matPrimary} position={[x2, y, z2]} />
            {/* The connecting rod */}
            <mesh position={[(x1 + x2) / 2, y, (z1 + z2) / 2]} rotation={[Math.PI / 2, angle, 0]}>
              <cylinderGeometry args={[0.05, 0.05, radius * 2, 8]} />
              <meshBasicMaterial color={DNATheme.glow} transparent opacity={0.5} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

const DNA3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <Helix />
      <Environment preset="city" />
      <fog attach="fog" args={['#dff5e1', 10, 25]} />
    </Canvas>
  );
};

export default DNA3D;
