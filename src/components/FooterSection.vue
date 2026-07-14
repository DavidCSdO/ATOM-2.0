<template>
  <footer class="footer-section">
    <!-- Galaxy Canvas Background -->
    <canvas ref="galaxyCanvas" class="galaxy-canvas"></canvas>

    <!-- Content -->
    <div class="footer-content">
      
      <!-- Footer Info -->
      <div class="footer-info">
        <div class="footer-col">
          <h4>Navegação</h4>
          <a href="#home">Início</a>
          <a href="#projetos">Projetos</a>
          <a href="#solucoes">Soluções</a>
          <a href="#planos">Planos</a>
        </div>
        <div class="footer-col">
          <h4>Social</h4>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
        </div>
        <div class="footer-col">
          <h4>Contato</h4>
          <p>hello@atom.com</p>
          <p>+55 11 99999-9999</p>
        </div>
      </div>

      <h1 class="huge-atom">ATOM</h1>
      <p class="copyright">© 2026 - ATOM</p>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const galaxyCanvas = ref(null)

onMounted(() => {
  const canvas = galaxyCanvas.value
  const ctx = canvas.getContext('2d')
  
  let width, height;
  let animationFrameId;
  let stars = [];
  
  // Custom Parameters from user's React Bits setup
  const params = {
    starSpeed: 0.4,
    density: 1.5,
    hueShift: 100,
    glowIntensity: 0.5,
    twinkleIntensity: 0.2,
    rotationSpeed: 0.05
  }

  function resize() {
    width = canvas.width = window.innerWidth
    height = canvas.height = document.querySelector('.footer-section').offsetHeight
    initStars()
  }

  function initStars() {
    stars = []
    const numStars = Math.floor((width * height) / 2000 * params.density)
    
    for (let i = 0; i < numStars; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * Math.max(width, height)
      
      stars.push({
        angle,
        radius,
        baseRadius: radius,
        size: Math.random() * 1.5 + 0.5,
        twinkleSpeed: Math.random() * 0.05 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        hue: (200 + params.hueShift + Math.random() * 60) % 360,
        speed: (Math.random() * 0.5 + 0.2) * params.starSpeed
      })
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height)
    
    const cx = width / 2
    const cy = height / 2

    stars.forEach(star => {
      // Spiral Rotation
      star.angle += (params.rotationSpeed * 0.005) / (star.radius / 500 + 0.5)
      
      // Calculate position
      const x = cx + Math.cos(star.angle) * star.radius
      const y = cy + Math.sin(star.angle) * star.radius

      // Twinkle effect
      star.twinklePhase += star.twinkleSpeed
      const alpha = 0.5 + Math.sin(star.twinklePhase) * params.twinkleIntensity * 2

      ctx.beginPath()
      ctx.arc(x, y, star.size, 0, Math.PI * 2)
      
      const rgb = `hsl(${star.hue}, 80%, 70%)`
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, alpha))})`
      
      // Glow effect
      if (params.glowIntensity > 0 && Math.random() > 0.5) {
        ctx.shadowBlur = 10 * params.glowIntensity
        ctx.shadowColor = rgb
      } else {
        ctx.shadowBlur = 0
      }
      
      ctx.fill()
    })

    animationFrameId = requestAnimationFrame(draw)
  }

  window.addEventListener('resize', resize)
  resize()
  draw()

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
    cancelAnimationFrame(animationFrameId)
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

@font-face {
  font-family: 'Astro Space';
  src: url('@/assets/fonts/AstroSpace.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.footer-section {
  position: relative;
  width: 100%;
  min-height: 800px;
  background-color: #090B17;
  display: flex;
  align-items: flex-end; /* Alinha o conteúdo o mais pra baixo possível */
  justify-content: center;
  overflow: hidden;
  padding: 2rem 2rem 4rem 2rem;
}

.galaxy-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.footer-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding-bottom: 2rem;
  max-width: 1400px;
}

.footer-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 4rem;
  margin-bottom: 4rem;
  z-index: 4;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-col h4 {
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.footer-col a, .footer-col p {
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Inter', sans-serif;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s;
  margin: 0;
}

.footer-col a:hover {
  color: #00f0ff;
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
}

.huge-atom {
  font-family: 'Astro Space', sans-serif;
  font-size: 25vw;
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1;
  margin: 0;
  
  /* Exatamente o mesmo gradiente e textura do Hero */
  background: 
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 1 0 0 0 0' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.31'/%3E%3C/svg%3E"),
    linear-gradient(90deg, #7B3FF2 0%, #3FA9FF 50%, #FF4D6D 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 40px rgba(63, 169, 255, 0.3))
         drop-shadow(0 0 80px rgba(123, 63, 242, 0.2));
  
  position: relative;
}

/* Removendo o .huge-atom::after já que a textura e cores agora são do próprio background */

.copyright {
  font-family: 'Inter', sans-serif;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  letter-spacing: 2px;
  margin-top: 1rem;
  position: relative;
}

@media (max-width: 768px) {
  .huge-atom {
    font-size: 30vw;
  }
  .footer-info {
    flex-direction: column;
    gap: 3rem;
    padding: 0 2rem;
    align-items: center;
    text-align: center;
  }
}
</style>
