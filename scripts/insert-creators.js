const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

const sql = neon(process.env.DATABASE_URL);

async function insertCreators() {
  const sqlContent = fs.readFileSync(path.resolve(__dirname, '../sql/004_insert_creators_real_data.sql'), 'utf-8');
  
  try {
    console.log('Füge Creator-Daten ein...');
    await sql(sqlContent);
    console.log('✅ Creator-Daten erfolgreich eingefügt!');
  } catch (error) {
    console.error('❌ Fehler beim Einfügen der Creator-Daten:', error);
  }
}

insertCreators();
