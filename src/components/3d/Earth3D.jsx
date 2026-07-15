"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// ─── Constants ───
const GLOBE_RADIUS = 1;
const MAX_ELEVATION = 6000;
const BASE_CAMERA_DISTANCE = 5.2;
const GLOBE_DATA_BASE = 'https://cdn.jsdelivr.net/gh/framer-university/components/depth-globe-data';
const BINARY_URLS = {
  low: `${GLOBE_DATA_BASE}/globe_low.bin`,
  medium: `${GLOBE_DATA_BASE}/globe_medium.bin`,
  high: `${GLOBE_DATA_BASE}/globe_high.bin`,
};
const JSON_FALLBACK_URLS = {
  low: `${GLOBE_DATA_BASE}/globe_samples_10m_0.1.json`,
  medium: `${GLOBE_DATA_BASE}/globe_samples_10m_0.1.json`,
  high: `${GLOBE_DATA_BASE}/globe_samples_10m_0.1.json`,
};

// ─── Shaders ───
const pointVertexShader = `
  attribute vec3 direction;
  attribute float elevation;
  attribute float land;
  uniform float uRadius;
  uniform float uScale;
  uniform float uTime;
  uniform float uAnimate;
  uniform float uPixelRatio;
  uniform float uParticleSize;
  uniform vec3 uCameraDelta;
  varying float vElevation;
  varying float vLand;
  varying float vPhase;
  varying vec3 vNormal;
  void main() {
    vElevation = elevation;
    vLand = land;
    vNormal = normalize(direction);
    float baseRadius = uRadius + elevation * uScale * 0.84;
    float targetRadius = uRadius + elevation * uScale;
    float distance = targetRadius - baseRadius;
    float hash = fract(sin(dot(direction, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
    float offset = fract(hash + elevation * 0.36);
    float phase = fract(uTime / 3.6 + offset);
    vPhase = phase;
    float easedT = phase * phase * (3.0 - phase * 2.1);
    float wobbleAmount = 0.006;
    float elevationWobbleScale = 1.0 + elevation * 3.0;
    vec3 wobbleAxis = normalize(
      cross(direction, vec3(0.3, 1.0, 0.3)) +
      cross(direction, vec3(1.0, 0.3, 0.3))
    );
    float wobbleSignal = sin(uTime * 3.0 + hash * 6.0);
    float wobbleEnvelope = easedT * (1.0 - easedT);
    vec3 wobble = wobbleAxis * wobbleSignal * wobbleEnvelope * wobbleAmount * elevationWobbleScale * land;
    float wobbledRadius = baseRadius + distance * easedT;
    vec3 wobbledPosition = vec3(wobbledRadius) + wobble;
    vec3 targetRadiusVec = vec3(targetRadius);
    vec3 animatedPosition = targetRadiusVec + (wobbledPosition - targetRadiusVec) * uAnimate;
    vec3 worldPosition = animatedPosition * direction;
    vec3 cameraMotion = -uCameraDelta;
    vec3 viewDir = normalize(worldPosition) + wobble * 150.0;
    vec3 lateralMotion = cameraMotion - viewDir * dot(cameraMotion, viewDir);
    float blurElevation = 0.03;
    float blurFade = 0.3;
    float elevationMask = smoothstep(blurElevation, blurElevation + blurFade, elevation);
    float blurFactor = (elevation * uScale * 9.0 + length(wobble) * uScale) * elevationMask * uAnimate;
    worldPosition += lateralMotion * blurFactor;
    vec4 mvPosition = modelViewMatrix * vec4(worldPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    float baseSize = max(0.65 * uPixelRatio, 1.2 * uPixelRatio * (4.0 / -mvPosition.z));
    gl_PointSize = baseSize * uParticleSize;
  }
`;

const pointFragmentShader = `
  uniform vec3 uLandColor;
  uniform vec3 uWaterColor;
  uniform float uBlendFactor;
  uniform float uTime;
  uniform float uAnimate;
  uniform float uEdgeSoftness;
  varying float vElevation;
  varying float vLand;
  varying float vPhase;
  varying vec3 vNormal;
  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;
    float fadeThreshold = 0.69;
    float rawFade = clamp((vPhase - fadeThreshold) / (1.0 - fadeThreshold), 0.0, 1.0);
    float smoothFade = rawFade * rawFade * (3.0 - rawFade * 2.0);
    float fadeMask = vElevation >= fadeThreshold ? 1.0 : 0.0;
    float fade = 1.0 - smoothFade * fadeMask * uAnimate;
    vec3 landLow = uLandColor * (1.0 - uBlendFactor) + uWaterColor * uBlendFactor;
    vec3 landElevated = landLow + (uLandColor - landLow) * vElevation;
    vec3 color = (vLand > 0.5 ? landElevated : uWaterColor) * fade;
    float softWidth = mix(0.02, 0.2 * uEdgeSoftness, vElevation);
    float alpha = 1.0 - smoothstep(0.5 - softWidth, 0.5, dist);
    if (alpha <= 0.0) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

// ─── Helpers ───
function parseColorToRgb(input) {
  if (!input || input.trim() === '') return { r: 0, g: 0, b: 0 };
  const str = input.trim();
  const rgbaMatch = str.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i);
  if (rgbaMatch) {
    return {
      r: Math.max(0, Math.min(255, parseFloat(rgbaMatch[1]))) / 255,
      g: Math.max(0, Math.min(255, parseFloat(rgbaMatch[2]))) / 255,
      b: Math.max(0, Math.min(255, parseFloat(rgbaMatch[3]))) / 255,
    };
  }
  const hex = str.replace(/^#/, '');
  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
    };
  }
  if (hex.length === 3) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
    };
  }
  return { r: 0, g: 0, b: 0 };
}

function mapScaleUiToMultiplier(ui) {
  const clamped = Math.max(0, Math.min(1, ui));
  return clamped * 0.8 + 0.2;
}

function coordinatesToUnitDirection(lat, lon) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((90 - lon) * Math.PI) / 180;
  return [Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)];
}

function scaleElevation(elevation, scalingFactor, gamma) {
  const t = Math.max(0, Math.min(1, elevation / MAX_ELEVATION));
  return Math.pow(t, gamma) * scalingFactor;
}

function pointGeometryFromArrays(data) {
  const { directions, elevations, landMask } = data;
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('direction', new THREE.Float32BufferAttribute(directions, 3));
  geometry.setAttribute('elevation', new THREE.Float32BufferAttribute(elevations, 1));
  geometry.setAttribute('land', new THREE.Float32BufferAttribute(landMask, 1));
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(directions.length), 3));
  return geometry;
}

function pointGeometryShared(samples) {
  const directions = [];
  const elevations = [];
  const landMask = [];
  for (const [lat, lon, elevation, land] of samples) {
    const [dx, dy, dz] = coordinatesToUnitDirection(lat, lon);
    directions.push(dx, dy, dz);
    elevations.push(land ? scaleElevation(elevation, 1, 1) : 0);
    landMask.push(land);
  }
  return pointGeometryFromArrays({
    directions: new Float32Array(directions),
    elevations: new Float32Array(elevations),
    landMask: new Float32Array(landMask),
  });
}

// ─── Component ───
export default function Earth3D({
  pointsCount = 'medium',
  scale = 0.9,
  scaleFactor = 0.3,
  animate = true,
  autoRotate = true,
  autoRotateSpeed = 0.3,
  particleSize = 1,
  edgeSoftness = 0.5,
  backgroundColor = '#0d0d0d',
  landColor = '#fff0d1',
  waterColor = '#0d111a',
  blendFactor = 0.96,
  waterOpacity = 0.81,
  bloomRadius = 0.48,
  bloomStrength = 0.6,
  bloomThreshold = 0,
  lightColor = '#ffd0b8',
  lightIntensity = 0.9,
  toneMappingExposure = 1,
  quality = 1,
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
    const scaleMultiplier = mapScaleUiToMultiplier(scale);

    const scene = new THREE.Scene();
    if (backgroundColor) scene.background = new THREE.Color(backgroundColor);

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    const cameraDir = new THREE.Vector3(0, 1, 5.1).normalize();
    const cameraDistance = BASE_CAMERA_DISTANCE / scaleMultiplier;
    camera.position.copy(cameraDir).multiplyScalar(cameraDistance);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = toneMappingExposure;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    const dpr = Math.min(window.devicePixelRatio * quality, 8);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);

    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const ambientLight = new THREE.AmbientLight(0xffffff, lightIntensity / 2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(lightColor, lightIntensity);
    mainLight.position.set(1.2, 0, 0.66);
    scene.add(mainLight);

    const cameraLight = new THREE.DirectionalLight('#ffffff', 0.6);
    cameraLight.position.set(0, -6, -3);
    camera.add(cameraLight);
    scene.add(camera);

    const waterGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 0.999, 96, 96);
    const waterMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(waterColor),
      opacity: waterOpacity,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const waterMesh = new THREE.Mesh(waterGeometry, waterMaterial);
    waterMesh.renderOrder = 1;
    scene.add(waterMesh);

    const controls = new OrbitControls(camera, canvas);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.dampingFactor = 0.03;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;

    const isTransparent = !backgroundColor;
    let composer = null;
    let bloomPass = null;
    if (!isTransparent) {
      composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);
      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        bloomStrength, bloomRadius, bloomThreshold
      );
      composer.addPass(bloomPass);
      const outputPass = new OutputPass();
      composer.addPass(outputPass);
      composer.setSize(width, height);
      composer.setPixelRatio(dpr);
    }

    const landRgb = parseColorToRgb(landColor);
    const waterRgb = parseColorToRgb(waterColor);
    const pointsMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: true,
      vertexShader: pointVertexShader,
      fragmentShader: pointFragmentShader,
      uniforms: {
        uRadius: { value: GLOBE_RADIUS },
        uScale: { value: scaleFactor },
        uTime: { value: 0 },
        uAnimate: { value: animate ? 1 : 0 },
        uPixelRatio: { value: dpr },
        uParticleSize: { value: particleSize },
        uEdgeSoftness: { value: edgeSoftness },
        uCameraDelta: { value: new THREE.Vector3(0, 0, 0) },
        uLandColor: { value: [landRgb.r, landRgb.g, landRgb.b] },
        uWaterColor: { value: [waterRgb.r, waterRgb.g, waterRgb.b] },
        uBlendFactor: { value: blendFactor },
      },
    });

    let pointsMesh = null;
    const previousCameraPosition = new THREE.Vector3();
    const smoothedCameraDelta = new THREE.Vector3();
    const cameraDelta = new THREE.Vector3();
    const maximumDelta = 0.24;
    const smoothResponse = 6;

    let animationId = null;
    let lastTime = 0;

    async function loadGlobeData() {
      const binaryUrl = BINARY_URLS[pointsCount] || BINARY_URLS.medium;
      const jsonUrl = JSON_FALLBACK_URLS[pointsCount] || JSON_FALLBACK_URLS.medium;
      const workerCode = `
const MAX_ELEVATION = 6000;
function coordinatesToUnitDirection(lat, lon) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((90 - lon) * Math.PI) / 180;
  return [Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)];
}
function scaleElevation(elevation, scalingFactor, gamma) {
  const t = Math.max(0, Math.min(1, elevation / MAX_ELEVATION));
  return Math.pow(t, gamma) * scalingFactor;
}
self.onmessage = (e) => {
  const view = new Float32Array(e.data);
  const n = view.length / 4;
  const directions = new Float32Array(n * 3);
  const elevations = new Float32Array(n);
  const landMask = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const [dx, dy, dz] = coordinatesToUnitDirection(view[i*4], view[i*4+1]);
    directions[i*3]=dx; directions[i*3+1]=dy; directions[i*3+2]=dz;
    elevations[i] = view[i*4+3] ? scaleElevation(view[i*4+2], 1, 1) : 0;
    landMask[i] = view[i*4+3];
  }
  self.postMessage({ directions, elevations, landMask, count: n }, [directions.buffer, elevations.buffer, landMask.buffer]);
};`;
      try {
        const response = await fetch(binaryUrl);
        if (response.ok) {
          const buffer = await response.arrayBuffer();
          return await new Promise((resolve, reject) => {
            const blob = new Blob([workerCode], { type: 'application/javascript' });
            const worker = new Worker(URL.createObjectURL(blob));
            worker.onmessage = (e) => {
              const { directions, elevations, landMask } = e.data;
              resolve(pointGeometryFromArrays({ directions, elevations, landMask }));
            };
            worker.onerror = () => reject(new Error('Worker failed'));
            worker.postMessage(buffer, [buffer]);
          });
        }
        const res = await fetch(jsonUrl);
        const data = await res.json();
        return pointGeometryShared(data.points);
      } catch (err) {
        setError(err?.message ?? 'Failed to load globe data');
        return null;
      }
    }

    loadGlobeData().then((geometry) => {
      if (!geometry) return;
      pointsMesh = new THREE.Points(geometry, pointsMaterial);
      pointsMesh.rotation.set(0, 3.45, 0);
      pointsMesh.renderOrder = 0;
      scene.add(pointsMesh);
      if (onLoaded) onLoaded();
    });

    function animate(timestamp) {
      animationId = requestAnimationFrame(animate);
      const delta = Math.min((timestamp - lastTime) / 1000, maximumDelta);
      lastTime = timestamp;

      if (autoRotate) controls.update();

      const time = performance.now() * 0.001;
      pointsMaterial.uniforms.uTime.value = time;
      pointsMaterial.uniforms.uScale.value = scaleFactor;
      pointsMaterial.uniforms.uAnimate.value = animate ? 1 : 0;
      pointsMaterial.uniforms.uBlendFactor.value = blendFactor;
      pointsMaterial.uniforms.uParticleSize.value = particleSize;
      pointsMaterial.uniforms.uEdgeSoftness.value = edgeSoftness;

      const lRgb = parseColorToRgb(landColor);
      const wRgb = parseColorToRgb(waterColor);
      pointsMaterial.uniforms.uLandColor.value = [lRgb.r, lRgb.g, lRgb.b];
      pointsMaterial.uniforms.uWaterColor.value = [wRgb.r, wRgb.g, wRgb.b];

      if (!animate) {
        smoothedCameraDelta.set(0, 0, 0);
      } else if (previousCameraPosition.lengthSq() > 0) {
        cameraDelta.subVectors(camera.position, previousCameraPosition);
        const alpha = 1 - Math.exp(-smoothResponse * delta);
        smoothedCameraDelta.lerp(cameraDelta, alpha);
        smoothedCameraDelta.clampLength(0, maximumDelta);
      }
      pointsMaterial.uniforms.uCameraDelta.value.copy(smoothedCameraDelta);
      previousCameraPosition.copy(camera.position);

      waterMaterial.color.set(waterColor);
      waterMaterial.opacity = waterOpacity;

      if (bloomPass) {
        bloomPass.strength = bloomStrength;
        bloomPass.radius = bloomRadius;
        bloomPass.threshold = bloomThreshold;
      }

      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    }

    animationId = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(() => {
      const newWidth = container.clientWidth || container.offsetWidth || 600;
      const newHeight = container.clientHeight || container.offsetHeight || 400;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      if (composer) composer.setSize(newWidth, newHeight);
      if (bloomPass) bloomPass.resolution.set(newWidth, newHeight);
    });
    resizeObserver.observe(container);

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId);
      controls.dispose();
      resizeObserver.disconnect();
      if (composer) composer.dispose();
      renderer.dispose();
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, [scale, backgroundColor, toneMappingExposure, quality, lightIntensity, lightColor, waterColor, waterOpacity, autoRotate, autoRotateSpeed, bloomStrength, bloomRadius, bloomThreshold, pointsCount, scaleFactor, animate, particleSize, edgeSoftness, landColor, blendFactor, onLoaded]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', ...customStyle }}>
      {error && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0d0d', color: '#888', fontSize: '14px' }}>{error}</div>}
    </div>
  );
}
