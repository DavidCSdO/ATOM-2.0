<template>
  <nav class="navbar" :class="{ 'navbar--visible': isVisible }">
    <div class="navbar__main-pill">
      <a href="#contato" class="navbar__link">Contato</a>
      <a href="#home" class="navbar__logo">ATOM</a>
      <a href="#projetos" class="navbar__link">Projetos</a>
    </div>
    
    <div class="navbar__sub-pill">
      <a href="#" @click.prevent="$emit('book')" class="navbar__action">
        Agende uma reunião 
        <svg class="navbar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </a>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineEmits(['book'])

const isVisible = ref(false)

const handleScroll = () => {
  // Show navbar when scrolling past 80% of the Hero page (approaching the planets)
  if (window.scrollY > window.innerHeight * 0.8) {
    isVisible.value = true
  } else {
    isVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translate(-50%, -20px);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.navbar--visible {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
}

.navbar__main-pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding: 0.8rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.navbar__sub-pill {
  padding: 0.5rem 1.2rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.navbar__link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s;
}

.navbar__link:hover {
  color: #fff;
}

.navbar__logo {
  font-family: 'Astro Space', sans-serif;
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
}

.navbar__action {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s;
}

.navbar__action:hover {
  color: #fff;
}

.navbar__icon {
  width: 14px;
  height: 14px;
}

@media (max-width: 768px) {
  .navbar__main-pill {
    gap: 1.5rem;
    padding: 0.6rem 1.5rem;
  }
  
  .navbar__link {
    display: none;
  }
  
  .navbar__sub-pill {
    padding: 0.5rem 1rem;
  }
  
  .navbar__action {
    font-size: 0.8rem;
  }
}
</style>
