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
      if (window.scrollY > window.innerHeight * 0.8) {
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
    <nav className={`${styles.navbar} ${isVisible ? styles.navbarVisible : ''}`}>
      <div className={styles.navbarMainPill}>
        <a 
          href="#contato" 
          className={styles.navbarLink}
          onMouseEnter={playHoverSound}
          onClick={playClickSound}
        >
          Contato
        </a>
        <a 
          href="#home" 
          className={styles.navbarLogo}
          onMouseEnter={playHoverSound}
          onClick={playClickSound}
        >
          ATOM
        </a>
        <a 
          href="#projetos" 
          className={styles.navbarLink}
          onMouseEnter={playHoverSound}
          onClick={playClickSound}
        >
          Projetos
        </a>
      </div>
      
      <div className={styles.subBarRow}>
        <div className={styles.navbarSubPill}>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); playClickSound(); onBook(); }} 
            onMouseEnter={playHoverSound}
            className={styles.navbarAction}
          >
            Agende uma reunião 
            <svg className={styles.navbarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </a>
        </div>

        <button 
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
    </nav>
  );
}
