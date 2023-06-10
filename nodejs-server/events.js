const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here
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

  router.post('/event', (req, res, next) => {
    db.query(
      'INSERT INTO events (owner, name, description, date) VALUES (?,?,?,?)',
      [owner, req.body.name, req.body.description, new Date(req.body.date)],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

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