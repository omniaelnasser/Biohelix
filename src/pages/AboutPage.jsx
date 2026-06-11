import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, CheckCircle, Globe, FlaskConical, BadgeCheck } from 'lucide-react';
import CoreValueCard from '../components/CoreValueCard';
import styles from './AboutPage.module.css';
import CityBackground3D from '../components/CityBackground3D';

const AboutPage = () => {
  return (
    <div className={styles.pageContainer}>
      {/* HERO SECTION - FULL WIDTH 3D BACKGROUND */}
      <section className={styles.heroSection}>
        <CityBackground3D />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroTextContent}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className={styles.title}>About BioHelix</h1>
            <h2 className={styles.subtitle}>Pharmaceutical Innovation & Global Healthcare Excellence</h2>
            <p className={styles.description}>
              BioHelix is a leading pharmaceutical company committed to advancing healthcare through innovation, safety, and scientific precision. Based in the UAE, we deliver high-quality pharmaceutical and aesthetic solutions trusted globally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* COMPANY OVERVIEW SECTION */}
      <section className={styles.overviewSection}>
        <div className={styles.sectionBackground}>
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2670&auto=format&fit=crop"
            alt="Futuristic UAE Architecture"
            className={styles.backgroundImage}
          />
          <div className={styles.backgroundOverlay}></div>
        </div>

        <div className={styles.overviewContainer}>
          <motion.div
            className={styles.overviewContent}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.overviewCard}>
              <h3>Company Overview</h3>
              <ul>
                <li>UAE-based pharmaceutical manufacturing company</li>
                <li>Focus on R&D and innovation</li>
                <li>Strict global pharmaceutical compliance</li>
                <li>High-quality production standards</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className={styles.missionVisionSection}>
        <div className={styles.gridContainer}>
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.cardHeader}>
              <Activity className={styles.headerIcon} />
              <h3>Mission</h3>
            </div>
            <p className={styles.mainStatement}>
              Deliver safe, effective, and innovative pharmaceutical solutions that enhance global healthcare outcomes.
            </p>
            <p className={styles.expandedText}>
              We are committed to advancing patient care through science-driven research, rigorous quality standards, and continuous innovation in pharmaceutical and biomedical development.
            </p>
          </motion.div>

          <motion.div
            className={styles.card}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.cardHeader}>
              <Globe className={styles.headerIcon} />
              <h3>Vision</h3>
            </div>
            <p className={styles.mainStatement}>
              To become a globally recognized leader in pharmaceutical and biomedical innovation.
            </p>
            <p className={styles.expandedText}>
              We aim to redefine the future of healthcare by integrating cutting-edge technologies, fostering research excellence, and delivering transformative solutions that improve quality of life worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className={styles.valuesSection}>
        {/* Molecular Video Background */}
        <video
          className={styles.valuesVideo}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2670&auto=format&fit=crop"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-medical-science-dna-molecule-animation-22467-large.mp4" type="video/mp4" />
        </video>

        {/* Premium Overlay Layer */}
        <div className={styles.valuesOverlay}></div>

        <div className={styles.valuesContainer}>
          <motion.div
            className={styles.valuesHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>Core Values</h2>
          </motion.div>
          <div className={styles.valuesGrid}>
          {[
            {
              icon: FlaskConical,
              title: 'Innovation',
              delay: 0.1,
              desc: 'We drive continuous pharmaceutical R&D advancement to create breakthrough biotech therapies. Our commitment to modern molecular science ensures we remain at the forefront of global clinical solutions.'
            },
            {
              icon: ShieldCheck,
              title: 'Safety',
              delay: 0.2,
              desc: 'We uphold strict regulatory compliance to ensure absolute patient safety across all product lines. Every formulation undergoes rigorous clinical testing to guarantee unmatched reliability and pharmaceutical-grade standards.'
            },
            {
              icon: BadgeCheck,
              title: 'Quality',
              delay: 0.3,
              desc: 'We are committed to uncompromising manufacturing excellence and rigorous quality assurance protocols. Our state-of-the-art facilities ensure that every clinical batch delivers predictable, premium-grade therapeutic results.'
            },
            {
              icon: Globe,
              title: 'Global Trust',
              delay: 0.4,
              desc: 'We forge strategic international partnerships to deliver reliable, world-class healthcare globally. By maintaining the highest level of corporate transparency, we have built enduring credibility with top-tier medical institutions.'
            }
          ].map((value, index) => (
            <CoreValueCard
              key={index}
              title={value.title}
              icon={value.icon}
              description={value.desc}
              delay={value.delay}
            />
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default AboutPage;
