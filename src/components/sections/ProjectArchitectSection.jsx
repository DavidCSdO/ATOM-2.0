"use client";

import { useState } from 'react';
import styles from './ProjectArchitectSection.module.css';

const step1Options = [
  { id: 'landing', label: 'Landing Page', icon: '🚀', desc: 'Página única focada em alta conversão de visitantes' },
  { id: 'system', label: 'Sistema & Chatbot 24/7', icon: '💬', desc: 'Plataforma web com assistente conversacional inteligente' },
  { id: 'ecommerce', label: 'E-commerce', icon: '🛒', desc: 'Loja virtual com catálogo e checkout otimizado' },
  { id: 'corporate', label: 'Site Institucional', icon: '🌐', desc: 'Estrutura multipáginas de alta autoridade' }
];

const step2Options = [
  { id: 'sales', label: 'Multiplicar Vendas & Leads', icon: '🎯' },
  { id: 'automation', label: 'Atendimento Automatizado 24/7', icon: '⚡' },
  { id: 'branding', label: 'Posicionamento Premium', icon: '💎' },
  { id: 'launch', label: 'Lançar Novo Produto Rápido', icon: '🔥' }
];

const step3Options = [
  { id: 'urgent', label: 'Urgente (7 a 14 dias)', icon: '⏱️' },
  { id: 'standard', label: 'Próximas 3 semanas', icon: '📅' },
  { id: 'planned', label: 'A combinar / Planejamento', icon: '🤝' }
];

export default function ProjectArchitectSection({ id, onBook }) {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedType, setSelectedType] = useState('system');
  const [selectedGoal, setSelectedGoal] = useState('sales');
  const [selectedTime, setSelectedTime] = useState('urgent');

  const selectedTypeObj = step1Options.find(o => o.id === selectedType) || step1Options[0];
  const selectedGoalObj = step2Options.find(o => o.id === selectedGoal) || step2Options[0];
  const selectedTimeObj = step3Options.find(o => o.id === selectedTime) || step3Options[0];

  const handleFinish = () => {
    if (onBook) onBook();
  };

  return (
    <section className={styles.section} id={id || 'arquiteto-projeto'}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>✦ ARQUITETO DE PROJETOS</div>
          <h2 className={styles.title}>
            Monte o Escopo do Seu Projeto <span className={styles.titleHighlight}>em 3 Passos</span>
          </h2>
          <p className={styles.subtitle}>
            Selecione as necessidades do seu negócio para gerar um briefing prévio instantâneo.
          </p>
        </div>

        {/* Wizard Steps Nav */}
        <div className={styles.stepsNav}>
          <button 
            className={`${styles.stepNavBtn} ${activeStep === 1 ? styles.stepActive : ''} ${activeStep > 1 ? styles.stepCompleted : ''}`}
            onClick={() => setActiveStep(1)}
          >
            <span className={styles.stepNum}>1</span> 1. Tipo de Solução
          </button>
          <span className={styles.stepArrow}>→</span>
          <button 
            className={`${styles.stepNavBtn} ${activeStep === 2 ? styles.stepActive : ''} ${activeStep > 2 ? styles.stepCompleted : ''}`}
            onClick={() => setActiveStep(2)}
          >
            <span className={styles.stepNum}>2</span> 2. Objetivo Principal
          </button>
          <span className={styles.stepArrow}>→</span>
          <button 
            className={`${styles.stepNavBtn} ${activeStep === 3 ? styles.stepActive : ''}`}
            onClick={() => setActiveStep(3)}
          >
            <span className={styles.stepNum}>3</span> 3. Prazo & Resumo
          </button>
        </div>

        {/* Wizard Content Body */}
        <div className={styles.wizardBody}>
          {activeStep === 1 && (
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Qual tipo de projeto melhor atende à sua empresa?</h3>
              <div className={styles.gridOptions}>
                {step1Options.map(option => (
                  <button
                    key={option.id}
                    className={`${styles.optionCard} ${selectedType === option.id ? styles.optionActive : ''}`}
                    onClick={() => { setSelectedType(option.id); setActiveStep(2); }}
                  >
                    <span className={styles.optIcon}>{option.icon}</span>
                    <h4 className={styles.optLabel}>{option.label}</h4>
                    <p className={styles.optDesc}>{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Qual o resultado mais importante que você deseja atingir?</h3>
              <div className={styles.gridOptions}>
                {step2Options.map(option => (
                  <button
                    key={option.id}
                    className={`${styles.optionCard} ${selectedGoal === option.id ? styles.optionActive : ''}`}
                    onClick={() => { setSelectedGoal(option.id); setActiveStep(3); }}
                  >
                    <span className={styles.optIcon}>{option.icon}</span>
                    <h4 className={styles.optLabel}>{option.label}</h4>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Selecione a sua estimativa de prazo desejado:</h3>
              <div className={styles.timeGrid}>
                {step3Options.map(option => (
                  <button
                    key={option.id}
                    className={`${styles.timeCard} ${selectedTime === option.id ? styles.optionActive : ''}`}
                    onClick={() => setSelectedTime(option.id)}
                  >
                    <span className={styles.optIcon}>{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>

              {/* Summary Card */}
              <div className={styles.summaryBox}>
                <h4 className={styles.summaryTitle}>📋 Resumo do Seu Briefing:</h4>
                <div className={styles.summaryItems}>
                  <div className={styles.sumItem}>
                    <span className={styles.sumLabel}>Solução:</span>
                    <span className={styles.sumVal}>{selectedTypeObj.icon} {selectedTypeObj.label}</span>
                  </div>
                  <div className={styles.sumItem}>
                    <span className={styles.sumLabel}>Objetivo:</span>
                    <span className={styles.sumVal}>{selectedGoalObj.icon} {selectedGoalObj.label}</span>
                  </div>
                  <div className={styles.sumItem}>
                    <span className={styles.sumLabel}>Prazo:</span>
                    <span className={styles.sumVal}>{selectedTimeObj.icon} {selectedTimeObj.label}</span>
                  </div>
                </div>

                <button className={styles.finishBtn} onClick={handleFinish}>
                  Agendar Decolagem Com Este Briefing <span className={styles.arrow}>→</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
