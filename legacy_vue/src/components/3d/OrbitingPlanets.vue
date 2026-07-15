<template>
  <div
    ref="containerRef"
    class="orbit-container"
    :style="{ perspective: '1200px' }"
  >
    <div
      class="orbit-space"
      :style="{ transform: `rotateY(${xCurve}deg) rotateX(${-yCurve}deg)` }"
    >
      <div
        v-for="(planet, i) in planets"
        :key="i"
        class="orbit-item"
        :style="{
          left: `${positions[i]?.left || 0}px`,
          top: `${positions[i]?.top || 0}px`,
          width: planet.width,
          transform: `translate(-50%, -50%) rotateX(${yCurve}deg) rotateY(${-xCurve}deg) scale(${positions[i]?.scale || 1})`,
          zIndex: positions[i]?.zIndex || 0,
        }"
      >
        <img :src="planet.src" :alt="planet.alt" class="orbit-img" loading="lazy" decoding="async" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, shallowRef } from 'vue'

const props = defineProps({
  planets: { type: Array, required: true },
  xCurve: { type: Number, default: 63 },
  yCurve: { type: Number, default: -47 },
  speed: { type: Number, default: 1.2 }, // Adjusted speed to be elegant
  direction: { type: String, default: 'anticlockwise' },
  orbitWidthPct: { type: Number, default: 67 },
})

const containerRef = ref(null)
const dims = shallowRef({ W: 0, H: 0 })
const positions = ref([])

let rafId = null
let resizeObserver = null

onMounted(() => {
  const el = containerRef.value
  if (!el) return
  resizeObserver = new ResizeObserver((entries) => {
    const r = entries[0]?.contentRect
    if (!r) return
    dims.value = { W: r.width, H: r.height }
  })
  resizeObserver.observe(el)

  startAnimation()
})

onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
})

function startAnimation() {
  const start = performance.now()
  const revsPerSec = Math.max(0, Math.min(20, props.speed)) * 0.05
  const dir = props.direction === 'anticlockwise' ? -1 : 1

  const tick = (now) => {
    const { W, H } = dims.value
    if (W && H && revsPerSec > 0) {
      const elapsed = (now - start) / 1000
      const orbitPhi = dir * 2 * Math.PI * revsPerSec * elapsed
      
      const totalW = (Math.max(0, Math.min(100, props.orbitWidthPct)) / 100) * W
      const a = totalW / 2
      const b = a * 0.35 // fixed ellipse ratio

      const theta0 = Math.atan2(H, W)
      const cosT = Math.cos(theta0)
      const sinT = Math.sin(theta0)
      const cx = W / 2
      const cy = H / 2
      const n = props.planets.length

      const newPositions = []
      for (let i = 0; i < n; i++) {
        // Space out planets evenly along the orbit
        const phi = (i / n) * Math.PI * 2 + orbitPhi
        const ex = a * Math.cos(phi)
        const ey = b * Math.sin(phi)

        // Rotate the ellipse by the container's diagonal (theta0)
        const x = ex * cosT - ey * sinT
        const y = ex * sinT + ey * cosT

        const left = cx + x
        const top = cy + y

        // Depth scale calculation removed as requested (tire o efeito de mudar de tamanho)
        const sf = 1
        
        // Z-index based on Y coordinate to overlap correctly
        const zIndex = Math.round(y)

        newPositions.push({ left, top, scale: sf, zIndex })
      }
      positions.value = newPositions
    }
    rafId = requestAnimationFrame(tick)
  }
  rafId = requestAnimationFrame(tick)
}
</script>

<style scoped>
.orbit-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  z-index: 5;
}

.orbit-space {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
}

.orbit-item {
  position: absolute;
  will-change: left, top, transform;
  /* Add smooth transition if resize occurs */
  transition: width 0.3s ease;
}

.orbit-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.6));
}
</style>
