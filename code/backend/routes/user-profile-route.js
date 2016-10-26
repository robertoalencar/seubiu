var _ = require('lodash');
var userProfileService = require('../services/user-profile-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    function userHasAccess(req, res, next) {
        if (req.isAuthenticated() && (req.user.id == req.params.userId || req.user.admin)) { return next(null); }
        res.sendStatus(403);
    }

    router.route('/users/:userId/profile')

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userProfileService.getById(userId).then(function(profile){
                if (_.isEmpty(profile)) res.status(404);
                res.json(profile);
            }, function(err) {
                res.status(400).send(err.message || err);
            });

        })

        .put(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userProfileService.update(userId, req.body.patches).then(function(profile){
                res.json(profile);
            }, function(err) {
                res.status(400).send(err.message || err);
            });

        });

    router.route('/users/:userId/profile/cities')

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userProfileService.getCities(userId).then(function(cities){
                res.json(cities);
            }, function(err) {
                res.status(400).send(err.message || err);
            });

        })

        .post(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var cityIds = req.body.cityIds;

            userProfileService.setCities(userId, cityIds).then(function(success){
                res.status(200).send(success);
            }, function(err) {
                res.status(400).send(err);
            });

        });


 router.route('/users/:userId/profile/professions')

        .post(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var professionIds = req.body.professionIds;

            userProfileService.setProfessions(userId, professionIds).then(function(success){
                res.status(200).send(success);
            }, function(err) {
                res.status(400).send(err.message || err);
            });


        })

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userProfileService.getProfessions(userId).then(function(professions){
                res.json(professions);
            }, function(err) {
                res.status(400).send(err.message || err);
            });

        });

    router.route('/users/:userId/profile/services')

        .post(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var servicesIds = req.body.servicesIds;

            userProfileService.setServices(userId, servicesIds).then(function(success){
                res.status(200).send(success);
            }, function(err) {
                res.status(400).send(err.message || err);
            });


        })

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userProfileService.getServices(userId).then(function(services){
                res.json(services);
            }, function(err) {
                res.status(400).send(err.message || err);
            });

        });
};