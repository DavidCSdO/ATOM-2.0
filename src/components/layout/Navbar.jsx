"use client";

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { getSoundMuted, setSoundMuted, playHoverSound, playClickSound } from '@/lib/soundFx';

export default function Navbar({ onBook }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(getSoundMuted());

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    setSoundMuted(nextState);
    if (!nextState) {
      playClickSound();
    }
  };

  return (
    <header className={`${styles.navbarWrapper} ${isVisible ? styles.navbarVisible : ''}`}>
      <div className={styles.navbarPill}>
        {/* Brand / Logo */}
        <a 
          href="#home" 
          className={styles.brandLogo}
          onMouseEnter={playHoverSound}
          onClick={playClickSound}
        >
          <span className={styles.logoDot}>✦</span>
          <span className={styles.logoText}>ATOM</span>
        </a>

        {/* Navigation Links */}
        <nav className={styles.navLinks}>
          <a 
            href="#solucoes" 
            className={styles.navLink}
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >
            Soluções
          </a>
          <a 
            href="#projetos" 
            className={styles.navLink}
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >
            Projetos
          </a>
          <a 
            href="#planos" 
            className={styles.navLink}
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >
            Planos
          </a>
          <a 
            href="#contato" 
            className={styles.navLink}
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >
            Contato
          </a>
        </nav>

        {/* Actions (CTA + Sound Toggle) */}
        <div className={styles.navActions}>
          <button 
            type="button"
            className={styles.ctaButton}
            onClick={(e) => { e.preventDefault(); playClickSound(); onBook(); }}
            onMouseEnter={playHoverSound}
          >
            <span>✦ Agendar Reunião</span>
          </button>

          <button 
            type="button"
            className={styles.soundToggleBtn}
            onClick={toggleSound}
            onMouseEnter={playHoverSound}
            title={isMuted ? 'Ativar Efeitos Sonoros' : 'Desativar Efeitos Sonoros'}
            aria-label="Ativar ou desativar efeitos sonoros"
          >
            {isMuted ? (
              <svg className={styles.soundIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            ) : (
              <svg className={styles.soundIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
