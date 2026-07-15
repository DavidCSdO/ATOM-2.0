<template>
  <section class="hero" :class="{ 'hero--revealed': isRevealed, 'hero--settled': isSettled }">
    <!-- Loading Screen -->
    <div class="hero__loading-screen" :class="{ 'hero__loading-screen--hidden': !isLoading }">
      <div class="hero__spinner"></div>
      <div class="hero__loading-text">INICIANDO</div>
    </div>

    <!-- Background image layer -->
    <div class="hero__background">
      <img :src="backgroundImage" alt="ATOM background - nebula" class="hero__bg-image" />
    </div>

    <!-- Vignette overlay that fades away -->
    <div class="hero__vignette" :class="{ 'hero__vignette--open': vignetteOpen }"></div>

    <!-- Dark overlay that fades out -->
    <div class="hero__darkness" :class="{ 'hero__darkness--fade': darknessFade }"></div>

    <!-- Content -->
    <div class="hero__content" :class="{ 'hero__content--visible': textVisible, 'hero__content--settled': isSettled }">

      <!-- ATOM Title -->
      <h1 class="hero__title">ATOM</h1>

      <!-- Earth 3D + buttons + tagline (appear after settle) -->
      <div class="hero__below" :class="{ 'hero__below--visible': isSettled }">

        <!-- Earth + navigation row -->
        <div class="hero__earth-row">
          <!-- EXPLORE button -->
          <button class="hero__nav-btn hero__nav-btn--left" @click="$emit('navigate', 'explore')">
            <span class="hero__nav-icon">✦</span>
            <span class="hero__nav-label">EXPLORE</span>
            <span class="hero__nav-icon">✦</span>
          </button>

          <!-- 3D Earth -->
          <div class="hero__earth-wrapper">
            <Earth3D backgroundColor="" waterColor="#021430" @loaded="onEarthLoaded" />
          </div>

          <!-- PROJECTS button -->
          <button class="hero__nav-btn hero__nav-btn--right" @click="$emit('navigate', 'projects')">
            <span class="hero__nav-icon">✦</span>
            <span class="hero__nav-label">PROJECTS</span>
            <span class="hero__nav-icon">✦</span>
          </button>
        </div>

        <!-- Tagline -->
        <p class="hero__tagline">
          Building intelligent technology<br>
          for the next generation.
        </p>

        <!-- Scroll indicator -->
        <div class="hero__scroll-indicator">
          <div class="hero__scroll-circle">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4 L10 14 M6 10 L10 14 L14 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Subtle particles / stars overlay -->
    <div class="hero__particles">
      <span
        v-for="n in 30"
        :key="n"
        class="hero__particle"
        :style="{
          left: `${particlePositions[n - 1].x}%`,
          top: `${particlePositions[n - 1].y}%`,
          animationDelay: `${particlePositions[n - 1].delay}s`,
          animationDuration: `${particlePositions[n - 1].duration}s`,
          width: `${particlePositions[n - 1].size}px`,
          height: `${particlePositions[n - 1].size}px`,
        }"
      ></span>
    </div>

    <!-- Bottom Seamless Fade Transition -->
    <div class="hero__bottom-fade"></div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import backgroundImage from '@/assets/NewBack.png'
import Earth3D from '../3d/Earth3D.vue'

defineEmits(['navigate'])

const isLoading = ref(true)
const isRevealed = ref(false)
const vignetteOpen = ref(false)
const darknessFade = ref(false)
const textVisible = ref(false)
const isSettled = ref(false)

// Pre-calculate particle positions to avoid re-renders
const particlePositions = Array.from({ length: 30 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 2 + Math.random() * 4,
  size: 1 + Math.random() * 2,
}))

let sequenceStarted = false

const startSequence = () => {
  if (sequenceStarted) return
  sequenceStarted = true
  
  isLoading.value = false

  setTimeout(() => { darknessFade.value = true }, 200)
  setTimeout(() => { vignetteOpen.value = true }, 400)
  setTimeout(() => { isRevealed.value = true }, 600)
  setTimeout(() => { textVisible.value = true }, 700)
  setTimeout(() => { isSettled.value = true }, 2200)
}

const onEarthLoaded = () => {
  // Slight artificial delay to ensure smooth transition and allow loader to be seen briefly
  setTimeout(startSequence, 800)
}

onMounted(() => {
  // Safety timeout fallback just in case 3D model fails to load
  setTimeout(startSequence, 5000)
})
</script>

<style scoped>
@font-face {
  font-family: 'Astro Space';
  src: url('@/assets/fonts/AstroSpace.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
}

/* ===== Loading Screen ===== */
.hero__loading-screen {
  position: absolute;
  inset: 0;
  z-index: 100;
  background: #020205; /* Deep space dark blue/black */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  transition: opacity 1.2s ease-out, visibility 1.2s ease-out;
}

.hero__loading-screen--hidden {
  opacity: 0;
  visibility: hidden;
}

.hero__spinner {
  width: 50px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.05);
  border-top-color: #3FA9FF;
  border-bottom-color: #7B3FF2;
  border-radius: 50%;
  animation: orbitSpin 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

.hero__loading-text {
  font-family: 'Astro Space', sans-serif;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  letter-spacing: 0.3em;
  animation: pulseOpacity 2s infinite ease-in-out;
}

@keyframes orbitSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulseOpacity {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* ===== Background Image ===== */
.hero__background {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.hero__background::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 1 0 0 0 0' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.36'/%3E%3C/svg%3E");
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: overlay;
}

.hero__bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.05);
  transition: transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  image-rendering: high-quality;
  -webkit-backface-visibility: hidden;
  filter: contrast(1.15) brightness(1.1) saturate(1.1);
}

.hero--revealed .hero__bg-image {
  transform: scale(1);
}

/* ===== Darkness Overlay ===== */
.hero__darkness {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: #000;
  opacity: 1;
  transition: opacity 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.hero__darkness--fade {
  opacity: 0;
}

/* ===== Vignette Overlay ===== */
.hero__vignette {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.85) 100%
  );
  opacity: 1;
  transition: opacity 3s ease-out;
}

.hero__vignette--open {
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(0, 0, 0, 0.25) 55%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

/* ===== Content ===== */
.hero__content {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero__content--settled {
  justify-content: center;
  padding-top: 4vh;
  padding-left: 0vh;
}

/* ===== ATOM Title ===== */
.hero__title {
  font-family: 'Astro Space', sans-serif;
  font-size: clamp(8rem, 18vw, 18rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1;
  user-select: none;
  background: 
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 1 0 0 0 0' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.31'/%3E%3C/svg%3E"),
    linear-gradient(90deg, #7B3FF2 0%, #3FA9FF 50%, #FF4D6D 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  transform: scale(1.1);
  transition: opacity 1s ease-out,
              transform 1s cubic-bezier(0.22, 1, 0.36, 1),
              font-size 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  filter: drop-shadow(0 0 40px rgba(63, 169, 255, 0.3))
         drop-shadow(0 0 80px rgba(123, 63, 242, 0.2));
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.hero__content--visible .hero__title {
  opacity: 1;
  transform: scale(1);
}

/* Shrink ATOM after settling */
.hero__content--settled .hero__title {
  font-size: clamp(4rem, 12vw, 12rem);
}

/* ===== Below section (Earth + buttons + tagline) ===== */
.hero__below {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1.2s ease-out, transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  margin-top: -8.5rem; /* Pull up to overlap ATOM text */
  width: 100%;
  position: relative;
  z-index: 2; /* Keep Earth on top of text */
}

.hero__below--visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

/* ===== Earth Row ===== */
.hero__earth-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(1rem, 3vw, 3rem);
  width: 100%;
}

.hero__earth-wrapper {
  width: clamp(200px, 28vw, 380px);
  height: clamp(200px, 28vw, 380px);
  position: relative;
  flex-shrink: 0;
}

/* ===== Navigation Buttons ===== */
.hero__nav-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1.85rem 2rem;
  border-radius: 26px;
  
  /* Liquid Glass Config - More Translucent */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 100%);
  backdrop-filter: blur(3px) saturate(190%); 
  -webkit-backdrop-filter: blur(6px) saturate(120%);
  
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-top-color: rgba(255, 255, 255, 0.4);
  border-left-color: rgba(255, 255, 255, 0.4);
  
  box-shadow: 
    0 16px 40px rgba(0, 0, 0, 0.15), /* Splay / outer shadow */
    inset 2px 0px 4px rgba(255, 40, 80, 0.15), /* Chromatic aberration (Red/Magenta) */
    inset -2px 0px 4px rgba(40, 255, 255, 0.15), /* Chromatic aberration (Cyan) */
    inset 0px 4px 12px rgba(255, 255, 255, 0.35), /* Light / top depth */
    inset 0px -4px 12px rgba(0, 0, 0, 0.1); /* Refraction thickness */
    
  color: rgba(0, 0, 0, 0.85);
  font-family: 'Astro Space', sans-serif;
  font-size: clamp(0.75rem, 1.9vw, 2rem);
  letter-spacing: 0.12em;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  white-space: nowrap;
}

.hero__nav-btn:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-color: rgba(255, 255, 255, 0.25);
  border-top-color: rgba(255, 255, 255, 0.6);
  border-left-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 24px 50px rgba(0, 0, 0, 0.2),
    inset 3px 0px 6px rgba(255, 40, 80, 0.2),
    inset -3px 0px 6px rgba(40, 255, 255, 0.2),
    inset 0px 6px 16px rgba(255, 255, 255, 0.5),
    inset 0px -4px 12px rgba(0, 0, 0, 0.15);
}

.hero__nav-icon {
  font-size: 0.75em;
  opacity: 0.6;
  color: rgba(0, 0, 0, 0.65);
}

.hero__nav-label {
  font-weight: 400;
}

/* ===== Tagline ===== */
.hero__tagline {
  font-family: 'Astro Space', sans-serif;
  font-size: clamp(0.80rem, 1.8vw, 1.3rem);
  color: rgba(0, 0, 0, 0.75);
  text-align: center;
  line-height: 1.7;
  letter-spacing: 0.04em;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  margin-top: -40px;
}

/* ===== Scroll Indicator ===== */
.hero__scroll-indicator {
  animation: scrollBounce 2s ease-in-out infinite;
}

.hero__scroll-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero__scroll-circle:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
}

@keyframes scrollBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

/* ===== Floating Particles ===== */
.hero__particles {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
}

.hero__particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  animation: particleFloat ease-in-out infinite;
  opacity: 0;
}

.hero--revealed .hero__particle {
  animation-name: particleFloat;
}

@keyframes particleFloat {
  0%, 100% {
    opacity: 0;
    transform: translateY(0) scale(1);
  }
  25% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
    transform: translateY(-20px) scale(1.2);
  }
  75% {
    opacity: 0.4;
  }
}

/* ===== Scanline subtle effect for depth ===== */
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 4;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.02) 2px,
    rgba(0, 0, 0, 0.02) 4px
  );
  pointer-events: none;
  opacity: 0.5;
}

/* ===== Bottom Fade Transition ===== */
.hero__bottom-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background: linear-gradient(to bottom, transparent, #090B17);
  z-index: 10;
  pointer-events: none;
}

/* ===== Mobile Responsiveness ===== */
@media (max-width: 768px) {
  .hero__title {
    font-size: clamp(4rem, 18vw, 8rem);
  }
  .hero__content--settled .hero__title {
    font-size: clamp(2.8rem, 12vw, 4.5rem);
    margin-bottom: 2rem;
  }
  
  .hero__below {
    margin-top: -3rem; /* Less overlap */
  }

  .hero__earth-row {
    flex-direction: column;
    gap: 1.2rem;
  }
  
  .hero__earth-wrapper {
    order: -1;
    width: clamp(160px, 45vw, 250px);
    height: clamp(160px, 45vw, 250px);
  }
  
  .hero__nav-btn {
    padding: 1.2rem 2rem;
    width: 100%;
    justify-content: center;
  }
  
  .hero__tagline {
    margin-top: 10px;
    font-size: 0.85rem;
  }
}
</style>
