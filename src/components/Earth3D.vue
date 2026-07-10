<template>
  <div class="earth-container" ref="containerEl"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits } from 'vue'
import * as THREE from 'three'

const emit = defineEmits(['loaded'])

const containerEl = ref(null)
let renderer, scene, camera, earthGroup, animationId

function init() {
  const container = containerEl.value
  if (!container) return

  const width = container.clientWidth
  const height = container.clientHeight

  // Scene
  scene = new THREE.Scene()

  // Camera
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.z = 2.8

  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  container.appendChild(renderer.domElement)

  // Texture loader with LoadingManager to track progress
  const manager = new THREE.LoadingManager()
  manager.onLoad = () => {
    // Slight delay to ensure textures are uploaded to GPU
    setTimeout(() => {
      emit('loaded')
    }, 100)
  }
  
  const loader = new THREE.TextureLoader(manager)

  // Earth group
  earthGroup = new THREE.Group()
  earthGroup.rotation.z = -23.4 * Math.PI / 180 // Earth's axial tilt
  scene.add(earthGroup)

  // Earth sphere
  const earthGeometry = new THREE.SphereGeometry(1, 64, 64)

  const earthAlbedo = loader.load('/textures/earth/earth albedo.jpg')
  const earthBump = loader.load('/textures/earth/earth bump.jpg')
  const earthSpec = loader.load('/textures/earth/earth land ocean mask.png')
  const earthNight = loader.load('/textures/earth/earth night_lights_modified.png')
  const earthClouds = loader.load('/textures/earth/clouds earth.png')

  // Set texture properties for quality
  ;[earthAlbedo, earthBump, earthSpec, earthNight, earthClouds].forEach(tex => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
  })

  // Earth material
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthAlbedo,
    bumpMap: earthBump,
    bumpScale: 0.04,
    specularMap: earthSpec,
    specular: new THREE.Color(0x333333),
    shininess: 15,
    emissiveMap: earthNight,
    emissive: new THREE.Color(0xffcc66),
    emissiveIntensity: 0.4,
  })

  const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial)
  earthGroup.add(earthMesh)

  // Cloud layer
  const cloudGeometry = new THREE.SphereGeometry(1.012, 64, 64)
  const cloudMaterial = new THREE.MeshPhongMaterial({
    map: earthClouds,
    alphaMap: earthClouds,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
  })
  const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
  cloudMesh.name = 'clouds'
  earthGroup.add(cloudMesh)

  // Atmosphere glow
  const atmosphereGeometry = new THREE.SphereGeometry(1.06, 64, 64)
  const atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
        vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
        gl_FragColor = vec4(atmosphere, intensity * 0.6);
      }
    `,
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
  })
  const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
  earthGroup.add(atmosphereMesh)

  // Lighting — brighter to stand out against dark background
  const sunLight = new THREE.DirectionalLight(0xffffff, 3.0)
  sunLight.position.set(5, 3, 5)
  scene.add(sunLight)

  const fillLight = new THREE.DirectionalLight(0x8888ff, 0.8)
  fillLight.position.set(-3, 1, -2)
  scene.add(fillLight)

  const ambientLight = new THREE.AmbientLight(0x445566, 0.8)
  scene.add(ambientLight)

  // Handle resize
  window.addEventListener('resize', onResize)

  // Start animation loop
  animate()
}

function animate() {
  animationId = requestAnimationFrame(animate)

  if (earthGroup) {
    // Rotate Earth
    earthGroup.children.forEach(child => {
      if (child.name === 'clouds') {
        child.rotation.y += 0.0003 // Clouds rotate slightly faster
      }
    })
    earthGroup.rotation.y += 0.002
  }

  renderer.render(scene, camera)
}

function onResize() {
  const container = containerEl.value
  if (!container || !camera || !renderer) return

  const width = container.clientWidth
  const height = container.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', onResize)
  if (renderer) {
    renderer.dispose()
    containerEl.value?.removeChild(renderer.domElement)
  }
})
</script>

<style scoped>
.earth-container {
  width: 100%;
  height: 100%;
}
</style>
