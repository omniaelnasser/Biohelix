import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';

const Capsule = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={[1.5, 1.5, 1.5]}>
        <capsuleGeometry args={[1, 3, 32, 32]} />
        <meshPhysicalMaterial 
          color="#e0f2f1" 
          emissive="#2e7d32"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
};

const Medicine3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#0d47a1" />
      <Capsule />
      <Environment preset="city" />
    </Canvas>
  );
};

export default Medicine3D;
