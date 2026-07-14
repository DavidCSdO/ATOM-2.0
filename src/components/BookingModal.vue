<template>
  <div class="booking-overlay" @click.self="$emit('close')">
    
    <div class="booking-modal">
      <button class="close-btn" @click="$emit('close')">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <!-- Coluna 1: Info -->
      <div class="booking-col col-info">
        <div class="host-info">
          <div class="host-avatar"></div>
          <span class="host-name">Cardoso @ATOM</span>
        </div>
        <h2 class="meeting-title">Intro call w/ ATOM</h2>
        
        <div class="meeting-details">
          <div class="detail-item">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>30m</span>
          </div>
          <div class="detail-item">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"></path></svg>
            <span>Google Meet</span>
          </div>
          <div class="detail-item mt-auto">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            <span>America/Sao Paulo (BRT)</span>
          </div>
        </div>
      </div>

      <!-- Coluna 2: Calendário -->
      <div class="booking-col col-calendar">
        <div class="cal-header">
          <h3>Julho 2026</h3>
          <div class="cal-nav">
            <button class="nav-btn">&lt;</button>
            <button class="nav-btn">&gt;</button>
          </div>
        </div>

        <div class="cal-grid">
          <div class="day-name">DOM.</div>
          <div class="day-name">SEG.</div>
          <div class="day-name">TER.</div>
          <div class="day-name">QUA.</div>
          <div class="day-name">QUI.</div>
          <div class="day-name">SEX.</div>
          <div class="day-name">SÁB.</div>

          <!-- Empty Days (Offset) -->
          <div class="day empty"></div>
          <div class="day empty"></div>
          <div class="day empty"></div>
          
          <!-- Days -->
          <div 
            class="day" 
            v-for="day in 31" 
            :key="day"
            :class="{ active: selectedDay === day }"
            @click="selectDay(day)"
          >
            {{ day }}
          </div>
        </div>
      </div>

      <!-- Coluna 3: Horários -->
      <div class="booking-col col-times" :class="{ 'visible': selectedDay }">
        <div class="times-header">
          <h3>{{ selectedDateString }}</h3>
          <div class="format-toggle">
            <span class="active">24h</span>
          </div>
        </div>
        
        <div class="times-list">
          <button 
            v-for="time in availableTimes" 
            :key="time"
            class="time-btn" 
            :class="{ 'selected': selectedTime === time }"
            @click="selectTime(time)"
          >
            {{ time }}
          </button>
        </div>

        <div class="action-footer" v-if="selectedTime">
          <button class="confirm-btn" :disabled="isLoading" @click="handleBooking">
            <span v-if="isLoading">Aguarde...</span>
            <span v-else>Agendar via Google</span>
          </button>
        </div>
      </div>

      <!-- Overlay de Sucesso -->
      <div class="success-overlay" v-if="bookingSuccess">
        <div class="success-content">
          <div class="check-icon">✓</div>
          <h2>Agendamento Confirmado!</h2>
          <p>Sua reunião foi marcada na sua agenda do Google e nós já fomos notificados. O link do Google Meet está no convite!</p>
          <button class="done-btn" @click="$emit('close')">Concluir</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted, onUnmounted, computed } from 'vue'

const emit = defineEmits(['close'])

// ==========================================
// CONFIGURAÇÕES GOOGLE CALENDAR
// ==========================================
// IMPORTANTE: Insira aqui o Client ID gerado no Google Cloud Console
const GOOGLE_CLIENT_ID = '1039216991577-bgkbrrh1oe5m2oq0du8um4ka9b3u1uar.apps.googleusercontent.com'
const HOST_EMAIL = 'cardosodavid92@gmail.com'

const isLoading = ref(false)
const bookingSuccess = ref(false)

const selectedDay = ref(null)
const selectedTime = ref(null)

const selectedDateString = computed(() => {
  if (!selectedDay.value) return ''
  const daysOfWeek = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.']
  // 1 de Julho de 2026 é Quarta-feira (índice 3: Dom=0, Seg=1, Ter=2, Qua=3)
  const dayIndex = (3 + selectedDay.value - 1) % 7
  return `${daysOfWeek[dayIndex]} ${selectedDay.value}`
})

// Gerar datas (mock simples)
const availableTimes = ['09:00', '09:30', '10:00', '11:00', '13:30', '14:00', '15:00', '16:30']

function selectDay(day) {
  selectedDay.value = day
  selectedTime.value = null
}

function selectTime(time) {
  selectedTime.value = time
}

function handleBooking() {
  if (GOOGLE_CLIENT_ID.includes('YOUR_GOOGLE_CLIENT_ID')) {
    alert('Erro: O GOOGLE_CLIENT_ID não foi configurado no BookingModal.vue!')
    return
  }

  isLoading.value = true

  // Iniciar fluxo OAuth2 via Google Identity Services
  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/calendar.events',
    callback: async (tokenResponse) => {
      if (tokenResponse.error !== undefined) {
        isLoading.value = false
        alert('Erro ao autenticar no Google: ' + tokenResponse.error)
        return
      }
      
      await createEvent(tokenResponse.access_token)
    },
  })

  // Requisitar popup do Google
  tokenClient.requestAccessToken({ prompt: 'consent' })
}

async function createEvent(accessToken) {
  // Construindo ISO string da data simulada (2026-07-XX T HH:MM)
  const dayStr = selectedDay.value.toString().padStart(2, '0')
  const [hour, minute] = selectedTime.value.split(':')
  
  const startDate = new Date(`2026-07-${dayStr}T${hour}:${minute}:00-03:00`)
  const endDate = new Date(startDate.getTime() + 30 * 60000) // +30 min

  const event = {
    summary: 'Intro call w/ ATOM',
    description: 'Reunião de alinhamento estratégico agendada via site ATOM.',
    start: {
      dateTime: startDate.toISOString(),
      timeZone: 'America/Sao_Paulo'
    },
    end: {
      dateTime: endDate.toISOString(),
      timeZone: 'America/Sao_Paulo'
    },
    attendees: [
      { email: HOST_EMAIL }
    ],
    conferenceData: {
      createRequest: {
        requestId: `atom-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' }
      }
    }
  }

  try {
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })

    if (response.ok) {
      bookingSuccess.value = true
    } else {
      const errorData = await response.json()
      alert('Falha ao criar evento: ' + errorData.error.message)
    }
  } catch (err) {
    alert('Erro de conexão ao criar o evento.')
  } finally {
    isLoading.value = false
  }
}

// Bloquear scroll do body quando modal está aberto
onMounted(() => {
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

.booking-overlay {
  position: fixed;
  inset: 0;
  background: rgba(9, 11, 23, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.booking-modal {
  display: flex;
  background: rgba(18, 20, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(0, 240, 255, 0.1);
  overflow: hidden;
  position: relative;
  width: 90%;
  max-width: 1050px;
  min-height: 550px;
  transform: translateY(20px);
  animation: slideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes slideUp {
  to { transform: translateY(0); }
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;
}
.close-btn:hover {
  background: rgba(255, 71, 87, 0.2);
  border-color: rgba(255, 71, 87, 0.5);
  color: #ff4757;
  transform: rotate(90deg);
}

.booking-col {
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
}

/* --- COLUNA 1: INFO --- */
.col-info {
  flex: 0 0 300px;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(0, 0, 0, 0.2);
}
.host-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.host-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00f0ff, #b478ff);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
}
.host-name {
  font-family: 'Inter', sans-serif;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 500;
}
.meeting-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 2rem;
  line-height: 1.2;
}
.meeting-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
}
.detail-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Inter', sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  font-weight: 500;
}
.detail-item svg {
  color: rgba(255, 255, 255, 0.4);
}
.mt-auto {
  margin-top: auto;
}

/* --- COLUNA 2: CALENDAR --- */
.col-calendar {
  flex: 1;
  padding: 40px;
}
.cal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.cal-header h3 {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: #fff;
  margin: 0;
}
.cal-nav {
  display: flex;
  gap: 8px;
}
.nav-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}
.day-name {
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 8px;
}
.day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.day:not(.empty):not(.active):hover {
  background: rgba(0, 240, 255, 0.1);
  border-color: rgba(0, 240, 255, 0.3);
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
  transform: translateY(-2px);
}
.day.empty {
  background: transparent;
  border-color: transparent;
  cursor: default;
}
.day.active {
  background: #00f0ff;
  color: #000;
  font-weight: 700;
  border-color: #00f0ff;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
}

/* --- COLUNA 3: TIMES --- */
.col-times {
  flex: 0 0 260px;
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s;
}
.col-times.visible {
  opacity: 1;
  visibility: visible;
}
.times-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.times-header h3 {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  color: #fff;
  margin: 0;
}
.format-toggle {
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 8px;
  border-radius: 12px;
}
.format-toggle span {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #fff;
  opacity: 0.8;
}
.times-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  max-height: 400px;
  padding-right: 8px;
}
/* Scrollbar custom */
.times-list::-webkit-scrollbar { width: 4px; }
.times-list::-webkit-scrollbar-track { background: transparent; }
.times-list::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }

.time-btn {
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.time-btn:hover {
  background: rgba(0, 240, 255, 0.1);
  border-color: #00f0ff;
  color: #fff;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
}

.time-btn.selected {
  background: rgba(0, 240, 255, 0.2);
  border-color: #00f0ff;
  color: #fff;
  box-shadow: inset 0 0 10px rgba(0, 240, 255, 0.2);
}

.action-footer {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.confirm-btn {
  width: 100%;
  padding: 14px;
  background: #fff;
  color: #000;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm-btn:hover:not(:disabled) {
  background: #00f0ff;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
}
.confirm-btn:disabled {
  background: rgba(255, 255, 255, 0.2);
  cursor: not-allowed;
}

/* Overlay de Sucesso */
.success-overlay {
  position: absolute;
  inset: 0;
  background: rgba(18, 20, 30, 0.95);
  backdrop-filter: blur(10px);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: fadeIn 0.3s ease;
}
.success-content {
  max-width: 400px;
  padding: 2rem;
}
.check-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(0, 240, 255, 0.1);
  border: 2px solid #00f0ff;
  color: #00f0ff;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.2);
}
.success-content h2 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2rem;
  color: #fff;
  margin-bottom: 1rem;
}
.success-content p {
  font-family: 'Inter', sans-serif;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 2rem;
}
.done-btn {
  padding: 12px 30px;
  background: #00f0ff;
  color: #000;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.done-btn:hover {
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.6);
  transform: translateY(-2px);
}

@media (max-width: 992px) {
  .booking-modal {
    flex-direction: column;
    overflow-y: auto;
    max-height: 90vh;
  }
  .booking-col {
    flex: auto;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  .col-info {
    padding-bottom: 24px;
  }
  .meeting-details {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
