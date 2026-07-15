<template>
  <div class="stepper-outer">
    <div class="stepper-container">
      <!-- Step Indicators -->
      <div class="stepper-indicator-row">
        <template v-for="(_, index) in totalSteps" :key="index">
          <div
            class="step-ind"
            :style="disableStepIndicators ? { pointerEvents: 'none', opacity: 0.5 } : {}"
            @click="handleStepClick(index + 1)"
          >
            <div
              class="step-ind-inner"
              :class="{
                'step-ind--active': currentStep === index + 1,
                'step-ind--complete': currentStep > index + 1,
                'step-ind--inactive': currentStep < index + 1
              }"
            >
              <svg v-if="currentStep > index + 1" class="step-check-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <div v-else-if="currentStep === index + 1" class="step-active-dot" />
              <span v-else class="step-num">{{ index + 1 }}</span>
            </div>
          </div>
          <div
            v-if="index < totalSteps - 1"
            class="step-conn"
          >
            <div
              class="step-conn-fill"
              :class="{ 'step-conn-fill--complete': currentStep > index + 1 }"
            />
          </div>
        </template>
      </div>

      <!-- Step Content -->
      <div class="stepper-content">
        <transition
          :name="direction >= 0 ? 'slide-left' : 'slide-right'"
          mode="out-in"
        >
          <div :key="currentStep" class="stepper-slide">
            <slot :name="'step-' + currentStep">
              <!-- Fallback for completed state -->
              <div v-if="currentStep > totalSteps" class="stepper-completed">
                <svg class="stepper-completed-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="stepper-completed-text">Concluído!</p>
              </div>
            </slot>
          </div>
        </transition>
      </div>

      <!-- Footer -->
      <div class="stepper-footer">
        <div :class="['stepper-nav', currentStep > 1 && currentStep <= totalSteps ? 'spread' : 'end']">
          <button
            v-if="currentStep > 1 && currentStep <= totalSteps"
            class="stepper-back-btn"
            @click="handleBack"
          >
            {{ backButtonText }}
          </button>
          <button
            v-if="currentStep <= totalSteps"
            class="stepper-next-btn"
            @click="isLastStep ? handleComplete() : handleNext()"
          >
            {{ isLastStep ? 'Concluir' : nextButtonText }}
          </button>
          <button
            v-if="currentStep > totalSteps"
            class="stepper-next-btn"
            @click="resetStepper"
          >
            Recomeçar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  totalSteps: {
    type: Number,
    default: 4
  },
  initialStep: {
    type: Number,
    default: 1
  },
  backButtonText: {
    type: String,
    default: 'Voltar'
  },
  nextButtonText: {
    type: String,
    default: 'Próximo'
  },
  disableStepIndicators: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['step-change', 'completed'])

const currentStep = ref(props.initialStep)
const direction = ref(0)

const isLastStep = computed(() => currentStep.value === props.totalSteps)

function updateStep(newStep) {
  currentStep.value = newStep
  if (newStep > props.totalSteps) {
    emit('completed')
  } else {
    emit('step-change', newStep)
  }
}

function handleBack() {
  if (currentStep.value > 1) {
    direction.value = -1
    updateStep(currentStep.value - 1)
  }
}

function handleNext() {
  if (!isLastStep.value) {
    direction.value = 1
    updateStep(currentStep.value + 1)
  }
}

function handleComplete() {
  direction.value = 1
  updateStep(props.totalSteps + 1)
}

function handleStepClick(step) {
  if (step !== currentStep.value && !props.disableStepIndicators && step <= props.totalSteps) {
    direction.value = step > currentStep.value ? 1 : -1
    updateStep(step)
  }
}

function resetStepper() {
  direction.value = -1
  currentStep.value = 1
}
</script>

<style>
/* Using non-scoped styles so they apply correctly */
.stepper-outer {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stepper-container {
  width: 100%;
  border-radius: 1.25rem;
}

.stepper-indicator-row {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 1.25rem 1.25rem 0.5rem;
}

.stepper-content {
  position: relative;
  overflow: hidden;
  min-height: 80px;
}

.stepper-slide {
  padding: 0.75rem 1.25rem;
}

.stepper-footer {
  padding: 0.25rem 1.25rem 1.25rem;
}

.stepper-nav {
  display: flex;
}

.stepper-nav.spread {
  justify-content: space-between;
}

.stepper-nav.end {
  justify-content: flex-end;
}

.stepper-back-btn {
  transition: all 300ms;
  border-radius: 0.5rem;
  padding: 0.35rem 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 0.8rem;
  font-family: inherit;
}

.stepper-back-btn:hover {
  color: rgba(255, 255, 255, 0.7);
}

.stepper-next-btn {
  transition: all 300ms;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #581c87; /* A bit more purple/dark like the reference */
  color: #fff;
  font-weight: 500;
  padding: 0.5rem 1.25rem;
  cursor: pointer;
  border: none;
  font-size: 0.9rem;
  font-family: inherit;
}

.stepper-next-btn:hover {
  background-color: #6b21a8;
}

/* Step Indicator */
.step-ind {
  position: relative;
  cursor: pointer;
  outline: none;
  flex-shrink: 0;
}

.step-ind-inner {
  display: flex;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.3);
  transition: background-color 0.3s ease;
}

.step-ind--inactive {
  background-color: #1a1a24; /* Dark gray/purple tint */
  color: #6b7280;
}

.step-ind--active {
  background-color: #3b14a7;
}

.step-ind--complete {
  background-color: #3b14a7;
}

.step-active-dot {
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 9999px;
  background-color: #9ca3af;
}

.step-num {
  font-size: 0.8rem;
  color: inherit;
}

.step-check-icon {
  height: 1rem;
  width: 1rem;
  color: #a78bfa;
}

/* Step Connector */
.step-conn {
  position: relative;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  height: 2px;
  flex: 1;
  overflow: hidden;
  border-radius: 0.25rem;
  background-color: #1a1a24;
}

.step-conn-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0%;
  background-color: transparent;
  transition: width 0.4s ease, background-color 0.4s ease;
}

.step-conn-fill--complete {
  width: 100%;
  background-color: #3b14a7;
}

/* Completed state */
.stepper-completed {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
}

.stepper-completed-icon {
  height: 2.5rem;
  width: 2.5rem;
  color: #5227FF;
}

.stepper-completed-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 500;
}

/* Slide Transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
