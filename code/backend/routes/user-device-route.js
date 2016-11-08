var _ = require('lodash');
var userDeviceService = require('../services/user-device-service');
var routeUtil = require('../utils/route-util');

module.exports = function(router, isAuthenticated, isAdmin, userHasAccess) {

    router.route('/users/:userId/devices')

        .post(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var deviceToken = req.body.deviceToken;
            var deviceTypeId = req.body.deviceTypeId;

            userDeviceService.add(userId, deviceToken, deviceTypeId).then(function(addedDevice){
                res.json(addedDevice);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        })

        .get(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userDeviceService.getAllByUserId(userId).then(function(devices){
                res.json(devices);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/users/:userId/devices/:deviceToken')

        .get(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var deviceToken = req.params.deviceToken;

            userDeviceService.getByToken(userId, deviceToken).then(function(device){
                res.json(device);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

};