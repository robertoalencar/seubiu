var _ = require('lodash');
var installationService = require('../services/installation-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    router.route('/installations')

        .post(function(req, res) {

            var deviceToken = req.body.deviceToken;
            var appVersion = req.body.appVersion;
            var deviceTypeId = req.body.deviceTypeId;

            installationService.create(deviceToken, appVersion, deviceTypeId).then(function(newInstallation){
                res.json(newInstallation);
            }, function(err) {
                res.status(400).send(err);
            });

        });

    router.route('/installations/:deviceToken')

        .get(function(req, res) {

            var deviceToken = req.params.deviceToken;

            installationService.getByDeviceToken(deviceToken).then(function(installation){
                if (_.isEmpty(installation)) res.status(404);
                res.json(installation);
            }, function(err) {
                res.status(400).send(err);
            });

        });

};