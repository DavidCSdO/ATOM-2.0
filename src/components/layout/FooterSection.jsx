"use client";

import { useEffect, useRef } from 'react';
import styles from './FooterSection.module.css';

export default function FooterSection() {
  const galaxyCanvas = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const canvas = galaxyCanvas.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let animationFrameId;
    let stars = [];
    
    const params = {
      starSpeed: 0.4,
      density: 1.5,
      hueShift: 100,
      glowIntensity: 0.5,
      twinkleIntensity: 0.2,
      rotationSpeed: 0.05
    };

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = footerRef.current ? footerRef.current.offsetHeight : 800;
      initStars();
    }

    function initStars() {
      stars = [];
      const numStars = Math.floor((width * height) / 2000 * params.density);
      
      for (let i = 0; i < numStars; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * Math.max(width, height);
        
        stars.push({
          angle,
          radius,
          baseRadius: radius,
          size: Math.random() * 1.5 + 0.5,
          twinkleSpeed: Math.random() * 0.05 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          hue: (200 + params.hueShift + Math.random() * 60) % 360,
          speed: (Math.random() * 0.5 + 0.2) * params.starSpeed
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      stars.forEach(star => {
        star.angle += (params.rotationSpeed * 0.005) / (star.radius / 500 + 0.5);
        
        const x = cx + Math.cos(star.angle) * star.radius;
        const y = cy + Math.sin(star.angle) * star.radius;

        star.twinklePhase += star.twinkleSpeed;
        const alpha = 0.5 + Math.sin(star.twinklePhase) * params.twinkleIntensity * 2;

        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        
        const rgb = `hsl(${star.hue}, 80%, 70%)`;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, alpha))})`;
        
        if (params.glowIntensity > 0 && Math.random() > 0.5) {
          ctx.shadowBlur = 10 * params.glowIntensity;
          ctx.shadowColor = rgb;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <footer id="contato" className={styles.footerSection} ref={footerRef}>
      <canvas ref={galaxyCanvas} className={styles.galaxyCanvas}></canvas>

      <div className={styles.footerContent}>
        <div className={styles.footerInfo}>
          <div className={styles.footerCol}>
            <h4>Navegação</h4>
            <a href="#home">Início</a>
            <a href="#projetos">Projetos</a>
            <a href="#solucoes">Soluções</a>
            <a href="#planos">Planos</a>
          </div>
          <div className={styles.footerCol}>
            <h4>Social</h4>
            <a href="https://www.instagram.com/atom_con/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/in/david-cardoso-659239215/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className={styles.footerCol}>
            <h4>Contato</h4>
            <a href="mailto:cardosodavid92@gmail.com">cardosodavid92@gmail.com</a>
            <a href="https://wa.me/5524992928110" target="_blank" rel="noopener noreferrer">WhatsApp: 24 99292 8110</a>
          </div>
        </div>

        <h1 className={styles.hugeAtom}>ATOM</h1>
        <p className={styles.copyright}>© 2026 - ATOM</p>
      </div>
    </footer>
  );
}
