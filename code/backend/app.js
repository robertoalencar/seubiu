const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const responseTime = require('response-time');
const uuid = require('uuid');
const executionContext = require('./utils/execution-context-util');
const cryptoUtil = require('./utils/crypto-util');
const userService = require('./services/user-service');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = process.env.SESSION_SECRET;
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

    userService.getById(jwt_payload.id).then((user) => {
      if (!user) {
        done(null, false);
      } else {
        done(null, user);
      }
    }, (err) => {
      done(err);
    });

}));

const app = express();

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

//Continuation-local storage
app.use((req, res, next) => {
  executionContext.init(req, res, next, {
    'requestID': uuid.v1()
  });
});

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Seu Biu' });
});

app.get('/api/me', passport.authenticate('jwt', { session: false}),
    (req, res) => {
      res.send(req.user);
    }
);

app.post('/api/authenticate', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  userService.getByEmailAndPassword(email, password).then((user) => {
      if (!user) {
        res.sendStatus(401);
      } else {

        const token = jwt.sign({id:user.id}, process.env.SESSION_SECRET, {
          expiresIn: '1d'
        });

        res.json({
          user: user,
          token: token
        });

      }
    }, (err) => {
      res.sendStatus(401);
  });

});

//Routes
app.use('/api', require('./routes/'));

//Jobs
require('./jobs')();

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
