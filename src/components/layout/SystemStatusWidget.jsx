"use client";

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { animate } from 'animejs';
import styles from './SystemStatusWidget.module.css';

export default function SystemStatusWidget() {
  const [latency, setLatency] = useState(11);
  const [speed, setSpeed] = useState('29.78');
  const [isMinimized, setIsMinimized] = useState(false);
  const canvasRef = useRef(null);
  const statsContainerRef = useRef(null);

  // Fluctuating Sci-Fi Telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 5) + 9); // 9ms - 13ms
      setSpeed((29.75 + Math.random() * 0.08).toFixed(2)); // 29.75 - 29.83 km/s
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Three.js Holographic 3D Gyroscope Radar
  useEffect(() => {
    if (!canvasRef.current) return;

    const width = 44;
    const height = 44;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 2.6;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Outer Ring
    const ringGeo1 = new THREE.TorusGeometry(0.85, 0.02, 16, 40);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    scene.add(ring1);

    // Inner Ring
    const ringGeo2 = new THREE.TorusGeometry(0.6, 0.015, 12, 30);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.9
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    scene.add(ring2);

    // Core Wireframe Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(0.32, 1);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x27c93f,
      wireframe: true,
      transparent: true,
      opacity: 0.9
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // Orbiting particles
    const particleCount = 16;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 1.6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.9
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let animationFrameId;
    const renderLoop = () => {
      ring1.rotation.x += 0.015;
      ring1.rotation.y += 0.02;

      ring2.rotation.x -= 0.025;
      ring2.rotation.z += 0.018;

      sphere.rotation.y += 0.03;
      particles.rotation.y -= 0.01;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      renderer.forceContextLoss();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  // Anime.js HUD entrance effect
  useEffect(() => {
    if (statsContainerRef.current && !isMinimized) {
      try {
        animate({
          targets: statsContainerRef.current.children,
          opacity: [0, 1],
          translateY: [4, 0],
          delay: (el, i) => i * 35,
          duration: 300,
          easing: 'easeOutQuad'
        });
      } catch (e) {
        // Fallback gracefully
      }
    }
  }, [isMinimized]);

  return (
    <div 
      className={`${styles.widget} ${isMinimized ? styles.minimized : ''}`}
      role="region" 
      aria-label="Painel de Navegação Espacial ATOM"
    >
      <div className={styles.hudFrame}>
        {/* Animated Scanline HUD Overlay */}
        <div className={styles.scanline}></div>

        {/* Three.js Holographic Gyro Radar */}
        <div className={styles.radarBox} title="Radar Giroscópio 3D Sincronizado">
          <canvas ref={canvasRef} className={styles.threeCanvas} />
          <div className={styles.radarCrosshair}></div>
        </div>

        {/* Cockpit HUD Body */}
        <div className={styles.hudBody}>
          <div className={styles.statusHeader}>
            <div className={styles.statusBadge}>
              <span className={styles.pulseDot}></span>
              <span className={styles.statusText}>OPERACIONAL</span>
            </div>
            <span className={styles.orbitTag}>ÓRBITA ATOM</span>
          </div>

          {!isMinimized && (
            <div className={styles.telemetryGrid} ref={statsContainerRef}>
              <div className={styles.hudItem}>
                <span className={styles.label}>VELOCIDADE</span>
                <span className={styles.val}>{speed} <small>km/s</small></span>
              </div>

              <div className={styles.divider}>|</div>

              <div className={styles.hudItem}>
                <span className={styles.label}>SINCRONIA</span>
                <span className={styles.valCyan}>99.9%</span>
              </div>

              <div className={styles.divider}>|</div>

              <div className={styles.hudItem}>
                <span className={styles.label}>LATÊNCIA</span>
                <span className={styles.valPurple}>{latency}ms</span>
              </div>

              <div className={styles.divider}>|</div>

              <div className={styles.hudItem}>
                <span className={styles.label}>ESCUDO</span>
                <div className={styles.shieldBar} title="Escudo Estável 100%">
                  <div className={styles.shieldFill}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Toggle HUD Button */}
        <button 
          className={styles.hudToggleBtn} 
          onClick={() => setIsMinimized(!isMinimized)}
          aria-label={isMinimized ? 'Expandir telemetria' : 'Recolher telemetria'}
          title={isMinimized ? 'Expandir painel de nave' : 'Recolher painel'}
        >
          {isMinimized ? '⚙ NAVE' : '—'}
        </button>
      </div>
    </div>
  );
}
