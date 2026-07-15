import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { z } from 'zod';
import { addMinutes, parseISO, formatISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { bookingSchema } from '@/lib/validations';
import nodemailer from 'nodemailer';

const CALENDAR_ID = 'atomautocon@gmail.com';
const TIME_ZONE = 'America/Sao_Paulo';

// Duração de cada serviço em minutos
const SERVICE_DURATIONS = {
  'Landing Page': 60,
  'Portfólio': 60,
  'E-commerce': 120,
  'Outro': 60,
};

// Horários comerciais disponíveis (09:00 - 18:00)
const BUSINESS_HOURS = {
  start: 9,
  end: 17,
};

function getGoogleAuth() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    throw new Error('Variável GOOGLE_SERVICE_ACCOUNT_JSON não configurada no .env');
  }
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.readonly'],
  });
}

// Configuração do Nodemailer (usará GMAIL_USER e GMAIL_APP_PASSWORD do .env)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || CALENDAR_ID,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const service = searchParams.get('service') || 'Landing Page';

    if (!date) {
      return NextResponse.json({ error: 'Parâmetro date é obrigatório' }, { status: 400 });
    }

    const duration = SERVICE_DURATIONS[service] || 60;
    
    const timeMin = `${date}T0${BUSINESS_HOURS.start}:00:00-03:00`;
    const timeMax = `${date}T${BUSINESS_HOURS.end}:00:00-03:00`;

    let auth;
    try {
      auth = getGoogleAuth();
    } catch (e) {
      console.warn('Sem credenciais, retornando horários mockados');
      return NextResponse.json({ 
        availableTimes: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
      });
    }

    const calendar = google.calendar({ version: 'v3', auth });
    
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        timeZone: TIME_ZONE,
        items: [{ id: CALENDAR_ID }]
      }
    });

    const busySlots = response.data.calendars[CALENDAR_ID].busy || [];
    
    const availableTimes = [];
    let current = parseISO(timeMin);
    const endOfDay = parseISO(timeMax);

    while (current < endOfDay) {
      const slotEnd = addMinutes(current, duration);
      
      if (slotEnd > endOfDay) break;

      const isBusy = busySlots.some(busy => {
        const busyStart = parseISO(busy.start);
        const busyEnd = parseISO(busy.end);
        return current < busyEnd && slotEnd > busyStart;
      });

      if (!isBusy) {
        const hours = current.getHours().toString().padStart(2, '0');
        const mins = current.getMinutes().toString().padStart(2, '0');
        availableTimes.push(`${hours}:${mins}`);
      }

      current = addMinutes(current, 30);
    }

    return NextResponse.json({ availableTimes });

  } catch (error) {
    console.error('Erro ao buscar disponibilidade:', error);
    return NextResponse.json({ error: 'Erro ao buscar horários' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const parsedData = bookingSchema.parse(data);
    const { name, email, phone, service, date, time, notes } = parsedData;

    let auth;
    try {
      auth = getGoogleAuth();
    } catch (e) {
      console.warn('Sem credenciais, mockando sucesso da criação de evento');
      return NextResponse.json({ success: true, message: 'Agendamento (Mock) recebido' });
    }

    const calendar = google.calendar({ version: 'v3', auth });
    const duration = SERVICE_DURATIONS[service] || 60;
    const startTimeStr = `${date}T${time}:00-03:00`;
    const startDateTime = parseISO(startTimeStr);
    const endDateTime = addMinutes(startDateTime, duration);

    const event = {
      summary: `Reunião - ${name}`,
      description: `Nome: ${name}\nServiço: ${service}\nEmail: ${email}\nTelefone: ${phone || 'Não informado'}\nNotas: ${notes || 'Sem observações'}`,
      start: { dateTime: formatISO(startDateTime), timeZone: TIME_ZONE },
      end: { dateTime: formatISO(endDateTime), timeZone: TIME_ZONE },
    };

    // Cria o evento na agenda do Google (sem a propriedade attendees para não cair no filtro anti-spam de free tier)
    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
    });

    console.log('Evento criado no Google Calendar:', response.data.htmlLink);

    // Formatações bonitas para o e-mail
    const formattedDate = format(startDateTime, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    
    // Dispara o e-mail automático via Nodemailer para o cliente
    if (process.env.GMAIL_APP_PASSWORD) {
      try {
        await transporter.sendMail({
          from: `"ATOM Studio" <${process.env.GMAIL_USER || CALENDAR_ID}>`,
          to: email,
          subject: 'Confirmação de Reunião - ATOM Studio',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              <h2 style="color: #6366f1;">Olá, ${name}!</h2>
              <p>Sua reunião com a <strong>ATOM Studio</strong> foi confirmada com sucesso.</p>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0;"><strong>Serviço:</strong> ${service}</p>
                <p style="margin: 0 0 10px 0;"><strong>Data:</strong> ${formattedDate}</p>
                <p style="margin: 0 0 10px 0;"><strong>Horário:</strong> ${time} (Horário de Brasília)</p>
                <p style="margin: 0;"><strong>Local:</strong> Enviaremos o link do Google Meet em breve por e-mail ou WhatsApp.</p>
              </div>
              
              <p>Estamos ansiosos para conversar com você sobre o seu projeto!</p>
              <br>
              <p>Atenciosamente,<br>Equipe ATOM Studio</p>
            </div>
          `,
        });
        console.log('E-mail de confirmação enviado para', email);
      } catch (mailError) {
        console.error('Erro ao enviar e-mail pelo Nodemailer:', mailError);
        // Não falhamos a API inteira se apenas o e-mail der erro.
      }
    } else {
      console.warn('GMAIL_APP_PASSWORD não configurado. E-mail de confirmação não foi enviado.');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Agendamento criado com sucesso no Google Calendar',
      link: response.data.htmlLink
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.errors }, { status: 400 });
    }
    console.error('Erro na criação do evento:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
