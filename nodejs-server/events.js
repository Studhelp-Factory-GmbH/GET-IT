const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // Routen definitionen:
  // --> Spieler erstellen:
  router.post('/spieler', (req, res) => {
    const { spielername, avatar_id } = req.body;
    const sql = 'INSERT INTO Spieler (spielername, avatar_id) VALUES (?, ?)';
    db.query(sql, [spielername, avatar_id], (err) => {
      if (err) {
        console.error('Fehler beim Einfügen der Daten:', err);
        res.status(500).json({ error: 'Fehler beim Einfügen der Daten' });
        return;
      }
      res.json({ message: 'Daten erfolgreich eingefügt' });
    });
  });

  // --> Raumerstellen:
  router.post('/createRoom', (req, res) => {
    const { raumcode, spiel_id, chat_id } = req.body;
    const sql = 'INSERT INTO Raum (raumcode, spiel_id, chat_id) VALUES (?, ?, ?)';
    db.query(sql, [raumcode, spiel_id, chat_id], (err) => {
      if(err) {
        console.error('Fehler beim erstellen des Raums!', err);
        res.status(500).json({ error: 'Fehler beim erstellen des Raums!'});
        return;
      }
      res.json({ message: 'Raum erfolgreich erstellt!'});
    });
  });

  // --> Chat erstellen:
  router.post('/createChat', (req, res) => {
    const { raumcode } = req.body;
    const sql = 'INSERT INTO Chat (raumcode) VALUES (?)';
    db.query(sql, [raumcode], (error, result) => {
      if (error) {
        console.error('Fehler beim Einfügen des Datensatzes:', error);
        res.status(500).json({ success: false });
      } else {
        console.log('Datensatz erfolgreich eingefügt:', result);
        res.status(200).json({ success: true, chat: result.insertId });
      }
    });
  });

  // --> Nachricht erstellen:
  router.post('/message'), (req, res) => {
    const { message, chat_id } = req.body;
    const sql = 'INSERT INTO Nachricht (nachricht_string, chat_id) VALUES (?, ?)';
    db.query(sql, [raumcode], (err) => {
      if(err) {
        console.error('Failed creating message!', err);
        res.status(500).json({ error: 'Failed creating message!'});
        return;
      }
      res.json({ message: 'Created message susscesfully!'});
    });
  }

  // Spielnahmen abfragen:
  router.get('/spiel/:zahl', function (req, res) {
    const spiel_id = req.params.zahl;
    const sql = 'SELECT spielname FROM Spiel WHERE id=?'
    db.query(sql, [spiel_id], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
        console.log(results);
      }
    });
  });

  // Chat_id abfragen:
  router.get('/chat/:rcode', function (req, res) {
    const roomcode = req.params.rcode;
    const sql = 'SELECT id FROM Chat WHERE raumcode=?'
    db.query(sql, [roomcode], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
        console.log(results);
      }
    });
  });


  // Irgendwas updaten:
  router.put('/event/:id', function (req, res, next) {
    db.query(
      'UPDATE events SET name=?, description=?, date=? WHERE id=? AND owner=?',
      [req.body.name, req.body.description, new Date(req.body.date), req.params.id, owner],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  // Irgendwas löschen:
  router.delete('/event/:id', function (req, res, next) {
    db.query(
      'DELETE FROM events WHERE id=? AND owner=?',
      [req.params.id, owner],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;
