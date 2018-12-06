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

module.exports = router;
