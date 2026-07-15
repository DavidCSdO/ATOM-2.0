"use client";

import { useEffect } from 'react';
import { animate, utils, stagger, setDashoffset } from 'animejs';
import styles from './PricingSection.module.css';

export default function PricingSection({ onBook }) {
  useEffect(() => {
    const letters = [`.${styles.fA}`, `.${styles.fT}`, `.${styles.fO}`, `.${styles.fM}`];
    
    letters.forEach(selector => {
      animate(selector, {
        translateX: () => utils.random(-30, 30) + 'px',
        translateY: () => utils.random(-30, 30) + 'px',
        rotate: () => utils.random(-25, 25) + 'deg',
        scale: () => utils.random(9, 11) / 10,
        duration: () => utils.random(4000, 7000),
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
      });
    });

    animate(`.${styles.planet}`, {
        translateY: () => utils.random(-30, 30) + 'px',
      rotate: '1turn',
      duration: () => utils.random(15000, 25000),
      easing: 'linear',
      loop: true
      });

    animate(`.${styles.nebulaGlow}`, {
        opacity: [0.3, 0.7],
      scale: [1, 1.2],
      duration: 4000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
      });

    animate(`.${styles.pricingCard}`, {
        translateY: [50, 0],
      opacity: [0, 1],
      duration: 1500,
      delay: stagger(200, { start: 300 }),
      easing: 'easeOutExpo'
      });
  }, []);

  return (
    <section className={styles.pricingSection}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeContent}>
          <span>ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- </span>
          <span>ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- </span>
        </div>
      </div>

      <div className={styles.planetaryEffects}>
        <div className={`${styles.planet} ${styles.p1}`}></div>
        <div className={`${styles.planet} ${styles.p2}`}></div>
        <div className={`${styles.planet} ${styles.p3}`}></div>
        <div className={`${styles.nebulaGlow} ${styles.glow1}`}></div>
        <div className={`${styles.nebulaGlow} ${styles.glow2}`}></div>
      </div>

      <div className={styles.floatingLetters}>
        <div className={`${styles.fLetter} ${styles.fA}`}>A</div>
        <div className={`${styles.fLetter} ${styles.fT}`}>T</div>
        <div className={`${styles.fLetter} ${styles.fO}`}>O</div>
        <div className={`${styles.fLetter} ${styles.fM}`}>M</div>
      </div>

      <div className={styles.pricingContainer}>
        
        <div className={`${styles.pricingCard} ${styles.cardTl}`}>
          <div className={styles.cardGlass}>
            <div className={styles.cardHeader}>
              <div className={`${styles.glassOrb} ${styles.orbCyan}`}></div>
              <h3 className={styles.packageName}>Landing Page</h3>
            </div>
            <div className={styles.priceBox}>
              <span className={styles.currency}>R$</span>
              <span className={styles.value}>600</span>
            </div>
            <div className={styles.divider}></div>
            <ul className={styles.features}>
              <li>Design Spacecore Premium</li>
              <li>Layout Responsivo Otimizado</li>
              <li>Animações Base</li>
              <li>SEO Foundation</li>
            </ul>
            <button className={styles.planBtn} onClick={onBook}>Decolar</button>
          </div>
        </div>

        <div className={`${styles.pricingCard} ${styles.cardTr}`}>
          <div className={styles.cardGlass}>
            <div className={styles.cardHeader}>
              <div className={`${styles.glassOrb} ${styles.orbOrange}`}></div>
              <h3 className={styles.packageName}>Portfólio</h3>
            </div>
            <div className={styles.priceBox}>
              <span className={styles.currency}>R$</span>
              <span className={styles.value}>500</span>
            </div>
            <div className={styles.divider}></div>
            <ul className={styles.features}>
              <li>Apresentação Imersiva 3D</li>
              <li>Galeria Dinâmica</li>
              <li>Microinterações Premium</li>
              <li>Performance Máxima</li>
            </ul>
            <button className={styles.planBtn} onClick={onBook}>Decolar</button>
          </div>
        </div>

        <div className={`${styles.pricingCard} ${styles.cardBc}`}>
          <div className={`${styles.cardGlass} ${styles.premiumGlass}`}>
            <div className={styles.cardHeader}>
              <div className={`${styles.glassOrb} ${styles.orbPurple}`}></div>
              <h3 className={styles.packageName}>E-commerce</h3>
            </div>
            <div className={styles.priceBox}>
              <span className={styles.currency}>R$</span>
              <span className={styles.value}>1200</span>
            </div>
            <div className={styles.divider}></div>
            <ul className={styles.features}>
              <li>Catálogo Ilimitado Integrado</li>
              <li>Dashboard de Vendas</li>
              <li>Checkout Glassmorphism</li>
              <li>Integração com Pagamentos</li>
            </ul>
            <button className={`${styles.planBtn} ${styles.btnPremium}`} onClick={onBook}>Iniciar Escala</button>
          </div>
        </div>

      </div>

      <div className={styles.sectionFadeBottom}></div>
    </section>
  );
}
