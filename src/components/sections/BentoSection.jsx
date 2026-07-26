"use client";

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import Image from 'next/image';
import styles from './BentoSection.module.css';

export default function BentoSection({ id, onBook }) {
  const sectionRef = useRef(null);
  const val1Ref = useRef(null);
  const val2Ref = useRef(null);
  const val3Ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const initAnimeEffects = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const prices = [
        { ref: val1Ref, value: 600 },
        { ref: val2Ref, value: 500 },
        { ref: val3Ref, value: 1200 }
      ];

      prices.forEach((p, index) => {
        const obj = { val: 0 };
        const el = p.ref.current;
        if (el) {
          animate(obj, {
            val: p.value,
            easing: 'outExpo',
            duration: 3500,
            delay: index * 200,
            update: () => {
              el.innerHTML = Math.round(obj.val);
            }
          });
        }
      });

      // Orbit animation for price counters
      animate([`.${styles.mOrbit1}`, `.${styles.mOrbit2}`, `.${styles.mOrbit3}`], {
        rotate: '1turn',
        duration: 6000,
        easing: 'linear',
        loop: true
      });

      // Reactor rings continuous rotation for Núcleo Ativo
      animate(`.${styles.reactorRing1}`, {
        rotate: '1turn',
        duration: 12000,
        easing: 'linear',
        loop: true
      });

      animate(`.${styles.reactorRing2}`, {
        rotate: '-1turn',
        duration: 8000,
        easing: 'linear',
        loop: true
      });

      animate(`.${styles.reactorRing3}`, {
        rotate: '1turn',
        duration: 15000,
        easing: 'linear',
        loop: true
      });
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        initAnimeEffects();
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id={id} ref={sectionRef} className={styles.bentoSection}>
      <div className={styles.projectsBg} aria-hidden="true">
        <div className={styles.starsLayer}></div>
        <div className={`${styles.starsLayer} ${styles.starsLayer2}`}></div>
      </div>

      <div className={styles.bentoContainer}>
        <div className={`${styles.bentoCard} ${styles.tlCard}`}>
          <div className={`${styles.cardGlass} ${styles.flexColBetween} ${styles.noiseOverlay}`}>
            <div className={styles.tlContent}>
              <h3 className={styles.fontSpace}>Design<br />System</h3>
              <div className={styles.colorPalette}>
                <div className={`${styles.circle} ${styles.cRed}`}></div>
                <div className={`${styles.circle} ${styles.cOrange}`}></div>
                <div className={`${styles.circle} ${styles.cBlue}`}></div>
                <div className={`${styles.circle} ${styles.cCyan}`}></div>
              </div>
            </div>
            <div className={styles.uiMockup}>
              <div className={styles.mockHeader}>
                <div className={styles.mdot}></div>
                <div className={styles.mdot}></div>
                <div className={styles.mdot}></div>
              </div>
              <div className={styles.mockBody}>
                <div className={`${styles.mline} ${styles.w40}`}></div>
                <div className={`${styles.mline} ${styles.w80}`}></div>
                <div className={`${styles.mbox}`}>
                  <div className={`${styles.mline} ${styles.w30} ${styles.mDark}`}></div>
                </div>
                <div className={styles.mflex}>
                  <div className={styles.mbtn}></div>
                  <div className={`${styles.mbtn} ${styles.primary}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.bentoCard} ${styles.blCard}`}>
          <div className={`${styles.cardGlass} ${styles.p0} ${styles.noiseOverlay}`}>
            <div className={styles.blContent}>
              <p className={styles.blText}>Experiências imersivas que conectam usuários através de interfaces de outra dimensão e performance impecável.</p>
              <div className={styles.blCoverWrapper}>
                <div className={styles.blCover} style={{ position: 'relative' }}>
                  <Image 
                    src="/Planets/pngtree-jupiter-planet-image-on-white-background-png-image_13888640 1.png" 
                    alt="Cover" 
                    width={150} 
                    height={150} 
                    quality={100} 
                    style={{ objectFit: 'contain', mixBlendMode: 'screen' }} 
                    className={styles.blImage} 
                  />
                  <div className={styles.blBadge}>EXPLORAR</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Spacecore Reactor Core (Núcleo Ativo) */}
        <div className={`${styles.bentoCard} ${styles.tmCard}`}>
          <div className={`${styles.cardGlass} ${styles.tmGlass} ${styles.p0} ${styles.overflowHidden}`}>
            <div className={styles.hugeTextBg}>
              <span>ATOM</span>
              <span className={styles.outline}>ATOM</span>
              <span>ATOM</span>
              <span className={styles.outline}>ATOM</span>
            </div>

            {/* Spacecore Reactor Graphic */}
            <div className={styles.reactorDisplay}>
              <div className={styles.reactorRing1}></div>
              <div className={styles.reactorRing2}></div>
              <div className={styles.reactorRing3}></div>
              <div className={styles.reactorCoreOrb}>
                <span className={styles.coreSymbol}>⚛️</span>
              </div>
            </div>

            {/* Telemetry Metrics Overlay */}
            <div className={styles.tmContent}>
              <div className={styles.tmBadge}>
                <span className={styles.pulseDot}></span>
                ✦ NÚCLEO ATIVO ATOM
              </div>
              <h2 className={styles.tmTitle}>Inovação Quântica</h2>
              <p className={styles.tmDesc}>O epicentro tecnológico onde suas ideias se transformam em softwares escaláveis.</p>

              <div className={styles.tmTelemetryRow}>
                <div className={styles.telemetryItem}>
                  <span className={styles.telemetryLabel}>ENERGIA</span>
                  <span className={styles.telemetryValue}>99.9%</span>
                </div>
                <div className={styles.telemetryDivider}></div>
                <div className={styles.telemetryItem}>
                  <span className={styles.telemetryLabel}>ESTADO</span>
                  <span className={styles.telemetryValueHighlight}>OPERACIONAL</span>
                </div>
                <div className={styles.telemetryDivider}></div>
                <div className={styles.telemetryItem}>
                  <span className={styles.telemetryLabel}>MODO</span>
                  <span className={styles.telemetryValue}>QUÂNTICO</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.bentoCard} ${styles.bmCard}`}>
          <div className={`${styles.cardGlass} ${styles.pricingGlass} ${styles.noiseOverlay}`}>
            <div className={styles.pricingCol}>
              <div className={styles.mostradorWrapper}>
                <div className={styles.mostradorTrack}></div>
                <div className={`${styles.mOrbitAnimated} ${styles.mOrbit1}`}></div>
                <div className={styles.mostradorValue}>
                  <span className={styles.currency}>R$</span>
                  <span className={`${styles.priceNumber}`} ref={val1Ref}>600</span>
                </div>
              </div>
              <span className={styles.pricingLabel}><span className={`${styles.dot} ${styles.dCyan}`}></span> Landing Page</span>
            </div>

            <div className={styles.pricingCol}>
              <div className={styles.mostradorWrapper}>
                <div className={styles.mostradorTrack}></div>
                <div className={`${styles.mOrbitAnimated} ${styles.mOrbit2}`}></div>
                <div className={styles.mostradorValue}>
                  <span className={styles.currency}>R$</span>
                  <span className={`${styles.priceNumber}`} ref={val2Ref}>500</span>
                </div>
              </div>
              <span className={styles.pricingLabel}><span className={`${styles.dot} ${styles.dOrange}`}></span> Portfólio</span>
            </div>

            <div className={styles.pricingCol}>
              <div className={styles.mostradorWrapper}>
                <div className={styles.mostradorTrack}></div>
                <div className={`${styles.mOrbitAnimated} ${styles.mOrbit3}`}></div>
                <div className={styles.mostradorValue}>
                  <span className={styles.currency}>R$</span>
                  <span className={`${styles.priceNumber}`} ref={val3Ref}>1200</span>
                </div>
              </div>
              <span className={styles.pricingLabel}><span className={`${styles.dot} ${styles.dPurple}`}></span> E-commerce</span>
            </div>
          </div>
        </div>

        <div className={`${styles.bentoCard} ${styles.trCard}`}>
          <div className={`${styles.cardGlass} ${styles.flexColEnd} ${styles.p0} ${styles.noiseOverlay}`}>
            <div className={styles.trBg}></div>
            <div className={styles.chartMockup}>
              <div className={styles.chartBars}>
                <div className={`${styles.cbar} ${styles.cbar1}`}></div>
                <div className={`${styles.cbar} ${styles.cbar2}`}></div>
                <div className={`${styles.cbar} ${styles.cbar3}`}></div>
                <div className={`${styles.cbar} ${styles.cbar4}`}></div>
                <div className={`${styles.cbar} ${styles.cbar5}`}></div>
              </div>
              <div className={styles.chartLineWrapper}>
                <svg viewBox="0 0 100 50" preserveAspectRatio="none" className={styles.chartSvg}>
                  <path d="M 0,45 L 20,30 L 40,35 L 65,15 L 80,20 L 100,5" fill="none" className={styles.chartNeonLine} />
                </svg>
              </div>
            </div>
            <div className={styles.trContent}>
              <h3>Escala Estelar</h3>
              <p>Softwares estruturados para expansão além das fronteiras.</p>
            </div>
          </div>
        </div>

        <div className={`${styles.bentoCard} ${styles.brCard}`}>
          <div className={`${styles.cardGlass} ${styles.flexCenter} ${styles.overflowHidden} ${styles.p0} ${styles.noiseOverlay}`}>
            <div className={styles.starburstBg}>
              {Array.from({ length: 12 }).map((_, n) => (
                <div key={n} className={styles.ray} style={{ transform: `rotate(${(n + 1) * 30}deg)` }}></div>
              ))}
            </div>
            <div className={styles.brContent}>
              <h2 className={styles.statNumber}>150<span className={styles.statPlus}>+</span></h2>
              <p className={styles.statLabel}>Missões Concluídas</p>
              <button className={styles.statBtn} onClick={onBook}>Iniciar Nova Missão</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.servicesButtonWrapper}>
        <a href="#planos" className={styles.servicesButton}>Explorar Valores e Serviços</a>
      </div>
    </section>
  );
}
