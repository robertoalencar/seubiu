var _ = require('lodash');
var userPreferenceService = require('../services/user-preference-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    function userHasAccess(req, res, next) {
        if (req.isAuthenticated() && (req.user.id == req.params.userId || req.user.admin)) { return next(null); }
        res.sendStatus(403);
    }

    router.route('/users/:userId/preference')

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userPreferenceService.getById(userId).then(function(preference){
                if (_.isEmpty(preference)) res.status(404);
                res.json(preference);
            }, function(err) {
                res.status(400).send(err.message || err);
            });

        })

        .put(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userPreferenceService.update(userId, req.body.patches).then(function(preference){
                res.json(preference);
            }, function(err) {
                res.status(400).send(err.message || err);
            });

        });

    router.route('/users/:userId/preference/cities')

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userPreferenceService.getCities(userId).then(function(cities){
                res.json(cities);
            }, function(err) {
                res.status(400).send(err.message || err);
            });

        })

        .post(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var cityIds = req.body.cityIds;

            userPreferenceService.setCities(userId, cityIds).then(function(success){
                res.status(200).send(success);
            }, function(err) {
                res.status(400).send(err);
            });

        });


 router.route('/users/:userId/preference/professions')

        .post(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var professionIds = req.body.professionIds;

            userPreferenceService.setProfessions(userId, professionIds).then(function(success){
                res.status(200).send(success);
            }, function(err) {
                res.status(400).send(err.message || err);
            });


        })

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userPreferenceService.getProfessions(userId).then(function(professions){
                res.json(professions);
            }, function(err) {
                res.status(400).send(err.message || err);
            });

        });

    router.route('/users/:userId/preference/services')

        .post(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var servicesIds = req.body.servicesIds;

            userPreferenceService.setServices(userId, servicesIds).then(function(success){
                res.status(200).send(success);
            }, function(err) {
                res.status(400).send(err.message || err);
            });


        })

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userPreferenceService.getServices(userId).then(function(services){
                res.json(services);
            }, function(err) {
                res.status(400).send(err.message || err);
            });

        });
};