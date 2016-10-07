var express = require('express');
var dotenv = require('dotenv').config();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var cryptoUtil = require('./utils/crypto-util');
var userService = require('./services/user-service');

passport.use(new Strategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    userService.getByUsernameOrEmail(username, password).then(function(user){
      if (!user) {
        done(null, false);
      } else {
        done(null, user);
      }
    }, function(err) {
      done(err);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {

  userService.getById(id).then(function(user){
      done(null, user);
    }, function(err) {
      done(err);
    });

});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT}),
    rolling: true,
    saveUninitialized: false,
    resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Seu Biu' });
});

app.post('/login',
  passport.authenticate('local', { session: true }),
  function(req, res) {
    res.sendStatus(200);
  });

app.get('/logout',
  function(req, res){
    req.logout();
    req.session.destroy(function(err) {
      res.clearCookie('connect.sid');
      res.sendStatus(200);
  })
});

app.use('/api', require('./routes/'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
