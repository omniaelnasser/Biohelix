import React from 'react';
import styles from './Testimonials.module.css';
import { motion } from 'framer-motion';
import { ShieldCheck, Stethoscope, BadgeCheck, User } from 'lucide-react';

const testimonialsData = [
  {
    quote: "BioHelix has consistently provided us with unmatched quality in aesthetic formulations. Their attention to clinical detail is remarkable.",
    author: "Dr. Sarah Al Mansoori",
    role: "Chief Dermatologist",
    clinic: "Aesthetic Care Clinic, Dubai",
    icon: BadgeCheck
  },
  {
    quote: "The reliability of their pharmaceutical products ensures that our patients receive the standard of care they deserve. Truly a trusted partner.",
    author: "Dr. Ahmed Hassan",
    role: "Medical Director",
    clinic: "Premium Health Hospital, Abu Dhabi",
    icon: ShieldCheck
  },
  {
    quote: "Working with BioHelix has elevated our treatment outcomes. Their state-of-the-art innovations set a new benchmark in the industry.",
    author: "Dr. Elena Rostova",
    role: "Lead Surgeon",
    clinic: "Global Wellness Center",
    icon: Stethoscope
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Testimonials = () => {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className={styles.title}>Trusted by Healthcare Professionals</h2>
          <p className={styles.subtitle}>Hear from the experts who rely on our clinically proven solutions every day.</p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonialsData.map((testi, i) => {
            const IconComponent = testi.icon;
            return (
              <motion.div key={i} variants={cardVariants} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <IconComponent size={36} strokeWidth={1.5} className={styles.svgIcon} />
                </div>
                <p className={styles.quoteText}>{testi.quote}</p>
                <div className={styles.authorSection}>
                  <div className={styles.avatar}>
                    <User size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className={styles.authorName}>{testi.author}</h4>
                    <p className={styles.authorRole}>{testi.role}</p>
                    <p className={styles.clinic}>{testi.clinic}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
