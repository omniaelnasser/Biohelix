import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Instances, Instance, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const DNAHelix = () => {
  const groupRef = useRef();
  
  // Configuration for the DNA helix
  const numPairs = 120;
  const radius = 2.5;
  const heightStr = 80;
  const turns = 10;
  
  const basePairs = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < numPairs; i++) {
      const t = i / numPairs;
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * heightStr;
      
      // Node A (Strand 1)
      const xA = Math.cos(angle) * radius;
      const zA = Math.sin(angle) * radius;
      
      // Node B (Strand 2)
      const xB = Math.cos(angle + Math.PI) * radius;
      const zB = Math.sin(angle + Math.PI) * radius;
      
      pairs.push({
        nodeA: [xA, y, zA],
        nodeB: [xB, y, zB],
        angle
      });
    }
    return pairs;
  }, [numPairs, radius, heightStr, turns]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow elegant rotation around its own axis (local Y)
      groupRef.current.rotation.y += delta * 0.15;
      // Subtle horizontal and vertical float
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 2]}>
      {/* Nodes (Atoms) */}
      <Instances range={numPairs * 2}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial 
          color="#10b981" 
          emissive="#10b981" 
          emissiveIntensity={0.5} 
          roughness={0.2}
          metalness={0.1}
        />
        {basePairs.map((pair, i) => (
          <React.Fragment key={i}>
            <Instance position={pair.nodeA} />
            <Instance position={pair.nodeB} />
          </React.Fragment>
        ))}
      </Instances>

      {/* Backbone / Connections */}
      <Instances range={numPairs}>
        <cylinderGeometry args={[0.04, 0.04, radius * 2, 8]} />
        <meshStandardMaterial 
          color="#d1fae5" 
          transparent
          opacity={0.6}
          roughness={0.5}
        />
        {basePairs.map((pair, i) => (
          <Instance 
            key={`bond-${i}`} 
            position={[0, pair.nodeA[1], 0]} 
            rotation={[Math.PI / 2, 0, -pair.angle]} 
          />
        ))}
      </Instances>
    </group>
  );
};

const Particles = () => {
  const particlesRef = useRef();
  const count = 150;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 80; // Wider volume for horizontal spread
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const scale = Math.random() * 0.5 + 0.2;
      const speed = Math.random() * 0.2 + 0.1;
      temp.push({ x, y, z, scale, speed, initialY: y });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      // Gentle floating animation
      const time = state.clock.elapsedTime;
      const y = particle.initialY + Math.sin(time * particle.speed + i) * 1.5;
      
      dummy.position.set(particle.x, y, particle.z);
      dummy.scale.set(particle.scale, particle.scale, particle.scale);
      dummy.updateMatrix();
      
      particlesRef.current.setMatrixAt(i, dummy.matrix);
    });
    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={particlesRef} args={[null, null, count]}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
    </instancedMesh>
  );
};

export const DNA3DBackground = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#10b981" />
        
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
          <DNAHelix />
        </Float>
        
        <Particles />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default DNA3DBackground;
