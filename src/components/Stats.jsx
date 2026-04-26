import React, { useEffect, useState, useRef } from 'react';
import styles from './Stats.module.css';
import { motion, useInView } from 'framer-motion';

const statsData = [
  { label: 'Quality Assurance', target: 100, suffix: '%', desc: 'Compliant across standards' },
  { label: 'R&D Innovation', target: 50, suffix: '+', desc: 'Patented clinical formulas' },
  { label: 'Global Reach', target: 80, suffix: '+', desc: 'Countries supplying our tech' },
];

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000; 
    const increment = target / (duration / 16); 
    
    const animate = () => {
      start += increment;
      if (start < target) {
        setCount(Math.ceil(start));
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    animate();
  }, [isInView, target]);

  return <span ref={ref}>{count}</span>;
};

const Stats = () => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className={styles.title}>Global Reach, Local Excellence</h2>
        </motion.div>
        
        <div className={styles.grid}>
          {statsData.map((stat, i) => (
            <motion.div 
              key={i} 
              className={styles.statBox}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5, ease: "easeOut" }}
            >
              <div className={styles.numberWrapper}>
                <Counter target={stat.target} />
                <span className={styles.suffix}>{stat.suffix}</span>
              </div>
              <h3 className={styles.label}>{stat.label}</h3>
              <p className={styles.desc}>{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
