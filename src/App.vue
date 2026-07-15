<template>
  <div class="app-container">
    <Navbar @book="isBookingOpen = true" />
    <HeroSection id="home" @navigate="handleNav" />
    <PlanetsSection />
    <ProjectsSection id="projetos" />
    <BentoSection id="solucoes" @book="isBookingOpen = true" />
    <PricingSection id="planos" @book="isBookingOpen = true" />
    <FooterSection id="contato" />
    
    <!-- Agendamento Modal -->
    <BookingModal v-if="isBookingOpen" @close="isBookingOpen = false" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

import Navbar from './components/layout/Navbar.vue'
import HeroSection from './components/sections/HeroSection.vue'
import PlanetsSection from './components/sections/PlanetsSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import BentoSection from './components/sections/BentoSection.vue'
import PricingSection from './components/sections/PricingSection.vue'
import FooterSection from './components/layout/FooterSection.vue'
import BookingModal from './components/modals/BookingModal.vue'

const isBookingOpen = ref(false)

let lenis;

onMounted(() => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
    autoRaf: true,
  });
});

onUnmounted(() => {
  if (lenis) {
    lenis.destroy();
  }
});

const handleNav = (target) => {
  if (target === 'explore') {
    document.getElementById('solucoes')?.scrollIntoView({ behavior: 'smooth' })
  } else if (target === 'projects') {
    document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
</style>
