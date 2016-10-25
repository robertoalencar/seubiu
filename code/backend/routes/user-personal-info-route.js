var _ = require('lodash');
var userPersonalInfoService = require('../services/user-personal-info-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    function userHasAccess(req, res, next) {
        if (req.isAuthenticated() && (req.user.id == req.params.userId || req.user.admin)) { return next(null); }
        res.sendStatus(403);
    }

    router.route('/users/:userId/personalinfo')

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userPersonalInfoService.getById(userId).then(function(personalInfo){
                if (_.isEmpty(personalInfo)) res.status(404);
                res.json(personalInfo);
            }, function(err) {
                res.status(400).send(err.message || err);
            });

        })

        .put(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userPersonalInfoService.update(userId, req.body.patches).then(function(personalInfo){
                res.json(personalInfo);
            }, function(err) {
                res.status(400).send(err.message || err);
            });

        });

};