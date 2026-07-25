"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './FeaturedProjectSection.module.css';

const symphonyScreens = [
  {
    id: 1,
    title: 'Dashboard Principal & Visão Estratégica',
    tagline: 'Interface centralizada para controle total do seu negócio com métricas em tempo real',
    src: '/Carrocel/Symp.png',
  },
  {
    id: 2,
    title: 'Chatbot Conversacional & Atendimento 24/7',
    tagline: 'Assistente inteligente integrado para engajar visitantes e converter leads automaticamente',
    src: '/Carrocel/Symp 2.png',
  },
  {
    id: 3,
    title: 'Automação de Processos & Analytics',
    tagline: 'Relatórios claros de desempenho com suporte estratégico para decisões de alto impacto',
    src: '/Carrocel/Symp 3.png',
  }
];

const sellingHighlights = [
  {
    icon: '💬',
    badge: 'CONVERSÃO AUMENTADA',
    title: 'Chatbot Inteligente & Atendimento 24/7',
    desc: 'Atendimento automatizado que engaja visitantes instantaneamente, tira dúvidas frequentes e qualifica leads no piloto automático.'
  },
  {
    icon: '⚡',
    badge: 'ALTA PERFORMANCE',
    title: 'Arquitetura Otimizada & Engenharia Web',
    desc: 'Desenvolvido com tecnologia de ponta e suporte de ferramentas inteligentes para garantir velocidade extrema e zero fricção.'
  },
  {
    icon: '💎',
    badge: 'AUTORIDADE DE MARCA',
    title: 'Design Imersivo & Experiência Premium',
    desc: 'Visual moderno com acabamento refinado que transmite credibilidade imediata, encantando clientes desde o primeiro segundo.'
  }
];

export default function FeaturedProjectSection({ id, onBook }) {
  const [mediaMode, setMediaMode] = useState('video'); // 'video' | 'images'
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  const videoRef = useRef(null);

  const activeScreen = symphonyScreens[activeScreenIndex];

  useEffect(() => {
    if (mediaMode === 'images' && isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveScreenIndex((prev) => (prev + 1) % symphonyScreens.length);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [mediaMode, isAutoPlaying]);

  const handleSelectScreen = (index) => {
    setActiveScreenIndex(index);
    setMediaMode('images');
  };

  const handlePrev = () => {
    setActiveScreenIndex((prev) => (prev - 1 + symphonyScreens.length) % symphonyScreens.length);
  };

  const handleNext = () => {
    setActiveScreenIndex((prev) => (prev + 1) % symphonyScreens.length);
  };

  return (
    <section className={styles.featuredSection} id={id || 'ultimo-projeto'}>
      {/* Background Decor */}
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
            ✦ CASE DE SUCESSO & ALTA CONVERSÃO
          </div>
          <h2 className={styles.title}>
            Symphony <span className={styles.titleHighlight}>— Orquestração & Chatbot</span>
          </h2>
          <p className={styles.subtitle}>
            Conheça o Symphony: uma plataforma web completa que combina engenharia de alta performance, 
            design imersivo e assistente conversacional inteligente para transformar visitantes em clientes reais.
          </p>
        </div>

        {/* Media Mode Selector */}
        <div className={styles.mediaTabsWrapper}>
          <button 
            className={`${styles.mediaTab} ${mediaMode === 'video' ? styles.mediaTabActive : ''}`}
            onClick={() => setMediaMode('video')}
          >
            <span className={styles.tabIcon}>🎬</span> Vídeo em Ação
          </button>
          <button 
            className={`${styles.mediaTab} ${mediaMode === 'images' ? styles.mediaTabActive : ''}`}
            onClick={() => setMediaMode('images')}
          >
            <span className={styles.tabIcon}>📷</span> Galeria de Interface ({symphonyScreens.length})
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
                <span>symphony.atom.app</span>
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
                    priority
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

            {/* Display Footer Caption & Selector */}
            <div className={styles.displayCaption}>
              {mediaMode === 'video' ? (
                <div className={styles.captionText}>
                  <span className={styles.captionStep}>DEMONSTRAÇÃO EM VÍDEO</span>
                  <h3 className={styles.captionTitle}>Symphony em Funcionamento</h3>
                  <p className={styles.captionTagline}>
                    Veja a fluidez da interface, a navegação responsiva e a interação inteligente do assistente em tempo real.
                  </p>
                </div>
              ) : (
                <div className={styles.captionText}>
                  <span className={styles.captionStep}>0{activeScreenIndex + 1} / 0{symphonyScreens.length}</span>
                  <h3 className={styles.captionTitle}>{activeScreen.title}</h3>
                  <p className={styles.captionTagline}>{activeScreen.tagline}</p>
                </div>
              )}

              <div className={styles.thumbnails}>
                {symphonyScreens.map((screen, idx) => (
                  <button
                    key={screen.id}
                    className={`${styles.thumbBtn} ${mediaMode === 'images' && idx === activeScreenIndex ? styles.thumbActive : ''}`}
                    onClick={() => handleSelectScreen(idx)}
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
              <h3>Quer uma solução com assistente inteligente para o seu negócio?</h3>
              <p>Projetamos plataformas modernas, intuitivas e focadas na conversão do seu público.</p>
            </div>
            <button className={styles.ctaBtn} onClick={onBook}>
              Agendar Reunião de Projeto <span className={styles.ctaArrow}>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
