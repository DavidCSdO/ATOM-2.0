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
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import PlanetsSection from './components/PlanetsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import BentoSection from './components/BentoSection.vue'
import PricingSection from './components/PricingSection.vue'
import FooterSection from './components/FooterSection.vue'
import BookingModal from './components/BookingModal.vue'

const isBookingOpen = ref(false)

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
