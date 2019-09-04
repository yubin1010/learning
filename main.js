var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var db = require('./lib/db.js');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('*', function (request, response, next) {
  request.list = db.get('todos').value();
  next();
});

var todoRouter = require('./routes/todor');

app.use('/todos', todoRouter);

app.listen(3000, function () {
  console.log('listen port 3000')
});
