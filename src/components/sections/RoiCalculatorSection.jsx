"use client";

import { useState } from 'react';
import styles from './RoiCalculatorSection.module.css';

export default function RoiCalculatorSection({ id, onBook }) {
  const [visitors, setVisitors] = useState(3000);
  const [goal, setGoal] = useState('conversion'); // 'conversion' | 'chatbot' | 'ecommerce'

  // Calculate estimated metrics based on visitors and goal
  const calculateMetrics = () => {
    let baseMultiplier = 1;
    let planRecommendation = 'Landing Page ATOM';

    if (goal === 'chatbot') {
      baseMultiplier = 1.4;
      planRecommendation = 'Symphony (Sistema & Chatbot 24/7)';
    } else if (goal === 'ecommerce') {
      baseMultiplier = 1.8;
      planRecommendation = 'E-commerce Premium';
    }

    const currentLeads = Math.round(visitors * 0.015);
    const atomLeads = Math.round(visitors * (0.042 * baseMultiplier));
    const leadLift = atomLeads - currentLeads;
    const estRevenue = leadLift * 180; // Estimated value per lead conversion

    return {
      leadLift,
      estRevenue: estRevenue.toLocaleString('pt-BR'),
      planRecommendation
    };
  };

  const metrics = calculateMetrics();

  return (
    <section className={styles.section} id={id || 'calculadora-roi'}>
      {/* Background Decor */}
      <div className={styles.bgGlows} aria-hidden="true">
        <div className={styles.glowPurple}></div>
        <div className={styles.glowCyan}></div>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>🧮 CALCULADORA DE ROI</div>
          <h2 className={styles.title}>
            Simule o Potencial de <span className={styles.titleHighlight}>Retorno do Seu Projeto</span>
          </h2>
          <p className={styles.subtitle}>
            Ajuste os parâmetros do seu negócio para visualizar o aumento estimado em conversões 
            e a solução ideal para o seu crescimento.
          </p>
        </div>

        {/* Calculator Card */}
        <div className={styles.calculatorCard}>
          <div className={styles.controlsGrid}>
            {/* Input 1: Traffic Slider */}
            <div className={styles.controlGroup}>
              <div className={styles.labelRow}>
                <label className={styles.label}>Tráfego Estimado de Visitantes</label>
                <span className={styles.valueDisplay}>{visitors.toLocaleString('pt-BR')} / mês</span>
              </div>
              <input
                type="range"
                min="500"
                max="30000"
                step="500"
                value={visitors}
                onChange={(e) => setVisitors(Number(e.target.value))}
                className={styles.rangeInput}
              />
              <div className={styles.rangeLabels}>
                <span>500</span>
                <span>15.000</span>
                <span>30.000+</span>
              </div>
            </div>

            {/* Input 2: Goal Selector */}
            <div className={styles.controlGroup}>
              <label className={styles.label}>Objetivo Principal do Seu Projeto</label>
              <div className={styles.goalButtons}>
                <button
                  className={`${styles.goalBtn} ${goal === 'conversion' ? styles.goalActive : ''}`}
                  onClick={() => setGoal('conversion')}
                >
                  🎯 Aumentar Conversão
                </button>
                <button
                  className={`${styles.goalBtn} ${goal === 'chatbot' ? styles.goalActive : ''}`}
                  onClick={() => setGoal('chatbot')}
                >
                  💬 Chatbot 24/7 & Automação
                </button>
                <button
                  className={`${styles.goalBtn} ${goal === 'ecommerce' ? styles.goalActive : ''}`}
                  onClick={() => setGoal('ecommerce')}
                >
                  🛒 Loja Virtual & Vendas
                </button>
              </div>
            </div>
          </div>

          {/* Results Box */}
          <div className={styles.resultsBox}>
            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Aumento Estimado de Leads</span>
              <span className={styles.resultValue}>+{metrics.leadLift} <small>/ mês</small></span>
            </div>

            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Faturamento Estimado Adicional</span>
              <span className={styles.resultValueHighlight}>+R$ {metrics.estRevenue} <small>/ mês</small></span>
            </div>

            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Plano Recomendado</span>
              <span className={styles.recommendedPlan}>{metrics.planRecommendation}</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className={styles.ctaRow}>
            <button className={styles.ctaBtn} onClick={onBook}>
              Decolar Com Esta Projeção <span className={styles.arrow}>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
