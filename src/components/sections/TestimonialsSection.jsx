"use client";

import { useState, useMemo } from 'react';
import styles from './TestimonialsSection.module.css';

const testimonials = [
  {
    niche: 'tech',
    text: "A ATOM transformou completamente nossa presença digital. O novo site não é apenas lindo, mas aumentou nossas conversões em 40% no primeiro mês.",
    name: "Mariana Costa",
    role: "CMO, TechNova",
    metric: "+40% CONVERSÃO"
  },
  {
    niche: 'tech',
    text: "Profissionalismo impecável. Eles entenderam perfeitamente a nossa visão e entregaram uma plataforma robusta e muito rápida com suporte de ponta.",
    name: "Rafael Mendes",
    role: "Fundador, StartUp BR",
    metric: "0.6s CARREGAMENTO"
  },
  {
    niche: 'tech',
    text: "O design 3D que implementaram no nosso produto deixou nossos concorrentes no chinelo. A melhor agência com quem já trabalhamos.",
    name: "Carla Silva",
    role: "Diretora de Inovação, FutureCorp",
    metric: "DESIGN 3D PREMIADO"
  },
  {
    niche: 'sales',
    text: "Excelente atendimento e foco em resultados. O chatbot inteligente do Symphony reduziu nosso tempo de suporte pela metade e triplicou vendas.",
    name: "Diego Fernandes",
    role: "CEO, VendasMais",
    metric: "CHATBOT 24/7 ATIVO"
  },
  {
    niche: 'ecommerce',
    text: "E-commerce impecável. A experiência de compra ficou ultra fluida e nossas vendas aumentaram +320% nos primeiros 60 dias.",
    name: "Juliana Paes",
    role: "Head de E-commerce, Kallah Bride",
    metric: "+320% VENDAS"
  },
  {
    niche: 'finance',
    text: "Posicionamento corporativo de alto nível. A identidade da Atlas Fin foi totalmente remodelada com autoridade impecável no setor.",
    name: "Henrique Alencar",
    role: "Sócio-Diretor, Atlas Fin",
    metric: "AUTORIDADE 10/10"
  }
];

export default function TestimonialsSection({ id }) {
  const [activeNiche, setActiveNiche] = useState('all');

  const filteredTestimonials = useMemo(() => {
    if (activeNiche === 'all') return testimonials;
    return testimonials.filter(t => t.niche === activeNiche);
  }, [activeNiche]);

  const duplicatedTestimonials = useMemo(() => {
    if (filteredTestimonials.length === 0) return [];
    return [...filteredTestimonials, ...filteredTestimonials, ...filteredTestimonials];
  }, [filteredTestimonials]);

  return (
    <section className={styles.testimonialsSection} id={id || 'depoimentos'}>
      <div className={styles.sectionFadeTop}></div>

      <div className={styles.testimonialsHeader}>
        <h2><span className={styles.textGradient}>Histórias</span> de Sucesso</h2>
        <p>O que nossos clientes dizem sobre os resultados reais que entregamos.</p>
      </div>

      {/* Niche Filter Tabs */}
      <div className={styles.nicheTabs}>
        <button 
          className={`${styles.tabBtn} ${activeNiche === 'all' ? styles.tabActive : ''}`}
          onClick={() => setActiveNiche('all')}
        >
          ✦ Todos os Cases
        </button>
        <button 
          className={`${styles.tabBtn} ${activeNiche === 'tech' ? styles.tabActive : ''}`}
          onClick={() => setActiveNiche('tech')}
        >
          ⚡ SaaS & Tech
        </button>
        <button 
          className={`${styles.tabBtn} ${activeNiche === 'sales' ? styles.tabActive : ''}`}
          onClick={() => setActiveNiche('sales')}
        >
          💬 Chatbot & Vendas
        </button>
        <button 
          className={`${styles.tabBtn} ${activeNiche === 'ecommerce' ? styles.tabActive : ''}`}
          onClick={() => setActiveNiche('ecommerce')}
        >
          🛒 E-commerce
        </button>
        <button 
          className={`${styles.tabBtn} ${activeNiche === 'finance' ? styles.tabActive : ''}`}
          onClick={() => setActiveNiche('finance')}
        >
          🏛️ Finanças & Empresas
        </button>
      </div>

      <div className={styles.marqueeContainer}>
        <div className={styles.marquee}>
          {duplicatedTestimonials.map((testimonial, index) => (
            <div className={`${styles.testimonialCard} ${styles.glassCard}`} key={index}>
              <div className={styles.cardTopRow}>
                <span className={styles.quoteIcon}>❝</span>
                {testimonial.metric && (
                  <span className={styles.metricBadge}>{testimonial.metric}</span>
                )}
              </div>
              <p className={styles.testimonialText}>{testimonial.text}</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>{testimonial.name.charAt(0)}</div>
                <div className={styles.authorInfo}>
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
