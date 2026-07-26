"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationId;
    let renderer;
    let scene;
    let camera;
    let gyroMesh;
    let ringMesh;

    let mouseX = -500; // Offscreen initially until first movement
    let mouseY = -500;
    let currentX = -500;
    let currentY = -500;
    let targetScale = 1;
    let currentScale = 1;
    let hasMoved = false;

    const initThree = () => {
      if (!canvasRef.current) return;

      const width = window.innerWidth || 1920;
      const height = window.innerHeight || 1080;

      try {
        scene = new THREE.Scene();

        camera = new THREE.OrthographicCamera(
          -width / 2, width / 2,
          height / 2, -height / 2,
          0.1, 1000
        );
        camera.position.z = 100;

        renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Minimalist 3D Core
        const coreGeo = new THREE.IcosahedronGeometry(7, 1);
        const coreMat = new THREE.MeshBasicMaterial({
          color: 0x00e5ff,
          wireframe: true,
          transparent: true,
          opacity: 0.85
        });
        gyroMesh = new THREE.Mesh(coreGeo, coreMat);
        scene.add(gyroMesh);

        // Minimalist Orbital Ring
        const ringGeo = new THREE.TorusGeometry(13, 0.7, 12, 40);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xa855f7,
          transparent: true,
          opacity: 0.85
        });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI * 0.35;
        scene.add(ringMesh);

        renderLoop();
      } catch (err) {
        console.warn('Three.js cursor follower init warning:', err);
      }
    };

    const renderLoop = () => {
      animationId = requestAnimationFrame(renderLoop);

      if (!hasMoved) {
        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
        return;
      }

      // Smooth offset (+18px right, +18px down) beside native mouse cursor
      const targetX = mouseX + 18;
      const targetY = mouseY + 18;

      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      currentScale += (targetScale - currentScale) * 0.2;

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const posX = currentX - screenW / 2;
      const posY = -(currentY - screenH / 2);

      if (gyroMesh) {
        gyroMesh.position.set(posX, posY, 0);
        gyroMesh.rotation.x += 0.025;
        gyroMesh.rotation.y += 0.03;
        gyroMesh.scale.setScalar(currentScale);
      }

      if (ringMesh) {
        ringMesh.position.set(posX, posY, 0);
        ringMesh.rotation.z += 0.035;
        ringMesh.rotation.y += 0.02;
        ringMesh.scale.setScalar(currentScale);
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        currentX = mouseX + 18;
        currentY = mouseY + 18;
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target && target.closest('a, button, input, textarea, select, [role="button"], .bentoCard');
      if (isInteractive) {
        targetScale = 1.35;
      } else {
        targetScale = 1;
      }
    };

    const onResize = () => {
      if (!camera || !renderer) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('resize', onResize);

    const timer = setTimeout(initThree, 50);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('resize', onResize);
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.cursorCanvas} />;
}
