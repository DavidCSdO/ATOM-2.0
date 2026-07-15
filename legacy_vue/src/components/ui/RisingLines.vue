<template>
  <div class="rising-lines-container" ref="containerRef">
    <canvas ref="canvasRef"></canvas>
    <div class="overlay-gradient"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  lineCount: { type: Number, default: 30 },
  speed: { type: Number, default: 1.5 }
})

const containerRef = ref(null)
const canvasRef = ref(null)
let ctx = null
let animationId = null
let lines = []
let width = 0
let height = 0

class Line {
  constructor(w, h) {
    this.w = w
    this.h = h
    this.reset()
    // Randomize initial Y so they aren't all at the bottom
    this.y = Math.random() * this.h
  }

  reset() {
    this.x = Math.random() * this.w
    this.y = this.h + Math.random() * 200
    this.length = Math.random() * (this.h * 0.4) + (this.h * 0.1) // 10% to 50% of height
    this.thickness = Math.random() * 1.5 + 0.5
    this.velocity = (Math.random() * 1.5 + 0.5) * props.speed
    this.opacity = Math.random() * 0.5 + 0.1
  }

  update() {
    this.y -= this.velocity
    if (this.y + this.length < 0) {
      this.reset()
    }
  }

  draw(ctx) {
    ctx.beginPath()
    
    // Create gradient for the line (fades at top and bottom)
    const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
    gradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity})`)
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.strokeStyle = gradient
    ctx.lineWidth = this.thickness
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x, this.y + this.length)
    ctx.stroke()
  }
}

const resize = () => {
  if (!containerRef.value || !canvasRef.value) return
  width = containerRef.value.offsetWidth
  height = containerRef.value.offsetHeight
  
  // Handle high DPI displays
  const dpr = window.devicePixelRatio || 1
  canvasRef.value.width = width * dpr
  canvasRef.value.height = height * dpr
  ctx.scale(dpr, dpr)
  
  canvasRef.value.style.width = `${width}px`
  canvasRef.value.style.height = `${height}px`

  // Re-initialize lines on resize
  lines = Array.from({ length: props.lineCount }, () => new Line(width, height))
}

const animate = () => {
  ctx.clearRect(0, 0, width, height)
  
  lines.forEach(line => {
    line.update()
    line.draw(ctx)
  })
  
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  ctx = canvasRef.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  animate()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  if (animationId) cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.rising-lines-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

canvas {
  display: block;
}

.overlay-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 100%, rgba(0, 240, 255, 0.05), transparent 70%);
  pointer-events: none;
}
</style>
