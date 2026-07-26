"use client";

import { useState } from 'react';
import styles from './ProjectArchitectSection.module.css';

const step1Options = [
  { id: 'landing', label: 'Landing Page de Alta Conversão', icon: '🚀', badge: 'VELOCIDADE', desc: 'Página única ultrarrápida focada em capturar leads e gerar vendas imediatas.' },
  { id: 'system', label: 'Ecossistema Web & IA 24/7', icon: '⚡', badge: 'AUTOMAÇÃO', desc: 'Plataforma web completa integrada com agentes inteligentes de suporte.' },
  { id: 'ecommerce', label: 'E-commerce Space Premium', icon: '🛒', badge: 'VENDAS', desc: 'Loja virtual de alta performance com catálogo 3D e checkout fluido.' },
  { id: 'corporate', label: 'Plataforma Institucional', icon: '🌐', badge: 'AUTORIDADE', desc: 'Estrutura multipáginas de alta autoridade para marcas de prestígio.' }
];

const step2Options = [
  { id: 'sales', label: 'Multiplicar Vendas & Leads', icon: '🎯', desc: 'Aumentar a taxa de conversão direta de visitantes em clientes ativos.' },
  { id: 'automation', label: 'Atendimento Automatizado 24/7', icon: '⚡', desc: 'Reduzir custos operacionais atendendo clientes automaticamente.' },
  { id: 'branding', label: 'Posicionamento de Mercado Premium', icon: '💎', desc: 'Destacar sua empresa da concorrência com design de nível mundial.' },
  { id: 'launch', label: 'Lançar Novo Produto no Mercado', icon: '🔥', desc: 'Criar impacto máximo no lançamento do seu novo produto ou serviço.' }
];

const step3Options = [
  { id: 'urgent', label: 'Sprint Express (7 a 14 dias)', icon: '⏱️', desc: 'Lançamento prioritário acelerado' },
  { id: 'standard', label: 'Próximas 3 semanas', icon: '📅', desc: 'Desenvolvimento padrão otimizado' },
  { id: 'planned', label: 'Planejamento / A combinar', icon: '🤝', desc: 'Estruturação estratégica sob demanda' }
];

export default function ProjectArchitectSection({ id, onBook }) {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedType, setSelectedType] = useState('system');
  const [selectedGoal, setSelectedGoal] = useState('sales');
  const [selectedTime, setSelectedTime] = useState('urgent');

  const selectedTypeObj = step1Options.find(o => o.id === selectedType) || step1Options[0];
  const selectedGoalObj = step2Options.find(o => o.id === selectedGoal) || step2Options[0];
  const selectedTimeObj = step3Options.find(o => o.id === selectedTime) || step3Options[0];

  const progressPercent = activeStep === 1 ? 33 : activeStep === 2 ? 66 : 100;

  const handleFinish = () => {
    if (onBook) onBook();
  };

  return (
    <section className={styles.section} id={id || 'arquiteto-projeto'}>
      {/* Ambient Space Core Glows */}
      <div className={styles.bgGlows} aria-hidden="true">
        <div className={styles.glowCyan}></div>
        <div className={styles.glowPurple}></div>
        <div className={styles.starsGrid}></div>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgePulse}></span>
            ✦ ARQUITETO DE PROJETOS ATOM
          </div>
          <h2 className={styles.title}>
            Monte o Escopo do Seu Projeto <span className={styles.titleHighlight}>em 3 Passos</span>
          </h2>
          <p className={styles.subtitle}>
            Selecione as diretrizes do seu negócio para gerar um briefing espacial sob medida em segundos.
          </p>

          {/* Mission Progress Indicator Bar */}
          <div className={styles.progressTrackOuter}>
            <div className={styles.progressTrackFill} style={{ width: `${progressPercent}%` }}></div>
            <span className={styles.progressLabel}>FASE 0{activeStep} / 03 — {progressPercent}% CONCLUÍDO</span>
          </div>
        </div>

        {/* Wizard Steps Nav */}
        <div className={styles.stepsNav}>
          <button 
            className={`${styles.stepNavBtn} ${activeStep === 1 ? styles.stepActive : ''} ${activeStep > 1 ? styles.stepCompleted : ''}`}
            onClick={() => setActiveStep(1)}
          >
            <span className={styles.stepNum}>1</span> 1. Solução Espacial
          </button>
          <span className={styles.stepArrow}>→</span>
          <button 
            className={`${styles.stepNavBtn} ${activeStep === 2 ? styles.stepActive : ''} ${activeStep > 2 ? styles.stepCompleted : ''}`}
            onClick={() => setActiveStep(2)}
          >
            <span className={styles.stepNum}>2</span> 2. Objetivo da Missão
          </button>
          <span className={styles.stepArrow}>→</span>
          <button 
            className={`${styles.stepNavBtn} ${activeStep === 3 ? styles.stepActive : ''}`}
            onClick={() => setActiveStep(3)}
          >
            <span className={styles.stepNum}>3</span> 3. Prazo & Briefing
          </button>
        </div>

        {/* Wizard Content Body */}
        <div className={styles.wizardBody}>
          {activeStep === 1 && (
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Qual arquitetura melhor atende à sua empresa?</h3>
              <div className={styles.gridOptions}>
                {step1Options.map(option => (
                  <button
                    key={option.id}
                    className={`${styles.optionCard} ${selectedType === option.id ? styles.optionActive : ''}`}
                    onClick={() => { setSelectedType(option.id); setActiveStep(2); }}
                  >
                    <div className={styles.cardHeaderRow}>
                      <span className={styles.optIcon}>{option.icon}</span>
                      <span className={styles.optTag}>{option.badge}</span>
                    </div>
                    <h4 className={styles.optLabel}>{option.label}</h4>
                    <p className={styles.optDesc}>{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Qual o objetivo prioritário do seu investimento?</h3>
              <div className={styles.gridOptions}>
                {step2Options.map(option => (
                  <button
                    key={option.id}
                    className={`${styles.optionCard} ${selectedGoal === option.id ? styles.optionActive : ''}`}
                    onClick={() => { setSelectedGoal(option.id); setActiveStep(3); }}
                  >
                    <div className={styles.cardHeaderRow}>
                      <span className={styles.optIcon}>{option.icon}</span>
                    </div>
                    <h4 className={styles.optLabel}>{option.label}</h4>
                    <p className={styles.optDesc}>{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Selecione a sua estimativa de prazo para lançamento:</h3>
              <div className={styles.timeGrid}>
                {step3Options.map(option => (
                  <button
                    key={option.id}
                    className={`${styles.timeCard} ${selectedTime === option.id ? styles.optionActive : ''}`}
                    onClick={() => setSelectedTime(option.id)}
                  >
                    <span className={styles.optIcon}>{option.icon}</span>
                    <div className={styles.timeCardText}>
                      <h5 className={styles.timeTitle}>{option.label}</h5>
                      <span className={styles.timeSub}>{option.desc}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Spacecore Summary Briefing Pass */}
              <div className={styles.summaryBox}>
                <div className={styles.summaryHeader}>
                  <span className={styles.summaryBadge}>🚀 PASSE DE BRIEFING ESPACIAL ATOM</span>
                  <h4 className={styles.summaryTitle}>Resumo da Sua Estrutura</h4>
                </div>

                <div className={styles.summaryItems}>
                  <div className={styles.sumItem}>
                    <span className={styles.sumLabel}>Solução Selecionada</span>
                    <span className={styles.sumVal}>{selectedTypeObj.icon} {selectedTypeObj.label}</span>
                  </div>
                  <div className={styles.sumItem}>
                    <span className={styles.sumLabel}>Meta da Missão</span>
                    <span className={styles.sumVal}>{selectedGoalObj.icon} {selectedGoalObj.label}</span>
                  </div>
                  <div className={styles.sumItem}>
                    <span className={styles.sumLabel}>Estimativa de Entrega</span>
                    <span className={styles.sumVal}>{selectedTimeObj.icon} {selectedTimeObj.label}</span>
                  </div>
                </div>

                <button className={styles.finishBtn} onClick={handleFinish}>
                  Agendar Reunião Com Este Briefing <span className={styles.arrow}>→</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
