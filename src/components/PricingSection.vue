<template>
  <section class="pricing-section">
    <!-- Smooth Transition from previous section -->
    <div class="section-fade-top"></div>

    <!-- Marquee de Texto "ATOM" -->
    <div class="marquee-container">
      <div class="marquee-content">
        <span>ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- </span>
        <span>ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- </span>
      </div>
    </div>

    <!-- Floating Letters e Planetary Effects -->
    <div class="planetary-effects">
      <div class="planet p-1"></div>
      <div class="planet p-2"></div>
      <div class="planet p-3"></div>
      <div class="nebula-glow glow-1"></div>
      <div class="nebula-glow glow-2"></div>
    </div>

    <div class="floating-letters">
      <div class="f-letter f-a">A</div>
      <div class="f-letter f-t">T</div>
      <div class="f-letter f-o">O</div>
      <div class="f-letter f-m">M</div>
    </div>

    <!-- Pricing Cards Container -->
    <div class="pricing-container">
      
      <!-- Top Left Card -->
      <div class="pricing-card card-tl">
        <div class="card-glass">
          <div class="card-header">
            <div class="glass-orb orb-cyan"></div>
            <h3 class="package-name">Landing Page</h3>
          </div>
          <div class="price-box">
            <span class="currency">R$</span>
            <span class="value">600</span>
          </div>
          <div class="divider"></div>
          <ul class="features">
            <li>Design Spacecore Premium</li>
            <li>Layout Responsivo Otimizado</li>
            <li>Animações Base</li>
            <li>SEO Foundation</li>
          </ul>
          <button class="plan-btn" @click="$emit('book')">Decolar</button>
        </div>
      </div>

      <!-- Top Right Card -->
      <div class="pricing-card card-tr">
        <div class="card-glass">
          <div class="card-header">
            <div class="glass-orb orb-orange"></div>
            <h3 class="package-name">Portfólio</h3>
          </div>
          <div class="price-box">
            <span class="currency">R$</span>
            <span class="value">500</span>
          </div>
          <div class="divider"></div>
          <ul class="features">
            <li>Apresentação Imersiva 3D</li>
            <li>Galeria Dinâmica</li>
            <li>Microinterações Premium</li>
            <li>Performance Máxima</li>
          </ul>
          <button class="plan-btn" @click="$emit('book')">Decolar</button>
        </div>
      </div>

      <!-- Bottom Center Card -->
      <div class="pricing-card card-bc">
        <div class="card-glass premium-glass">
          <div class="card-header">
            <div class="glass-orb orb-purple"></div>
            <h3 class="package-name">E-commerce</h3>
          </div>
          <div class="price-box">
            <span class="currency">R$</span>
            <span class="value">1200</span>
          </div>
          <div class="divider"></div>
          <ul class="features">
            <li>Catálogo Ilimitado Integrado</li>
            <li>Dashboard de Vendas</li>
            <li>Checkout Glassmorphism</li>
            <li>Integração com Pagamentos</li>
          </ul>
          <button class="plan-btn btn-premium" @click="$emit('book')">Iniciar Escala</button>
        </div>
      </div>

    </div>

    <!-- Smooth Transition to Footer -->
    <div class="section-fade-bottom"></div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import anime from 'animejs'

onMounted(() => {
  // Animação de flutuação independente das letras
  const letters = ['.f-a', '.f-t', '.f-o', '.f-m']
  
  letters.forEach(selector => {
    anime({
      targets: selector,
      translateX: () => anime.random(-30, 30) + 'px',
      translateY: () => anime.random(-30, 30) + 'px',
      rotate: () => anime.random(-25, 25) + 'deg',
      scale: () => anime.random(9, 11) / 10,
      duration: () => anime.random(4000, 7000),
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true
    })
  });

  // Animação dos Planetas
  anime({
    targets: '.planet',
    translateY: () => anime.random(-30, 30) + 'px',
    rotate: '1turn',
    duration: () => anime.random(15000, 25000),
    easing: 'linear',
    loop: true
  });

  anime({
    targets: '.nebula-glow',
    opacity: [0.3, 0.7],
    scale: [1, 1.2],
    duration: 4000,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
  });

  // Animação de entrada dos cards (stagger)
  anime({
    targets: '.pricing-card',
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1500,
    delay: anime.stagger(200, {start: 300}),
    easing: 'easeOutExpo'
  });
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

@font-face {
  font-family: 'Atomic Clock';
  src: url('@/assets/fonts/ATOMICCLOCKRADIO.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.pricing-section {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: url('@/assets/Fundo 2.png') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem 8rem 2rem;
  overflow: hidden;
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

.section-fade-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background: linear-gradient(0deg, #090B17 0%, rgba(9, 11, 23, 0.5) 40%, transparent 100%);
  z-index: 0;
  pointer-events: none;
}

/* Marquee / Loop ATOM Text */
.marquee-container {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  overflow: hidden;
  white-space: nowrap;
  background: transparent;
  padding: 4rem 0;
  z-index: 10;
  position: relative;
  margin-bottom: 2rem;
}

.marquee-content {
  display: inline-block;
  animation: marquee-loop 30s linear infinite;
  font-family: 'Atomic Clock', monospace;
  font-size: 2.2rem;
  color: #ff4757;
  text-shadow: 0 0 10px rgba(255, 71, 87, 0.8), 0 0 20px rgba(255, 71, 87, 0.4);
  letter-spacing: 2px;
}

@keyframes marquee-loop {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Efeitos Planetários e Nebulosas */
.planetary-effects {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.planet {
  position: absolute;
  border-radius: 50%;
  box-shadow: inset -15px -15px 30px rgba(0,0,0,0.7), 0 0 30px rgba(255,255,255,0.1);
}

.p-1 {
  width: 140px; height: 140px;
  top: 15%; left: 8%;
  background: radial-gradient(circle at 30% 30%, #b478ff, #290849);
  filter: blur(1px);
}

.p-2 {
  width: 90px; height: 90px;
  bottom: 15%; right: 10%;
  background: radial-gradient(circle at 30% 30%, #00f0ff, #003742);
}

.p-3 {
  width: 350px; height: 350px;
  top: -10%; right: -10%;
  background: radial-gradient(circle at 30% 30%, #ffa502, #5a2e00);
  opacity: 0.2;
  filter: blur(10px);
}

.nebula-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
}

.glow-1 {
  width: 400px; height: 400px;
  top: 20%; left: -10%;
  background: rgba(180, 120, 255, 0.15);
}

.glow-2 {
  width: 500px; height: 500px;
  bottom: -10%; right: 20%;
  background: rgba(0, 240, 255, 0.1);
}

/* Floating Letters ATOM */
.floating-letters {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.f-letter {
  position: absolute;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 800;
  background: linear-gradient(135deg, #00f0ff 0%, #b478ff 50%, #ff4757 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(180, 120, 255, 0.3));
}

.f-a { top: 25%; left: 45%; font-size: 5rem; transform: rotate(15deg); }
.f-t { top: 50%; left: 15%; font-size: 5.5rem; transform: rotate(-20deg); }
.f-o { bottom: 35%; right: 12%; font-size: 6rem; transform: rotate(10deg); }
.f-m { bottom: 15%; left: 32%; font-size: 4.8rem; transform: rotate(-15deg); }

/* Pricing Grid */
.pricing-container {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
}

.card-tl { grid-column: 1 / 2; grid-row: 1 / 2; }
.card-tr { grid-column: 2 / 3; grid-row: 1 / 2; }
.card-bc { grid-column: 1 / 3; grid-row: 2 / 3; justify-self: center; width: 45%; }

/* Glass Cards */
.card-glass {
  background: rgba(13, 15, 23, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 3rem 1.5rem;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.4s ease, border-color 0.4s ease, background 0.4s ease;
  height: 100%;
  width: 80%;
  margin: 0 auto;
}

.card-glass:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.02);
}

.premium-glass {
  background: rgba(20, 15, 35, 0.4);
  border-color: rgba(180, 120, 255, 0.2);
}
.premium-glass:hover {
  border-color: rgba(180, 120, 255, 0.5);
  background: rgba(30, 20, 50, 0.5);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(180, 120, 255, 0.1);
}

/* Internal Card Layout */
.card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 2rem;
}

.glass-orb {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: inset -5px -5px 10px rgba(0,0,0,0.4);
}
.orb-cyan { background: #00f0ff; filter: drop-shadow(0 0 15px rgba(0,240,255,0.4)); }
.orb-orange { background: #ffa502; filter: drop-shadow(0 0 15px rgba(255,165,2,0.4)); }
.orb-purple { background: #b478ff; filter: drop-shadow(0 0 15px rgba(180,120,255,0.4)); }

.package-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.price-box {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 6px;
  margin-bottom: 1.5rem;
}

.currency {
  font-family: 'Inter', sans-serif;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 0.6rem;
}

.value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
  letter-spacing: -2px;
  text-shadow: 0 0 20px rgba(255,255,255,0.1);
}

.divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  margin-bottom: 2rem;
}

.features {
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 3rem;
}

.features li {
  font-family: 'Inter', sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  text-align: center;
  font-weight: 500;
}

.plan-btn {
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
}

.plan-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-premium {
  background: linear-gradient(135deg, rgba(180, 120, 255, 0.2), rgba(0, 240, 255, 0.2));
  border-color: rgba(180, 120, 255, 0.4);
  color: #fff;
}

.btn-premium:hover {
  background: linear-gradient(135deg, rgba(180, 120, 255, 0.6), rgba(0, 240, 255, 0.6));
  border-color: rgba(180, 120, 255, 0.8);
  box-shadow: 0 0 20px rgba(180, 120, 255, 0.4);
}

@media (max-width: 992px) {
  .pricing-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  .card-tl, .card-tr, .card-bc {
    grid-column: 1 / -1;
    grid-row: auto;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>
