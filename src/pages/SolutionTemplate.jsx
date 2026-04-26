import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from '../data/cmsData';
import { ArrowLeft, CheckCircle2, FlaskConical, Stethoscope } from 'lucide-react';
import styles from './SolutionTemplate.module.css';

const SolutionTemplate = () => {
  const { slug } = useParams();
  const article = articles[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className={styles.notFound}>
        <h2>Article Not Found</h2>
        <p>The pharmaceutical solution you are looking for does not exist.</p>
        <Link to="/" className={styles.backBtn}>Return Home</Link>
      </div>
    );
  }

  return (
    <div className={styles.blogPage}>
      
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        {/* Optional background image hook if needed: */}
        <div 
          className={styles.heroBgData} 
          style={{ backgroundImage: `url(${article.heroImage})` }}
        ></div>
        
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/" className={styles.backLink}>
              <ArrowLeft size={18} /> Back to Home
            </Link>
            <span className={styles.categoryBadge}>Medical Solutions API</span>
            <h1 className={styles.title}>{article.title}</h1>
            <h2 className={styles.subtitle}>{article.subtitle}</h2>
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

        </article>

        {/* SIDE BAR / CTA */}
        <aside className={styles.articleSidebar}>
          <div className={styles.sidebarCard}>
            <h3>Ready to Collaborate?</h3>
            <p>Our pharmaceutical specialists are available for clinical consultations and international partnership inquiries.</p>
            <Link to="/appointment" className={styles.sidebarBtn}>Get an Appointment</Link>
          </div>
        </aside>
      </div>

    </div>
  );
};

export default SolutionTemplate;
