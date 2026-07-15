<template>
  <section class="testimonials-section">
    <!-- Smooth Transition from previous section -->
    <div class="section-fade-top"></div>

    <div class="testimonials-header">
      <h2><span class="text-gradient">Histórias</span> de Sucesso</h2>
      <p>O que nossos clientes dizem sobre os resultados que entregamos.</p>
    </div>

    <div class="marquee-container">
      <div class="marquee">
        <!-- Double the items for infinite scroll -->
        <div class="testimonial-card glass-card" v-for="(testimonial, index) in duplicatedTestimonials" :key="index">
          <div class="quote-icon">❝</div>
          <p class="testimonial-text">{{ testimonial.text }}</p>
          <div class="testimonial-author">
            <div class="author-avatar">{{ testimonial.name.charAt(0) }}</div>
            <div class="author-info">
              <h4>{{ testimonial.name }}</h4>
              <span>{{ testimonial.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const testimonials = [
  {
    text: "A ATOM transformou completamente nossa presença digital. O novo site não é apenas lindo, mas aumentou nossas conversões em 40% no primeiro mês.",
    name: "Mariana Costa",
    role: "CMO, TechNova"
  },
  {
    text: "Profissionalismo impecável. Eles entenderam perfeitamente a nossa visão e entregaram uma plataforma robusta e muito rápida.",
    name: "Rafael Mendes",
    role: "Fundador, StartUp BR"
  },
  {
    text: "O design 3D que implementaram no nosso produto deixou nossos concorrentes no chinelo. A melhor agência com quem já trabalhamos.",
    name: "Carla Silva",
    role: "Diretora de Inovação, FutureCorp"
  },
  {
    text: "Excelente atendimento e foco em resultados. O chatbot inteligente reduziu nosso tempo de suporte pela metade.",
    name: "Diego Fernandes",
    role: "CEO, VendasMais"
  }
]

const duplicatedTestimonials = computed(() => [...testimonials, ...testimonials])
</script>

<style scoped>
.testimonials-section {
  padding: 8rem 0;
  background: url('@/assets/Fundo 2.png') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  color: white;
}

.section-fade-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background: linear-gradient(180deg, #090B17 0%, rgba(9, 11, 23, 0.5) 40%, transparent 100%);
  z-index: 0;
  pointer-events: none;
}

.testimonials-header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 0 1rem;
}

.testimonials-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.text-gradient {
  background: linear-gradient(90deg, #FF4D6D, #7B3FF2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.testimonials-header p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
  max-width: 500px;
  margin: 0 auto;
}

.marquee-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  /* Fading edges */
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.marquee {
  display: flex;
  gap: 2rem;
  width: max-content;
  animation: scroll 40s linear infinite;
  padding: 1rem 0;
}

.marquee:hover {
  animation-play-state: paused;
}

.testimonial-card {
  width: 350px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Reusing glass card style from other sections */
.glass-card {
  background: rgba(15, 10, 25, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top-color: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 2rem;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
  border-color: rgba(123, 63, 242, 0.4);
}

.quote-icon {
  font-size: 3rem;
  color: #7B3FF2;
  line-height: 1;
  opacity: 0.5;
  font-family: serif;
}

.testimonial-text {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  flex-grow: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.author-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF4D6D, #7B3FF2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.author-info h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.author-info span {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - 1rem));
  }
}

@media (max-width: 768px) {
  .testimonials-header h2 {
    font-size: 2rem;
  }
  .testimonial-card {
    width: 300px;
    padding: 1.5rem;
  }
}
</style>
