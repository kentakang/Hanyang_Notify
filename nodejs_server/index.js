/*
  HanyangNotify API Server
  @kentakang (2018-12-06)
*/
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((res, req, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});

// 급식 API
app.use('/api/meal', require('./api/meal'));
app.use('/api/document', require('./api/document'));
app.use('/api/schedule', require('./api/schedule'));
app.use('/api/notice', require('./api/notice'));

app.listen(8888);
