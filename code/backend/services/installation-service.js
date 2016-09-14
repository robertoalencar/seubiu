var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');

var getByDeviceToken = function(deviceToken) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (_.isEmpty(deviceToken)) {
                errors.push("Device token is required");
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.Installation.find({'deviceToken': deviceToken}, 1, function (err, installations) {
                    if (err) reject(err);
                    resolve(_.first(installations));
                });

            }

        }));

    });

};

var create = function(deviceToken, deviceTypeId, appVersion) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (_.isEmpty(deviceToken)) {
                errors.push("Device token is required");
            }

            if (_.isEmpty(appVersion)) {
                errors.push("App version is required");
            }

            if (_.isEmpty(deviceTypeId)) {
                errors.push("Device type is required");
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.Installation.create({'deviceToken': deviceToken, 'appVersion': appVersion, 'devicetype_id': deviceTypeId}, function(err, newInstallation) {
                    if (err) reject(err);
                    resolve(newInstallation);
                });

            }


        }));

    });

};

module.exports = {

    getByDeviceToken: getByDeviceToken,
    create: create

};