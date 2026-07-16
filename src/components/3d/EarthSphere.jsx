"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function EarthSphere({
  autoRotate = true,
  autoRotateSpeed = 0.5,
  backgroundColor = '',
  customStyle = {},
  onLoaded,
}) {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || container.offsetWidth || 600;
    const height = container.clientHeight || container.offsetHeight || 400;

    const scene = new THREE.Scene();
    if (backgroundColor) scene.background = new THREE.Color(backgroundColor);

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    // Limit pixel ratio to 1.5 to save performance on high density displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Add filmic tone mapping for realistic lighting
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.05); // low ambient to let nightlights shine
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(5, 3, 5); // Sun from top right
    scene.add(sunLight);

    const controls = new OrbitControls(camera, canvas);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    let animationId = null;
    let earthMesh = null;
    let cloudsMesh = null;

    const textureLoader = new THREE.TextureLoader();
    const loadTexture = (path) => new Promise((resolve, reject) => {
      textureLoader.load(path, resolve, undefined, reject);
    });

    async function initEarth() {
      try {
        // Load the optimized WebP textures we created earlier
        const [colorMap, bumpMap, emissiveMap, cloudsMap] = await Promise.all([
          loadTexture('/Terra/textures/earth albedo.webp'),
          loadTexture('/Terra/textures/earth bump.webp'),
          loadTexture('/Terra/textures/earth night_lights_modified.webp'),
          loadTexture('/Terra/textures/clouds earth.webp')
        ]);

        colorMap.colorSpace = THREE.SRGBColorSpace;
        emissiveMap.colorSpace = THREE.SRGBColorSpace;
        
        // Earth Base
        const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
        const earthMaterial = new THREE.MeshStandardMaterial({
          map: colorMap,
          bumpMap: bumpMap,
          bumpScale: 0.015,
          emissiveMap: emissiveMap,
          emissive: new THREE.Color(0xffffff),
          emissiveIntensity: 1.5,
          roughness: 0.7,
          metalness: 0.1
        });
        
        earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        // Tilt the Earth (axial tilt ~23.5 degrees)
        earthMesh.rotation.z = 23.5 * Math.PI / 180;
        scene.add(earthMesh);

        // Clouds Layer (slightly larger sphere)
        const cloudGeometry = new THREE.SphereGeometry(1.015, 64, 64);
        const cloudMaterial = new THREE.MeshStandardMaterial({
          map: cloudsMap,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.FrontSide
        });
        
        cloudsMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
        // Apply the same tilt so clouds rotate correctly around the equator
        cloudsMesh.rotation.z = 23.5 * Math.PI / 180;
        scene.add(cloudsMesh);
        
        if (onLoaded) onLoaded();
      } catch (err) {
        console.error('An error happened loading Earth textures', err);
        setError('Error loading textures');
      }
    }

    initEarth();

    let lastTime = performance.now();

    function animate(currentTime) {
      animationId = requestAnimationFrame(animate);
      
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (controls) controls.update();
      
      // We can add a slight independent rotation to clouds
      if (cloudsMesh) {
        cloudsMesh.rotateY(0.01 * deltaTime);
      }

      renderer.render(scene, camera);
    }
    
    // Intersection observer to only render when visible
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
      {error && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0d0d', color: '#888', fontSize: '14px' }}>{error}</div>}
    </div>
  );
}
