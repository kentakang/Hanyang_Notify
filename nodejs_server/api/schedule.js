/*
  HanyangNotify API Server /api/schedule/
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

router.get('/:date', (req, res) => {
  const sql = 'SELECT schedule FROM scheduleList WHERE year=$1 and month=$2 and day=$3';
  const values = req.params.date.split('-');

  client.query(sql, values, (err, sqlRes) => {
    if (err) {
      res.status(500);
      res.json({ message: err });
    } else if (sqlRes.rowCount > 0) {
      res.send(sqlRes.rows[0]);
    } else {
      res.json({ schedule: '학사일정이 없습니다.' });
    }
  });
});

module.exports = router;
