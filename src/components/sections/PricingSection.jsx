"use client";

import { useState, useEffect } from 'react';
import { animate, utils, stagger } from 'animejs';
import styles from './PricingSection.module.css';
import PlanPreviewModal from '@/components/modals/PlanPreviewModal';
import TiltCard from '@/components/ui/TiltCard';

export default function PricingSection({ id, onBook }) {
  const [selectedPlanForPreview, setSelectedPlanForPreview] = useState(null);

  useEffect(() => {
    const letters = [`.${styles.fA}`, `.${styles.fT}`, `.${styles.fO}`, `.${styles.fM}`];

    letters.forEach(selector => {
      animate(selector, {
        translateX: () => utils.random(-30, 30) + 'px',
        translateY: () => utils.random(-30, 30) + 'px',
        rotate: () => utils.random(-25, 25) + 'deg',
        scale: () => utils.random(9, 11) / 10,
        duration: () => utils.random(4000, 7000),
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
      });
    });

    animate(`.${styles.planet}`, {
      translateY: () => utils.random(-30, 30) + 'px',
      rotate: '1turn',
      duration: () => utils.random(15000, 25000),
      easing: 'linear',
      loop: true
    });

    animate(`.${styles.nebulaGlow}`, {
      opacity: [0.3, 0.7],
      scale: [1, 1.2],
      duration: 4000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    animate(`.${styles.pricingCard}`, {
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1500,
      delay: stagger(200, { start: 300 }),
      easing: 'easeOutExpo'
    });
  }, []);

  const pricingPlans = [
    {
      name: 'Landing Page',
      price: '600',
      orbClass: styles.orbCyan,
      features: ['Design Spacecore Premium', 'Layout Responsivo Otimizado', 'Animações Base', 'SEO Foundation'],
      isPremium: false,
      modelTitle: 'Landing Page ATOM — Alta Conversão',
      modelDesc: 'Página única focada em capturar e converter visitantes com alta velocidade, gráficos 3D e design futurista.',
      screens: [
        { src: '/Carrocel/ATOM.png' },
        { src: '/Carrocel/ATOM 2.png' },
        { src: '/Carrocel/ATOM 3.png' }
      ]
    },
    {
      name: 'Site Institucional',
      price: '900',
      orbClass: styles.orbOrange,
      features: ['4-8 Páginas Integradas', 'Layout Responsivo Avançado', 'Formulários de Contato', 'SEO Premium'],
      isPremium: false,
      modelTitle: 'Atlas Fin — Presença Corporativa',
      modelDesc: 'Estrutura multipáginas robusta para estabelecer autoridade no seu nicho, com navegação intuitiva e estética premium.',
      screens: [
        { src: '/Carrocel/ATLAS.png' },
        { src: '/Carrocel/ATLAS 2.png' },
        { src: '/Carrocel/ATLAS 3.png' }
      ]
    },
    {
      name: 'Portfólio',
      price: '500',
      orbClass: styles.orbPurple,
      features: ['Apresentação Imersiva 3D', 'Galeria Dinâmica', 'Microinterações Premium', 'Performance Máxima'],
      isPremium: false,
      modelTitle: 'Portfólio Pessoal Imersivo',
      modelDesc: 'Apresente seus projetos e conquistas com um visual impactante, microinterações modernas e galeria interativa.',
      screens: [
        { src: '/Carrocel/PORT.png' },
        { src: '/Carrocel/PORT 2.png' },
        { src: '/Carrocel/PORT 3.png' }
      ]
    },
    {
      name: 'E-commerce',
      price: '1200',
      orbClass: styles.orbCyan,
      features: ['Catálogo Ilimitado Integrado', 'Dashboard de Vendas', 'Checkout Glassmorphism', 'Integração com Pagamentos'],
      isPremium: true,
      modelTitle: 'Kallah Bride — Loja Virtual Otimizada',
      modelDesc: 'E-commerce de alto padrão com experiência de compra rápida, catálogo interativo e checkout fluido.',
      screens: [
        { src: '/Carrocel/Kallah.png' },
        { src: '/Carrocel/Kallah 2.png' },
        { src: '/Carrocel/Kallah 3.png' }
      ]
    },
    {
      name: 'Sistema Web',
      price: 'Sob orç.',
      orbClass: styles.orbOrange,
      features: ['Arquitetura Sob Medida', 'Banco de Dados Escalável', 'APIs Rest/GraphQL', 'Painel de Controle'],
      isPremium: true,
      modelTitle: 'Symphony — Sistema Web & Chatbot Inteligente',
      modelDesc: 'Plataforma completa sob medida com assistente conversacional integrado, orquestração de processos e automações de ponta.',
      screens: [
        { src: '/Carrocel/Symp.png' },
        { src: '/Carrocel/Symp 2.png' },
        { src: '/Carrocel/Symp 3.png' }
      ]
    },
    {
      name: 'Dashboard Admin',
      price: 'Sob orç.',
      orbClass: styles.orbPurple,
      features: ['Gestão de Dados em Tempo Real', 'Gráficos e Relatórios', 'Controle de Acessos', 'Integração de Sistemas'],
      isPremium: true,
      modelTitle: 'Painel Admin & Analytics em Tempo Real',
      modelDesc: 'Painel analítico completo para monitorar métricas do seu negócio, gerenciar usuários e visualizar dados com gráficos interativos.',
      screens: [
        { src: '/Carrocel/Symp 2.png' },
        { src: '/Carrocel/Symp.png' },
        { src: '/Carrocel/Symp 3.png' }
      ]
    },
    {
      name: 'Blog/CMS',
      price: '1000',
      orbClass: styles.orbCyan,
      features: ['Gerenciamento de Conteúdo', 'Otimização para Artigos', 'Layout de Leitura Fluida', 'Integração com Redes Sociais'],
      isPremium: false,
      modelTitle: 'Portal de Conteúdo & CMS',
      modelDesc: 'Plataforma para publicação e gestão de conteúdo SEO-friendly, com navegação limpa e foco em retenção de leitores.',
      screens: [
        { src: '/Carrocel/ATLAS 2.png' },
        { src: '/Carrocel/PORT 2.png' },
        { src: '/Carrocel/ATOM 2.png' }
      ]
    },
  ];

  return (
    <section id={id} className={styles.pricingSection}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeContent}>
          <span>ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- </span>
          <span>ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- ATOM -- </span>
        </div>
      </div>

      <div className={styles.planetaryEffects}>
        <div className={`${styles.planet} ${styles.p1}`}></div>
        <div className={`${styles.planet} ${styles.p2}`}></div>
        <div className={`${styles.planet} ${styles.p3}`}></div>
        <div className={`${styles.nebulaGlow} ${styles.glow1}`}></div>
        <div className={`${styles.nebulaGlow} ${styles.glow2}`}></div>
      </div>

      <div className={styles.floatingLetters}>
        <div className={`${styles.fLetter} ${styles.fA}`}>A</div>
        <div className={`${styles.fLetter} ${styles.fT}`}>T</div>
        <div className={`${styles.fLetter} ${styles.fO}`}>O</div>
        <div className={`${styles.fLetter} ${styles.fM}`}>M</div>
      </div>

      <div className={styles.scarcityHeader}>
        <div className={styles.scarcityBadge}>
          <span className={styles.scarcityPulse}></span>
          🚀 APENAS 5 VAGAS DE PROJETOS DISPONÍVEIS PARA ESTE MÊS
        </div>
      </div>

      <div className={styles.pricingContainer}>
        {pricingPlans.map((plan, index) => (
          <TiltCard key={index} className={styles.pricingCard}>
            <div className={`${styles.cardGlass} ${plan.isPremium ? styles.premiumGlass : ''}`}>
              <div className={styles.cardHeader}>
                <div className={`${styles.glassOrb} ${plan.orbClass}`}></div>
                <h3 className={styles.packageName}>{plan.name}</h3>
              </div>
              <div className={styles.priceBox}>
                {plan.price.includes('Sob') ? (
                  <span className={styles.value} style={{ fontSize: '1.5rem' }}>{plan.price}</span>
                ) : (
                  <>
                    <span className={styles.currency}>R$</span>
                    <span className={styles.value}>{plan.price}</span>
                  </>
                )}
              </div>
              <div className={styles.divider}></div>
              <ul className={styles.features}>
                {plan.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
              <button 
                className={`${styles.planBtn} ${plan.isPremium ? styles.btnPremium : ''}`} 
                onClick={() => setSelectedPlanForPreview(plan)}
              >
                {plan.isPremium ? 'Iniciar Projeto' : 'Decolar'}
              </button>
            </div>
          </TiltCard>
        ))}
      </div>

      <div className={styles.sectionFadeBottom}></div>

      {/* Plan Preview Modal */}
      {selectedPlanForPreview && (
        <PlanPreviewModal
          plan={selectedPlanForPreview}
          onClose={() => setSelectedPlanForPreview(null)}
          onBook={onBook}
        />
      )}
    </section>
  );
}
