"use client";

import { useEffect, useRef } from 'react';
import styles from './RisingLines.module.css';

class Line {
  constructor(w, h, speed) {
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.reset();
    this.y = Math.random() * this.h;
  }

  reset() {
    this.x = Math.random() * this.w;
    this.y = this.h + Math.random() * 200;
    this.length = Math.random() * (this.h * 0.4) + (this.h * 0.1); 
    this.thickness = Math.random() * 1.5 + 0.5;
    this.velocity = (Math.random() * 1.5 + 0.5) * this.speed;
    this.opacity = Math.random() * 0.5 + 0.1;
  }

  update() {
    this.y -= this.velocity;
    if (this.y + this.length < 0) {
      this.reset();
    }
  }

  draw(ctx) {
    ctx.beginPath();
    
    const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = this.thickness;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  }
}

export default function RisingLines({ lineCount = 30, speed = 1.5 }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let lines = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!container) return;
      width = container.offsetWidth;
      height = container.offsetHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      lines = Array.from({ length: lineCount }, () => new Line(width, height, speed));
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      lines.forEach(line => {
        line.update();
        line.draw(ctx);
      });
      
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [lineCount, speed]);

  return (
    <div className={styles.risingLinesContainer} ref={containerRef}>
      <canvas ref={canvasRef}></canvas>
      <div className={styles.overlayGradient}></div>
    </div>
  );
}
