"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './LiveActivityToast.module.css';

const activityFeed = [
  {
    id: 1,
    icon: '🚀',
    title: 'Novo Agendamento',
    desc: 'Cliente de São Paulo agendou uma reunião de decolagem.',
    badge: 'DECOLAGEM',
    action: 'book'
  },
  {
    id: 2,
    icon: '⚡',
    title: 'Case Symphony AI',
    desc: '+1.840 interações de Chatbot 24/7 realizadas esta semana.',
    badge: 'PERFORMANCE',
    action: 'symphony'
  },
  {
    id: 3,
    icon: '💎',
    title: 'Entrega Concluída',
    desc: 'E-commerce Kallah Bride lançado com taxa de conversão 4.8%.',
    badge: 'SUCESSO',
    action: 'projects'
  },
  {
    id: 4,
    icon: '🎯',
    title: 'Reserva de Projeto',
    desc: 'Empresa do setor financeiro garantiu 1 vaga deste mês.',
    badge: 'GARANTIDO',
    action: 'book'
  }
];

export default function LiveActivityToast({ onVisibilityChange, onBook }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(isVisible && !isDismissed);
    }
  }, [isVisible, isDismissed, onVisibilityChange]);

  useEffect(() => {
    // Initial delay before first toast appears
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    const interval = setInterval(() => {
      if (!isHoveredRef.current && !isDismissed) {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % activityFeed.length);
          setIsVisible(true);
        }, 400);
      }
    }, 11000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsDismissed(true);
    setIsVisible(false);
    if (onVisibilityChange) onVisibilityChange(false);
  };

  const handleCardClick = () => {
    const item = activityFeed[currentIndex];
    if (item.action === 'book' && onBook) {
      onBook();
    } else if (item.action === 'symphony') {
      document.getElementById('ultimo-projeto')?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.action === 'projects') {
      document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isDismissed) return null;

  const currentItem = activityFeed[currentIndex];

  return (
    <div
      className={`${styles.toast} ${isVisible ? styles.visible : styles.hidden}`}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      title="Clique para saber mais"
    >
      <button 
        className={styles.closeBtn} 
        onClick={handleDismiss}
        aria-label="Fechar notificação"
      >
        ✕
      </button>

      <div className={styles.iconBox}>{currentItem.icon}</div>

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <span className={styles.badge}>{currentItem.badge}</span>
        </div>
        <h5 className={styles.title}>{currentItem.title}</h5>
        <p className={styles.desc}>{currentItem.desc}</p>
      </div>
    </div>
  );
}
