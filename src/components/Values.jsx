import React, { useRef, useMemo } from 'react';
import styles from './Values.module.css';
import { motion } from 'framer-motion';
import { FlaskConical, ShieldCheck, Factory, Globe } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';

// --- 3D DNA Component ---
const DNA = () => {
  const groupRef = useRef();
  
  const numPairs = 80;
  const radius = 1.2;
  const spread = 0.5; // distance between pairs along X
  
  const pairs = useMemo(() => {
    const temp = [];
    for (let i = 0; i < numPairs; i++) {
      const t = i / numPairs;
      const angle = t * Math.PI * 10; // 5 full twists
      const x = (i - numPairs / 2) * spread;
      
      const y1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const y2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      temp.push({ x, y1, z1, y2, z2, angle });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow continuous horizontal looping by rotating around X axis
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {pairs.map((p, i) => (
        <group key={i} position={[p.x, 0, 0]}>
          {/* Backbone 1 */}
          <mesh position={[0, p.y1, p.z1]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#10b981" emissive="#0d9488" emissiveIntensity={0.6} roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Backbone 2 */}
          <mesh position={[0, p.y2, p.z2]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#0ea5e9" emissive="#0284c7" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Connecting Rung */}
          <mesh rotation={[p.angle, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, radius * 2, 8]} />
            <meshStandardMaterial color="#99f6e4" transparent opacity={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const valuesData = [
  { icon: FlaskConical, title: 'Research-Driven Innovation', desc: 'Pioneering breakthrough scientific formulations.' },
  { icon: ShieldCheck, title: 'Strict Quality Control', desc: 'Uncompromising standard protocols ensuring 100% safety.' },
  { icon: Factory, title: 'State-of-the-Art Manufacturing', desc: 'Equipped with the finest technological advancements.' },
  { icon: Globe, title: 'Trusted Global Partner', desc: 'Supplying top-tier medical solutions worldwide.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Values = () => {
  return (
    <section className={styles.valuesSection} id="values">
      {/* 3D DNA Background Layer (Bottom) */}
      <div className={styles.dna3DWrapper}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#0ea5e9" />
          <DNA />
        </Canvas>
      </div>

      {/* Gradient Overlay Layer (Middle) */}
      <div className={styles.dnaOverlay}></div>

      {/* Content Layer (Top) */}
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Why Healthcare Professionals Trust BioHelix</h2>
          <p className={styles.subtitle}>Our core pillars ensuring excellence across every product line.</p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {valuesData.map((val, index) => {
            const IconComponent = val.icon;
            return (
              <motion.div key={index} variants={cardVariants} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <IconComponent className={styles.cardIcon} />
                </div>
                <h3 className={styles.cardTitle}>{val.title}</h3>
                <p className={styles.cardDesc}>{val.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Values;

