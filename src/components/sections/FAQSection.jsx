"use client";

import { useState } from 'react';
import styles from './FAQSection.module.css';

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
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.faqContainer}>
        <div className={styles.faqHeader}>
          <h2>Perguntas <span className={styles.textGradient}>Frequentes</span></h2>
          <p>Tire suas dúvidas e entenda como nossa metodologia funciona na prática.</p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((item, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${openIndex === index ? styles.isOpen : ''}`}
              onClick={() => toggle(index)}
            >
              <div className={styles.faqQuestion}>
                <h3>{item.question}</h3>
                <div className={styles.toggleIcon}>
                  <span className={`${styles.vertical} ${openIndex === index ? styles.rotate : ''}`}></span>
                  <span className={styles.horizontal}></span>
                </div>
              </div>
              <div className={`${styles.faqAnswer} ${openIndex === index ? '' : styles.closed}`}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
