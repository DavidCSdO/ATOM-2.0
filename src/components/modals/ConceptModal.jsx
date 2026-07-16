"use client";

import { useEffect } from 'react';
import styles from './ConceptModal.module.css';

export default function ConceptModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!project) return null;

  return (
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modal} style={{ '--accent': project.accent, '--accent-glow': project.accentGlow }}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.category} style={{ color: 'var(--accent)' }}>SpaceCore Design Concept</span>
            <h2 className={styles.title}>{project.name}</h2>
          </div>
          
          <div className={styles.body}>
            <p>
              Este projeto utiliza o conceito <strong>SpaceCore</strong>: uma abordagem de UI/UX focada em interfaces imersivas, utilizando fundo escuro (deep space), elementos translúcidos (glassmorphism), bordas brilhantes e micro-interações que simulam fluidez cósmica.
            </p>
            <p>
              O design busca transmitir alta tecnologia, inovação e exploração, alinhando-se à identidade visual da ATOM. Em vez de uma navegação tradicional, a experiência é orientada por profundidade, luzes acentuadas e física responsiva.
            </p>
          </div>
          
          <div className={styles.footer}>
            <button className={styles.closeActionBtn} onClick={onClose}>Entendi</button>
          </div>
        </div>
      </div>
    </div>
  );
}
