import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Mail, Phone } from 'lucide-react';
import logoImg from '../assets/biohelix.png';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Column 1: Brand & Intro */}
          <div className={styles.brandColumn}>
            <div className={styles.footerLogoWrapper}>
              <img src={logoImg} alt="BioHelix Logo" className={styles.footerLogoImg} />
            </div>
            <p className={styles.description}>
              BioHelix is committed to delivering innovative pharmaceutical and healthcare solutions driven by science, safety, and global excellence.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className={styles.navColumn}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className={styles.infoColumn}>
            <h3 className={styles.colTitle}>Connect With Us</h3>
            <ul className={styles.infoList}>
              <li className={styles.infoItem}>
                <Clock className={styles.infoIcon} />
                <span>Open 8am to 6pm, Monday to Friday</span>
              </li>
              <li className={styles.infoItem}>
                <MapPin className={styles.infoIcon} />
                <span>Abu Dhabi - UAE</span>
              </li>
              <li className={styles.infoItem}>
                <Phone className={styles.infoIcon} />
                <span>+971 50 123 4567</span>
              </li>
              <li className={styles.infoItem}>
                <Mail className={styles.infoIcon} />
                <span>info@biohelix.com</span>
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
