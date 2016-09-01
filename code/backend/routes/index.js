var express = require('express');
var router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(null); }
  res.sendStatus(401);
}

require('./user')(router, isAuthenticated);

module.exports = router;