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


  const pricingPlans = [
    {
      name: 'Landing Page',
      price: '600',
      orbClass: styles.orbCyan,
      features: ['Design Spacecore Premium', 'Layout Responsivo Otimizado', 'Animações Base', 'SEO Foundation'],
      isPremium: false,
    },
    {
      name: 'Site Institucional',
      price: '900',
      orbClass: styles.orbOrange,
      features: ['4-8 Páginas Integradas', 'Layout Responsivo Avançado', 'Formulários de Contato', 'SEO Premium'],
      isPremium: false,
    },
    {
      name: 'Portfólio',
      price: '700',
      orbClass: styles.orbPurple,
      features: ['Apresentação Imersiva 3D', 'Galeria Dinâmica', 'Microinterações Premium', 'Performance Máxima'],
      isPremium: false,
    },
    {
      name: 'E-commerce',
      price: '2000',
      orbClass: styles.orbCyan,
      features: ['Catálogo Ilimitado Integrado', 'Dashboard de Vendas', 'Checkout Glassmorphism', 'Integração com Pagamentos'],
      isPremium: true,
    },
    {
      name: 'Sistema Web',
      price: 'Sob orç.',
      orbClass: styles.orbOrange,
      features: ['Arquitetura Sob Medida', 'Banco de Dados Escalável', 'APIs Rest/GraphQL', 'Painel de Controle'],
      isPremium: true,
    },
    {
      name: 'Dashboard Admin',
      price: 'Sob orç.',
      orbClass: styles.orbPurple,
      features: ['Gestão de Dados em Tempo Real', 'Gráficos e Relatórios', 'Controle de Acessos', 'Integração de Sistemas'],
      isPremium: true,
    },
    {
      name: 'Blog/CMS',
      price: '1000',
      orbClass: styles.orbCyan,
      features: ['Gerenciamento de Conteúdo', 'Otimização para Artigos', 'Layout de Leitura Fluida', 'Integração com Redes Sociais'],
      isPremium: false,
    },
  ];

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
        {pricingPlans.map((plan, index) => (
          <div key={index} className={styles.pricingCard}>
            <div className={`${styles.cardGlass} ${plan.isPremium ? styles.premiumGlass : ''}`}>
              <div className={styles.cardHeader}>
                <div className={`${styles.glassOrb} ${plan.orbClass}`}></div>
                <h3 className={styles.packageName}>{plan.name}</h3>
              </div>
              <div className={styles.priceBox}>
                {plan.price.includes('Sob') ? (
                  <span className={styles.value} style={{ fontSize: '1.5rem' }}>{plan.price}</span>
                ) : (
                  <>
                    <span className={styles.currency}>R$</span>
                    <span className={styles.value}>{plan.price}</span>
                  </>
                )}
              </div>
              <div className={styles.divider}></div>
              <ul className={styles.features}>
                {plan.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
              <button className={`${styles.planBtn} ${plan.isPremium ? styles.btnPremium : ''}`} onClick={onBook}>
                {plan.isPremium ? 'Iniciar Projeto' : 'Decolar'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.sectionFadeBottom}></div>
    </section>
  );
}
