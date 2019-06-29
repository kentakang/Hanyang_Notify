/*
  HanyangNotify API Server /api/document/
  @kentakang (2018-12-06)
*/
const express = require('express'); // express 라이브러리

const router = express.Router();
const { Client } = require('pg'); // PostgreSQL 라이브러리

const dbConfig = require('../db.config');

const client = new Client({
  user: dbConfig.username,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
});

client.connect();

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM documentList ORDER BY date DESC limit 1';

  client.query(sql, (err, sqlRes) => {
    if (err) {
      res.status(500);
      res.json({ message: err });
    } else {
      res.send(sqlRes.rows[0]);
    }
  });
});

router.get('/all', (req, res) => {
  const sql = 'SELECT * FROM documentList ORDER BY date desc';

  client.query(sql, (err, sqlRes) => {
    if (err) {
      res.status(500);
      res.json({ message: err });
    } else {
      const sendData = [];

      sqlRes.rows.forEach(data => sendData.push(data));
      res.send(sendData);
    }
  });
});

router.get('/list/:page', (req, res) => {
  const sql = `SELECT * FROM documentList ORDER BY date DESC LIMIT 20 OFFSET ${(req.params.page
    - 1)
    * 20}`;

  client.query(sql, (err, sqlRes) => {
    if (err) {
      res.status(500);
      res.json({ message: err });
    } else {
      const sendData = { hasMore: sqlRes.rowCount === 20, list: [] };

      sqlRes.rows.forEach(data => sendData.list.push(data));
      res.send(sendData);
    }
  });
});

module.exports = router;
