var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Routers
var populationRouter = require('./routes/populationController');
var co2Router = require('./routes/co2Controller');
var combinedRouter = require('./routes/combinedController')

// Start by requiring these scripts.
var handler = require('./downloadHandler.js');
var repo = require('./repository.js');

var app = express();
app.use(cors());

app.set('json spaces', 2);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/population', populationRouter);
app.use('/api/co2', co2Router);
app.use('/api/combined', combinedRouter);

// catch 404 and forward to error handler

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
