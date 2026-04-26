import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Capsule, Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const DNAHelix = () => {
  const groupRef = useRef();
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  const pointsCount = 60;
  const radius = isMobile ? 1.5 : 2.5;
  const heightScale = 0.4;

  const pairs = useMemo(() => {
    const temp = [];
    for (let i = 0; i < pointsCount; i++) {
      const t = i * 0.4;
      const tSub = t - (pointsCount * 0.4) / 2;

      const x1 = Math.sin(tSub) * radius;
      const z1 = Math.cos(tSub) * radius;
      const y = tSub * heightScale;

      const x2 = Math.sin(tSub + Math.PI) * radius;
      const z2 = Math.cos(tSub + Math.PI) * radius;

      temp.push({ x1, z1, x2, z2, y });
    }
    return temp;
  }, [pointsCount, radius, heightScale]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {pairs.map((pair, i) => (
        <group key={i}>
          <Sphere args={[0.15, 16, 16]} position={[pair.x1, pair.y, pair.z1]}>
            <meshStandardMaterial color="#ffffff" emissive="#10B981" emissiveIntensity={0.8} roughness={0.1} />
          </Sphere>
          <Sphere args={[0.15, 16, 16]} position={[pair.x2, pair.y, pair.z2]}>
            <meshStandardMaterial color="#10B981" emissive="#059669" emissiveIntensity={0.6} roughness={0.1} />
          </Sphere>
          <mesh position={[(pair.x1 + pair.x2)/2, pair.y, (pair.z1 + pair.z2)/2]} rotation={[0, -i * 0.4, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, radius * 2]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const FloatingCapsules = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      <Capsule args={[0.2, 0.6, 4, 16]} position={[3, 2, 2]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.7} />
      </Capsule>
      <Capsule args={[0.15, 0.4, 4, 16]} position={[-3, -2, 4]} rotation={[0, Math.PI / 3, Math.PI / 4]}>
        <meshStandardMaterial color="#10B981" roughness={0.1} metalness={0.8} />
      </Capsule>
      <Capsule args={[0.25, 0.7, 4, 16]} position={[-2, 3, -3]} rotation={[-Math.PI / 4, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#dff5e1" roughness={0.2} metalness={0.5} />
      </Capsule>
    </group>
  );
};

const MolecularParticles = () => {
  const pointsCount = 300;
  const positions = useMemo(() => {
    const array = new Float32Array(pointsCount * 3);
    for (let i = 0; i < pointsCount * 3; i++) {
      array[i] = (Math.random() - 0.5) * 30; // wider spread
    }
    return array;
  }, [pointsCount]);

  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.02;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3}>
        <PointMaterial transparent color="#10B981" size={0.15} sizeAttenuation={true} depthWrite={false} opacity={0.6}/>
      </Points>
    </group>
  );
};

const Hero3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 45 }} style={{ pointerEvents: 'none' }}>
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={1.2} color="#10B981" />
      
      <DNAHelix />
      <FloatingCapsules />
      <MolecularParticles />
    </Canvas>
  );
};

export default Hero3D;
