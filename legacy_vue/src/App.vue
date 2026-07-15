<template>
  <div class="app-container">
    <CustomCursor />
    <Navbar @book="isBookingOpen = true" />
    <HeroSection id="home" @navigate="handleNav" @ready="onHeroReady" />
    <PlanetsSection />
    <ProjectsSection id="projetos" />
    <BentoSection id="solucoes" @book="isBookingOpen = true" />
    <TestimonialsSection id="depoimentos" />
    <FAQSection id="faq" />
    <PricingSection id="planos" @book="isBookingOpen = true" />
    <FooterSection id="contato" />
    
    <!-- Agendamento Modal -->
    <BookingModal v-if="isBookingOpen" @close="isBookingOpen = false" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

import Navbar from './components/layout/Navbar.vue'
import HeroSection from './components/sections/HeroSection.vue'
import FooterSection from './components/layout/FooterSection.vue'
import BookingModal from './components/modals/BookingModal.vue'
import CustomCursor from './components/ui/CustomCursor.vue'

// Lazy loaded components for better performance
const PlanetsSection = defineAsyncComponent(() => import('./components/sections/PlanetsSection.vue'))
const ProjectsSection = defineAsyncComponent(() => import('./components/sections/ProjectsSection.vue'))
const BentoSection = defineAsyncComponent(() => import('./components/sections/BentoSection.vue'))
const PricingSection = defineAsyncComponent(() => import('./components/sections/PricingSection.vue'))
const TestimonialsSection = defineAsyncComponent(() => import('./components/sections/TestimonialsSection.vue'))
const FAQSection = defineAsyncComponent(() => import('./components/sections/FAQSection.vue'))

const isBookingOpen = ref(false)

let lenis;

onMounted(() => {
  // Prevent browser from restoring previous scroll position
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  // Force scroll to top immediately
  window.scrollTo(0, 0);

  // Block native scroll while loading
  document.body.style.overflow = 'hidden';

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
    autoRaf: true,
  });

  // Stop Lenis scroll initially
  lenis.stop();
});

const onHeroReady = () => {
  window.scrollTo(0, 0); // Guarantee it is at the top before unlocking
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
    lenis.start();
  }
  document.body.style.overflow = '';
};

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
