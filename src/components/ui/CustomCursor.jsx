"use client";

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorDot = useRef(null);
  const cursorRing = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isHovering = false;
    let animationId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (cursorDot.current) {
        cursorDot.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, .glass-card, input, textarea, .faq-item, .bento-card, .planet-img') !== null;
      
      if (isInteractive && !isHovering) {
        isHovering = true;
        if (cursorRing.current) cursorRing.current.classList.add(styles.hovered);
        if (cursorDot.current) cursorDot.current.classList.add(styles.hovered);
      } else if (!isInteractive && isHovering) {
        isHovering = false;
        if (cursorRing.current) cursorRing.current.classList.remove(styles.hovered);
        if (cursorDot.current) cursorDot.current.classList.remove(styles.hovered);
      }
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      if (cursorRing.current) {
        cursorRing.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      
      animationId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    render();

    // Add global body classes for cursor hiding
    document.body.classList.add(styles.hideDefaultCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (animationId) cancelAnimationFrame(animationId);
      document.body.classList.remove(styles.hideDefaultCursor);
    };
  }, []);

  return (
    <>
      <div className={styles.cursorDot} ref={cursorDot}></div>
      <div className={styles.cursorRing} ref={cursorRing}></div>
    </>
  );
}
