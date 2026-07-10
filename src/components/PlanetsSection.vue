<template>
  <section class="planets-section">
    <div class="planets-container">
      <img :src="imgMercury" class="planet p-mercury" alt="Mercury" />
      <img :src="imgVenus" class="planet p-venus" alt="Venus" />
      <img :src="imgEarth" class="planet p-earth" alt="Earth" />
      <img :src="imgMars" class="planet p-mars" alt="Mars" />
      <img :src="imgJupiter" class="planet p-jupiter" alt="Jupiter" />
      <img :src="imgSaturn" class="planet p-saturn" alt="Saturn" />
      <img :src="imgUranus" class="planet p-uranus" alt="Uranus" />
      <img :src="imgNeptune" class="planet p-neptune" alt="Neptune" />
      
      <!-- Cards Overlay -->
      <BorderGlow
        class="card-vendas"
        :edgeSensitivity="30"
        glowColor="349 100 65"
        backgroundColor="rgba(255, 255, 255, 0.03)"
        :borderRadius="28"
        :glowRadius="40"
        :glowIntensity="1"
        :coneSpread="25"
        :animated="false"
        :colors="['#FF4D6D', '#7B3FF2', '#c084fc']"
        :fillOpacity="0"
      >
        <div class="card-vendas__inner">
          <h2 class="card-vendas__title">
            <span class="text-pink">Transformamos sua</span><br>
            <span class="text-gradient">presença digital em uma<br>máquina de vendas.</span>
          </h2>
          <p class="card-vendas__text">
            Conectamos design de alto impacto, sites de alta performance e automação inteligente para fazer o seu negócio rodar no piloto automático. Da identidade visual ao chatbot com IA: tudo o que você precisa para crescer.
          </p>
        </div>
      </BorderGlow>

      <div class="glass-card fluid-glass card-diagnostico">
        <div class="steps-nav">
          <div class="step step-active"><div class="step-inner"></div></div>
          <div class="step-line"></div>
          <div class="step">2</div>
          <div class="step-line"></div>
          <div class="step">3</div>
          <div class="step-line-short"></div>
        </div>
        
        <h3 class="card-diag__title">Diagnóstico Gratuito</h3>
        <p class="card-diag__text">
          Analisamos sua presença digital atual e identificamos as maiores oportunidades de crescimento para o seu negócio.
        </p>
        
        <div class="card-diag__footer">
          <button class="btn-proximo">Próximo</button>
        </div>
      </div>
      
      <!-- Fluid Glass SVG Lens Filter -->
      <svg style="width:0;height:0;position:absolute;" aria-hidden="true">
        <filter id="wavy-glass" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
      
      <!-- Lens Element overlapping Jupiter -->
      <div class="wavy-lens"></div>
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

import BorderGlow from './BorderGlow.vue'
</script>

<style scoped>
.planets-section {
  width: 100%;
  min-height: 120vh; /* Mais altura para dar espaço ao arco */
  background: #020205; /* Fundo que combina com o Hero */
  position: relative;
  overflow: hidden;
}

.planets-container {
  position: relative;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  height: 100%;
  min-height: 1000px;
}

.planet {
  position: absolute;
  object-fit: contain;
  /* Soft drop shadow to integrate them slightly into space */
  filter: drop-shadow(0 0 30px rgba(0, 0, 0, 0.8));
}

/* 1. Mercúrio (Topo Esquerda) */
.p-mercury {
  width: 5%;
  top: 0%;
  left: 22%;
  z-index: 1;
}

/* 2. Vênus / Júpiter 1 */
.p-venus {
  width: 8%;
  top: 5%;
  left: 18%;
  z-index: 2;
}

/* 3. Terra */
.p-earth {
  width: 12%;
  top: 13%;
  left: 20%;
  z-index: 3;
}

/* 4. Marte */
.p-mars {
  width: 16%;
  top: 24%;
  left: 26%;
  z-index: 4;
}

/* 5. Júpiter Gigante (Centro) */
.p-jupiter {
  width: 22%;
  top: 38%;
  left: 35%;
  z-index: 5;
}

/* 6. Saturno */
.p-saturn {
  /* Saturn needs more width because of rings */
  width: 40%; 
  top: 52%;
  left: 42%;
  z-index: 6;
  transform: rotate(-15deg);
}

/* 7. Urano (Ciano/Azul claro) */
.p-uranus {
  width: 28%;
  top: 70%;
  left: 62%;
  z-index: 7;
}

/* 8. Netuno (Azul escuro) */
.p-neptune {
  width: 35%;
  top: 78%;
  left: 76%;
  z-index: 8;
}

/* ===== Glass Cards ===== */
.glass-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top-color: rgba(255, 255, 255, 0.2);
  border-left-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  z-index: 20;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
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

/* Card Vendas (BorderGlow overrides) */
.card-vendas {
  position: absolute !important;
  top: 15%;
  right: 5%;
  width: 480px;
  z-index: 20;
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
  bottom: 2%;
  left: 5%;
  width: 420px;
}

.steps-nav {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.step {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.9rem;
  font-weight: 600;
}

.step-active {
  background: #3B00B1;
}

.step-inner {
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
}

.step-line {
  height: 1px;
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 10px;
}
.step-line-short {
  height: 1px;
  width: 30px;
  background: rgba(255, 255, 255, 0.1);
  margin-left: 10px;
}

.card-diag__title {
  font-family: 'Times New Roman', Times, serif; /* Using standard serif to match reference */
  font-size: 1.6rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
}

.card-diag__text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.card-diag__footer {
  display: flex;
  justify-content: flex-end;
}

.btn-proximo {
  background: #3B00B1;
  color: #fff;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-proximo:hover {
  background: #7B3FF2;
}

/* Wavy Glass Lens simulating FluidGlass */
.wavy-lens {
  position: absolute;
  bottom: 0%;
  left: 20%;
  width: 50vw;
  height: 50vh;
  border-radius: 50%;
  backdrop-filter: url(#wavy-glass);
  -webkit-backdrop-filter: url(#wavy-glass);
  background: rgba(255, 255, 255, 0.05);
  z-index: 15; /* Behind the card, over the planets */
  pointer-events: none;
  mix-blend-mode: overlay;
  opacity: 0.8;
}
</style>
