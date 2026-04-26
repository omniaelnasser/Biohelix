import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Products.module.css';
import { motion } from 'framer-motion';
import { Pill, Sparkles, Droplet, Dna } from 'lucide-react';

const productCategories = [
  {
    title: 'Pharmaceutical Formulations',
    slug: 'pharmaceutical-formulations',
    desc: 'High-efficacy therapeutic formulas developed with rigorous clinical trial procedures.\nDesigned to meet the highest standards of safety, efficacy, and pharmaceutical innovation.',
    icon: Pill,
    image: '/pharma_formulations.png'
  },
  {
    title: 'Aesthetic Medical Products',
    slug: 'aesthetic-medical-products',
    desc: 'Advanced dermatology injectables and aesthetic enhancements for premium care.\nFormulated to deliver natural-looking results with superior biocompatibility and precision.',
    icon: Sparkles,
    image: '/aesthetic_products.png'
  },
  {
    title: 'Dermatology Solutions',
    slug: 'dermatology-solutions',
    desc: 'Topical treatments engineered to target profound skin health challenges safely.\nFocused on restoring skin balance while supporting long-term dermatological wellness.',
    icon: Droplet,
    image: '/derm_solutions.png'
  },
  {
    title: 'Healthcare Innovations',
    slug: 'healthcare-innovations',
    desc: 'Smart delivery systems and bio-compatible materials elevating patient recovery.\nBridging science and technology to redefine modern therapeutic approaches.',
    icon: Dna,
    image: '/healthcare_innovations.png'
  }
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

const Products = () => {
  return (
    <section className={styles.productsSection} id="products">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className={styles.title}>Our Pharmaceutical &amp; Aesthetic Solutions</h2>
          <div className={styles.accentLine}></div>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {productCategories.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <motion.div key={index} variants={cardVariants} className={styles.card}>
                {/* Top Image Area */}
                <div className={styles.cardImageWrapper}>
                  <img src={product.image} alt={product.title} className={styles.cardImage} />
                </div>
                
                {/* Bottom Content Area */}
                <div className={styles.cardContent}>
                  <div className={styles.titleWrapper}>
                    <div className={styles.cardIconWrapper}>
                      <IconComponent className={styles.cardIcon} />
                    </div>
                    <h3 className={styles.cardTitle}>{product.title}</h3>
                  </div>
                  <div className={styles.cardDesc}>
                    {product.desc.split('\n').map((line, i) => (
                      <span key={i} className={styles.descLine}>{line}</span>
                    ))}
                  </div>
                  <Link to={`/solutions/${product.slug}`} className={styles.exploreLink}>
                    Explore Details <span>→</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;

