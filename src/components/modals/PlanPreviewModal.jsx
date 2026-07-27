"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './PlanPreviewModal.module.css';

export default function PlanPreviewModal({ plan, onClose, onBook }) {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && plan?.screens?.length > 1) {
        setActiveScreenIndex((prev) => (prev + 1) % plan.screens.length);
      }
      if (e.key === 'ArrowLeft' && plan?.screens?.length > 1) {
        setActiveScreenIndex((prev) => (prev - 1 + plan.screens.length) % plan.screens.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [plan, onClose]);

  if (!plan) return null;

  const screens = plan.screens || [];
  const activeScreen = screens[activeScreenIndex] || { src: '/Carrocel/ATOM.png' };

  const handleBookClick = () => {
    onClose();
    if (onBook) onBook(plan);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.planInfo}>
            <span className={styles.badge}>✦ MODELO DE REFERÊNCIA</span>
            <h3 className={styles.planTitle}>{plan.name}</h3>
            <p className={styles.modelSubtitle}>{plan.modelTitle}</p>
          </div>

          <div className={styles.priceContainer}>
            {plan.price.includes('Sob') ? (
              <span className={styles.priceValue}>{plan.price}</span>
            ) : (
              <div className={styles.priceWrap}>
                <span className={styles.currency}>R$</span>
                <span className={styles.priceValue}>{plan.price}</span>
              </div>
            )}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
              ✕
            </button>
          </div>
        </div>

        {/* Media Showcase */}
        <div className={styles.showcase}>
          <div className={styles.windowBar}>
            <div className={styles.dots}>
              <span className={styles.dotRed}></span>
              <span className={styles.dotYellow}></span>
              <span className={styles.dotGreen}></span>
            </div>
            <div className={styles.urlBar}>
              <span>https://preview.atom.app/{plan.name.toLowerCase().replace(/\s+/g, '-')}</span>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <Image
              src={activeScreen.src}
              alt={`${plan.name} preview - ${activeScreenIndex + 1}`}
              fill
              quality={95}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              sizes="(max-width: 1000px) 100vw, 1000px"
              className={styles.displayImage}
            />

            {screens.length > 1 && (
              <>
                <button
                  className={`${styles.navBtn} ${styles.prevBtn}`}
                  onClick={() => setActiveScreenIndex((prev) => (prev - 1 + screens.length) % screens.length)}
                  aria-label="Anterior"
                >
                  ‹
                </button>
                <button
                  className={`${styles.navBtn} ${styles.nextBtn}`}
                  onClick={() => setActiveScreenIndex((prev) => (prev + 1) % screens.length)}
                  aria-label="Próximo"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {screens.length > 1 && (
            <div className={styles.thumbnailsBar}>
              {screens.map((screen, idx) => (
                <button
                  key={idx}
                  className={`${styles.thumbBtn} ${idx === activeScreenIndex ? styles.thumbActive : ''}`}
                  onClick={() => setActiveScreenIndex(idx)}
                >
                  <div className={styles.thumbWrap}>
                    <Image
                      src={screen.src}
                      alt=""
                      width={70}
                      height={42}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Description & Included Features */}
        <div className={styles.detailsSection}>
          <p className={styles.modelDesc}>{plan.modelDesc}</p>

          <div className={styles.featuresBox}>
            <h4 className={styles.featuresTitle}>Recursos Inclusos no Plano:</h4>
            <ul className={styles.featuresGrid}>
              {plan.features?.map((feat, i) => (
                <li key={i} className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span> {feat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Actions */}
        <div className={styles.actions}>
          <button className={styles.secondaryBtn} onClick={onClose}>
            Voltar
          </button>
          <button className={styles.primaryBtn} onClick={handleBookClick}>
            Decolar Com Este Plano <span className={styles.arrow}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
