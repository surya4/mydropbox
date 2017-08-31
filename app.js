var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
const bluebird = require('bluebird');
var passport = require('passport');
const favicon = require('serve-favicon');

const index = require('./web/routes/index');

global.Promise = bluebird;

// Load environment variables from .env file
dotenv.load();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'web/views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'web/public/images', 'favicon.ico')));
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(express.static(path.join(__dirname, 'web/public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.send(err.message);
  res.send(req.app.get('env') === 'development' ? err : {});

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;