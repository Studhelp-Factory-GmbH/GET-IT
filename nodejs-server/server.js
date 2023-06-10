const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');
//Test
// MySql-Datenbank verbinden:
const db = mysql.createConnection({
  host     : 'db',
  user     : 'db',
  password : 'db',
  database : 'db'
});

db.connect((err) => {
  if (err) {
    console.error('Fehler bei der Verbindung zur MySql-Datenbank:', err);
    return;
  }
  console.log('Erfolgreich mit der MySql-Datenbank verbunden!');
});

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(events(db));

// API-Endpunkt zum Hinzufügen von Daten


const port = process.env.PORT || 3307;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
