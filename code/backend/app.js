var express = require('express');
var dotenv = require('dotenv').config();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var responseTime = require('response-time');
var cryptoUtil = require('./utils/crypto-util');
var userService = require('./services/user-service');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = process.env.SESSION_SECRET;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

    userService.getById(jwt_payload.id).then(function(user){
      if (!user) {
        done(null, false);
      } else {
        done(null, user);
      }
    }, function(err) {
      done(err);
    });

}));

var app = express();

// response-time middleware
app.use(responseTime());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//etag
app.disable('etag');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Seu Biu' });
});

app.get('/api/me', passport.authenticate('jwt', { session: false}),
    function(req, res) {
      res.send(req.user);
    }
);

app.post('/api/authenticate', function(req, res) {

  var email = req.body.email;
  var password = req.body.password;

  userService.getByEmailAndPassword(email, password).then(function(user){
      if (!user) {
        res.sendStatus(401);
      } else {

        var token = jwt.sign({id:user.id}, process.env.SESSION_SECRET, {
          expiresIn: '1d'
        });

        res.json({
          user: user,
          token: token
        });

      }
    }, function(err) {
      res.sendStatus(401);
  });

});

//Routes
app.use('/api', require('./routes/'));

//Jobs
require('./jobs')();

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
