"use client";

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { animate, stagger } from 'animejs';
import styles from './ProjectArchitectSection.module.css';

const step1Options = [
  { id: 'landing', label: 'Landing Page', icon: '🚀', desc: 'Página única focada em alta conversão de visitantes' },
  { id: 'system', label: 'Sistema Web & IA 24/7', icon: '⚡', desc: 'Plataforma web com suporte inteligente automatizado' },
  { id: 'ecommerce', label: 'E-commerce', icon: '🛒', desc: 'Loja virtual com catálogo e checkout otimizado' },
  { id: 'corporate', label: 'Site Institucional', icon: '🌐', desc: 'Estrutura multipáginas de alta autoridade' }
];

const step2Options = [
  { id: 'sales', label: 'Multiplicar Vendas & Leads', icon: '🎯' },
  { id: 'automation', label: 'Atendimento Automatizado 24/7', icon: '⚡' },
  { id: 'branding', label: 'Posicionamento Premium', icon: '💎' },
  { id: 'launch', label: 'Lançar Novo Produto Rápido', icon: '🔥' }
];

const step3Options = [
  { id: 'urgent', label: 'Urgente (7 a 14 dias)', icon: '⏱️' },
  { id: 'standard', label: 'Próximas 3 semanas', icon: '📅' },
  { id: 'planned', label: 'A combinar / Planejamento', icon: '🤝' }
];

export default function ProjectArchitectSection({ id, onBook }) {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedType, setSelectedType] = useState('system');
  const [selectedGoal, setSelectedGoal] = useState('sales');
  const [selectedTime, setSelectedTime] = useState('urgent');

  const canvasRef = useRef(null);
  const optionsGridRef = useRef(null);

  const selectedTypeObj = step1Options.find(o => o.id === selectedType) || step1Options[0];
  const selectedGoalObj = step2Options.find(o => o.id === selectedGoal) || step2Options[0];
  const selectedTimeObj = step3Options.find(o => o.id === selectedTime) || step3Options[0];

  // Three.js Interactive 3D Holographic Blueprint Canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const container = canvasRef.current.parentElement;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Colors according to step
    const colorHex = activeStep === 1 ? 0x00e5ff : activeStep === 2 ? 0xa855f7 : 0x27c93f;

    // Core Geometries
    const geo1 = new THREE.IcosahedronGeometry(0.9, 1);
    const geo2 = new THREE.TorusKnotGeometry(0.65, 0.18, 64, 16);
    const geo3 = new THREE.OctahedronGeometry(0.95, 1);

    const currentGeo = activeStep === 1 ? geo1 : activeStep === 2 ? geo2 : geo3;

    const mat = new THREE.MeshBasicMaterial({
      color: colorHex,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });

    const mesh = new THREE.Mesh(currentGeo, mat);
    scene.add(mesh);

    // Orbital Ring
    const ringGeo = new THREE.TorusGeometry(1.4, 0.015, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Orbiting Particles
    const particleCount = 35;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 3.8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: colorHex,
      transparent: true,
      opacity: 0.7
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let animationFrameId;
    const renderLoop = () => {
      mesh.rotation.x += 0.008;
      mesh.rotation.y += 0.012;
      ring.rotation.z += 0.006;
      particles.rotation.y -= 0.004;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    const handleResize = () => {
      if (!container || !canvasRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geo1.dispose();
      geo2.dispose();
      geo3.dispose();
      mat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [activeStep]);

  // Anime.js entrance stagger for options
  useEffect(() => {
    if (optionsGridRef.current) {
      try {
        animate({
          targets: optionsGridRef.current.children,
          opacity: [0, 1],
          translateY: [12, 0],
          delay: stagger(60),
          duration: 350,
          easing: 'easeOutQuad'
        });
      } catch (e) {
        // Fallback
      }
    }
  }, [activeStep]);

  const handleFinish = () => {
    if (onBook) onBook();
  };

  return (
    <section className={styles.section} id={id || 'arquiteto-projeto'}>
      {/* Background Ambient Glows */}
      <div className={styles.bgGlows} aria-hidden="true">
        <div className={styles.glowCyan}></div>
        <div className={styles.glowPurple}></div>
        <div className={styles.starsGrid}></div>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>✦ ARQUITETO DE PROJETOS 3D</div>
          <h2 className={styles.title}>
            Monte o Escopo do Seu Projeto <span className={styles.titleHighlight}>em 3 Passos</span>
          </h2>
          <p className={styles.subtitle}>
            Selecione as necessidades da sua empresa para gerar um briefing prévio instantâneo com a tecnologia ATOM.
          </p>
        </div>

        {/* Wizard Steps Nav */}
        <div className={styles.stepsNav}>
          <button 
            className={`${styles.stepNavBtn} ${activeStep === 1 ? styles.stepActive : ''} ${activeStep > 1 ? styles.stepCompleted : ''}`}
            onClick={() => setActiveStep(1)}
          >
            <span className={styles.stepNum}>1</span> 1. Tipo de Solução
          </button>
          <span className={styles.stepArrow}>→</span>
          <button 
            className={`${styles.stepNavBtn} ${activeStep === 2 ? styles.stepActive : ''} ${activeStep > 2 ? styles.stepCompleted : ''}`}
            onClick={() => setActiveStep(2)}
          >
            <span className={styles.stepNum}>2</span> 2. Objetivo Principal
          </button>
          <span className={styles.stepArrow}>→</span>
          <button 
            className={`${styles.stepNavBtn} ${activeStep === 3 ? styles.stepActive : ''}`}
            onClick={() => setActiveStep(3)}
          >
            <span className={styles.stepNum}>3</span> 3. Prazo & Resumo
          </button>
        </div>

        {/* Wizard Main Layout with 3D Hologram Side Panel */}
        <div className={styles.wizardContainer}>
          {/* 3D Holographic Canvas Column */}
          <div className={styles.hologramColumn} title="Holograma 3D Interativo do Escopo">
            <div className={styles.hologramFrame}>
              <canvas ref={canvasRef} className={styles.threeCanvas} />
              <div className={styles.hologramLabel}>
                <span className={styles.hologramDot}></span>
                <span>MODELO 3D: PASSO 0{activeStep}</span>
              </div>
            </div>
          </div>

          {/* Options Column */}
          <div className={styles.wizardBody}>
            {activeStep === 1 && (
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Qual tipo de projeto melhor atende à sua empresa?</h3>
                <div className={styles.gridOptions} ref={optionsGridRef}>
                  {step1Options.map(option => (
                    <button
                      key={option.id}
                      className={`${styles.optionCard} ${selectedType === option.id ? styles.optionActive : ''}`}
                      onClick={() => { setSelectedType(option.id); setActiveStep(2); }}
                    >
                      <span className={styles.optIcon}>{option.icon}</span>
                      <h4 className={styles.optLabel}>{option.label}</h4>
                      <p className={styles.optDesc}>{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Qual o resultado mais importante que você deseja atingir?</h3>
                <div className={styles.gridOptions} ref={optionsGridRef}>
                  {step2Options.map(option => (
                    <button
                      key={option.id}
                      className={`${styles.optionCard} ${selectedGoal === option.id ? styles.optionActive : ''}`}
                      onClick={() => { setSelectedGoal(option.id); setActiveStep(3); }}
                    >
                      <span className={styles.optIcon}>{option.icon}</span>
                      <h4 className={styles.optLabel}>{option.label}</h4>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Selecione a sua estimativa de prazo desejado:</h3>
                <div className={styles.timeGrid} ref={optionsGridRef}>
                  {step3Options.map(option => (
                    <button
                      key={option.id}
                      className={`${styles.timeCard} ${selectedTime === option.id ? styles.optionActive : ''}`}
                      onClick={() => setSelectedTime(option.id)}
                    >
                      <span className={styles.optIcon}>{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>

                {/* Summary Card */}
                <div className={styles.summaryBox}>
                  <h4 className={styles.summaryTitle}>📋 Resumo do Seu Briefing:</h4>
                  <div className={styles.summaryItems}>
                    <div className={styles.sumItem}>
                      <span className={styles.sumLabel}>Solução:</span>
                      <span className={styles.sumVal}>{selectedTypeObj.icon} {selectedTypeObj.label}</span>
                    </div>
                    <div className={styles.sumItem}>
                      <span className={styles.sumLabel}>Objetivo:</span>
                      <span className={styles.sumVal}>{selectedGoalObj.icon} {selectedGoalObj.label}</span>
                    </div>
                    <div className={styles.sumItem}>
                      <span className={styles.sumLabel}>Prazo:</span>
                      <span className={styles.sumVal}>{selectedTimeObj.icon} {selectedTimeObj.label}</span>
                    </div>
                  </div>

                  <button className={styles.finishBtn} onClick={handleFinish}>
                    Agendar Decolagem Com Este Briefing <span className={styles.arrow}>→</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
