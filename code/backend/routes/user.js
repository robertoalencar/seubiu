function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(null); }
  res.sendStatus(401);
}

module.exports = function(router, isAuthenticated) {

    router.route('/users/me')
        .get(isAuthenticated, function(req, res) {
            res.json({ username: req.user.name, email: req.user.email });
        });

};