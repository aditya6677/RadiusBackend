const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7676;

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

require('./app/route')(app);
module.exports = app;
app.listen(port, () => console.log(`Listening on port ${port}`));
