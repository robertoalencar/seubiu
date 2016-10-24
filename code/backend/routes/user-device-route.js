var _ = require('lodash');
var userDeviceService = require('../services/user-device-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    function userHasAccess(req, res, next) {
        if (req.isAuthenticated() && (req.user.id == req.params.userId || req.user.admin)) { return next(null); }
        res.sendStatus(403);
    }

    router.route('/users/:userId/devices')

        .post(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var deviceToken = req.body.deviceToken;
            var deviceTypeId = req.body.deviceTypeId;

            userDeviceService.add(userId, deviceToken, deviceTypeId).then(function(addedDevice){
                res.json(addedDevice);
            }, function(err) {
                res.status(400).send(err.message);
            });

        })

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userDeviceService.getAllByUserId(userId).then(function(devices){
                res.json(devices);
            }, function(err) {
                res.status(400).send(err.message);
            });

        });

    router.route('/users/:userId/devices/:deviceToken')

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var deviceToken = req.params.deviceToken;

            userDeviceService.getByToken(userId, deviceToken).then(function(device){
                res.json(device);
            }, function(err) {
                res.status(400).send(err.message);
            });

        });

};