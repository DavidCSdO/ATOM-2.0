"use client";

import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema } from '@/lib/validations';
import RisingLines from '../ui/RisingLines';
import styles from './BookingModal.module.css';

const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export default function BookingModal({ onClose }) {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const [currentDate] = useState(new Date());
  const [currentMonthIndex, setCurrentMonthIndex] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [availableTimes, setAvailableTimes] = useState([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(bookingSchema.omit({ date: true, time: true })),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: 'Landing Page',
      notes: ''
    }
  });

  const selectedService = watch('service');

  const monthName = monthNames[currentMonthIndex];
  const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  const firstDayOffset = new Date(currentYear, currentMonthIndex, 1).getDay();

  const prevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonthIndex(m => m - 1);
    }
    setSelectedDay(null);
    setSelectedTime(null);
    setAvailableTimes([]);
  };

  const nextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonthIndex(m => m + 1);
    }
    setSelectedDay(null);
    setSelectedTime(null);
    setAvailableTimes([]);
  };

  const selectedDateString = useMemo(() => {
    if (!selectedDay) return '';
    const daysOfWeek = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'];
    const date = new Date(currentYear, currentMonthIndex, selectedDay);
    return `${daysOfWeek[date.getDay()]} ${selectedDay} de ${monthName}`;
  }, [selectedDay, currentYear, currentMonthIndex, monthName]);

  // Fetch available times when day or service changes
  useEffect(() => {
    if (!selectedDay) return;
    
    const dayStr = selectedDay.toString().padStart(2, '0');
    const monthStr = (currentMonthIndex + 1).toString().padStart(2, '0');
    const dateStr = `${currentYear}-${monthStr}-${dayStr}`;

    const fetchTimes = async () => {
      setIsLoadingTimes(true);
      try {
        const res = await fetch(`/api/schedule?date=${dateStr}&service=${encodeURIComponent(selectedService)}`);
        if (res.ok) {
          const data = await res.json();
          setAvailableTimes(data.availableTimes || []);
        } else {
          setAvailableTimes([]);
        }
      } catch (err) {
        console.error('Erro ao buscar horários', err);
        setAvailableTimes([]);
      } finally {
        setIsLoadingTimes(false);
      }
    };
    fetchTimes();
  }, [selectedDay, currentMonthIndex, currentYear, selectedService]);

  const onSubmit = async (data) => {
    setSubmitError('');
    if (!selectedDay || !selectedTime) {
      setSubmitError('Por favor, selecione uma data e um horário.');
      return;
    }
    
    const dayStr = selectedDay.toString().padStart(2, '0');
    const monthStr = (currentMonthIndex + 1).toString().padStart(2, '0');
    const dateStr = `${currentYear}-${monthStr}-${dayStr}`;

    const payload = {
      ...data,
      date: dateStr,
      time: selectedTime
    };

    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setBookingSuccess(true);
      } else {
        const errData = await res.json();
        setSubmitError(errData.error || 'Erro desconhecido ao agendar.');
      }
    } catch (err) {
      setSubmitError('Erro de conexão ao agendar.');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className={styles.bookingOverlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <RisingLines lineCount={40} speed={1.2} />
      
      <div className={styles.bookingModal}>
        <button className={styles.closeBtn} onClick={onClose} disabled={isSubmitting}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className={`${styles.bookingCol} ${styles.colInfo}`}>
          <div className={styles.hostInfo}>
            <div className={styles.hostAvatar}></div>
            <span className={styles.hostName}>Equipe @ATOM</span>
          </div>
          <h2 className={styles.meetingTitle}>Intro call w/ ATOM</h2>
          
          <div className={styles.meetingDetails}>
            <div className={styles.detailItem}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>Depende do Serviço</span>
            </div>
            <div className={styles.detailItem}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"></path></svg>
              <span>Google Meet</span>
            </div>
            <div className={`${styles.detailItem} ${styles.mtAuto}`}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              <span>America/Sao Paulo (BRT)</span>
            </div>
          </div>
        </div>

        <div className={`${styles.bookingCol} ${styles.colCalendar}`}>
          <div className={styles.calHeader}>
            <h3>{monthName} {currentYear}</h3>
            <div className={styles.calNav}>
              <button className={styles.navBtn} onClick={prevMonth}>&lt;</button>
              <button className={styles.navBtn} onClick={nextMonth}>&gt;</button>
            </div>
          </div>

          <div className={styles.calGrid}>
            <div className={styles.dayName}>DOM.</div>
            <div className={styles.dayName}>SEG.</div>
            <div className={styles.dayName}>TER.</div>
            <div className={styles.dayName}>QUA.</div>
            <div className={styles.dayName}>QUI.</div>
            <div className={styles.dayName}>SEX.</div>
            <div className={styles.dayName}>SÁB.</div>

            {Array.from({ length: firstDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} className={`${styles.day} ${styles.empty}`}></div>
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isPast = (currentYear < currentDate.getFullYear()) ||
                             (currentYear === currentDate.getFullYear() && currentMonthIndex < currentDate.getMonth()) ||
                             (currentYear === currentDate.getFullYear() && currentMonthIndex === currentDate.getMonth() && day < currentDate.getDate());
              
              return (
                <div 
                  key={day}
                  className={`${styles.day} ${selectedDay === day ? styles.active : ''} ${isPast ? styles.disabledDay : ''}`}
                  onClick={() => { 
                    if (!isPast) {
                      setSelectedDay(day); 
                      setSelectedTime(null); 
                    }
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${styles.bookingCol} ${styles.colTimes} ${selectedDay ? styles.visible : ''}`}>
          <div className={styles.timesHeader}>
            <h3>{selectedDateString}</h3>
            <div className={styles.formatToggle}>
              <span className={styles.active}>24h</span>
            </div>
          </div>
          
          {!selectedTime ? (
            <div className={styles.timesList}>
              {isLoadingTimes ? (
                <p style={{ color: '#fff', fontSize: '0.9rem', textAlign: 'center', marginTop: '20px' }}>Buscando horários...</p>
              ) : availableTimes.length > 0 ? (
                availableTimes.map(time => (
                  <button 
                    key={time}
                    className={`${styles.timeBtn} ${selectedTime === time ? styles.selected : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', textAlign: 'center', marginTop: '20px' }}>Nenhum horário disponível.</p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
              <button type="button" className={styles.timeBtn} style={{ marginBottom: '10px' }} onClick={() => setSelectedTime(null)}>
                ← Voltar ({selectedTime})
              </button>
              
              <div>
                <input 
                  type="text" 
                  placeholder="Seu Nome *" 
                  {...register('name')}
                  style={{...inputStyle, borderColor: errors.name ? '#ff4757' : 'rgba(255, 255, 255, 0.1)'}}
                />
                {errors.name && <span style={errorStyle}>{errors.name.message}</span>}
              </div>

              <div>
                <input 
                  type="email" 
                  placeholder="Seu E-mail *" 
                  {...register('email')}
                  style={{...inputStyle, borderColor: errors.email ? '#ff4757' : 'rgba(255, 255, 255, 0.1)'}}
                />
                {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
              </div>

              <div>
                <input 
                  type="tel" 
                  placeholder="Telefone (Opcional)" 
                  {...register('phone')}
                  style={inputStyle}
                />
              </div>

              <div>
                <select 
                  {...register('service')}
                  style={inputStyle}
                >
                  <option value="Landing Page">Landing Page</option>
                  <option value="Site Institucional">Site Institucional (4-8 páginas)</option>
                  <option value="Portfólio Profissional">Portfólio Profissional</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Sistema Web sob medida">Sistema Web sob medida</option>
                  <option value="Dashboard Administrativo">Dashboard Administrativo</option>
                  <option value="Blog/CMS">Blog/CMS</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div>
                <textarea 
                  placeholder="Observações (Opcional)" 
                  {...register('notes')}
                  style={{...inputStyle, minHeight: '60px', resize: 'vertical'}}
                />
                {errors.notes && <span style={errorStyle}>{errors.notes.message}</span>}
              </div>
              
              {submitError && <div style={{ color: '#ff4757', fontSize: '0.8rem', textAlign: 'center' }}>{submitError}</div>}

              <div className={styles.actionFooter}>
                <button type="submit" className={styles.confirmBtn} disabled={isSubmitting}>
                  {isSubmitting ? <span>Agendando...</span> : <span>Confirmar</span>}
                </button>
              </div>
            </form>
          )}
        </div>

        {bookingSuccess && (
          <div className={styles.successOverlay}>
            <div className={styles.successContent}>
              <div className={styles.checkIcon}>✓</div>
              <h2>Agendamento Confirmado!</h2>
              <p>Sua reunião foi marcada na sua agenda do Google e nós já fomos notificados. O link do Google Meet está no convite!</p>
              <button className={styles.doneBtn} onClick={onClose}>Concluir</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  color: '#fff',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.9rem',
  outline: 'none'
};

const errorStyle = {
  color: '#ff4757',
  fontSize: '0.75rem',
  marginTop: '4px',
  display: 'block'
};
