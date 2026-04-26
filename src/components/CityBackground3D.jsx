import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

const Buildings = () => {
  const groupRef = useRef();

  // Generate building data
  const { buildings, count } = useMemo(() => {
    const list = [];
    const gridSize = 40;
    const spacing = 3;
    const offset = (gridSize * spacing) / 2;

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        // Leave a path in the middle
        if (Math.abs(x - gridSize / 2) < 3) continue;

        const posX = x * spacing - offset + (Math.random() - 0.5);
        const posZ = z * spacing - offset + (Math.random() - 0.5);
        
        // Closer to center = taller buildings
        const distanceToCenter = Math.sqrt(Math.pow(posX, 2) + Math.pow(posZ, 2));
        const maxHeight = Math.max(1, 30 - distanceToCenter * 0.5);
        
        const height = Math.random() * maxHeight + 2;
        
        list.push({
          position: [posX, height / 2, posZ],
          scale: [1 + Math.random(), height, 1 + Math.random()],
          color: new THREE.Color().setHSL(0.35 + Math.random() * 0.1, 0.8, 0.4 + Math.random() * 0.2), // Light green/teal tones
        });
      }
    }
    return { buildings: list, count: list.length };
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Slow camera/city movement effect by moving the group
      groupRef.current.position.z = (clock.getElapsedTime() * 2) % 6; // infinite scroll effect using modulo spacing
    }
  });

  return (
    <group ref={groupRef}>
      <Instances limit={count} renderOrder={1}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          metalness={0.8} 
          roughness={0.2} 
          emissive="#0d47a1" 
          emissiveIntensity={0.2} 
          transparent 
          opacity={0.9} 
        />
        {buildings.map((props, i) => (
          <Instance key={i} position={props.position} scale={props.scale} color={props.color} />
        ))}
      </Instances>
    </group>
  );
};

const FuturisticEnvironment = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} color="#e0f2f1" />
      <pointLight position={[0, 10, -10]} intensity={2} color="#2e7d32" distance={50} />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      <fog attach="fog" args={['#0f172a', 10, 60]} /> 
    </>
  );
};

const CityBackground3D = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#0f172a']} />
        <PerspectiveCamera makeDefault position={[0, 12, 25]} rotation={[-0.2, 0, 0]} fov={60} />
        <FuturisticEnvironment />
        <Buildings />
      </Canvas>
    </div>
  );
};

export default CityBackground3D;
