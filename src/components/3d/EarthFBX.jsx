"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export default function EarthFBX({
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

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, canvas);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    let animationId = null;
    let loadedObject = null;

    const textureLoader = new THREE.TextureLoader();
    const loadTexture = (path) => new Promise((resolve) => textureLoader.load(path, resolve));

    async function loadModel() {
      try {
        const [colorMap, bumpMap, specMap, cloudsMap] = await Promise.all([
          loadTexture('/Terra 2/textures/earth_color_7k.png'),
          loadTexture('/Terra 2/textures/topography_10k_(1).png'),
          loadTexture('/Terra 2/textures/earth_nightlights_10K_(1).png'),
          loadTexture('/Terra 2/textures/earth_clouds_8K.png')
        ]);

        colorMap.colorSpace = THREE.SRGBColorSpace;
        
        const fbxLoader = new FBXLoader();
        fbxLoader.load(
          '/Terra 2/source/Earthblend.fbx',
          (object) => {
            loadedObject = object;
            
            // Center and scale the object to fit the view
            const box = new THREE.Box3().setFromObject(object);
            const size = box.getSize(new THREE.Vector3()).length();
            const center = box.getCenter(new THREE.Vector3());
            
            object.position.x += (object.position.x - center.x);
            object.position.y += (object.position.y - center.y);
            object.position.z += (object.position.z - center.z);
            
            // Adjust scale to fit the 1 unit radius expected by the camera
            const scale = 1.0 / size;
            object.scale.setScalar(scale * 1.5);

            object.traverse((child) => {
              if (child.isMesh) {
                // Determine if it's the cloud layer or the earth layer by name or just material
                // We'll just apply standard material
                child.material = new THREE.MeshStandardMaterial({
                  map: colorMap,
                  bumpMap: bumpMap,
                  bumpScale: 0.015,
                  roughness: 0.6,
                  metalness: 0.1
                });
                
                // If there's a specific cloud mesh, we would apply cloudsMap and transparency
                // But for now apply basic textures
              }
            });

            scene.add(object);

            // Add a cloud sphere as a secondary mesh just in case
            const cloudGeometry = new THREE.SphereGeometry(scale * 1.51, 64, 64);
            const cloudMaterial = new THREE.MeshStandardMaterial({
              map: cloudsMap,
              transparent: true,
              opacity: 0.4,
              blending: THREE.AdditiveBlending,
              depthWrite: false
            });
            const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
            scene.add(cloudMesh);
            
            if (onLoaded) onLoaded();
          },
          undefined,
          (err) => {
            console.error('An error happened loading the FBX model', err);
            setError('Error loading model');
          }
        );
      } catch (err) {
        console.error('An error happened loading textures', err);
        setError('Error loading textures');
      }
    }

    loadModel();

    function animate() {
      animationId = requestAnimationFrame(animate);
      if (controls) controls.update();
      renderer.render(scene, camera);
    }
    animate();

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
