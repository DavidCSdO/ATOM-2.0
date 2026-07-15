<template>
  <div
    class="round-carousel-container"
    :style="{
      background,
      perspective: `${perspective}px`,
      cursor: drag ? 'grab' : 'default',
    }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  >
    <div
      class="round-carousel-tilt"
      :style="{ transform: `rotateX(${tilt}deg)` }"
    >
      <div
        ref="ringRef"
        class="round-carousel-ring"
        :style="{
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
        }"
      >
        <div
          v-for="(item, i) in items"
          :key="i"
          class="round-carousel-item"
          :style="{
            transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
          }"
        >
          <!-- Front Face -->
          <div
            class="face face-front"
            :style="{
              borderRadius: `${cornerRadius}px`,
              backgroundColor: item.src ? 'transparent' : '#222',
              backgroundImage: item.src ? `url(${item.src})` : undefined,
            }"
          >
          </div>
          
          <!-- Back Face -->
          <div
            class="face face-back"
            :style="{
              borderRadius: `${cornerRadius}px`,
              backgroundColor: item.src ? 'transparent' : '#181818',
              backgroundImage: item.src ? `url(${item.src})` : undefined,
              filter: `brightness(${innerDim / 10})`,
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'

const emit = defineEmits(['update:activeIndex'])

const props = defineProps({
  items: { type: Array, default: () => [] },
  imageWidth: { type: Number, default: 300 },
  imageHeight: { type: Number, default: 467 }, // Updated default closer to the React code preview
  spacing: { type: Number, default: 2 },
  speed: { type: Number, default: 7 },
  direction: { type: String, default: 'right' },
  drag: { type: Boolean, default: true },
  sensitivity: { type: Number, default: 5 },
  tilt: { type: Number, default: -7 },
  perspective: { type: Number, default: 3000 },
  cornerRadius: { type: Number, default: 22 },
  innerDim: { type: Number, default: 3.5 },
  background: { type: String, default: 'transparent' },
})

const ringRef = ref(null)
const rafRef = ref(0)
const rotYRef = ref(0)
const velRef = ref(0)
const lastRef = ref(0)
const dragRef = ref({ active: false, x: 0 })

const count = computed(() => props.items.length || 1)
const angle = computed(() => 360 / count.value)
const radius = computed(() => {
  const factor = 1 + props.spacing * 0.15
  return (props.imageWidth * factor) / (2 * Math.tan(Math.PI / count.value))
})
const degPerSec = computed(() => props.speed * 6 * (props.direction === 'left' ? -1 : 1))

const activeIndex = ref(0)

watch(rotYRef, (newRotY) => {
  let a = newRotY % 360
  if (a < 0) a += 360
  // Each item is spaced by angle
  // When rotation is 0, item 0 is at front
  // When rotation is -angle (or 360-angle), item 1 is at front
  let index = Math.round((360 - a) / angle.value) % count.value
  if (index < 0) index += count.value
  if (index !== activeIndex.value) {
    activeIndex.value = index
    emit('update:activeIndex', index)
  }
})

onMounted(() => {
  const ring = ringRef.value
  if (!ring) return

  const applyTransform = () => {
    ring.style.transform = `translateZ(${-radius.value}px) rotateY(${rotYRef.value}deg)`
  }
  applyTransform()

  const draw = (now) => {
    const dt = lastRef.value ? (now - lastRef.value) / 1000 : 0
    lastRef.value = now
    const f = Math.min(dt, 0.1)
    const d = dragRef.value

    if (!d.active) {
      if (Math.abs(velRef.value) > 0.01) {
        rotYRef.value += velRef.value * f
        velRef.value *= 0.94
      } else {
        rotYRef.value += degPerSec.value * f
      }
    }
    applyTransform()
    rafRef.value = requestAnimationFrame(draw)
  }
  rafRef.value = requestAnimationFrame(draw)
})

onBeforeUnmount(() => {
  if (rafRef.value) cancelAnimationFrame(rafRef.value)
})

function onPointerDown(e) {
  if (!props.drag) return
  if (e.currentTarget.setPointerCapture) e.currentTarget.setPointerCapture(e.pointerId)
  dragRef.value = { active: true, x: e.clientX }
  velRef.value = 0
}

function onPointerMove(e) {
  const d = dragRef.value
  if (!d.active) return
  const dx = e.clientX - d.x
  d.x = e.clientX
  const k = 0.3 * props.sensitivity
  rotYRef.value += dx * k
  velRef.value = dx * k * 60
}

function onPointerUp(e) {
  if (e.currentTarget.releasePointerCapture) e.currentTarget.releasePointerCapture(e.pointerId)
  dragRef.value.active = false
}
</script>

<style scoped>
.round-carousel-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  touch-action: none;
}

.round-carousel-tilt {
  transform-style: preserve-3d;
}

.round-carousel-ring {
  position: relative;
  transform-style: preserve-3d;
}

.round-carousel-item {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
}

.face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  backface-visibility: hidden;
  background-size: cover;
  background-position: center;
}

.face-front {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}
</style>
