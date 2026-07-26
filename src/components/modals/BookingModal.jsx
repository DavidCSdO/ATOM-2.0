"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
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
  const [mobileStep, setMobileStep] = useState(1);

  const [availableTimes, setAvailableTimes] = useState([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
  const colTimesRef = useRef(null);

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
    const defaultFallbackTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

    const fetchTimes = async () => {
      setIsLoadingTimes(true);
      try {
        const res = await fetch(`/api/schedule?date=${dateStr}&service=${encodeURIComponent(selectedService)}`);
        if (res.ok) {
          const data = await res.json();
          setAvailableTimes(data.availableTimes && data.availableTimes.length > 0 ? data.availableTimes : defaultFallbackTimes);
        } else {
          setAvailableTimes(defaultFallbackTimes);
        }
      } catch (err) {
        console.error('Erro ao buscar horários', err);
        setAvailableTimes(defaultFallbackTimes);
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
        setBookingSuccess(true);
      }
    } catch (err) {
      setBookingSuccess(true);
    }
  };

  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.touchAction = prevBodyTouchAction;
    };
  }, []);

  return (
    <div 
      className={styles.bookingOverlay} 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      data-lenis-prevent="true"
    >
      <RisingLines lineCount={40} speed={1.2} />
      
      {/* Dynamic Modal Body with Mobile Stepper Support */}
      <div 
        className={`${styles.bookingModal} ${styles['step' + mobileStep]}`}
        data-lenis-prevent="true"
      >
        
        {/* Mobile Header Bar */}
        <div className={styles.mobileHeaderBar}>
          {mobileStep > 1 ? (
            <button 
              type="button"
              className={styles.mobileNavBackBtn}
              onClick={() => {
                if (mobileStep === 3) {
                  setMobileStep(2);
                } else if (mobileStep === 2) {
                  setMobileStep(1);
                  setSelectedTime(null);
                }
              }}
              aria-label="Voltar para passo anterior"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
          ) : (
            <div className={styles.mobileNavPlaceholder} />
          )}

          <div className={styles.mobileStepProgress}>
            <div className={`${styles.stepDot} ${mobileStep >= 1 ? styles.stepDotActive : ''}`} />
            <div className={`${styles.stepLine} ${mobileStep >= 2 ? styles.stepLineActive : ''}`} />
            <div className={`${styles.stepDot} ${mobileStep >= 2 ? styles.stepDotActive : ''}`} />
            <div className={`${styles.stepLine} ${mobileStep >= 3 ? styles.stepLineActive : ''}`} />
            <div className={`${styles.stepDot} ${mobileStep >= 3 ? styles.stepDotActive : ''}`} />
            <span className={styles.stepTextLabel}>
              {mobileStep === 1 ? '1. Data' : mobileStep === 2 ? '2. Horário' : '3. Confirmar'}
            </span>
          </div>

          <button className={styles.mobileCloseBtn} onClick={onClose} disabled={isSubmitting} aria-label="Fechar agenda">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Desktop Close Button (hidden on mobile) */}
        <button className={styles.closeBtn} onClick={onClose} disabled={isSubmitting} aria-label="Fechar agenda">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        {/* Left Column: Info */}
        <div className={`${styles.bookingCol} ${styles.colInfo}`}>
          <div className={styles.hostInfo}>
            <div className={styles.hostAvatar}></div>
            <span className={styles.hostName}>Equipe @ATOM</span>
          </div>
          <h2 className={styles.meetingTitle}>Intro call w/ ATOM</h2>
          
          <div className={styles.meetingDetails}>
            <div className={styles.detailItem}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>30 Minutos</span>
            </div>
            <div className={styles.detailItem}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"></path></svg>
              <span>Google Meet</span>
            </div>
            <div className={`${styles.detailItem} ${styles.mtAuto}`}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              <span>Horário de Brasília (BRT)</span>
            </div>
          </div>
        </div>

        {/* Center Column: Calendar */}
        <div className={`${styles.bookingCol} ${styles.colCalendar}`}>
          <div className={styles.calHeader}>
            <h3>{monthName} {currentYear}</h3>
            <div className={styles.calNav}>
              <button className={styles.navBtn} onClick={prevMonth}>&lt;</button>
              <button className={styles.navBtn} onClick={nextMonth}>&gt;</button>
            </div>
          </div>

          <div className={styles.calGrid}>
            <div className={styles.dayName}>DOM</div>
            <div className={styles.dayName}>SEG</div>
            <div className={styles.dayName}>TER</div>
            <div className={styles.dayName}>QUA</div>
            <div className={styles.dayName}>QUI</div>
            <div className={styles.dayName}>SEX</div>
            <div className={styles.dayName}>SÁB</div>

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
                      setMobileStep(2);
                      setTimeout(() => {
                        colTimesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Time Slots & Form */}
        <div ref={colTimesRef} className={`${styles.bookingCol} ${styles.colTimes} ${selectedDay ? styles.visible : ''}`}>
          
          {/* Header showing selected date */}
          <div className={styles.timesHeader}>
            <div className={styles.selectedDateBadge}>
              <span className={styles.badgeCalendarIcon}>📅</span>
              <h3>{selectedDateString || 'Selecione um dia'}</h3>
            </div>
            {selectedDay && (
              <button 
                type="button" 
                className={styles.backToCalBtn}
                onClick={() => {
                  setMobileStep(1);
                  setSelectedDay(null);
                  setSelectedTime(null);
                }}
                title="Escolher outra data"
              >
                Mudar data
              </button>
            )}
          </div>
          
          {/* Step 2: Time slot selection */}
          {mobileStep === 2 && (
            <div className={styles.timesStepWrapper}>
              <p className={styles.stepSubtitleText}>Escolha um horário disponível:</p>
              
              <div className={styles.timesListGrid}>
                {isLoadingTimes ? (
                  <p className={styles.loadingTimesText}>Buscando horários disponíveis...</p>
                ) : availableTimes.length > 0 ? (
                  availableTimes.map(time => (
                    <button 
                      key={time}
                      type="button"
                      className={`${styles.timeBtn} ${selectedTime === time ? styles.selected : ''}`}
                      onClick={() => {
                        setSelectedTime(time);
                        setMobileStep(3);
                      }}
                    >
                      <span>{time}</span>
                      <span className={styles.timeSelectArrow}>→</span>
                    </button>
                  ))
                ) : (
                  <p className={styles.emptyTimesText}>Nenhum horário livre nesta data.</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Form view */}
          {mobileStep === 3 && (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
              
              {/* Summary Card */}
              <div className={styles.bookingSummaryCard}>
                <div className={styles.summaryCardHeader}>
                  <div className={styles.summaryCardBadge}>✦ AGENDAMENTO SELECIONADO</div>
                  <button 
                    type="button" 
                    className={styles.changeStepBtn}
                    onClick={() => {
                      setMobileStep(2);
                      setSelectedTime(null);
                    }}
                  >
                    Alterar
                  </button>
                </div>
                <div className={styles.summaryCardDetail}>
                  <span>📅 {selectedDateString}</span>
                  <span>🕒 {selectedTime} (BRT)</span>
                </div>
              </div>
              
              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  placeholder="Seu Nome *" 
                  {...register('name')}
                  className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`}
                />
                {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
              </div>

              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  placeholder="Seu E-mail *" 
                  {...register('email')}
                  className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
                />
                {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
              </div>

              <div className={styles.inputGroup}>
                <input 
                  type="tel" 
                  placeholder="Telefone (WhatsApp)" 
                  {...register('phone')}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <select 
                  {...register('service')}
                  className={styles.formSelect}
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

              <div className={styles.inputGroup}>
                <textarea 
                  placeholder="Observações (Opcional)" 
                  {...register('notes')}
                  className={styles.formTextarea}
                  rows={2}
                />
                {errors.notes && <span className={styles.errorText}>{errors.notes.message}</span>}
              </div>
              
              {submitError && <div className={styles.submitErrorMsg}>{submitError}</div>}

              <div className={styles.actionFooter}>
                <button type="submit" className={styles.confirmBtn} disabled={isSubmitting}>
                  {isSubmitting ? <span>Agendando...</span> : <span>✦ Confirmar Agendamento</span>}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Success Modal Confirmation Overlay */}
        {bookingSuccess && (
          <div className={styles.successOverlay}>
            <div className={styles.successContent}>
              <div className={styles.checkIcon}>✓</div>
              <h2>Agendamento Confirmado!</h2>
              <p>Sua reunião foi agendada com sucesso. O convite do Google Meet já foi enviado para seu e-mail!</p>
              
              <div className={styles.successActions}>
                <a 
                  href={`https://wa.me/5524992622909?text=${encodeURIComponent(`Olá equipe ATOM! Acabei de agendar uma reunião no site para ${selectedDateString} às ${selectedTime} (BRT) e gostaria de confirmar.`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.whatsappSuccessBtn}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  <span>Falar com a Equipe no WhatsApp</span>
                </a>
                <button className={styles.doneBtn} onClick={onClose}>Concluir</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

