<template>
  <section class="projects-section" id="projetos">
    <!-- Fundo id├¬ntico ├á tela de planetas -->
    <div class="projects-bg" aria-hidden="true">
      <div class="stars-layer"></div>
      <div class="stars-layer stars-layer--2"></div>
      
      <!-- Spacecore Cosmic Elements -->
      <div class="cosmic-elements">
        <div class="floating-planet planet-jupiter">
          <img :src="imgJupiter" alt="" />
        </div>
        <div class="floating-planet planet-saturn">
          <img :src="imgSaturn" alt="" />
        </div>
        <div class="floating-planet planet-mars">
          <img :src="imgMars" alt="" />
        </div>
        <div class="floating-planet planet-neptune">
          <img :src="imgNeptune" alt="" />
        </div>
        
        <!-- Shooting Stars -->
        <div class="shooting-star st-1"></div>
        <div class="shooting-star st-2"></div>
        <div class="shooting-star st-3"></div>
      </div>
    </div>

    <div class="projects-container">
      <!-- Section header -->
      <div class="section-header">
        <div class="header-glow"></div>
        <span class="section-tag">Ô£ª NOSSAS MISS├òES</span>
        <h2 class="section-title">Projetos</h2>
        <p class="section-subtitle">Explora├º├úo digital em sua melhor forma. Conhe├ºa nossos cases de sucesso.</p>
      </div>

      <!-- Main carousel - Spacecore 3D Flow -->
      <div class="carousel-stage">
        
        <div class="carousel-viewport" ref="viewportRef">
          <div class="carousel-track" :style="{ transform: `translateX(${trackOffset}px)` }">
            <div
              v-for="(project, index) in projectsData"
              :key="project.name"
              class="project-card-wrapper"
              :class="{
                'is-active': activeIndex === index,
                'is-prev': activeIndex === index - 1,
                'is-next': activeIndex === index + 1,
                'is-far': Math.abs(activeIndex - index) > 1
              }"
              @click="goTo(index)"
            >
              <div class="project-card" :style="{ '--accent': project.accent, '--accent-glow': project.accentGlow }">
                
                <!-- Glowing Aura -->
                <div class="card-aura"></div>
                
                <!-- Inner Glass Container -->
                <div class="card-glass">
                  <!-- Screenshots slider -->
                  <div class="card-screens">
                    <transition name="screen-fade" mode="out-in">
                      <img
                        :key="project.screens[project.activeScreen].src"
                        :src="project.screens[project.activeScreen].src"
                        :alt="`${project.name} - tela ${project.activeScreen + 1}`"
                        class="screen-image"
                        draggable="false"
                      />
                    </transition>
                    
                    <div class="screen-indicators" v-if="project.screens.length > 1">
                      <button
                        v-for="(screen, si) in project.screens"
                        :key="si"
                        class="indicator-dot"
                        :class="{ 'is-active': project.activeScreen === si }"
                        @click.stop="setScreen(index, si)"
                        :aria-label="`Tela ${si + 1} de ${project.name}`"
                      ></button>
                    </div>
                  </div>
                  
                  <!-- Project Info -->
                  <div class="card-content">
                    <div class="content-header">
                      <span class="project-category" :style="{ color: project.accent }">{{ project.category }}</span>
                      <h3 class="project-name">{{ project.name }}</h3>
                    </div>
                    
                    <p class="project-desc">{{ project.description }}</p>
                    
                    <div class="project-tags">
                      <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
                    </div>
                    
                    <button class="explore-btn" :style="{ '--btn-color': project.accent }">
                      Explorar Miss├úo <span class="arrow">ÔåÆ</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Navigation Controls -->
        <div class="carousel-controls">
          <button class="nav-btn nav-btn--prev" @click="navigate(-1)" aria-label="Projeto anterior">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <div class="nav-dots">
            <button
              v-for="(project, index) in projectsData"
              :key="'dot-' + index"
              class="nav-dot"
              :class="{ 'is-active': activeIndex === index }"
              :style="{ '--accent': project.accent }"
              @click="goTo(index)"
              :aria-label="`Ir para ${project.name}`"
            ></button>
          </div>
          
          <button class="nav-btn nav-btn--next" @click="navigate(1)" aria-label="Pr├│ximo projeto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Infinite Tech Marquee Full Screen -->
    <div class="tech-marquee-wrapper">
      <div class="tech-marquee-track">
        <div class="tech-marquee-content" aria-hidden="true">
          <template v-for="(item, i) in techList" :key="'a-'+i">
            <div v-if="item.isSpace" class="space-element">
              <img :src="item.icon" :alt="item.name" />
            </div>
            <div v-else class="tech-box">
              <img v-if="item.icon" :src="item.icon" :alt="item.name" class="tech-icon" />
              <span>{{ item.name }}</span>
            </div>
          </template>
        </div>
        <div class="tech-marquee-content" aria-hidden="true">
          <template v-for="(item, i) in techList" :key="'b-'+i">
            <div v-if="item.isSpace" class="space-element">
              <img :src="item.icon" :alt="item.name" />
            </div>
            <div v-else class="tech-box">
              <img v-if="item.icon" :src="item.icon" :alt="item.name" class="tech-icon" />
              <span>{{ item.name }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Import planets
import imgMars from '@/assets/planets/pngtree-mars-planet-image-on-white-background-png-image_13888526 1.png'
import imgJupiter from '@/assets/planets/pngtree-jupiter-planet-image-on-white-background-png-image_13888640 1.png'
import imgSaturn from '@/assets/planets/saturn-planet-on-isolated-transparent-background-png 1.png'
import imgNeptune from '@/assets/planets/30_neptune 1.png'

const techList = [
  { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Jupiter', icon: imgJupiter, isSpace: true },
  { name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Mars', icon: imgMars, isSpace: true },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Saturn', icon: imgSaturn, isSpace: true },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Neptune', icon: imgNeptune, isSpace: true },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' }
]

// Import project screenshots
import atomImg1 from '@/assets/Carrocel/ATOM .png'
import atomImg2 from '@/assets/Carrocel/ATOM 2.png'
import atomImg3 from '@/assets/Carrocel/ATOM 3.png'

import portImg1 from '@/assets/Carrocel/PORT.png'
import portImg2 from '@/assets/Carrocel/PORT 2.png'
import portImg3 from '@/assets/Carrocel/PORT 3.png'

import atlasImg1 from '@/assets/Carrocel/ATLAS .png'
import atlasImg2 from '@/assets/Carrocel/ATLAS 2.png'
import atlasImg3 from '@/assets/Carrocel/ATLAS 3.png'

import kallahImg1 from '@/assets/Carrocel/Kallah.png'
import kallahImg2 from '@/assets/Carrocel/Kallah 2.png'
import kallahImg3 from '@/assets/Carrocel/Kallah 3.png'

const projectsData = reactive([
  {
    name: 'ATOM',
    category: 'ALTA PERFORMANCE',
    description: 'P├íginas web otimizadas focadas em convers├úo, com tem├ítica espacial e anima├º├Áes de ponta.',
    accent: '#3b9cff',
    accentGlow: 'rgba(59, 156, 255, 0.4)',
    tags: ['Vue', 'Three.js', 'Convers├úo'],
    screens: [
      { src: atomImg1 },
      { src: atomImg2 },
      { src: atomImg3 }
    ],
    activeScreen: 0
  },
  {
    name: 'Portf├│lio Pessoal',
    category: 'AUTOMA├ç├âO & IA',
    description: 'Sistemas inteligentes que fazem o neg├│cio rodar no piloto autom├ítico, com design imersivo.',
    accent: '#00e5ff',
    accentGlow: 'rgba(0, 229, 255, 0.4)',
    tags: ['UI/UX', 'Automa├º├úo', 'Identidade'],
    screens: [
      { src: portImg1 },
      { src: portImg2 },
      { src: portImg3 }
    ],
    activeScreen: 0
  },
  {
    name: 'Atlas Fin',
    category: 'IDENTIDADE VISUAL',
    description: 'Design de alto impacto e posicionamento est├®tico de marca no setor financeiro.',
    accent: '#b478ff',
    accentGlow: 'rgba(180, 120, 255, 0.4)',
    tags: ['Fintech', 'Branding', 'Premium'],
    screens: [
      { src: atlasImg1 },
      { src: atlasImg2 },
      { src: atlasImg3 }
    ],
    activeScreen: 0
  },
  {
    name: 'Kallah Bride',
    category: 'E-COMMERCE',
    description: 'Estrat├®gias de SEO e design focado em converter noivas buscando excel├¬ncia e modernidade.',
    accent: '#ff8fb3',
    accentGlow: 'rgba(255, 143, 179, 0.4)',
    tags: ['E-commerce', 'Moda', 'SEO'],
    screens: [
      { src: kallahImg1 },
      { src: kallahImg2 },
      { src: kallahImg3 }
    ],
    activeScreen: 0
  },
  {
    name: 'Nexus System',
    category: 'SISTEMAS WEB',
    description: 'Plataforma de gest├úo inteligente e dashboards din├ómicos para controle de dados em tempo real.',
    accent: '#f39c12',
    accentGlow: 'rgba(243, 156, 18, 0.4)',
    tags: ['Dashboards', 'SaaS', 'Vue.js'],
    screens: [
      { src: portImg2 },
      { src: atomImg1 },
      { src: atlasImg3 }
    ],
    activeScreen: 0
  },
  {
    name: 'Lumina',
    category: 'UI/UX DESIGN',
    description: 'Conceito visual arrojado combinando intera├º├Áes imersivas com usabilidade de alta performance.',
    accent: '#9b59b6',
    accentGlow: 'rgba(155, 89, 182, 0.4)',
    tags: ['Design System', 'Figma', 'UX'],
    screens: [
      { src: kallahImg2 },
      { src: atlasImg1 },
      { src: portImg1 }
    ],
    activeScreen: 0
  }
])

const viewportRef = ref(null)
const activeIndex = ref(0)
const slideWidth = ref(0)

// Auto-rotate screens for active project
let screenInterval = null

function startScreenRotation() {
  stopScreenRotation()
  screenInterval = setInterval(() => {
    const project = projectsData[activeIndex.value]
    if (project && project.screens.length > 1) {
      project.activeScreen = (project.activeScreen + 1) % project.screens.length
    }
  }, 3500)
}

function stopScreenRotation() {
  if (screenInterval) clearInterval(screenInterval)
}

function setScreen(projectIndex, screenIndex) {
  projectsData[projectIndex].activeScreen = screenIndex
  // reset rotation timer
  startScreenRotation()
}

// Carousel navigation
const trackOffset = computed(() => {
  const sw = slideWidth.value || 400
  const viewportWidth = viewportRef.value?.offsetWidth || 0
  const centerOffset = (viewportWidth - sw) / 2
  return centerOffset - activeIndex.value * sw
})

function navigate(dir) {
  let next = activeIndex.value + dir
  if (next >= projectsData.length) next = 0
  if (next < 0) next = projectsData.length - 1
  activeIndex.value = next
  
  projectsData.forEach((p, i) => {
    if (i !== activeIndex.value) p.activeScreen = 0
  })
  startScreenRotation()
}

function goTo(index) {
  activeIndex.value = index
  projectsData.forEach((p, i) => {
    if (i !== activeIndex.value) p.activeScreen = 0
  })
  startScreenRotation()
}

function onKeydown(e) {
  if (e.key === 'ArrowRight') { e.preventDefault(); navigate(1) }
  if (e.key === 'ArrowLeft') { e.preventDefault(); navigate(-1) }
}

function updateSlideWidth() {
  if (!viewportRef.value) return
  const vw = viewportRef.value.offsetWidth
  if (vw <= 768) {
    slideWidth.value = vw * 0.85
  } else if (vw <= 1024) {
    slideWidth.value = 400
  } else {
    slideWidth.value = 460
  }
}

// Touch/drag support
let startX = 0
let startY = 0
let isDragging = false
let isSwiping = false

function onDragStart(e) {
  const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
  const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY
  startX = clientX
  startY = clientY
  isDragging = true
  isSwiping = false
  if (e.type === 'mousedown') {
    if (viewportRef.value) viewportRef.value.style.cursor = 'grabbing'
  }
}

function onDragMove(e) {
  if (!isDragging) return
  const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
  const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY
  const dx = clientX - startX
  const dy = clientY - startY
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
    isSwiping = true
    e.preventDefault()
  }
}

function onDragEnd(e) {
  if (!isDragging) return
  isDragging = false
  if (viewportRef.value) {
    viewportRef.value.style.cursor = 'grab'
  }
  if (!isSwiping) return
  
  const clientX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX
  const dx = clientX - startX
  if (Math.abs(dx) > 50) {
    navigate(dx < 0 ? 1 : -1)
  }
  startX = 0
  isSwiping = false
}

// Auto-advance carousel
let autoAdvance = null
function startAutoAdvance() {
  stopAutoAdvance()
  autoAdvance = setInterval(() => {
    navigate(1)
  }, 8000)
}
function stopAutoAdvance() {
  if (autoAdvance) clearInterval(autoAdvance)
}

onMounted(() => {
  updateSlideWidth()
  window.addEventListener('resize', updateSlideWidth)
  window.addEventListener('keydown', onKeydown)

  if (viewportRef.value) {
    viewportRef.value.style.cursor = 'grab'
    // Touch
    viewportRef.value.addEventListener('touchstart', onDragStart, { passive: true })
    viewportRef.value.addEventListener('touchmove', onDragMove, { passive: false })
    viewportRef.value.addEventListener('touchend', onDragEnd, { passive: true })
    // Mouse
    viewportRef.value.addEventListener('mousedown', onDragStart)
    window.addEventListener('mousemove', onDragMove, { passive: false })
    window.addEventListener('mouseup', onDragEnd)
  }

  startScreenRotation()
  startAutoAdvance()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSlideWidth)
  window.removeEventListener('keydown', onKeydown)
  stopScreenRotation()
  stopAutoAdvance()

  if (viewportRef.value) {
    viewportRef.value.removeEventListener('touchstart', onDragStart)
    viewportRef.value.removeEventListener('touchmove', onDragMove)
    viewportRef.value.removeEventListener('touchend', onDragEnd)
    viewportRef.value.removeEventListener('mousedown', onDragStart)
  }
  window.removeEventListener('mousemove', onDragMove)
  window.removeEventListener('mouseup', onDragEnd)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

/* ÔöÇÔöÇÔöÇ Section & Background ÔöÇÔöÇÔöÇ */
.projects-section {
  /* Match PlanetsSection background perfectly */
  --bg: #090B17;
  --text-primary: #f0f1f7;
  --text-muted: rgba(240, 241, 247, 0.6);
  
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 6rem 0 8rem;
  z-index: 10;
}

.projects-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

/* Subtle stars mimicking spacecore without bright nebulas */
.stars-layer {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(1px 1px at 15% 30%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1.5px 1.5px at 70% 60%, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 45% 85%, rgba(255,255,255,0.5), transparent),
    radial-gradient(2px 2px at 85% 20%, rgba(255,255,255,0.2), transparent);
  background-size: 200px 200px;
  opacity: 0.5;
  animation: floatStars 20s linear infinite;
}

@keyframes floatStars {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100px); }
}

.stars-layer--2 {
  background-size: 150px 150px;
  background-image: 
    radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1px 1px at 80% 30%, rgba(255,255,255,0.6), transparent);
  animation: floatStars 15s linear infinite;
  opacity: 0.3;
}

/* Cosmic Elements */
.cosmic-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-planet {
  position: absolute;
  filter: drop-shadow(0 0 30px rgba(0,0,0,0.8));
}
.floating-planet img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.planet-jupiter {
  width: 300px;
  top: 10%;
  left: -100px;
  opacity: 0.4;
  animation: floatOrb 18s ease-in-out infinite alternate;
}
.planet-saturn {
  width: 450px;
  bottom: -50px;
  right: -150px;
  opacity: 0.3;
  animation: floatOrb 25s ease-in-out infinite alternate-reverse;
}
.planet-mars {
  width: 120px;
  top: 40%;
  right: 5%;
  opacity: 0.25;
  animation: floatOrb 12s ease-in-out infinite alternate;
}
.planet-neptune {
  width: 200px;
  bottom: 20%;
  left: 8%;
  opacity: 0.2;
  animation: floatOrb 20s ease-in-out infinite alternate-reverse;
}

@keyframes floatOrb {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-40px) rotate(5deg); }
}

/* Shooting Stars */
.shooting-star {
  position: absolute;
  width: 2px;
  height: 80px;
  background: linear-gradient(to bottom, rgba(255,255,255,1), transparent);
  border-radius: 50%;
  opacity: 0;
  transform: rotate(45deg);
}
.st-1 {
  top: -10%; left: 30%;
  animation: shootingStar 6s linear infinite;
  animation-delay: 2s;
}
.st-2 {
  top: -10%; left: 70%;
  animation: shootingStar 9s linear infinite;
  animation-delay: 5s;
}
.st-3 {
  top: -10%; left: 10%;
  animation: shootingStar 12s linear infinite;
  animation-delay: 8s;
}

@keyframes shootingStar {
  0% { transform: rotate(45deg) translateY(-100px); opacity: 1; }
  20% { transform: rotate(45deg) translateY(500px); opacity: 0; }
  100% { transform: rotate(45deg) translateY(500px); opacity: 0; }
}

/* ÔöÇÔöÇÔöÇ Container ÔöÇÔöÇÔöÇ */
.projects-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
}

/* ÔöÇÔöÇÔöÇ Header ÔöÇÔöÇÔöÇ */
.section-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.header-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 100px;
  background: radial-gradient(ellipse, rgba(59, 156, 255, 0.15), transparent 70%);
  filter: blur(20px);
  z-index: -1;
  pointer-events: none;
}

.section-tag {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #3b9cff;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 700;
  margin: 0;
  line-height: 1.1;
  color: #fff;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
}

.section-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  color: var(--text-muted);
  margin: 0;
  max-width: 500px;
  line-height: 1.6;
}

/* ÔöÇÔöÇÔöÇ Carousel Stage ÔöÇÔöÇÔöÇ */
.carousel-stage {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.carousel-viewport {
  width: 100%;
  overflow: hidden;
  padding: 3rem 0;
  perspective: 1200px;
}

.carousel-track {
  display: flex;
  align-items: center;
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-style: preserve-3d;
  will-change: transform;
}

/* ÔöÇÔöÇÔöÇ Project Card ÔöÇÔöÇÔöÇ */
.project-card-wrapper {
  flex: 0 0 460px;
  display: flex;
  justify-content: center;
  padding: 0 1.5rem;
  cursor: pointer;
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-style: preserve-3d;
  will-change: transform, opacity;
}

/* 3D Space Flow States */
.project-card-wrapper.is-active {
  transform: translateZ(0) scale(1);
  opacity: 1;
  z-index: 10;
}
.project-card-wrapper.is-prev {
  transform: translateZ(-150px) translateX(40px) rotateY(12deg) scale(0.85);
  opacity: 0.4;
  z-index: 5;
}
.project-card-wrapper.is-next {
  transform: translateZ(-150px) translateX(-40px) rotateY(-12deg) scale(0.85);
  opacity: 0.4;
  z-index: 5;
}
.project-card-wrapper.is-far {
  transform: translateZ(-300px) scale(0.7);
  opacity: 0;
  pointer-events: none;
}

.project-card {
  position: relative;
  width: 100%;
  border-radius: 28px;
  transition: transform 0.4s ease;
  will-change: transform;
}
.project-card-wrapper.is-active .project-card:hover {
  transform: translateY(-10px);
}

.card-aura {
  position: absolute;
  inset: -15px;
  border-radius: 35px;
  background: var(--accent-glow);
  filter: blur(25px);
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
  z-index: -1;
  will-change: opacity;
}
.project-card-wrapper.is-active .card-aura {
  opacity: 0.6;
}

.card-glass {
  position: relative;
  background: rgba(18, 20, 33, 0.6);
  backdrop-filter: blur(24px) saturate(1.2);
  -webkit-backdrop-filter: blur(24px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top-color: rgba(255, 255, 255, 0.15);
  border-left-color: rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
}

/* ÔöÇÔöÇÔöÇ Card Screens ÔöÇÔöÇÔöÇ */
.card-screens {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: #0f111a;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.screen-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.screen-fade-enter-active,
.screen-fade-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.screen-fade-enter-from {
  opacity: 0;
  transform: scale(1.05);
}
.screen-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.screen-indicators {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.indicator-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}
.indicator-dot.is-active {
  background: var(--accent);
  width: 16px;
  border-radius: 4px;
}

/* ÔöÇÔöÇÔöÇ Card Content ÔöÇÔöÇÔöÇ */
.card-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.content-header {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.project-category {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.project-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.project-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 100px;
}

.explore-btn {
  margin-top: 0.5rem;
  align-self: flex-start;
  background: transparent;
  border: none;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s ease;
}
.project-card-wrapper.is-active .explore-btn {
  opacity: 1;
  transform: translateY(0);
}

.explore-btn:hover {
  color: var(--btn-color);
}
.explore-btn .arrow {
  transition: transform 0.3s ease;
}
.explore-btn:hover .arrow {
  transform: translateX(4px);
}

/* ÔöÇÔöÇÔöÇ Carousel Controls ÔöÇÔöÇÔöÇ */
.carousel-controls {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;
}

.nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.nav-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.nav-dots {
  display: flex;
  gap: 12px;
}

.nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  padding: 0;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.nav-dot.is-active {
  width: 32px;
  border-radius: 4px;
  background: var(--accent);
  box-shadow: 0 0 15px var(--accent);
}

/* ÔöÇÔöÇÔöÇ Responsive ÔöÇÔöÇÔöÇ */
@media (max-width: 1024px) {
  .project-card-wrapper { flex: 0 0 400px; padding: 0 1rem; }
  .card-content { padding: 1.5rem; }
}

@media (max-width: 768px) {
  .projects-section { padding: 4rem 0 6rem; }
  .section-title { font-size: clamp(2.5rem, 8vw, 3rem); }
  .project-card-wrapper { flex: 0 0 85vw; }
  
  .project-card-wrapper.is-prev,
  .project-card-wrapper.is-next {
    transform: translateZ(-100px) scale(0.9);
    opacity: 0.5;
  }
  
  .carousel-controls { gap: 1.5rem; }
  .nav-btn { width: 40px; height: 40px; }
}

@media (max-width: 480px) {
  .card-screens { aspect-ratio: 1/1; }
  .card-content { padding: 1.25rem; }
  .project-name { font-size: 1.3rem; }
}

/* ÔöÇÔöÇÔöÇ Tech Marquee ÔöÇÔöÇÔöÇ */
.tech-marquee-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-top: 5rem;
  padding: 2.5rem 0;
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.tech-marquee-track {
  display: flex;
  width: max-content;
  animation: scrollMarquee 40s linear infinite;
  align-items: center;
}
.tech-marquee-track:hover {
  animation-play-state: paused;
}

.tech-marquee-content {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  padding-right: 2.5rem; /* Matches the gap */
}

.space-element {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  animation: floatSpace 6s ease-in-out infinite;
}
.space-element img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.2));
}

@keyframes floatSpace {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.tech-box {
  width: 120px;
  height: 120px;
  border-radius: 28px;
  background: rgba(15, 10, 25, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top-color: rgba(255, 255, 255, 0.15);
  border-left-color: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  cursor: default;
}

.tech-box:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 15px 35px rgba(123, 63, 242, 0.2), inset 0 1px 0 rgba(255,255,255,0.1);
}

.tech-icon {
  width: 45px;
  height: 45px;
  object-fit: contain;
  filter: drop-shadow(0 2px 10px rgba(255, 255, 255, 0.3));
  transition: transform 0.3s ease;
}

.tech-box:hover .tech-icon {
  transform: scale(1.1);
}

.tech-box span {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  transition: color 0.3s ease;
}

.tech-box:hover span {
  color: #fff;
}

@keyframes scrollMarquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ÔöÇÔöÇÔöÇ Reduced motion ÔöÇÔöÇÔöÇ */
@media (prefers-reduced-motion: reduce) {
  .stars-layer,
  .carousel-track,
  .project-card-wrapper,
  .project-card,
  .card-aura,
  .screen-image {
    animation: none !important;
    transition: none !important;
  }
}

/* ===== Mobile Responsiveness ===== */
@media (max-width: 768px) {
  .project-card-wrapper {
    flex: 0 0 85vw;
    padding: 0;
  }
  
  .project-card-wrapper.is-prev {
    transform: translateZ(-150px) translateX(60px) rotateY(12deg) scale(0.85);
  }
  .project-card-wrapper.is-next {
    transform: translateZ(-150px) translateX(-60px) rotateY(-12deg) scale(0.85);
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .carousel-viewport {
    padding: 1.5rem 0;
  }
  
  .card-content {
    padding: 1.2rem;
  }
  
  .project-title {
    font-size: 1.3rem;
  }
}
</style>
