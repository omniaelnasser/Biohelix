import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Pill,
  Sparkles,
  Droplet,
  Activity,
  Microscope,
  Factory,
  ShieldCheck,
  Globe,
  ArrowRight,
  CheckCircle2,
  Dna
} from 'lucide-react';
import DNA3DBackground from '../components/DNA3DBackground';
import styles from './ServicesPage.module.css';

const servicesList = [
  {
    title: 'Pharmaceutical Formulations',
    desc: 'High-efficacy therapeutic formulas developed with rigorous clinical trial procedures.',
    icon: Pill,
    slug: 'pharmaceutical-formulations'
  },
  {
    title: 'Aesthetic Medical Products',
    desc: 'Advanced dermatology injectables and aesthetic enhancements for premium care.',
    icon: Sparkles,
    slug: 'aesthetic-medical-products'
  },
  {
    title: 'Dermatology Solutions',
    desc: 'Topical treatments engineered to target profound skin health challenges safely.',
    icon: Droplet,
    slug: 'dermatology-solutions'
  },
  {
    title: 'Healthcare Innovations',
    desc: 'Smart delivery systems and bio-compatible materials elevating patient recovery.',
    icon: Activity,
    slug: 'healthcare-innovations'
  },
  {
    title: 'Research & Development',
    desc: 'Pioneering breakthrough scientific formulations to redefine modern therapies.',
    icon: Microscope,
    slug: 'research-development'
  },
  {
    title: 'Pharmaceutical Manufacturing',
    desc: 'State-of-the-art facilities equipped with the finest technological advancements.',
    icon: Factory,
    slug: 'pharmaceutical-manufacturing'
  },
  {
    title: 'Clinical-Grade Solutions',
    desc: 'Uncompromising standard protocols ensuring 100% safety and proven efficacy.',
    icon: ShieldCheck,
    slug: 'clinical-grade-solutions'
  },
  {
    title: 'Global Healthcare Partnerships',
    desc: 'Supplying top-tier medical solutions and establishing reliable global networks.',
    icon: Globe,
    slug: 'global-healthcare-partnerships'
  },
  {
    title: 'Biotechnology Solutions',
    desc: 'Advanced biotechnology platforms designed to accelerate scientific discovery, therapeutic innovation, and next-generation healthcare solutions.',
    icon: Dna,
    slug: 'biotechnology-solutions'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        {/* Video Background Layer */}
        <video 
          className={styles.heroVideo}
          autoPlay 
          muted 
          loop 
          playsInline
          poster="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2670&auto=format&fit=crop"
        >
          {/* A high-quality pharmaceutical/DNA medical background video */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-dna-molecule-animation-in-a-blue-background-22467-large.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay Layer for Readability */}
        <div className={styles.heroOverlay}></div>
        
        {/* Content Layer */}
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>Our Services</h1>
          <h2 className={styles.subtitle}>Advanced Pharmaceutical &amp; Healthcare Solutions</h2>
          <p className={styles.description}>
            BioHelix provides innovative pharmaceutical, biomedical, dermatological, and healthcare services engineered to meet the highest international standards of safety, efficacy, and scientific excellence.
          </p>
          <Link to="/appointment" className={styles.ctaBtn}>
            Get an Appointment <ArrowRight className={styles.btnIcon} />
          </Link>
        </motion.div>
      </section>

      {/* SERVICES GRID SECTION */}
      <section className={styles.servicesSection}>
        <DNA3DBackground />
        <div className={styles.servicesOverlay}></div>
        <div className={styles.container}>
          <motion.div 
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {servicesList.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div key={index} variants={cardVariants} className={styles.card}>
                  <div className={styles.iconWrapper}>
                    <IconComponent className={styles.cardIcon} />
                  </div>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.desc}</p>
                  <Link to={`/services/${service.slug}`} className={styles.learnMore}>
                    Learn More <ArrowRight className={styles.arrowIcon} />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE BIOHELIX SECTION */}
      <section className={styles.whyChooseSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2>Why Choose BioHelix</h2>
          </motion.div>
          <div className={styles.trustGrid3Col}>
            {[
              {
                title: 'Advanced Scientific Innovation',
                desc: 'Driving next-generation pharmaceutical solutions through cutting-edge biotechnology and research excellence.',
                icon: Microscope
              },
              {
                title: 'Global Quality Standards',
                desc: 'Ensuring international pharmaceutical compliance with uncompromising safety and precision.',
                icon: Globe
              },
              {
                title: 'State-of-the-Art Manufacturing',
                desc: 'Utilizing advanced manufacturing technologies to deliver high-performance healthcare solutions.',
                icon: Factory
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={i} 
                  className={styles.featureCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <div className={styles.featureIconWrapper}>
                    <Icon className={styles.featureIcon} />
                  </div>
                  <h3 className={styles.featureTitle}>{item.title}</h3>
                  <p className={styles.featureDesc}>{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className={styles.finalCtaSection}>
        {/* 3D DNA Background Layer */}
        <DNA3DBackground />

        {/* Overlay Layer for Readability */}
        <div className={styles.ctaOverlay}></div>

        <motion.div 
          className={styles.finalCtaContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2>Ready to Elevate Healthcare Innovation?</h2>
          <p>Partner with us to redefine global standards in pharmaceutical excellence.</p>
          <Link to="/appointment" className={styles.finalCtaBtn}>
            Book a Consultation <ArrowRight className={styles.btnIcon} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default ServicesPage;
