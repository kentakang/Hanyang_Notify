/*
  HanyangNotify API Server /api/meal/
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
  const sql = 'SELECT type, food FROM mealList WHERE year=$1 and month=$2 and day=$3';
  const values = req.params.date.split('-');

  if (values[1] < 10) {
    values[1] = values[1].replace('0', '');
  }

  if (values[2] < 10) {
    values[2] = values[2].replace('0', '');
  }

  client.query(sql, values, (err, sqlRes) => {
    if (err) {
      res.status(500);
      res.json({ message: err });
    } else if (sqlRes.rowCount > 0) {
      const sendData = [];

      sqlRes.rows.forEach(data => sendData.push(data));
      res.send(sendData);
    } else {
      res.json([{ type: 'lunch', food: '급식이 없습니다.' }, { type: 'dinner', food: '급식이 없습니다.' }]);
    }
  });
});

module.exports = router;
