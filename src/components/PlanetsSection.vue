<template>
  <section class="planets-section">
    <div class="planets-container">
      <div class="stars-layer"></div>
      <div class="stars-layer stars-layer--2"></div>
      
      <!-- Shooting Stars -->
      <div class="shooting-star st-1"></div>
      <div class="shooting-star st-2"></div>
      <div class="shooting-star st-3"></div>

      <OrbitingPlanets :planets="planetsList" :speed="0.8" :orbitWidthPct="120" style="transform: translateX(15%);" />
      
      <!-- Cards Overlay -->
      <div class="glass-card card-vendas">
        <div class="card-vendas__inner">
          <h2 class="card-vendas__title">
            <span class="text-pink">Transformamos sua</span><br>
            <span class="text-gradient">presença digital em uma<br>máquina de vendas.</span>
          </h2>
          <p class="card-vendas__text">
            Conectamos design de alto impacto, sites de alta performance e automação inteligente para fazer o seu negócio rodar no piloto automático. Da identidade visual ao chatbot com IA: tudo o que você precisa para crescer.
          </p>
        </div>
      </div>

      <div class="glass-card fluid-glass card-diagnostico">
        <Stepper
          :totalSteps="4"
          :initialStep="1"
          backButtonText="Voltar"
          nextButtonText="Próximo"
          @step-change="(step) => console.log('Step:', step)"
          @completed="() => console.log('Diagnóstico completo!')"
        >
          <template #step-1>
            <h3 class="card-diag__title">Diagnóstico Gratuito</h3>
            <p class="card-diag__text">
              Analisamos sua presença digital atual e identificamos as maiores oportunidades de crescimento para o seu negócio.
            </p>
          </template>
          <template #step-2>
            <h3 class="card-diag__title">Análise de Performance</h3>
            <p class="card-diag__text">
              Avaliamos a velocidade, SEO e usabilidade do seu site para identificar pontos de melhoria imediata.
            </p>
          </template>
          <template #step-3>
            <h3 class="card-diag__title">Plano de Ação</h3>
            <p class="card-diag__text">
              Entregamos um plano personalizado com as ações prioritárias para transformar sua presença digital.
            </p>
          </template>
          <template #step-4>
            <h3 class="card-diag__title">Execução & Resultados</h3>
            <p class="card-diag__text">
              Implementamos as soluções e acompanhamos os resultados com métricas claras de crescimento.
            </p>
          </template>
        </Stepper>
      </div>
    </div>
  </section>
</template>

<script setup>
import imgMercury from '@/assets/planets/isolated-realistic-mercury-illustration-png 1.png'
import imgVenus from '@/assets/planets/pngtree-beautiful-venus-planet-on-transparent-png-image_13144099 1.png'
import imgEarth from '@/assets/planets/Earth_Western_Hemisphere_transparent_background 2.png'
import imgMars from '@/assets/planets/pngtree-mars-planet-image-on-white-background-png-image_13888526 1.png'
import imgJupiter from '@/assets/planets/pngtree-jupiter-planet-image-on-white-background-png-image_13888640 1.png'
import imgSaturn from '@/assets/planets/saturn-planet-on-isolated-transparent-background-png 1.png'
import imgUranus from '@/assets/planets/a-detailed-view-of-the-planet-uranus-showcasing-its-distinctive-blue-color-and-atmospheric-bands-captured-from-space-transparent-png 1.png'
import imgNeptune from '@/assets/planets/30_neptune 1.png'

import Stepper from './Stepper.vue'
import OrbitingPlanets from './OrbitingPlanets.vue'

const planetsList = [
  { src: imgMercury, alt: 'Mercury', width: '13%' },
  { src: imgVenus, alt: 'Venus', width: '13%' },
  { src: imgEarth, alt: 'Earth', width: '13.8%' },
  { src: imgMars, alt: 'Mars', width: '14.5%' },
  { src: imgJupiter, alt: 'Jupiter', width: '19%' },
  { src: imgSaturn, alt: 'Saturn', width: '32%' },
  { src: imgUranus, alt: 'Uranus', width: '22%' },
  { src: imgNeptune, alt: 'Neptune', width: '35%' },
]
</script>

<style scoped>
.planets-section {
  width: 100%;
  min-height: 120vh;
  background: #090B17;
  position: relative;
  overflow: hidden;
  z-index: 10;
}

.planets-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
  height: 120vh;
  min-height: 800px;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%);
  mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%);
}

/* ===== CORRENTE DE PLANETAS - Diagonal canto-a-canto ===== */



/* ===== Glass Cards ===== */
.glass-card {
  position: absolute;
  background: rgba(15, 10, 25, 0.65);
  backdrop-filter: blur(24px) saturate(1.2);
  -webkit-backdrop-filter: blur(24px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top-color: rgba(255, 255, 255, 0.15);
  border-left-color: rgba(255, 255, 255, 0.12);
  border-radius: 26px;
  padding: 2.5rem;
  z-index: 20;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

/* Fluid Glass Effect (CSS Version) */
.fluid-glass {
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 20px rgba(255, 255, 255, 0.1),
    0 15px 35px rgba(0, 0, 0, 0.3);
}
.fluid-glass::before {
  content: '';
  position: absolute;
  inset: -50%;
  background: radial-gradient(circle at 50% 50%, rgba(123, 63, 242, 0.15), transparent 60%),
              radial-gradient(circle at 80% 20%, rgba(255, 77, 109, 0.1), transparent 50%);
  animation: fluidRotate 15s linear infinite;
  z-index: -1;
  pointer-events: none;
}
@keyframes fluidRotate {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

/* Card Vendas */
.card-vendas {
  position: absolute;
  top: 15%;
  right: 6%;
  width: 500px;
  z-index: 20;
  border-radius: 26px;
}
.card-vendas__inner {
  padding: 2.5rem;
}

.card-vendas__title {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 1.2rem;
}

.text-pink {
  color: #FF4D6D;
}

.text-gradient {
  background: linear-gradient(90deg, #FF4D6D, #7B3FF2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-vendas__text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.05rem;
  line-height: 1.6;
}

/* Card Diagnostico */
.card-diagnostico {
  bottom: -50%;
  left: 8%;
  width: 500px;
}

.card-diag__title {
  font-family: 'Times New Roman', Times, serif;
  font-size: 1.4rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.8rem;
}

.card-diag__text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

/* ─── Stars & Spacecore Effects ─── */
.stars-layer {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(1px 1px at 15% 30%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1.5px 1.5px at 70% 60%, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 45% 85%, rgba(255,255,255,0.5), transparent),
    radial-gradient(2px 2px at 85% 20%, rgba(255,255,255,0.2), transparent);
  background-size: 200px 200px;
  opacity: 0.5;
  animation: floatStars 20s linear infinite;
  z-index: 1;
  pointer-events: none;
}

.stars-layer--2 {
  background-size: 150px 150px;
  background-image: 
    radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1px 1px at 80% 30%, rgba(255,255,255,0.6), transparent);
  animation: floatStars 15s linear infinite;
  opacity: 0.3;
}

@keyframes floatStars {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100px); }
}

.shooting-star {
  position: absolute;
  width: 2px;
  height: 80px;
  background: linear-gradient(to bottom, rgba(255,255,255,1), transparent);
  border-radius: 50%;
  opacity: 0;
  transform: rotate(45deg);
  z-index: 2;
  pointer-events: none;
}

.st-1 {
  top: -10%; left: 30%;
  animation: shootingStar 6s linear infinite;
  animation-delay: 2s;
}
.st-2 {
  top: -10%; left: 70%;
  animation: shootingStar 9s linear infinite;
  animation-delay: 5s;
}
.st-3 {
  top: -10%; left: 10%;
  animation: shootingStar 12s linear infinite;
  animation-delay: 8s;
}

@keyframes shootingStar {
  0% { transform: rotate(45deg) translateY(-100px); opacity: 1; }
  20% { transform: rotate(45deg) translateY(500px); opacity: 0; }
  100% { transform: rotate(45deg) translateY(500px); opacity: 0; }
}
</style>
