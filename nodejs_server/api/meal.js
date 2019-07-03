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

const getYear = (values, res) => {
  const sql = 'SELECT * FROM mealList WHERE year=$1';

  client.query(sql, values, (err, sqlRes) => {
    if (err) {
      res.status(500);
      res.json({ message: err });
    } else {
      const sendData = [];

      sqlRes.rows.forEach(data => sendData.push(data));
      res.send(sendData);
    }
  });
};

const getMonth = (values, res) => {
  const sql = 'SELECT * FROM mealList WHERE year=$1 and month=$2';

  client.query(sql, values, (err, sqlRes) => {
    if (err) {
      res.status(500);
      res.json({ message: err });
    } else {
      const sqlRows = sqlRes.rows;
      const data = [];
      const days = [];

      console.log(sqlRows);

      sqlRows.forEach((row) => {
        const returnObject = {};

        if (!days.includes(row.day)) {
          sqlRows.forEach((currentRow) => {
            if (currentRow.day === row.day) {
              Object.assign(returnObject, {
                year: currentRow.year,
                month: currentRow.month,
                day: currentRow.day,
                [currentRow.type]: currentRow.food,
              });
            }
          });

          data.push(returnObject);
          days.push(row.day);
        }
      });

      res.send(data);
    }
  });
};

const getDay = (values, res) => {
  const sql = 'SELECT * FROM mealList WHERE year=$1 and month=$2 and day=$3';

  client.query(sql, values, (err, sqlRes) => {
    if (err) {
      res.status(500);
      res.json({ message: err });
    } else if (sqlRes.rowCount > 0) {
      res.send(sqlRes.rows[0]);
    } else {
      res.json({ schedule: '급식이 없습니다.' });
    }
  });
};

router.get('/:date', (req, res) => {
  const values = req.params.date.split('-');

  switch (values.length) {
    case 1:
      getYear(values, res);
      break;
    case 2:
      getMonth(values, res);
      break;
    case 3:
      getDay(values, res);
      break;
    default:
      res.status(404);
      res.json({ message: '잘못된 형식입니다.' });
  }
});

module.exports = router;
