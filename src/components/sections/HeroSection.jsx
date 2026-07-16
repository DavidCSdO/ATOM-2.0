"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';
import dynamic from 'next/dynamic';

const EarthWireframe = dynamic(() => import('../3d/EarthWireframe'), { ssr: false });

export default function HeroSection({ id, onNavigate, onReady }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);
  const [vignetteOpen, setVignetteOpen] = useState(false);
  const [darknessFade, setDarknessFade] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [isSettled, setIsSettled] = useState(false);

  const sequenceStarted = useRef(false);

  const [particlePositions, setParticlePositions] = useState([]);

  useEffect(() => {
    setParticlePositions(Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 4,
      size: 1 + Math.random() * 2,
    })));
  }, []);

  const startSequence = () => {
    if (sequenceStarted.current) return;
    sequenceStarted.current = true;

    setIsLoading(false);
    if (onReady) onReady();

    setTimeout(() => setDarknessFade(true), 200);
    setTimeout(() => setVignetteOpen(true), 400);
    setTimeout(() => setIsRevealed(true), 600);
    setTimeout(() => setTextVisible(true), 700);
    setTimeout(() => setIsSettled(true), 2200);
  };

  const onEarthLoaded = () => {
    setTimeout(startSequence, 800);
  };

  useEffect(() => {
    const fallbackTimeout = setTimeout(startSequence, 5000);
    return () => clearTimeout(fallbackTimeout);
  }, []);

  return (
    <section
      id={id}
      className={`${styles.hero} ${isRevealed ? styles.heroRevealed : ''} ${isSettled ? styles.heroSettled : ''}`}
    >
      <div className={`${styles.heroLoadingScreen} ${!isLoading ? styles.heroLoadingScreenHidden : ''}`}>
        <div className={styles.heroSpinner}></div>
        <div className={styles.heroLoadingText}>INICIANDO</div>
      </div>

      <div className={styles.heroBackground}>
        <div className={styles.auroraContainer}>
          <div className={styles.spacecoreGlow}></div>
        </div>
        <div className={styles.gridOverlay}></div>
      </div>

      <div className={`${styles.heroVignette} ${vignetteOpen ? styles.heroVignetteOpen : ''}`}></div>

      <div className={`${styles.heroDarkness} ${darknessFade ? styles.heroDarknessFade : ''}`}></div>

      <div className={`${styles.heroContent} ${textVisible ? styles.heroContentVisible : ''} ${isSettled ? styles.heroContentSettled : ''}`}>

        <h1 className={styles.heroTitle}>ATOM</h1>

        <div className={`${styles.heroBelow} ${isSettled ? styles.heroBelowVisible : ''}`}>

          <div className={styles.heroEarthRow}>
            <button className={styles.heroNavBtn} onClick={() => onNavigate('explore')}>
              <span className={styles.heroNavIcon}>✦</span>
              <span className={styles.heroNavLabel}>EXPLORAR</span>
              <span className={styles.heroNavIcon}>✦</span>
            </button>

            <div className={styles.heroEarthWrapper}>
              <EarthWireframe onLoaded={onEarthLoaded} />
              <div className={styles.dragIndicator}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span>Arraste</span>
              </div>
            </div>

            <button className={styles.heroNavBtn} onClick={() => onNavigate('projects')}>
              <span className={styles.heroNavIcon}>✦</span>
              <span className={styles.heroNavLabel}>PROJETOS</span>
              <span className={styles.heroNavIcon}>✦</span>
            </button>
          </div>

          <p className={styles.heroTagline}>
            Building intelligent technology<br />
            for the next generation.
          </p>

          <div className={styles.heroScrollIndicator}>
            <div className={styles.heroScrollCircle}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4 L10 14 M6 10 L10 14 L14 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.heroParticles}>
        {particlePositions.map((pos, i) => (
          <span
            key={i}
            className={styles.heroParticle}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              animationDelay: `${pos.delay}s`,
              animationDuration: `${pos.duration}s`,
              width: `${pos.size}px`,
              height: `${pos.size}px`,
            }}
          ></span>
        ))}
      </div>

      <div className={styles.heroBottomFade}></div>
    </section>
  );
}
