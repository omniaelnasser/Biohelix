import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/biohelix.png';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        {/* LEFT: Logo */}
        <div className={styles.logoZone}>
          <Link to="/" className={styles.logo}>
            <img src={logoImg} alt="BioHelix DNA Logo" className={styles.logoImg} />
          </Link>
        </div>

        {/* CENTER: Navigation Menu */}
        <div className={styles.menuZone}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/about" className={styles.navLink}>About Us</Link>
          <Link to="/contact" className={styles.navLink}>Contact Us</Link>
        </div>

        {/* RIGHT: CTA and Mobile Toggle */}
        <div className={styles.ctaZone}>
          <Link to="/appointment" className={styles.ctaBtn}>
            Get an Appointment <span>&gt;</span>
          </Link>
          
          <div 
            className={styles.hamburger} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.bar1 : ''}`}></span>
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.bar2 : ''}`}></span>
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.bar3 : ''}`}></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
        <Link to="/" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link to="/about" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>About Us</Link>
        <Link to="/contact" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
        <Link to="/appointment" className={styles.mobileCta} onClick={() => setMobileMenuOpen(false)}>Get an Appointment &gt;</Link>
      </div>
    </nav>
  );
};

export default Navbar;
