"use client";

import styles from './PlanetsSection.module.css';
import Stepper from '../ui/Stepper';
import OrbitingPlanets from '../3d/OrbitingPlanets';

const planetsList = [
  { src: '/planets/isolated-realistic-mercury-illustration-png 1.png', alt: 'Mercury', width: '13%' },
  { src: '/planets/pngtree-beautiful-venus-planet-on-transparent-png-image_13144099 1.png', alt: 'Venus', width: '13%' },
  { src: '/planets/Earth_Western_Hemisphere_transparent_background 2.png', alt: 'Earth', width: '13.8%' },
  { src: '/planets/pngtree-mars-planet-image-on-white-background-png-image_13888526 1.png', alt: 'Mars', width: '14.5%' },
  { src: '/planets/pngtree-jupiter-planet-image-on-white-background-png-image_13888640 1.png', alt: 'Jupiter', width: '19%' },
  { src: '/planets/saturn-planet-on-isolated-transparent-background-png 1.png', alt: 'Saturn', width: '32%' },
  { src: '/planets/a-detailed-view-of-the-planet-uranus-showcasing-its-distinctive-blue-color-and-atmospheric-bands-captured-from-space-transparent-png 1.png', alt: 'Uranus', width: '22%' },
  { src: '/planets/30_neptune 1.png', alt: 'Neptune', width: '35%' },
];

export default function PlanetsSection({ id }) {
  const steps = [
    <div key="step-1">
      <h3 className={styles.cardDiagTitle}>Diagnóstico Gratuito</h3>
      <p className={styles.cardDiagText}>
        Analisamos sua presença digital atual e identificamos as maiores oportunidades de crescimento para o seu negócio.
      </p>
    </div>,
    <div key="step-2">
      <h3 className={styles.cardDiagTitle}>Análise de Performance</h3>
      <p className={styles.cardDiagText}>
        Avaliamos a velocidade, SEO e usabilidade do seu site para identificar pontos de melhoria imediata.
      </p>
    </div>,
    <div key="step-3">
      <h3 className={styles.cardDiagTitle}>Plano de Ação</h3>
      <p className={styles.cardDiagText}>
        Entregamos um plano personalizado com as ações prioritárias para transformar sua presença digital.
      </p>
    </div>,
    <div key="step-4">
      <h3 className={styles.cardDiagTitle}>Execução & Resultados</h3>
      <p className={styles.cardDiagText}>
        Implementamos as soluções e acompanhamos os resultados com métricas claras de crescimento.
      </p>
    </div>,
  ];

  return (
    <section id={id} className={styles.planetsSection}>
      <div className={styles.planetsContainer}>
        <div className={styles.starsLayer}></div>
        <div className={`${styles.starsLayer} ${styles.starsLayer2}`}></div>
        
        {/* Shooting Stars */}
        <div className={`${styles.shootingStar} ${styles.st1}`}></div>
        <div className={`${styles.shootingStar} ${styles.st2}`}></div>
        <div className={`${styles.shootingStar} ${styles.st3}`}></div>

        <div style={{ transform: 'translateX(15%)', width: '100%', height: '100%', position: 'absolute' }}>
          <OrbitingPlanets planets={planetsList} speed={0.8} orbitWidthPct={120} />
        </div>
        
        {/* Cards Overlay */}
        <div className={`${styles.glassCard} ${styles.cardVendas}`}>
          <div className={styles.cardVendasInner}>
            <h2 className={styles.cardVendasTitle}>
              <span className={styles.textPink}>Transformamos sua</span><br />
              <span className={styles.textGradient}>presença digital em uma<br />máquina de vendas.</span>
            </h2>
            <p className={styles.cardVendasText}>
              Conectamos design de alto impacto, sites de alta performance e automação inteligente para fazer o seu negócio rodar no piloto automático. Da identidade visual ao chatbot com IA: tudo o que você precisa para crescer.
            </p>
          </div>
        </div>

        <div className={`${styles.glassCard} ${styles.fluidGlass} ${styles.cardDiagnostico}`}>
          <Stepper
            totalSteps={4}
            initialStep={1}
            steps={steps}
            backButtonText="Voltar"
            nextButtonText="Próximo"
            onStepChange={(step) => console.log('Step:', step)}
            onCompleted={() => console.log('Diagnóstico completo!')}
          />
        </div>
      </div>
    </section>
  );
}
