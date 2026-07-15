"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function EarthWireframe({
  autoRotate = true,
  autoRotateSpeed = 0.8,
  backgroundColor = '',
  customStyle = {},
  onLoaded,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || container.offsetWidth || 600;
    const height = container.clientHeight || container.offsetHeight || 400;

    const scene = new THREE.Scene();
    if (backgroundColor) scene.background = new THREE.Color(backgroundColor);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const controls = new OrbitControls(camera, canvas);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // A group to hold our planet elements
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. The Wireframe Shell (Icosahedron for that cyber-triangular look)
    // Detail level 12 creates a nice dense but readable mesh
    const wireframeGeometry = new THREE.IcosahedronGeometry(1, 12);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b9cff, // ATOM brand blue
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    globeGroup.add(wireframeMesh);

    // 2. Inner core (solid black/dark blue to block the back of the wireframe slightly)
    const coreGeometry = new THREE.IcosahedronGeometry(0.98, 12);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x020813, // Very dark blue/black
      transparent: true,
      opacity: 0.8
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(coreMesh);

    // 3. Highlight/Glow points (creating a data-node look)
    const pointsGeometry = new THREE.IcosahedronGeometry(1.01, 12);
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x00e5ff, // Cyan
      size: 0.015,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    globeGroup.add(pointsMesh);

    // 4. Data Rings (Equatorial and Polar rings)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x8a2be2, // Purple
      wireframe: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    
    // Equatorial ring
    const ringGeo1 = new THREE.TorusGeometry(1.2, 0.005, 3, 64);
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMaterial);
    ringMesh1.rotation.x = Math.PI / 2;
    globeGroup.add(ringMesh1);

    // Polar ring
    const ringGeo2 = new THREE.TorusGeometry(1.15, 0.005, 3, 64);
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMaterial);
    ringMesh2.rotation.y = Math.PI / 2;
    globeGroup.add(ringMesh2);

    // Tilt the whole group like the Earth
    globeGroup.rotation.z = 23.5 * Math.PI / 180;

    let animationId = null;
    let lastTime = performance.now();

    function animate(currentTime) {
      animationId = requestAnimationFrame(animate);
      
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (controls) controls.update();

      // Independent rotations for the rings to make it feel alive
      ringMesh1.rotation.z -= 0.2 * deltaTime;
      ringMesh2.rotation.z += 0.3 * deltaTime;
      
      // Pulse the points slightly
      pointsMaterial.opacity = 0.3 + Math.sin(currentTime * 0.002) * 0.15;

      renderer.render(scene, camera);
    }
    
    // Intersection observer
    let isVisible = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastTime = performance.now();
          if (!animationId) animate(performance.now());
        } else {
          if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
        }
      });
    }, { threshold: 0.05 });
    io.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const newWidth = container.clientWidth || container.offsetWidth;
      const newHeight = container.clientHeight || container.offsetHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });
    resizeObserver.observe(container);

    if (onLoaded) {
      // Fire loaded immediately since there are no external assets to fetch
      setTimeout(() => onLoaded(), 100);
    }

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId);
      io.disconnect();
      controls.dispose();
      resizeObserver.disconnect();
      renderer.dispose();
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, [backgroundColor, autoRotate, autoRotateSpeed, onLoaded]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', ...customStyle }}>
      {/* Background glow behind the wireframe */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(59, 156, 255, 0.15) 0%, rgba(138, 43, 226, 0.05) 50%, transparent 70%)',
        filter: 'blur(30px)',
        zIndex: -1,
        pointerEvents: 'none'
      }}></div>
    </div>
  );
}
