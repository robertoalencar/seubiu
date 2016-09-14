var express = require('express');
var router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(null); }
  res.sendStatus(401);
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) { return next(null); }
  res.sendStatus(403);
}

require('./user-route')(router, isAuthenticated, isAdmin);
require('./installation-route')(router, isAuthenticated, isAdmin);
require('./profession-route')(router, isAuthenticated, isAdmin);
require('./state-route')(router, isAuthenticated, isAdmin);
require('./city-route')(router, isAuthenticated, isAdmin);
require('./country-route')(router, isAuthenticated, isAdmin);

module.exports = router;