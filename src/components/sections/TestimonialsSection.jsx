"use client";

import { useMemo } from 'react';
import styles from './TestimonialsSection.module.css';

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
];

export default function TestimonialsSection() {
  const duplicatedTestimonials = useMemo(() => [...testimonials, ...testimonials], []);

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.sectionFadeTop}></div>

      <div className={styles.testimonialsHeader}>
        <h2><span className={styles.textGradient}>Histórias</span> de Sucesso</h2>
        <p>O que nossos clientes dizem sobre os resultados que entregamos.</p>
      </div>

      <div className={styles.marqueeContainer}>
        <div className={styles.marquee}>
          {duplicatedTestimonials.map((testimonial, index) => (
            <div className={`${styles.testimonialCard} ${styles.glassCard}`} key={index}>
              <div className={styles.quoteIcon}>❝</div>
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
