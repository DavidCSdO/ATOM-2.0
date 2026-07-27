"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './FeaturedProjectSection.module.css';

const symphonyScreens = [
  {
    id: 1,
    title: 'Visão Geral & Assistente 24/7',
    tagline: 'Landing page ultra-rápida com IA integrada para capturar e converter visitantes em tempo real.',
    src: '/Carrocel/Symp.png'
  },
  {
    id: 2,
    title: 'Dashboard Conversacional & Módulos',
    tagline: 'Interface intuitiva com controle completo de métricas, leads e atendimento automatizado.',
    src: '/Carrocel/Symp 2.png'
  },
  {
    id: 3,
    title: 'Integrações & Engenharia de Alta Performance',
    tagline: 'Arquitetura moderna pronta para escala, garantindo velocidade máxima e segurança.',
    src: '/Carrocel/Symp 3.png'
  }
];

const sellingHighlights = [
  {
    icon: '🤖',
    badge: 'AUTOMAÇÃO 24/7',
    title: 'Assistente Conversacional com IA',
    desc: 'Atenda clientes a qualquer hora do dia ou da noite, tirando dúvidas e qualificando leads automaticamente.'
  },
  {
    icon: '⚡',
    badge: 'MÁXIMA VELOCIDADE',
    title: 'Engenharia de Alta Performance',
    desc: 'Desenvolvido sobre Next.js 16 para carregamento instantâneo e nota máxima em testes de velocidade.'
  },
  {
    icon: '🎯',
    badge: 'FOCO EM CONVERSÃO',
    title: 'UX/UI Orientada a Vendas',
    desc: 'Arquitetura visual pensada para conduzir o usuário do primeiro clique até o agendamento final.'
  }
];

export default function FeaturedProjectSection({ id, onBook }) {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [mediaMode, setMediaMode] = useState('images'); // 'images' | 'video'
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const videoRef = useRef(null);

  const activeScreen = symphonyScreens[activeScreenIndex];

  // Auto rotate screens
  useEffect(() => {
    if (!isAutoPlaying || mediaMode === 'video') return;

    const interval = setInterval(() => {
      setActiveScreenIndex((prev) => (prev + 1) % symphonyScreens.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, mediaMode]);

  const handleNext = () => {
    setActiveScreenIndex((prev) => (prev + 1) % symphonyScreens.length);
  };

  const handlePrev = () => {
    setActiveScreenIndex((prev) => (prev - 1 + symphonyScreens.length) % symphonyScreens.length);
  };

  return (
    <section id={id} className={styles.featuredSection}>
      {/* Background ambient glows */}
      <div className={styles.bgGlows} aria-hidden="true">
        <div className={styles.glowPurple}></div>
        <div className={styles.glowCyan}></div>
        <div className={styles.starsGrid}></div>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgePulse}></span>
            ✦ NOSSO ÚLTIMO PROJETO LANÇADO
          </div>
          <h2 className={styles.title}>
            Case <span className={styles.titleHighlight}>Symphony AI & Chatbot</span>
          </h2>
          <p className={styles.subtitle}>
            Conheça o ecossistema digital que combina IA conversacional 24/7 com engenharia de alta conversão.
          </p>
        </div>

        {/* Media Selector Tabs */}
        <div className={styles.mediaTabsWrapper}>
          <button
            className={`${styles.mediaTab} ${mediaMode === 'images' ? styles.mediaTabActive : ''}`}
            onClick={() => setMediaMode('images')}
          >
            <span className={styles.tabIcon}>🖼️</span> Fotos & Capturas
          </button>
          <button
            className={`${styles.mediaTab} ${mediaMode === 'video' ? styles.mediaTabActive : ''}`}
            onClick={() => setMediaMode('video')}
          >
            <span className={styles.tabIcon}>🎥</span> Demonstração em Vídeo
          </button>
        </div>

        {/* Main Showcase Window */}
        <div 
          className={styles.showcaseWrapper}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className={styles.mainDisplayWindow}>
            <div className={styles.windowHeader}>
              <div className={styles.windowDots}>
                <span className={styles.dotRed}></span>
                <span className={styles.dotYellow}></span>
                <span className={styles.dotGreen}></span>
              </div>
              <div className={styles.windowAddressBar}>
                <span className={styles.lockIcon}>🔒</span>
                <span>symphony-pearl.vercel.app</span>
              </div>
              <div className={styles.windowStatus}>
                <span className={styles.liveTag}>
                  {mediaMode === 'video' ? 'VIDEO DEMO' : 'GALERIA'}
                </span>
              </div>
            </div>

            {/* Display Media Area */}
            <div className={styles.imageContainer}>
              {mediaMode === 'video' ? (
                <video
                  ref={videoRef}
                  src="/Carrocel/symphony-demo.mp4"
                  className={styles.displayVideo}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/Carrocel/Symp.png"
                />
              ) : (
                <>
                  <Image
                    src={activeScreen.src}
                    alt={`Symphony - ${activeScreen.title}`}
                    fill
                    quality={95}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className={styles.displayImage}
                  />
                  
                  {/* Navigation Arrows */}
                  <button 
                    className={`${styles.navBtn} ${styles.navBtnPrev}`}
                    onClick={handlePrev}
                    aria-label="Tela anterior"
                  >
                    ‹
                  </button>
                  <button 
                    className={`${styles.navBtn} ${styles.navBtnNext}`}
                    onClick={handleNext}
                    aria-label="Próxima tela"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Display Caption & Thumbnails */}
            <div className={styles.displayCaption}>
              <div className={styles.captionText}>
                <span className={styles.captionStep}>TELA {activeScreenIndex + 1} DE {symphonyScreens.length}</span>
                <h3 className={styles.captionTitle}>{activeScreen.title}</h3>
                <p className={styles.captionTagline}>{activeScreen.tagline}</p>
              </div>

              <div className={styles.thumbnails}>
                {symphonyScreens.map((screen, idx) => (
                  <button
                    key={screen.id}
                    className={`${styles.thumbBtn} ${activeScreenIndex === idx ? styles.thumbActive : ''}`}
                    onClick={() => {
                      setMediaMode('images');
                      setActiveScreenIndex(idx);
                    }}
                    aria-label={`Ver ${screen.title}`}
                  >
                    <div className={styles.thumbImageWrapper}>
                      <Image
                        src={screen.src}
                        alt=""
                        width={90}
                        height={50}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className={styles.highlightsGrid}>
          {sellingHighlights.map((item, idx) => (
            <div key={idx} className={styles.highlightCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>{item.icon}</span>
                <span className={styles.cardBadge}>{item.badge}</span>
              </div>
              <h4 className={styles.cardTitle}>{item.title}</h4>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={styles.ctaWrapper}>
          <div className={styles.ctaBox}>
            <div className={styles.ctaText}>
              <h3>Quer testar a plataforma Symphony em tempo real?</h3>
              <p>Acesse o site completo do projeto Symphony em uma nova aba do navegador.</p>
            </div>
            
            <div className={styles.ctaButtonGroup}>
              <a 
                href="https://symphony-pearl.vercel.app/home" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.symphonyExternalBtn}
              >
                Abrir Site Symphony ↗
              </a>
              
              <button className={styles.ctaBtn} onClick={onBook}>
                Agendar Reunião de Projeto <span className={styles.ctaArrow}>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
