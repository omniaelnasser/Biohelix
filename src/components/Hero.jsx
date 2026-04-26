import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import Hero3D from './Hero3D';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      
      {/* 3D Visual Block As Background */}
      <motion.div 
        className={styles.visualBlock}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Hero3D />
        <div className={styles.visualOverlay}></div>
      </motion.div>
      
      <div className={styles.container}>
        {/* Text Content */}
        <motion.div 
          className={styles.contentBox}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <motion.div 
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span className={styles.dot}></span>
            Factory in UAE
          </motion.div>
          
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Elevate Your Expectations <br />
            with <span className={styles.highlight}>BioHelix</span>
          </motion.h1>
          
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Your Gateway to Exceptional Pharmaceutical and Aesthetic Products in Abu Dhabi.
          </motion.p>
          
          <motion.div 
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <button className={styles.primaryBtn}>Explore Our Products</button>
            <Link to="/about" className={styles.secondaryBtn}>Learn More</Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
