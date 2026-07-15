"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { animate, utils, stagger, createDrawable } from 'animejs';
import Image from 'next/image';
import styles from './BentoSection.module.css';

export default function BentoSection({ id, onBook }) {

  const sectionRef = useRef(null);
  const val1Ref = useRef(null);
  const val2Ref = useRef(null);
  const val3Ref = useRef(null);
  const hasAnimated = useRef(false);

  const canvasContainer = useRef(null);

  useEffect(() => {
    let animationId;
    let renderer;
    let scene;
    let camera;
    let particles;
    let mouseX = 0;
    let mouseY = 0;

    const initThree = () => {
      if (!canvasContainer.current) return;

      scene = new THREE.Scene();

      const width = canvasContainer.current.clientWidth;
      const height = canvasContainer.current.clientHeight;

      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 20;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      canvasContainer.current.appendChild(renderer.domElement);

      const geometry = new THREE.BufferGeometry();
      const count = 3000;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const radius = Math.random() * 15;
        const spinAngle = radius * 0.5;
        const branchAngle = ((i % 5) / 5) * Math.PI * 2;

        const spreadX = (Math.random() - 0.5) * 3;
        const spreadY = (Math.random() - 0.5) * 3;
        const spreadZ = (Math.random() - 0.5) * 3;

        const x = Math.cos(branchAngle + spinAngle) * radius + spreadX;
        const y = Math.sin(branchAngle + spinAngle) * radius + spreadY;
        const z = spreadZ * (15 - radius) * 0.2;

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        const r = Math.random();
        if (r < 0.33) {
          colors[i3] = 1; colors[i3 + 1] = 0.2; colors[i3 + 2] = 0.2;
        } else if (r < 0.66) {
          colors[i3] = 0.2; colors[i3 + 1] = 0.6; colors[i3 + 2] = 1;
        } else {
          colors[i3] = 1; colors[i3 + 1] = 0.8; colors[i3 + 2] = 0.2;
        }
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.9
      });

      particles = new THREE.Points(geometry, material);
      particles.rotation.x = Math.PI * 0.2;
      scene.add(particles);

      window.addEventListener('resize', onResize);
      canvasContainer.current.addEventListener('mousemove', onMouseMove);
      canvasContainer.current.addEventListener('mouseleave', () => {
        mouseX = 0; mouseY = 0;
      });

      renderLoop();
    };

    const onMouseMove = (event) => {
      if (!canvasContainer.current) return;
      const rect = canvasContainer.current.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onResize = () => {
      if (!canvasContainer.current || !camera || !renderer) return;
      const width = canvasContainer.current.clientWidth;
      const height = canvasContainer.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const renderLoop = () => {
      animationId = requestAnimationFrame(renderLoop);
      if (particles) {
        particles.rotation.z -= 0.003;
        particles.rotation.x += (Math.PI * 0.2 + mouseY * 0.4 - particles.rotation.x) * 0.05;
        particles.rotation.y += (mouseX * 0.4 - particles.rotation.y) * 0.05;
      }
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

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

      animate([`.${styles.mOrbit1}`, `.${styles.mOrbit2}`, `.${styles.mOrbit3}`], {
        rotate: '1turn',
        duration: 6000,
        easing: 'linear',
        loop: true
      });

      animate([`.${styles.uiMockup} .${styles.mbox}`, `.${styles.uiMockup} .${styles.mline}`, `.${styles.uiMockup} .${styles.mbtn}`], {
        opacity: [0.3, 1],
        translateY: [10, 0],
        delay: stagger(150),
        duration: 1500,
        easing: 'outExpo'
      });

      animate(`.${styles.cbar}`, {
        scaleY: [0, 1],
        delay: stagger(150),
        duration: 1500,
        easing: 'outElastic(1, .8)'
      });

      animate(`.${styles.statItem}`, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: stagger(100),
        easing: 'outExpo'
      });

      const path = document.querySelector(`.${styles.chartNeonLine}`);
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        animate(path, {
          strokeDashoffset: [length, 0],
          duration: 2500,
          easing: 'inOutSine',
          delay: 500,
          direction: 'alternate',
          loop: true
        });
      }
    };

    initThree();
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        initAnimeEffects();
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }


    return () => {
      window.removeEventListener('resize', onResize);
      if (canvasContainer.current) {
        canvasContainer.current.removeEventListener('mousemove', onMouseMove);
      }
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) {
        renderer.dispose();
        if (canvasContainer.current?.contains(renderer.domElement)) {
          canvasContainer.current.removeChild(renderer.domElement);
        }
      }
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
              <div className={styles.blCoverWrapper} style={{ position: 'relative' }}>
                <div className={styles.blCover} style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image src="/Planets/pngtree-jupiter-planet-image-on-white-background-png-image_13888640 1.png" alt="Cover" fill sizes="100vw" quality={100} style={{ objectFit: 'cover' }} className={styles.blImage} />
                  <div className={styles.blBadge}>EXPLORAR</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.bentoCard} ${styles.tmCard}`}>
          <div className={`${styles.cardGlass} ${styles.p0} ${styles.overflowHidden}`}>
            <div className={styles.hugeTextBg}>
              <span>ATOM</span>
              <span className={styles.outline}>ATOM</span>
              <span>ATOM</span>
              <span className={styles.outline}>ATOM</span>
            </div>
            <div className={styles.canvasContainer} ref={canvasContainer}></div>
            <div className={styles.tmContent}>
              <span className={styles.badge}>Núcleo Ativo</span>
              <h2>Inovação Quântica</h2>
              <p>O epicentro onde suas ideias se transformam em produtos escaláveis.</p>
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
                  <span className={`${styles.priceNumber} pVal1`}>600</span>
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
                  <span className={`${styles.priceNumber} pVal2`}>500</span>
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
                  <span className={`${styles.priceNumber} pVal3`}>1200</span>
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
    </section>
  );
}
