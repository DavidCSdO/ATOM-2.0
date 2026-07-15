<template>
  <section class="bento-section">
    <!-- Starry Background -->
    <div class="projects-bg" aria-hidden="true">
      <div class="stars-layer"></div>
      <div class="stars-layer stars-layer--2"></div>
    </div>

    <div class="bento-container">
      
      <!-- Top Left: Design System -->
      <div class="bento-card tl-card">
        <div class="card-glass flex-col-between noise-overlay">
          <div class="tl-content">
            <h3 class="font-space">Design<br>System</h3>
            <div class="color-palette">
              <div class="circle c-red"></div>
              <div class="circle c-orange"></div>
              <div class="circle c-blue"></div>
              <div class="circle c-cyan"></div>
            </div>
          </div>
          <!-- Novo preenchimento: Mockup UI Wireframe -->
          <div class="ui-mockup">
            <div class="mock-header">
              <div class="mdot"></div>
              <div class="mdot"></div>
              <div class="mdot"></div>
            </div>
            <div class="mock-body">
              <div class="mline w-40"></div>
              <div class="mline w-80"></div>
              <div class="mbox">
                <div class="mline w-30 m-dark"></div>
              </div>
              <div class="mflex">
                <div class="mbtn"></div>
                <div class="mbtn primary"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom Left: Image Cover & Text -->
      <div class="bento-card bl-card">
        <div class="card-glass p-0 noise-overlay">
          <div class="bl-content">
            <p class="bl-text">Experiências imersivas que conectam usuários através de interfaces de outra dimensão e performance impecável.</p>
            <div class="bl-cover-wrapper">
              <div class="bl-cover">
                <img src="@/assets/planets/pngtree-jupiter-planet-image-on-white-background-png-image_13888640 1.png" alt="Cover" class="bl-image" loading="lazy" decoding="async" />
                <div class="bl-badge">EXPLORAR</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Center Huge Box - Three.js + Large Typography -->
      <div class="bento-card tm-card">
        <div class="card-glass p-0 overflow-hidden">
          <div class="huge-text-bg">
            <span>ATOM</span>
            <span class="outline">ATOM</span>
            <span>ATOM</span>
            <span class="outline">ATOM</span>
          </div>
          <div class="canvas-container" ref="canvasContainer"></div>
          <div class="tm-content">
            <span class="badge">Núcleo Ativo</span>
            <h2>Inovação Quântica</h2>
            <p>O epicentro onde suas ideias se transformam em produtos escaláveis.</p>
          </div>
        </div>
      </div>

      <!-- Bottom Middle: Pricing Mostradores (Minimalista) -->
      <div class="bento-card bm-card">
        <div class="card-glass pricing-glass noise-overlay">
          
          <div class="pricing-col">
            <div class="mostrador-wrapper">
              <div class="mostrador-track"></div>
              <div class="m-orbit-animated m-orbit-1"></div>
              <div class="mostrador-value">
                <span class="currency">R$</span>
                <span class="price-number p-val-1">0</span>
              </div>
            </div>
            <span class="pricing-label"><span class="dot d-cyan"></span> Landing Page</span>
          </div>

          <div class="pricing-col">
            <div class="mostrador-wrapper">
              <div class="mostrador-track"></div>
              <div class="m-orbit-animated m-orbit-2"></div>
              <div class="mostrador-value">
                <span class="currency">R$</span>
                <span class="price-number p-val-2">0</span>
              </div>
            </div>
            <span class="pricing-label"><span class="dot d-orange"></span> Portfólio</span>
          </div>

          <div class="pricing-col">
            <div class="mostrador-wrapper">
              <div class="mostrador-track"></div>
              <div class="m-orbit-animated m-orbit-3"></div>
              <div class="mostrador-value">
                <span class="currency">R$</span>
                <span class="price-number p-val-3">0</span>
              </div>
            </div>
            <span class="pricing-label"><span class="dot d-purple"></span> E-commerce</span>
          </div>

        </div>
      </div>

      <!-- Top Right: Aesthetic Image Card / Scaling -->
      <div class="bento-card tr-card">
        <div class="card-glass flex-col-end p-0 noise-overlay">
          <div class="tr-bg"></div>
          
          <!-- Novo preenchimento: Gráfico Estelar -->
          <div class="chart-mockup">
            <div class="chart-bars">
              <div class="cbar cbar-1"></div>
              <div class="cbar cbar-2"></div>
              <div class="cbar cbar-3"></div>
              <div class="cbar cbar-4"></div>
              <div class="cbar cbar-5"></div>
            </div>
            <div class="chart-line-wrapper">
              <svg viewBox="0 0 100 50" preserveAspectRatio="none" class="chart-svg">
                <path d="M 0,45 L 20,30 L 40,35 L 65,15 L 80,20 L 100,5" fill="none" class="chart-neon-line" />
              </svg>
            </div>
          </div>

          <div class="tr-content">
            <h3>Escala Estelar</h3>
            <p>Softwares estruturados para expansão além das fronteiras.</p>
          </div>
        </div>
      </div>

      <!-- Bottom Right: Number Stat & Starburst -->
      <div class="bento-card br-card">
        <div class="card-glass flex-center overflow-hidden p-0 noise-overlay">
          <div class="starburst-bg">
            <div class="ray" v-for="n in 12" :key="n" :style="`transform: rotate(${n * 30}deg)`"></div>
          </div>
          <div class="br-content">
            <h2 class="stat-number">150<span class="stat-plus">+</span></h2>
            <p class="stat-label">Missões Concluídas</p>
            <button class="stat-btn" @click="$emit('book')">Iniciar Nova Missão</button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits } from 'vue'
import * as THREE from 'three'
// ✅ v4: exports nomeados. "stagger" e "utils" vêm do core; "svg" traz createDrawable
import { animate, stagger, utils, svg } from 'animejs'

defineEmits(['book'])

const canvasContainer = ref(null)
let scene, camera, renderer, particles, animationId
let mouseX = 0
let mouseY = 0

function initThree() {
  if (!canvasContainer.value) return

  scene = new THREE.Scene()
  
  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight
  
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 20

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  canvasContainer.value.appendChild(renderer.domElement)

  // Particles forming a galaxy/star object
  const geometry = new THREE.BufferGeometry()
  const count = 3000
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for(let i = 0; i < count; i++) {
    const i3 = i * 3
    const radius = Math.random() * 15
    const spinAngle = radius * 0.5
    const branchAngle = ((i % 5) / 5) * Math.PI * 2
    
    const spreadX = (Math.random() - 0.5) * 3
    const spreadY = (Math.random() - 0.5) * 3
    const spreadZ = (Math.random() - 0.5) * 3
    
    const x = Math.cos(branchAngle + spinAngle) * radius + spreadX
    const y = Math.sin(branchAngle + spinAngle) * radius + spreadY
    const z = spreadZ * (15 - radius) * 0.2 // thicker at center

    positions[i3] = x
    positions[i3+1] = y
    positions[i3+2] = z

    // Prism colors
    const r = Math.random()
    if(r < 0.33) {
      colors[i3] = 1; colors[i3+1] = 0.2; colors[i3+2] = 0.2; // Red
    } else if(r < 0.66) {
      colors[i3] = 0.2; colors[i3+1] = 0.6; colors[i3+2] = 1; // Blue
    } else {
      colors[i3] = 1; colors[i3+1] = 0.8; colors[i3+2] = 0.2; // Yellow
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.9
  })

  particles = new THREE.Points(geometry, material)
  particles.rotation.x = Math.PI * 0.2
  scene.add(particles)

  window.addEventListener('resize', onResize)
  canvasContainer.value.addEventListener('mousemove', onMouseMove)
  canvasContainer.value.addEventListener('mouseleave', () => {
    mouseX = 0; mouseY = 0;
  })

  renderLoop()
}

function onMouseMove(event) {
  const rect = canvasContainer.value.getBoundingClientRect()
  mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1
}

function onResize() {
  if (!canvasContainer.value || !camera || !renderer) return
  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

// ⚠️ RENOMEADO de "animate" para "renderLoop": o nome "animate" agora é
// usado pela função importada do animejs v4. Manter o mesmo nome aqui
// causaria shadowing e quebraria tanto o Three.js quanto o anime.js.
function renderLoop() {
  animationId = requestAnimationFrame(renderLoop)
  
  particles.rotation.z -= 0.003
  
  particles.rotation.x += (Math.PI * 0.2 + mouseY * 0.4 - particles.rotation.x) * 0.05
  particles.rotation.y += (mouseX * 0.4 - particles.rotation.y) * 0.05

  renderer.render(scene, camera)
}

function initAnimeEffects() {
  // Animação dos números de preço usando Anime.js v4
  const prices = [
    { target: '.p-val-1', value: 600 },
    { target: '.p-val-2', value: 500 },
    { target: '.p-val-3', value: 1200 }
  ];

  prices.forEach((p, index) => {
    animate(p.target, {
      innerHTML: [0, p.value],
      ease: 'outExpo',       // era 'easeOutExpo'
      round: 1,
      duration: 3500,
      delay: index * 200
    });
  });

  // Mostradores Minimalistas - Rotação linear contínua
  animate(['.m-orbit-1', '.m-orbit-2', '.m-orbit-3'], {
    rotate: {
      to: '+=1turn',        // era "value"
      duration: 6000,
      ease: 'linear'
    },
    loop: true
  });

  // UI Mockup Animation (Top Left)
  animate(['.ui-mockup .mbox', '.ui-mockup .mline', '.ui-mockup .mbtn'], {
    opacity: [0.3, 1],
    translateY: [10, 0],
    delay: stagger(150),    // era anime.stagger(150)
    duration: 1500,
    ease: 'outExpo'
  });

  // Chart Animation (Top Right)
  animate('.cbar', {
    scaleY: [0, 1],
    delay: stagger(150),
    duration: 1500,
    ease: 'outElastic(1, .8)' // era 'easeOutElastic(1, .8)'
  });

  // Linha do gráfico: v4 substitui anime.setDashoffset por svg.createDrawable()
  const chartLine = svg.createDrawable('.chart-neon-line');
  animate(chartLine, {
    draw: '0 1',
    duration: 2500,
    ease: 'inOutSine',      // era 'easeInOutSine'
    delay: 500,
    alternate: true,        // era direction: 'alternate'
    loop: true
  });
}

onMounted(() => {
  initThree()
  initAnimeEffects()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  if(canvasContainer.value) {
    canvasContainer.value.removeEventListener('mousemove', onMouseMove)
  }
  if (animationId) cancelAnimationFrame(animationId)
  if (renderer) renderer.dispose()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

@font-face {
  font-family: 'Atomic Clock';
  src: url('@/assets/fonts/ATOMICCLOCKRADIO.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.bento-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #090B17;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem;
  z-index: 10;
  overflow: hidden;
}

.bento-container {
  display: grid;
  grid-template-columns: 1.2fr 2fr 1.2fr;
  grid-template-rows: 1.6fr 0.8fr;
  gap: 1.5rem;
  max-width: 1200px;
  width: 100%;
  height: 850px;
}

/* Backgrounds */
.projects-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.stars-layer {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(1px 1px at 15% 30%, rgba(255,255,255,0.4), transparent),
                    radial-gradient(1.5px 1.5px at 70% 60%, rgba(255,255,255,0.3), transparent);
  background-size: 200px 200px;
  opacity: 0.5;
  animation: floatStars 20s linear infinite;
}
.stars-layer--2 {
  background-size: 150px 150px;
  background-image: radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.4), transparent);
  animation: floatStars 15s linear infinite;
  opacity: 0.3;
}
@keyframes floatStars { 0% { transform: translateY(0); } 100% { transform: translateY(-100px); } }

/* Grid Alignments */
.tl-card { grid-column: 1 / 2; grid-row: 1 / 2; }
.bl-card { grid-column: 1 / 2; grid-row: 2 / 3; }
.tm-card { grid-column: 2 / 3; grid-row: 1 / 2; }
.bm-card { grid-column: 2 / 3; grid-row: 2 / 3; }
.tr-card { grid-column: 3 / 4; grid-row: 1 / 2; }
.br-card { grid-column: 3 / 4; grid-row: 2 / 3; }

/* Cards */
.bento-card {
  border-radius: 28px;
  overflow: hidden;
  position: relative;
  transform: translateZ(0);
}

.card-glass {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(18, 20, 30, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-top-color: rgba(255, 255, 255, 0.12);
  border-left-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.4);
  padding: 2.5rem;
  display: flex;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.3s, border-color 0.3s;
}

.noise-overlay::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.05"/%3E%3C/svg%3E');
  z-index: -1;
  pointer-events: none;
}

.bento-card:hover .card-glass {
  background: rgba(25, 28, 42, 0.7);
  border-color: rgba(255, 255, 255, 0.15);
}

.card-glass.p-0 { padding: 0; }
.card-glass.flex-col { flex-direction: column; }
.card-glass.flex-col-between { flex-direction: column; justify-content: space-between; }
.card-glass.flex-col-end { flex-direction: column; justify-content: flex-end; }
.card-glass.flex-center { flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.card-glass.space-between { justify-content: space-between; }
.overflow-hidden { overflow: hidden; }

/* Text */
h2, h3, p { margin: 0; }
.font-space { font-family: 'Space Grotesk', sans-serif; font-size: 3rem; font-weight: 700; color: #fff; line-height: 1.1; letter-spacing: -1px; }

/* Top Left Card */
.color-palette { display: flex; gap: 8px; margin-top: 2rem; }
.circle { width: 40px; height: 40px; border-radius: 50%; box-shadow: inset -5px -5px 10px rgba(0,0,0,0.3); }
.c-red { background: #ff4757; }
.c-orange { background: #ffa502; }
.c-blue { background: #1e90ff; }
.c-cyan { background: #00f0ff; }

/* UI Mockup (Top Left) */
.ui-mockup {
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 1.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.mock-header {
  background: rgba(255,255,255,0.02);
  padding: 0.5rem 0.8rem;
  display: flex;
  gap: 6px;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}
.mdot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.2); }
.mock-header .mdot:nth-child(1) { background: #ff5f56; }
.mock-header .mdot:nth-child(2) { background: #ffbd2e; }
.mock-header .mdot:nth-child(3) { background: #27c93f; }
.mock-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.mline { height: 8px; border-radius: 4px; background: rgba(255,255,255,0.1); }
.m-dark { background: rgba(255,255,255,0.05); }
.w-40 { width: 40%; }
.w-80 { width: 80%; }
.w-30 { width: 30%; }
.mbox { width: 100%; height: 60px; border-radius: 8px; background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; }
.mflex { display: flex; gap: 8px; margin-top: auto; }
.mbtn { flex: 1; height: 24px; border-radius: 12px; background: rgba(255,255,255,0.05); }
.mbtn.primary { background: linear-gradient(90deg, #b478ff, #00f0ff); opacity: 0.8; }

/* Bottom Left Card */
.bl-content { display: flex; flex-direction: column; height: 100%; padding: 2rem; background: linear-gradient(180deg, rgba(18, 20, 30, 0.8) 0%, rgba(18, 20, 30, 0.2) 100%); }
.bl-text { font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.7); font-size: 0.95rem; line-height: 1.5; margin-bottom: 2rem; max-width: 90%; }
.bl-cover-wrapper { position: relative; margin-top: auto; border-radius: 16px; padding: 1rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); text-align: center; }
.bl-image { width: 120px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5)); animation: float 6s ease-in-out infinite; }
.bl-badge { position: absolute; bottom: -10px; right: -10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.7rem; font-weight: 700; color: #fff; border: 1px solid rgba(255,255,255,0.2); }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

/* Center Middle Card */
.canvas-container { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: auto; }
.huge-text-bg { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 0; opacity: 0.2; pointer-events: none; }
.huge-text-bg span { font-family: 'Space Grotesk', sans-serif; font-size: 8rem; font-weight: 800; line-height: 0.85; color: #3b9cff; }
.huge-text-bg span.outline { -webkit-text-stroke: 2px #3b9cff; color: transparent; }
.tm-content { position: absolute; bottom: 0; left: 0; padding: 3rem; z-index: 2; pointer-events: none; }
.badge { display: inline-block; padding: 0.35rem 1rem; background: rgba(59, 156, 255, 0.2); color: #3b9cff; border-radius: 20px; font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 1rem; border: 1px solid rgba(59, 156, 255, 0.3); }
.tm-content h2 { font-family: 'Space Grotesk', sans-serif; font-size: 3.5rem; color: #fff; margin-bottom: 0.5rem; }
.tm-content p { font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.7); max-width: 400px; line-height: 1.5; }

/* Pricing Card */
.pricing-glass { display: flex; flex-direction: row; justify-content: center; align-items: center; padding: 2rem; background: rgba(13, 15, 23, 0.7); border-color: rgba(255,255,255,0.05); box-shadow: inset 0 20px 40px rgba(0,0,0,0.5); gap: 3rem; height: 100%; }
.pricing-col { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.2rem; }
.mostrador-wrapper { position: relative; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; }
.mostrador-track { position: absolute; inset: 0; border-radius: 50%; border: 1px solid rgba(255,255,255,0.06); }
.m-orbit-animated { position: absolute; inset: -1px; border-radius: 50%; border: 2px solid transparent; }
.m-orbit-1 { border-top-color: #00f0ff; }
.m-orbit-2 { border-top-color: #ffa502; }
.m-orbit-3 { border-top-color: #b478ff; }
.mostrador-value { position: relative; z-index: 2; display: flex; align-items: baseline; justify-content: center; gap: 4px; }
.currency { font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.3); font-size: 0.85rem; font-weight: 500; }
.price-number { font-family: 'Space Grotesk', sans-serif; font-size: 2.1rem; font-weight: 600; color: #fff; line-height: 1; letter-spacing: -1px; }
.pricing-label { display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255,255,255,0.7); }
.dot { width: 6px; height: 6px; border-radius: 50%; }
.d-cyan { background: #00f0ff; box-shadow: 0 0 8px #00f0ff; }
.d-orange { background: #ffa502; box-shadow: 0 0 8px #ffa502; }
.d-purple { background: #b478ff; box-shadow: 0 0 8px #b478ff; }

/* Top Right Card */
.tr-card { overflow: hidden; }
.tr-bg { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(13, 15, 23, 0), rgba(180, 120, 255, 0.1), rgba(0, 240, 255, 0.05)); mix-blend-mode: overlay; z-index: 0; }
.tr-content { position: relative; z-index: 2; padding: 2.5rem; background: linear-gradient(to top, rgba(13, 15, 23, 1) 20%, rgba(13, 15, 23, 0)); width: 100%; margin-top: auto; }
.tr-content h3 { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; color: #fff; margin-bottom: 0.5rem; font-weight: 600; }
.tr-content p { font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.5); font-size: 0.9rem; max-width: 200px; line-height: 1.4; }

/* Chart Mockup (Top Right) */
.chart-mockup { position: absolute; top: 10%; left: 0; width: 100%; height: 60%; padding: 0 2.5rem; display: flex; align-items: flex-end; justify-content: space-between; z-index: 1; }
.chart-bars { position: absolute; inset: 0 2.5rem; bottom: 0; display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; }
.cbar { flex: 1; background: linear-gradient(to top, rgba(180, 120, 255, 0.2), transparent); border-radius: 4px 4px 0 0; transform-origin: bottom; }
.cbar-1 { height: 30%; }
.cbar-2 { height: 45%; }
.cbar-3 { height: 40%; }
.cbar-4 { height: 75%; }
.cbar-5 { height: 90%; }
.chart-line-wrapper { position: absolute; inset: 0 2.5rem; bottom: 15%; height: 60%; }
.chart-svg { width: 100%; height: 100%; overflow: visible; }
.chart-neon-line { stroke: #00f0ff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 0 8px rgba(0,240,255,0.6)); }

/* Bottom Right Card */
.br-card { overflow: hidden; }
.starburst-bg { position: absolute; inset: -50%; animation: spin 40s linear infinite; opacity: 0.3; }
.ray { position: absolute; top: 50%; left: 50%; width: 200%; height: 2px; background: linear-gradient(90deg, transparent, rgba(59, 156, 255, 0.8), transparent); transform-origin: 0 0; }
.stat-number { font-family: 'Space Grotesk', sans-serif; font-size: 4.5rem; font-weight: 700; color: #ffa502; line-height: 1; margin-bottom: 0.5rem; text-shadow: 0 0 30px rgba(255, 165, 2, 0.4); display: flex; align-items: flex-start; justify-content: center; }
.stat-plus { font-size: 2.5rem; margin-top: 0.2rem; }
.stat-label { font-family: 'Inter', sans-serif; color: #fff; font-weight: 500; font-size: 1.1rem; margin-bottom: 1.5rem; }
.stat-btn { background: linear-gradient(135deg, #00f0ff, #3b9cff); color: #000; border: none; padding: 0.75rem 1.5rem; border-radius: 20px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
.stat-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0, 240, 255, 0.3); }

@keyframes spin { 100% { transform: rotate(360deg); } }

/* Responsive adjustments */
@media (max-width: 1024px) {
  .bento-container {
    height: auto;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
  .tl-card { grid-column: 1 / 2; grid-row: 1; min-height: 250px; }
  .bl-card { grid-column: 1 / 2; grid-row: 2; min-height: 300px; }
  .tm-card { grid-column: 1 / 3; grid-row: 3; min-height: 400px; }
  .bm-card { grid-column: 1 / 3; grid-row: 4; min-height: 120px; }
  .tr-card { grid-column: 2 / 3; grid-row: 1; min-height: 250px; }
  .br-card { grid-column: 2 / 3; grid-row: 2; min-height: 300px; }
}

@media (max-width: 768px) {
  .bento-container {
    grid-template-columns: 1fr;
  }
  .tl-card, .bl-card, .tm-card, .bm-card, .tr-card, .br-card {
    grid-column: 1 / -1;
    grid-row: auto;
  }
  .pricing-glass {
    flex-direction: column;
    gap: 2.5rem;
  }
  .huge-text-bg span { font-size: 5rem; }
  .tm-content h2 { font-size: 2.5rem; }
}
</style>