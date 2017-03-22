const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticate = passport.authenticate('jwt', { session: false});

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) { return next(null); }
  res.sendStatus(403);
}

const userHasAccess = (req, res, next) => {
    if (req.isAuthenticated() && (req.user.id == req.params.userId || req.user.admin)) { return next(null); }
    res.sendStatus(403);
}

require('./user-route')(router, authenticate, isAdmin, userHasAccess);
require('./profession-route')(router, authenticate, isAdmin, userHasAccess );
require('./state-route')(router, authenticate, isAdmin, userHasAccess);
require('./city-route')(router, authenticate, isAdmin, userHasAccess);
require('./country-route')(router, authenticate, isAdmin, userHasAccess);
require('./request-route.js')(router, authenticate, isAdmin, userHasAccess);
require('./user-profile-route')(router, authenticate, isAdmin, userHasAccess);
require('./user-address-route')(router, authenticate, isAdmin, userHasAccess);
require('./user-device-route')(router, authenticate, isAdmin, userHasAccess);
require('./user-personal-info-route')(router, authenticate, isAdmin, userHasAccess);
require('./user-search-route')(router, authenticate, isAdmin, userHasAccess);
require('./user-request-route')(router, authenticate, isAdmin, userHasAccess);
require('./profession-suggestion-route')(router, authenticate, isAdmin, userHasAccess);

module.exports = router;