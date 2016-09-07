var Promise = require('promise');
var _ = require('lodash');
var transaction = require('../utils/orm-db-transaction');

var getByDeviceToken = function(deviceToken) {

    return new Promise(function (resolve, reject) {

        var errors = [];

        if (_.isEmpty(deviceToken)) {
            errors.push("Device token is required");
        }

        if (errors.length != 0) {

            reject(errors);

        } else {

            transaction.doReadOnly([
                function(db, t, done) {

                    db.models.Installation.find({'deviceToken': deviceToken}, 1, function (err, installations) {

                        if (err) {
                            reject(err);
                        } else {
                            resolve(_.first(installations));
                        }

                        done(err, db, t);

                    });

                }
            ]);

        }

    });

};

var create = function(deviceToken, deviceTypeId, appVersion) {

    return new Promise(function (resolve, reject) {

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

        if (errors.length != 0) {

            reject(errors);

        } else {

            transaction.doReadWrite([
                function(db, t, done){

                    db.models.Installation.create(
                        {'deviceToken': deviceToken, 'appVersion': appVersion, 'devicetype_id': deviceTypeId},
                        function(err, newInstallation) {

                        if (err) {
                            reject(err);
                        } else {
                            resolve(newInstallation);
                        }

                        done(err, db, t);

                    });

                }
            ]);

        }

    });

};

module.exports = {

    getByDeviceToken: getByDeviceToken,
    create: create

};