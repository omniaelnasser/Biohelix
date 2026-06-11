import React, { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from '../data/cmsData';
import { ArrowLeft, CheckCircle2, FlaskConical, Stethoscope } from 'lucide-react';
import styles from './ServiceArticle.module.css';

const ServiceArticle = () => {
  const { slug } = useParams();
  const article = articles[slug];
  const location = useLocation();

  const fromHome = location.state?.from === 'home';
  const backUrl = fromHome ? "/" : "/services";
  const backText = fromHome ? "Back to Home" : "Back to Services";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className={styles.notFound}>
        <h2>Article Not Found</h2>
        <p>The pharmaceutical solution you are looking for does not exist.</p>
        <Link to={backUrl} className={styles.backBtn}>Return to {fromHome ? 'Home' : 'Services'}</Link>
      </div>
    );
  }

  return (
    <div className={styles.blogPage}>
      
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <video 
          className={styles.heroVideo}
          autoPlay 
          muted 
          loop 
          playsInline
          poster={article.heroImage}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-medical-science-dna-molecule-animation-22467-large.mp4" type="video/mp4" />
        </video>
        
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to={backUrl} className={styles.backLink}>
              <ArrowLeft size={18} /> {backText}
            </Link>
            <h1 className={styles.title}>{article.title}</h1>
            <h2 className={styles.subtitle}>{article.subtitle}</h2>
            <Link to="/appointment" className={styles.heroCtaBtn}>
              Get an Appointment &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <div className={styles.articleWrapper}>
        <article className={styles.articleContainer}>
          
          <motion.section 
            className={styles.introSection}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className={styles.introText}>{article.intro}</p>
          </motion.section>

          {/* DYNAMIC SECTIONS */}
          <div className={styles.dynamicSections}>
            {article.sections.map((section, index) => (
              <motion.section 
                key={index} 
                className={styles.contentSection}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <h3>{section.heading}</h3>
                <p>{section.content}</p>
              </motion.section>
            ))}
          </div>

          {/* ADVANTAGES GRID */}
          <motion.section 
            className={styles.advantagesSection}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.advantagesCard}>
              <h3><CheckCircle2 className={styles.sectionIcon} /> Core Advantages</h3>
              <ul className={styles.advantagesList}>
                {article.advantages.map((adv, i) => (
                  <li key={i}>
                    <CheckCircle2 className={styles.checkIcon} />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* USE CASES */}
          <motion.section 
            className={styles.useCasesSection}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3><Stethoscope className={styles.sectionIcon} /> Medical Use Cases</h3>
            <div className={styles.useCaseGrid}>
              {article.useCases.map((useCase, i) => (
                <div key={i} className={styles.useCaseCard}>
                  <FlaskConical className={styles.useCaseIcon} />
                  <h4>{useCase.title}</h4>
                  <p>{useCase.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* CONCLUSION */}
          <motion.section 
            className={styles.conclusionSection}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.conclusionWrapper}>
              <h3>BioHelix Excellence</h3>
              <p>{article.conclusion}</p>
            </div>
          </motion.section>

          {/* BOTTOM CTA */}
          <section className={styles.bottomCtaSection}>
            <div className={styles.bottomCtaContent}>
              <h3>Partner with BioHelix Experts</h3>
              <p>Our pharmaceutical team is available for global collaboration, research partnerships, and clinical consultation.</p>
              <Link to="/appointment" className={styles.bottomCtaBtn}>Get an Appointment</Link>
            </div>
          </section>

        </article>
      </div>

    </div>
  );
};

export default ServiceArticle;
