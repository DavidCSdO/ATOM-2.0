<template>
  <section class="projects-section" id="projetos">
    <div class="projects-glow" aria-hidden="true"></div>

    <div class="projects-container">
      <div class="atom-title-container">
        <h1 class="atom-brush-title" data-text="ATOM">ATOM</h1>
        <p class="drag-hint">arraste para explorar<span class="drag-hint-arrow">→</span></p>
      </div>

      <div class="track-wrapper">
        <button class="nav-arrow nav-arrow--left" @click="scrollByCard(-1)" aria-label="Projeto anterior">‹</button>

        <div
          class="projects-track"
          ref="trackRef"
          tabindex="0"
          aria-label="Projetos"
          :class="{ 'is-dragging': isDragging }"
          @mousedown="startDrag"
          @mouseleave="stopDrag"
          @mouseup="stopDrag"
          @mousemove="onDrag"
          @keydown="onKeydown"
        >
          <div
            v-for="(project, index) in projectsData"
            :key="project.footer"
            :ref="el => (cardRefs[index] = el)"
            class="project-card"
            :style="{ '--accent': project.accent, transitionDelay: prefersReducedMotion ? '0ms' : `${index * 70}ms` }"
            @mousemove="handleTilt"
            @mouseleave="resetTilt"
          >
            <div class="card-3d">
              <img
                v-if="!project.imgFailed"
                :src="project.src"
                :alt="project.title"
                class="card-image"
                :style="{ objectPosition: project.imagePos || 'center top' }"
                draggable="false"
                @error="onImgError(project)"
              />
              <div v-else class="card-fallback">
                <span class="card-fallback-mark">{{ project.footer.charAt(0) }}</span>
              </div>

              <div class="card-spotlight"></div>
              <div class="glass-scrim"></div>

              <div class="glass-overlay">
                <h3 class="glass-title">{{ project.title }}</h3>
                <p class="glass-desc">{{ project.description }}</p>
                <span class="glass-footer">{{ project.footer }}</span>
              </div>
            </div>
          </div>
        </div>

        <button class="nav-arrow nav-arrow--right" @click="scrollByCard(1)" aria-label="Próximo projeto">›</button>
      </div>

      <div class="track-dots" aria-hidden="true">
        <button
          v-for="(project, index) in projectsData"
          :key="'dot-' + project.footer"
          class="track-dot"
          :class="{ 'is-active': activeIndex === index }"
          :style="{ '--accent': project.accent }"
          @click="scrollToIndex(index)"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'

import atomImg from '@/assets/Carrocel/atom.png'
import portifolioImg from '@/assets/Carrocel/portifolio.png'
import atlasImg from '@/assets/Carrocel/atlas.png'
import chaImg from '@/assets/Carrocel/cha.png'
// TEMP placeholder until the real Kallah screenshot is added to /assets/Carrocel
import kallahImg from '@/assets/Carrocel/image 4.png'

const projectsData = reactive([
  {
    src: atomImg,
    title: 'Alta Performance',
    description: 'Páginas web otimizadas focadas em conversão.',
    footer: 'ATOM',
    accent: '#4C8DFF',
    imagePos: 'center top',
    imgFailed: false
  },
  {
    src: portifolioImg,
    title: 'Automações & IA',
    description: 'Sistemas inteligentes que fazem o negócio rodar no piloto automático.',
    footer: 'Portfólio Pessoal',
    accent: '#9AC79E',
    imagePos: 'center 20%',
    imgFailed: false
  },
  {
    src: atlasImg,
    title: 'Identidade Visual',
    description: 'Design de alto impacto e posicionamento estético de marca.',
    footer: 'Atlas Fin',
    accent: '#22D3EE',
    imagePos: 'center top',
    imgFailed: false
  },
  {
    src: chaImg,
    title: 'Suporte Contínuo',
    description: 'Garantia de otimização contínua para sua estrutura digital.',
    footer: 'Chá de Panela',
    accent: '#FF8FB3',
    imagePos: 'center top',
    imgFailed: false
  },
  {
    src: kallahImg,
    title: 'SEO Otimizado',
    description: 'Estratégias de SEO e conteúdo que trazem clientes sem precisar pagar por anúncios.',
    footer: 'Kallah Bride house',
    accent: '#E4A855',
    imagePos: 'center top',
    imgFailed: false
  }
])

const trackRef = ref(null)
const cardRefs = ref([])
const isDragging = ref(false)
const activeIndex = ref(0)

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const canHover =
  typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

let startX = 0
let scrollLeft = 0

function startDrag(e) {
  isDragging.value = true
  startX = e.pageX - trackRef.value.offsetLeft
  scrollLeft = trackRef.value.scrollLeft
}
function stopDrag() {
  isDragging.value = false
}
function onDrag(e) {
  if (!isDragging.value) return
  e.preventDefault()
  const x = e.pageX - trackRef.value.offsetLeft
  const walk = (x - startX) * 1.4
  trackRef.value.scrollLeft = scrollLeft - walk
}

function onImgError(project) {
  project.imgFailed = true
}

function handleTilt(e) {
  if (!canHover || prefersReducedMotion || isDragging.value) return
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const rotateY = (x / rect.width - 0.5) * 12
  const rotateX = (y / rect.height - 0.5) * -12
  card.style.setProperty('--rx', `${rotateX}deg`)
  card.style.setProperty('--ry', `${rotateY}deg`)
  card.style.setProperty('--mx', `${(x / rect.width) * 100}%`)
  card.style.setProperty('--my', `${(y / rect.height) * 100}%`)
}
function resetTilt(e) {
  const card = e.currentTarget
  card.style.setProperty('--rx', '0deg')
  card.style.setProperty('--ry', '0deg')
}

function scrollByCard(dir) {
  const card = trackRef.value?.querySelector('.project-card')
  const gap = 32
  const width = card ? card.offsetWidth + gap : 320
  trackRef.value.scrollBy({ left: width * dir, behavior: 'smooth' })
}

function onKeydown(e) {
  if (e.key === 'ArrowRight') { e.preventDefault(); scrollByCard(1) }
  if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByCard(-1) }
}

function scrollToIndex(i) {
  cardRefs.value[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
}

let rafId = null
function updateActiveIndex() {
  if (!trackRef.value) return
  const trackRect = trackRef.value.getBoundingClientRect()
  const trackCenter = trackRect.left + trackRect.width / 2
  let closest = 0
  let closestDist = Infinity
  cardRefs.value.forEach((card, i) => {
    if (!card) return
    const rect = card.getBoundingClientRect()
    const dist = Math.abs(rect.left + rect.width / 2 - trackCenter)
    if (dist < closestDist) { closestDist = dist; closest = i }
  })
  activeIndex.value = closest
}
function onScroll() {
  if (rafId) return
  rafId = requestAnimationFrame(() => { updateActiveIndex(); rafId = null })
}

let observer = null
onMounted(() => {
  updateActiveIndex()
  trackRef.value?.addEventListener('scroll', onScroll, { passive: true })

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      })
    },
    { threshold: 0.2 }
  )
  cardRefs.value.forEach((card) => card && observer.observe(card))
})
onBeforeUnmount(() => {
  trackRef.value?.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

.projects-section {
  --bg: #090b17;
  --card-bg: #10121e;
  --text-primary: #f5f6fa;
  --text-muted: rgba(245, 246, 250, 0.68);
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 6rem 0;
  z-index: 20;
}

.projects-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(50% 40% at 20% 15%, rgba(0, 119, 255, 0.14), transparent 70%),
    radial-gradient(45% 35% at 85% 75%, rgba(255, 0, 119, 0.12), transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.projects-container {
  position: relative;
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  z-index: 2;
}

.atom-title-container {
  margin-bottom: -2rem;
  z-index: 30;
  text-align: center;
  pointer-events: none;
}

@font-face {
  font-family: 'Rocket brush';
  src: url('@/assets/fonts/Rocket-Brush.woff') format('woff');
}

.atom-brush-title {
  font-family: 'Rocket brush', 'Permanent Marker', cursive;
  font-size: clamp(4rem, 11vw, 9rem);
  font-weight: 400;
  margin: 0;
  line-height: 1;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: linear-gradient(100deg, #3b9cff, #b478ff 55%, #ff3d96);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.drag-hint {
  margin: 0.5rem 0 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.drag-hint-arrow {
  display: inline-block;
  animation: nudge 1.6s ease-in-out infinite;
}
@keyframes nudge {
  0%, 100% { transform: translateX(0); opacity: 0.5; }
  50% { transform: translateX(6px); opacity: 1; }
}

.track-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.nav-arrow {
  position: absolute;
  top: 42%;
  z-index: 25;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(15, 17, 28, 0.55);
  backdrop-filter: blur(12px);
  color: var(--text-primary);
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
}
.nav-arrow:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.05);
}
.nav-arrow--left { left: 2vw; }
.nav-arrow--right { right: 2vw; }
@media (max-width: 900px) {
  .nav-arrow { display: none; }
}

.projects-track {
  display: flex;
  gap: 2rem;
  padding: 4rem 8vw 3rem;
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  align-items: center;
  perspective: 1400px;
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  outline: none;
}
.projects-track::-webkit-scrollbar { display: none; }
.projects-track.is-dragging { scroll-snap-type: none; cursor: grabbing; }

.project-card {
  --rx: 0deg;
  --ry: 0deg;
  --mx: 50%;
  --my: 50%;
  flex: 0 0 auto;
  width: 300px;
  height: 440px;
  scroll-snap-align: center;
  cursor: grab;
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.project-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.project-card:active { cursor: grabbing; }

.card-3d {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 28px;
  overflow: hidden;
  background: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5);
  transform: rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0);
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.35s ease, box-shadow 0.35s ease;
}
.project-card:hover .card-3d {
  border-color: color-mix(in srgb, var(--accent) 50%, transparent);
  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.55),
    0 0 0 1px color-mix(in srgb, var(--accent) 25%, transparent),
    0 0 40px -10px color-mix(in srgb, var(--accent) 55%, transparent);
}

.card-spotlight {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mx) var(--my), color-mix(in srgb, var(--accent) 35%, white 10%), transparent 55%);
  opacity: 0;
  mix-blend-mode: overlay;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.project-card:hover .card-spotlight { opacity: 0.55; }

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  display: block;
  transition: transform 0.6s ease;
}
.project-card:hover .card-image { transform: scale(1.04); }

.card-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(150deg, color-mix(in srgb, var(--accent) 35%, #0c0e18), #0c0e18 75%);
}
.card-fallback-mark {
  font-family: 'Inter', sans-serif;
  font-size: 4.5rem;
  font-weight: 800;
  color: color-mix(in srgb, var(--accent) 70%, white 30%);
  opacity: 0.7;
}

.glass-scrim {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(6, 7, 14, 0.85), rgba(6, 7, 14, 0));
  pointer-events: none;
}

.glass-overlay {
  position: absolute;
  bottom: 14px;
  left: 14px;
  right: 14px;
  padding: 22px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.14);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.glass-title {
  font-family: 'Inter', sans-serif;
  font-size: 21px;
  font-weight: 800;
  margin: 0;
  color: var(--text-primary);
  line-height: 1.2;
}
.glass-desc {
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  font-weight: 400;
  line-height: 1.4;
  margin: 0;
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.glass-footer {
  font-family: 'Inter', sans-serif;
  font-size: 12.5px;
  font-weight: 700;
  margin-top: 4px;
  color: var(--accent);
  letter-spacing: 0.02em;
}

.track-dots {
  display: flex;
  gap: 10px;
  margin-top: 0.5rem;
}
.track-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}
.track-dot.is-active {
  width: 24px;
  border-radius: 4px;
  background: var(--accent);
}

@media (max-width: 768px) {
  .projects-section { padding: 4rem 0; }
  .atom-title-container { margin-bottom: -1.25rem; }
  .projects-track { padding: 3rem 1.5rem 2rem; gap: 1.25rem; }
  .project-card { width: 250px; height: 400px; }
  .card-3d { border-radius: 22px; }
}

@media (prefers-reduced-motion: reduce) {
  .project-card, .card-3d, .card-image, .card-spotlight {
    transition: none !important;
  }
  .drag-hint-arrow { animation: none; }
}
</style>