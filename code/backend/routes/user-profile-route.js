var _ = require('lodash');
var multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var userProfileService = require('../services/user-profile-service');
var routeUtil = require('../utils/route-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    router.route('/users/:userId/profile')

        .get(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;

            userProfileService.getById(userId).then((profile) => {
                if (_.isEmpty(profile)) res.status(404);
                res.json(profile);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

        .put(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;

            userProfileService.update(userId, req.body.patches).then((profile) => {
                res.json(profile);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/users/:userId/profile/cities')

        .get(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;

            userProfileService.getCities(userId).then((cities) => {
                res.json(cities);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

        .post(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;
            var cityIds = req.body.cityIds;

            userProfileService.setCities(userId, cityIds).then((success) => {
                res.send(success);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });


 router.route('/users/:userId/profile/professions')

        .post(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;
            var professionIds = req.body.professionIds;

            userProfileService.setProfessions(userId, professionIds).then((success) => {
                res.send(success);
            }, (err) => {
                routeUtil.handleException(res, err);
            });


        })

        .get(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;

            userProfileService.getProfessions(userId).then((professions) => {
                res.json(professions);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/users/:userId/profile/services')

        .post(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;
            var servicesIds = req.body.servicesIds;

            userProfileService.setServices(userId, servicesIds).then((success) => {
                res.send(success);
            }, (err) => {
                routeUtil.handleException(res, err);
            });


        })

        .get(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;

            userProfileService.getServices(userId).then((services) => {
                res.json(services);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/users/:userId/profile/displayimage')

        .get((req, res) => {

            var userId = req.params.userId;

            userProfileService.getDisplayImage(userId).then((file) => {
                res.type(file.type);
                res.end(file.data, 'binary');
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

        .post(isAuthenticated, userHasAccess, upload.single('file'), (req, res) => {

            var userId = req.params.userId;
            var ip = routeUtil.getCurrentIp(req);

            userProfileService.updateDisplayImage(userId, req.file.originalname, req.file.size, req.file.mimetype, req.file.buffer, ip).then(function(success){
                res.send(success);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });
};