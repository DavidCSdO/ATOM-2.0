"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './BeforeAfterSection.module.css';

export default function BeforeAfterSection({ id }) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const isDraggingRef = useRef(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    handleMove(e.clientX);
  };

  const handleStart = () => {
    isDraggingRef.current = true;
  };

  const handleEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className={styles.section} id={id || 'antes-depois'}>
      {/* Spacecore Ambient Glows */}
      <div className={styles.bgGlows} aria-hidden="true">
        <div className={styles.glowCyan}></div>
        <div className={styles.glowPurple}></div>
        <div className={styles.starsGrid}></div>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>✦ TRANSFORMAÇÃO DIGITAL</div>
          <h2 className={styles.title}>
            Antes & Depois <span className={styles.titleHighlight}>do ATOM</span>
          </h2>
          <p className={styles.subtitle}>
            Arraste o divisor interativo para ver a diferença entre um site convencional 
            e o ecossistema espacial de alta conversão da ATOM.
          </p>
        </div>

        {/* Interactive Comparison Window */}
        <div 
          className={styles.comparisonWrapper} 
          ref={containerRef}
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onMouseMove={handleMouseMove}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onTouchMove={handleTouchMove}
        >
          {/* Floating Badges Fixed on Top */}
          <div className={styles.fixedHeaderLeft}>
            <span className={styles.tagBefore}>❌ SITE CONVENCIONAL (GENÉRICO)</span>
          </div>
          <div className={styles.fixedHeaderRight}>
            <span className={styles.tagAfter}>✦ COM ATOM (ALTA CONVERSÃO)</span>
          </div>

          {/* AFTER (Right/Bottom Layer - ATOM) */}
          <div className={styles.afterLayer}>
            <div className={styles.imageBox}>
              <Image
                src="/Carrocel/Symp.png"
                alt="ATOM - Site de Alta Conversão"
                fill
                quality={95}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                sizes="(max-width: 1200px) 100vw, 1200px"
                className={styles.displayImg}
              />
            </div>
          </div>

          {/* BEFORE (Left/Top Layer - Common Site) */}
          <div 
            className={styles.beforeLayer} 
            style={{ width: `${sliderPosition}%` }}
          >
            <div className={styles.imageBox} style={{ width: containerRef.current?.offsetWidth || '100%' }}>
              <Image
                src="/Carrocel/generic-site.png"
                alt="Site Convencional Genérico - Baixa conversão"
                fill
                quality={95}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                sizes="(max-width: 1200px) 100vw, 1200px"
                className={styles.displayImg}
              />
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className={styles.handle} 
            style={{ left: `${sliderPosition}%` }}
          >
            <div className={styles.handleButton}>
              <span className={styles.handleArrows}>‹ ›</span>
            </div>
            <div className={styles.handleLine}></div>
          </div>
        </div>

        {/* Comparison Metrics Grid */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <span className={styles.metricIcon}>⚡</span>
            <h4>Velocidade de Carregamento</h4>
            <div className={styles.barCompare}>
              <div className={styles.barItem}>
                <span>Comum: 4.8s (Lento)</span>
                <div className={styles.barProgress} style={{ width: '35%', background: '#ff5f56' }}></div>
              </div>
              <div className={styles.barItem}>
                <span>ATOM: 0.6s (Instantâneo)</span>
                <div className={styles.barProgress} style={{ width: '98%', background: '#00e5ff' }}></div>
              </div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <span className={styles.metricIcon}>⚡</span>
            <h4>Engajamento de Visitantes</h4>
            <div className={styles.barCompare}>
              <div className={styles.barItem}>
                <span>Comum: Formulário estático</span>
                <div className={styles.barProgress} style={{ width: '25%', background: '#ffbd2e' }}></div>
              </div>
              <div className={styles.barItem}>
                <span>ATOM: Sistema & IA 24/7 Ativo</span>
                <div className={styles.barProgress} style={{ width: '95%', background: '#a855f7' }}></div>
              </div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <span className={styles.metricIcon}>🚀</span>
            <h4>Taxa de Conversão</h4>
            <div className={styles.barCompare}>
              <div className={styles.barItem}>
                <span>Comum: 1.2% em média</span>
                <div className={styles.barProgress} style={{ width: '20%', background: '#ff5f56' }}></div>
              </div>
              <div className={styles.barItem}>
                <span>ATOM: Até 4.8% (+300%)</span>
                <div className={styles.barProgress} style={{ width: '90%', background: '#27c93f' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
