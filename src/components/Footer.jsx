import React from 'react';
import { Building, Box, Info, Clock, MapPin } from 'lucide-react';
import logoImg from '../assets/biohelix.png';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Brand & Intro */}
        <div className={styles.brandSection}>
          <div className={styles.footerLogoWrapper}>
            <img src={logoImg} alt="BioHelix Logo" className={styles.footerLogoImg} />
          </div>
          <p className={styles.description}>
            Reinventing the way you create websites, say hi to the most powerful WordPress theme available on the market.
          </p>
        </div>

        <div className={styles.linksSection}>
          {/* Column 1: Company */}
          <div className={styles.column}>
            <h3 className={styles.colTitle}><Building className={styles.headerIcon} /> Company</h3>
            <ul className={styles.linkList}>
              <li><a href="#">About Pixfort</a></li>
              <li><a href="#">The Team</a></li>
              <li><a href="#">Assets</a></li>
              <li><a href="#">Social Media</a></li>
              <li><a href="#">Sales</a></li>
            </ul>
          </div>

          {/* Column 2: Our Products */}
          <div className={styles.column}>
            <h3 className={styles.colTitle}><Box className={styles.headerIcon} /> Our Products</h3>
            <ul className={styles.linkList}>
              <li><a href="#">Pixfort Builder</a></li>
              <li><a href="#">Landing Pages</a></li>
              <li><a href="#">Product Support</a></li>
              <li><a href="#">Themes</a></li>
              <li><a href="#">Knowledge Base</a></li>
            </ul>
          </div>

          {/* Column 3: Useful Information */}
          <div className={styles.column}>
            <h3 className={styles.colTitle}><Info className={styles.headerIcon} /> Useful Information</h3>
            <ul className={styles.infoList}>
              <li className={styles.infoItem}>
                <Clock className={styles.infoIcon} />
                Open 8am to 6pm, Monday to Friday
              </li>
              <li className={styles.infoItem}>
                <MapPin className={styles.infoIcon} />
                Abu Dhabi - UAE
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>&copy; {new Date().getFullYear()} BioHelix Pharma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
