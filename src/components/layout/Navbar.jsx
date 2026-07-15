"use client";

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ onBook }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${isVisible ? styles.navbarVisible : ''}`}>
      <div className={styles.navbarMainPill}>
        <a href="#contato" className={styles.navbarLink}>Contato</a>
        <a href="#home" className={styles.navbarLogo}>ATOM</a>
        <a href="#projetos" className={styles.navbarLink}>Projetos</a>
      </div>
      
      <div className={styles.navbarSubPill}>
        <a href="#" onClick={(e) => { e.preventDefault(); onBook(); }} className={styles.navbarAction}>
          Agende uma reunião 
          <svg className={styles.navbarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </a>
      </div>
    </nav>
  );
}
