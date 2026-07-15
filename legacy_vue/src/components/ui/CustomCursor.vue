<template>
  <div class="cursor-dot" ref="cursorDot"></div>
  <div class="cursor-ring" ref="cursorRing"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorDot = ref(null)
const cursorRing = ref(null)

let mouseX = 0
let mouseY = 0
let ringX = 0
let ringY = 0
let isHovering = false

let animationId = null

const onMouseMove = (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
  
  if (cursorDot.value) {
    cursorDot.value.style.transform = `translate(${mouseX}px, ${mouseY}px)`
  }
}

const onMouseOver = (e) => {
  const target = e.target
  // Scale up cursor when hovering over interactive elements
  const isInteractive = target.closest('a, button, .glass-card, input, textarea, .faq-item, .bento-card, .planet-img') !== null
  
  if (isInteractive && !isHovering) {
    isHovering = true
    if (cursorRing.value) cursorRing.value.classList.add('hovered')
    if (cursorDot.value) cursorDot.value.classList.add('hovered')
  } else if (!isInteractive && isHovering) {
    isHovering = false
    if (cursorRing.value) cursorRing.value.classList.remove('hovered')
    if (cursorDot.value) cursorDot.value.classList.remove('hovered')
  }
}

const render = () => {
  // Smoothly interpolate the ring position towards the mouse position
  ringX += (mouseX - ringX) * 0.15
  ringY += (mouseY - ringY) * 0.15
  
  if (cursorRing.value) {
    cursorRing.value.style.transform = `translate(${ringX}px, ${ringY}px)`
  }
  
  animationId = requestAnimationFrame(render)
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseover', onMouseOver)
  render()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseover', onMouseOver)
  if (animationId) cancelAnimationFrame(animationId)
})
</script>

<style>
/* Hide the default cursor completely */
body {
  cursor: none;
}

/* Ensure interactive elements also hide their default cursors so the custom one is always visible alone */
a, button, input, textarea, select {
  cursor: none !important;
}
</style>

<style scoped>
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background-color: #00f0ff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 999999;
  margin-top: -4px;
  margin-left: -4px;
  transition: transform 0.05s linear, width 0.2s, height 0.2s, background-color 0.2s;
}

.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(123, 63, 242, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 999998;
  margin-top: -20px;
  margin-left: -20px;
  transition: width 0.2s, height 0.2s, margin 0.2s, border-color 0.2s;
  /* Disable transform transition to allow smooth JS interpolation */
}

/* Hover effects */
.cursor-dot.hovered {
  width: 0;
  height: 0;
  opacity: 0;
}

.cursor-ring.hovered {
  width: 60px;
  height: 60px;
  margin-top: -30px;
  margin-left: -30px;
  background-color: rgba(0, 240, 255, 0.1);
  border-color: #00f0ff;
  backdrop-filter: blur(2px);
}

@media (max-width: 768px) {
  /* On mobile/touch devices, we shouldn't show the custom cursor */
  .cursor-dot, .cursor-ring {
    display: none;
  }
}
</style>
