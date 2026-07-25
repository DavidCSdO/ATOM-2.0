"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import styles from './LatestProjectModal.module.css';

export default function LatestProjectModal({ onClose, onExplore }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleExploreClick = () => {
    onClose();
    if (onExplore) onExplore();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Glow & Backdrop decor */}
        <div className={styles.glowBg} aria-hidden="true"></div>

        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        {/* Content Header */}
        <div className={styles.badge}>
          <span className={styles.badgePulse}></span>
          ✦ ÚLTIMO LANÇAMENTO DA AGÊNCIA
        </div>

        <h2 className={styles.title}>
          Symphony <span className={styles.titleHighlight}>AI & Chatbot</span>
        </h2>

        <p className={styles.subtitle}>
          Acabamos de lançar nosso projeto mais recente! Uma plataforma web de alta conversão 
          com assistente conversacional inteligente 24/7 e design imersivo.
        </p>

        {/* Preview Frame */}
        <div className={styles.previewWindow}>
          <div className={styles.windowHeader}>
            <div className={styles.dots}>
              <span className={styles.dotRed}></span>
              <span className={styles.dotYellow}></span>
              <span className={styles.dotGreen}></span>
            </div>
            <span className={styles.urlText}>symphony.atom.app</span>
          </div>

          <div className={styles.imageWrap}>
            <Image
              src="/Carrocel/Symp.png"
              alt="Symphony - Último projeto da agência ATOM"
              fill
              quality={95}
              priority
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              sizes="(max-width: 600px) 100vw, 600px"
              className={styles.displayImage}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.secondaryBtn} onClick={onClose}>
            Explorar o Site
          </button>
          <button className={styles.primaryBtn} onClick={handleExploreClick}>
            Ver Projeto Symphony <span className={styles.arrow}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
