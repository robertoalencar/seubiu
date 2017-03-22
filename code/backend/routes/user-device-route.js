const _ = require('lodash');
const userDeviceService = require('../services/user-device-service');
const routeUtil = require('../utils/route-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    router.route('/users/:userId/devices')

        .post(isAuthenticated, userHasAccess, (req, res) => {

            const userId = req.params.userId;
            const deviceToken = req.body.deviceToken;
            const deviceTypeId = req.body.deviceTypeId;

            userDeviceService.add(userId, deviceToken, deviceTypeId).then((addedDevice) => {
                res.json(addedDevice);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

        .get(isAuthenticated, userHasAccess, (req, res) => {

            const userId = req.params.userId;

            userDeviceService.getAllByUserId(userId).then((devices) => {
                res.json(devices);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/users/:userId/devices/:deviceToken')

        .get(isAuthenticated, userHasAccess, (req, res) => {

            const userId = req.params.userId;
            const deviceToken = req.params.deviceToken;

            userDeviceService.getByToken(userId, deviceToken).then((device) => {
                res.json(device);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

};