const fs = require('fs');
const { google } = require('googleapis');

async function test() {
  const envText = fs.readFileSync('.env', 'utf-8');
  let jsonStr = envText.replace('GOOGLE_SERVICE_ACCOUNT_JSON=', '').trim();
  if (jsonStr.startsWith("'") && jsonStr.endsWith("'")) {
    jsonStr = jsonStr.slice(1, -1);
  }
  
  const credentials = JSON.parse(jsonStr);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.readonly'],
  });

  const calendar = google.calendar({ version: 'v3', auth });
  
  try {
    const res = await calendar.freebusy.query({
      requestBody: {
        timeMin: new Date().toISOString(),
        timeMax: new Date(Date.now() + 86400000).toISOString(),
        timeZone: 'America/Sao_Paulo',
        items: [{ id: 'atomautocon@gmail.com' }]
      }
    });
    console.log('SUCCESS:', JSON.stringify(res.data, null, 2));
    
    console.log('Attempting to create a test event...');
    const event = {
      summary: 'Reunião de Teste (ATOM)',
      start: { dateTime: new Date(Date.now() + 3600000).toISOString(), timeZone: 'America/Sao_Paulo' },
      end: { dateTime: new Date(Date.now() + 7200000).toISOString(), timeZone: 'America/Sao_Paulo' },
      attendees: [{ email: 'atomautocon@gmail.com' }]
    };

    const insertResp = await calendar.events.insert({
      calendarId: 'atomautocon@gmail.com',
      requestBody: event,
      sendUpdates: 'all'
    });

    console.log('Event Insert Success!', insertResp.data.htmlLink);
  } catch (e) {
    console.error('API ERROR:', e.message);
  }
}
test();
