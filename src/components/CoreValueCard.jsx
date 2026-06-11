import React from 'react';
import { motion } from 'framer-motion';
import styles from './CoreValueCard.module.css';

const CoreValueCard = ({ title, icon: Icon, description, delay = 0 }) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} size={32} strokeWidth={1.5} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </motion.div>
  );
};

export default CoreValueCard;
