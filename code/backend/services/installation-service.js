var Promise = require('promise');
var _ = require('lodash');
var transaction = require('../utils/orm-db-transaction');

var getByDeviceToken = function(deviceToken) {

    return new Promise(function (resolve, reject) {

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
    });

};

var create = function(deviceToken, deviceTypeId, appVersion) {

    return new Promise(function (resolve, reject) {

        transaction.doReadWrite([
            function(db, t, done){

                db.models.DeviceType.get(deviceTypeId, function(err, deviceType) {

                    done(err, db, t, deviceType);

                });

            },
            function(db, t, deviceType, done) {

                var installation = new db.models.Installation();

                installation.deviceToken = deviceToken;
                installation.appVersion = appVersion;

                installation.setDeviceType(deviceType, function(err, newInstallation) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(newInstallation);
                    }

                    done(err, db, t);

                });

            }
        ]);
    });

};

module.exports = {

    getByDeviceToken: getByDeviceToken,
    create: create

};