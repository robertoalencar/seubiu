var express = require('express');
var router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(null); }
  res.sendStatus(401);
}

function isAdmin(req, res, next) {
  if (req.user.admin) { return next(null); }
  res.sendStatus(403);
}

require('./user')(router, isAuthenticated, isAdmin);
require('./installation')(router, isAuthenticated, isAdmin);
require('./profession')(router, isAuthenticated, isAdmin);

module.exports = router;