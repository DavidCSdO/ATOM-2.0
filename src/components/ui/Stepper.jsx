"use client";

import { useState } from 'react';
import styles from './Stepper.module.css';

export default function Stepper({
  steps = [],
  initialStep = 1,
  backButtonText = 'Voltar',
  nextButtonText = 'Próximo',
  disableStepIndicators = false,
  onStepChange,
  onCompleted,
}) {
  const totalSteps = steps.length;
  const [currentStep, setCurrentStep] = useState(initialStep);

  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      if (onCompleted) onCompleted();
    } else {
      if (onStepChange) onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    updateStep(totalSteps + 1);
  };

  const handleStepClick = (step) => {
    if (step !== currentStep && !disableStepIndicators && step <= totalSteps) {
      updateStep(step);
    }
  };

  const resetStepper = () => {
    setCurrentStep(1);
  };

  return (
    <div className={styles.stepperOuter}>
      <div className={styles.stepperContainer}>
        {/* Step Indicators */}
        <div className={styles.stepperIndicatorRow}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
              <div
                className={styles.stepInd}
                style={disableStepIndicators ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                onClick={() => handleStepClick(index + 1)}
              >
                <div
                  className={`${styles.stepIndInner} ${
                    currentStep === index + 1
                      ? styles.stepIndActive
                      : currentStep > index + 1
                      ? styles.stepIndComplete
                      : styles.stepIndInactive
                  }`}
                >
                  {currentStep > index + 1 ? (
                    <svg className={styles.stepCheckIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : currentStep === index + 1 ? (
                    <div className={styles.stepActiveDot} />
                  ) : (
                    <span className={styles.stepNum}>{index + 1}</span>
                  )}
                </div>
              </div>

              {index < totalSteps - 1 && (
                <div className={styles.stepConn}>
                  <div
                    className={`${styles.stepConnFill} ${currentStep > index + 1 ? styles.stepConnFillComplete : ''}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className={styles.stepperContent}>
          <div className={styles.stepperSlide}>
            {currentStep > totalSteps ? (
              <div className={styles.stepperCompleted}>
                <svg className={styles.stepperCompletedIcon} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className={styles.stepperCompletedText}>Concluído!</p>
              </div>
            ) : (
              steps[currentStep - 1]
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.stepperFooter}>
          <div className={`${styles.stepperNav} ${currentStep > 1 && currentStep <= totalSteps ? styles.spread : styles.end}`}>
            {currentStep > 1 && currentStep <= totalSteps && (
              <button className={styles.stepperBackBtn} onClick={handleBack}>
                {backButtonText}
              </button>
            )}
            
            {currentStep <= totalSteps && (
              <button className={styles.stepperNextBtn} onClick={isLastStep ? handleComplete : handleNext}>
                {isLastStep ? 'Concluir' : nextButtonText}
              </button>
            )}

            {currentStep > totalSteps && (
              <button className={styles.stepperNextBtn} onClick={resetStepper}>
                Recomeçar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
