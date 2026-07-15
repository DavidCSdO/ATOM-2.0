const fs = require('fs');
let text = fs.readFileSync('.env', 'utf-8');
text = text.trim();
if (text.startsWith("GOOGLE_SERVICE_ACCOUNT_JSON='") && !text.endsWith("'")) {
  text += "'";
  fs.writeFileSync('.env', text);
  console.log('.env fixed');
} else if (text.startsWith("GOOGLE_SERVICE_ACCOUNT_JSON='") && text.endsWith("'")) {
  console.log('.env was already fine');
} else {
  console.log('could not fix automatically');
}
