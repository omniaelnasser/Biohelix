import React from 'react';
import styles from './Facility.module.css';
import { motion } from 'framer-motion';

const Facility = () => {
  return (
    <section className={styles.facilitySection} id="facility">
      {/* Background Image Area */}
      <div className={styles.backgroundWrapper}>
        <img
          src="/pharmacist_lab_facility.png"
          alt="Pharmacist in an advanced manufacturing facility"
          className={styles.backgroundImage}
        />
        {/* Soft overlay to blend image into the section color and give a clinical feel */}
        <div className={styles.backgroundOverlay}></div>
      </div>

      <div className={styles.container}>
        {/* Floating Card Content */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.badge}>Our Infrastructure</div>
          <h2 className={styles.title}>Advanced Manufacturing Excellence in UAE</h2>
          <p className={styles.description}>
            Strategically located in Abu Dhabi, our state-of-the-art facility adheres to
            the most rigorous global pharmaceutical standards. Designed with precision
            engineering and equipped with advanced analytical laboratories, we guarantee
            unmatched purity and consistent quality in every batch.
          </p>
          <button className={styles.discoverBtn}>Discover Our Facility</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Facility;

