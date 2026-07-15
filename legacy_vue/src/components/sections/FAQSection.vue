<template>
  <section class="faq-section" id="faq">
    <div class="faq-container">
      <div class="faq-header">
        <h2>Perguntas <span class="text-gradient">Frequentes</span></h2>
        <p>Tire suas dúvidas e entenda como nossa metodologia funciona na prática.</p>
      </div>

      <div class="faq-list">
        <div 
          v-for="(item, index) in faqs" 
          :key="index" 
          class="faq-item" 
          :class="{ 'is-open': openIndex === index }"
          @click="toggle(index)"
        >
          <div class="faq-question">
            <h3>{{ item.question }}</h3>
            <div class="toggle-icon">
              <span class="vertical" :class="{ 'rotate': openIndex === index }"></span>
              <span class="horizontal"></span>
            </div>
          </div>
          <transition name="accordion">
            <div class="faq-answer" v-if="openIndex === index">
              <p>{{ item.answer }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(0) // First item open by default

const faqs = [
  {
    question: "Quanto tempo leva para o meu projeto ficar pronto?",
    answer: "O prazo varia conforme a complexidade, mas em média entregamos Landing Pages em 1 semana, e plataformas mais complexas (como e-commerces e web apps) em 4 semanas. Sempre estipulamos prazos claros no contrato."
  },
  {
    question: "Como funciona a manutenção do site pós-lançamento?",
    answer: "Oferecemos suporte completo após o lançamento. Nossos planos incluem atualizações de segurança, backups e otimizações contínuas para garantir que sua plataforma continue rápida e moderna."
  },
  {
    question: "O site já vem otimizado para o Google (SEO)?",
    answer: "Sim! Todas as nossas soluções são desenvolvidas com as melhores práticas de SEO, código semântico, meta tags e alta performance (tempo de carregamento) para garantir que você tenha vantagens no rankeamento orgânico."
  },
  {
    question: "Vocês usam templates ou o design é exclusivo?",
    answer: "Trabalhamos 100% com design exclusivo. Criamos um Design System focado na sua marca e no seu público-alvo para garantir que a sua presença digital seja única e altamente conversiva."
  },
  {
    question: "Quais as formas de pagamento?",
    answer: "Aceitamos Pix, transferência bancária e parcelamento no cartão de crédito. Estruturamos os pagamentos atrelados às entregas do projeto para maior segurança."
  }
]

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.faq-section {
  padding: 8rem 2rem;
  background: url('@/assets/Fundo 2.png') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  color: white;
  display: flex;
  justify-content: center;
}

.faq-container {
  width: 100%;
  max-width: 800px;
  position: relative;
  z-index: 10;
}

.faq-header {
  text-align: center;
  margin-bottom: 4rem;
}

.faq-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.text-gradient {
  background: linear-gradient(90deg, #FF4D6D, #7B3FF2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.faq-header p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background: rgba(15, 10, 25, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s ease, background 0.3s ease;
}

.faq-item:hover, .faq-item.is-open {
  background: rgba(25, 28, 42, 0.7);
  border-color: rgba(123, 63, 242, 0.4);
}

.faq-question {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question h3 {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0;
  padding-right: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.toggle-icon {
  position: relative;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.toggle-icon span {
  position: absolute;
  background: #00f0ff;
  transition: transform 0.3s ease;
}

.toggle-icon .horizontal {
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  transform: translateY(-50%);
}

.toggle-icon .vertical {
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  transform: translateX(-50%);
}

.toggle-icon .vertical.rotate {
  transform: translateX(-50%) rotate(90deg);
}

.faq-answer {
  padding: 0 2rem 1.5rem 2rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.faq-answer p {
  margin: 0;
}

/* Accordion Transition */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease-out;
  max-height: 200px;
  opacity: 1;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
}

@media (max-width: 768px) {
  .faq-header h2 {
    font-size: 2rem;
  }
  .faq-question {
    padding: 1.2rem;
  }
  .faq-answer {
    padding: 0 1.2rem 1.2rem 1.2rem;
  }
}
</style>
