var _ = require('lodash');
var multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var userProfileService = require('../services/user-profile-service');
var routeUtil = require('../utils/route-util');

module.exports = function(router, isAuthenticated, isAdmin, userHasAccess) {

    router.route('/users/:userId/profile')

        .get(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userProfileService.getById(userId).then(function(profile){
                if (_.isEmpty(profile)) res.status(404);
                res.json(profile);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        })

        .put(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userProfileService.update(userId, req.body.patches).then(function(profile){
                res.json(profile);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/users/:userId/profile/cities')

        .get(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userProfileService.getCities(userId).then(function(cities){
                res.json(cities);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        })

        .post(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var cityIds = req.body.cityIds;

            userProfileService.setCities(userId, cityIds).then(function(success){
                res.send(success);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });


 router.route('/users/:userId/profile/professions')

        .post(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var professionIds = req.body.professionIds;

            userProfileService.setProfessions(userId, professionIds).then(function(success){
                res.send(success);
            }, function(err) {
                routeUtil.handleException(res, err);
            });


        })

        .get(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userProfileService.getProfessions(userId).then(function(professions){
                res.json(professions);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/users/:userId/profile/services')

        .post(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var servicesIds = req.body.servicesIds;

            userProfileService.setServices(userId, servicesIds).then(function(success){
                res.send(success);
            }, function(err) {
                routeUtil.handleException(res, err);
            });


        })

        .get(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userProfileService.getServices(userId).then(function(services){
                res.json(services);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/users/:userId/profile/displayimage')

        .get(function(req, res) {

            var userId = req.params.userId;

            userProfileService.getDisplayImage(userId).then(function(file){
                res.type(file.type);
                res.end(file.data, 'binary');
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        })

        .post(isAuthenticated, userHasAccess, upload.single('file'), function(req, res) {

            var userId = req.params.userId;
            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            userProfileService.updateDisplayImage(userId, req.file.originalname, req.file.size, req.file.mimetype, req.file.buffer, ip).then(function(success){
                res.send(success);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });
};