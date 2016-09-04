var _ = require('lodash');
var installationService = require('../services/installation-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    router.route('/installations')

        .post(function(req, res) {

            var errors = [];
            var deviceToken = req.body.deviceToken;
            var appVersion = req.body.appVersion;
            var deviceTypeId = req.body.deviceTypeId;

            if (_.isEmpty(deviceToken)) {
                errors.push("Device token is required");
            }

            if (_.isEmpty(appVersion)) {
                errors.push("App version is required");
            }

            if (_.isEmpty(deviceTypeId)) {
                errors.push("Device type is required");
            }

            if (errors.length == 0) {

                installationService.create(deviceToken, appVersion, deviceTypeId).then(function(newInstallation){
                    res.json(newInstallation);
                }, function(err) {
                    res.status(500).send(err);
                });

            } else {
                res.status(400).send(errors.join(", "));
            }

        });

    router.route('/installations/:deviceToken')

        .get(function(req, res) {

            var errors = [];
            var deviceToken = req.params.deviceToken;

            if (_.isEmpty(deviceToken)) {
                errors.push("Device token is required");
            }

            if (errors.length == 0) {

                installationService.getByDeviceToken(deviceToken).then(function(installation){
                    if (_.isEmpty(installation)) res.status(404);
                    res.json(installation);
                }, function(err) {
                    res.status(500).send(err);
                });

            } else {
                res.status(400).send(errors.join(", "));
            }

        });

};