import React from 'react';
import styles from './About.module.css';
import { motion } from 'framer-motion';
import { Microscope, ShieldCheck, Activity } from 'lucide-react';

const About = () => {
  return (
    <section className={styles.aboutSection} id="about">
      {/* Background Graphic / Cinematic Image Placeholder Area */}
      <div className={styles.videoBackgroundWrapper}>
        <img 
          src="https://images.unsplash.com/photo-1631248055158-edec7a3c072b?q=80&w=2661&auto=format&fit=crop" 
          alt="Modern UAE Healthcare Facility" 
          className={styles.backgroundImage} 
        />
        <div className={styles.visualOverlay}></div>
      </div>

      <div className={styles.container}>
        <motion.div 
          className={styles.card}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.badge}>Our Mission</div>
          <h2 className={styles.title}>Uncompromising Pharmaceutical Quality</h2>
          <p className={styles.description}>
            BioHelix stands at the forefront of pharmaceutical advancement, dedicated 
            to engineering safety, driving innovation, and elevating global healthcare 
            standards. Our commitment to science translates into robust medical 
            solutions trusted by professionals worldwide.
          </p>

          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <div className={styles.iconWrapper}>
                <Microscope className={styles.featureIcon} />
              </div>
              <span className={styles.featureText}>Advanced Formula Research</span>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.iconWrapper}>
                <ShieldCheck className={styles.featureIcon} />
              </div>
              <span className={styles.featureText}>Uncompromised Safety Standards</span>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.iconWrapper}>
                <Activity className={styles.featureIcon} />
              </div>
              <span className={styles.featureText}>Clinical Grade Efficacy</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
