"use client";

import { useState, useEffect } from 'react';
import styles from './SystemStatusWidget.module.css';

export default function SystemStatusWidget() {
  const [latency, setLatency] = useState(11);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 5) + 9); // Fluctuate between 9ms and 13ms
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.widget} ${isMinimized ? styles.minimized : ''}`}>
      <div className={styles.container}>
        <div className={styles.statusIndicator}>
          <span className={styles.pulseDot}></span>
          <span className={styles.statusText}>OPERACIONAL</span>
        </div>

        {!isMinimized && (
          <div className={styles.details}>
            <span className={styles.divider}>|</span>
            <span className={styles.item}>CHATBOT 24/7: <strong className={styles.activeTag}>ATIVO</strong></span>
            <span className={styles.divider}>|</span>
            <span className={styles.item}>UPTIME: <strong>99.99%</strong></span>
            <span className={styles.divider}>|</span>
            <span className={styles.item}>LATÊNCIA: <strong className={styles.latencyTag}>{latency}ms</strong></span>
          </div>
        )}

        <button 
          className={styles.toggleBtn} 
          onClick={() => setIsMinimized(!isMinimized)}
          aria-label={isMinimized ? 'Expandir status' : 'Minimizar status'}
        >
          {isMinimized ? '⚙ STATUS' : '—'}
        </button>
      </div>
    </div>
  );
}
