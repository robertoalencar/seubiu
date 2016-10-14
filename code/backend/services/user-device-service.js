var _ = require('lodash');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');

var addDevice = function(userId, deviceToken, deviceTypeId) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('User ID is required');
            }

            if (_.isEmpty(deviceToken)) {
                errors.push('Device token is required');
            }

            if (_.isEmpty(deviceTypeId)) {
                errors.push('Device type is required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.UserDevice.create({ 'user_id': id, 'deviceToken': deviceToken, 'devicetype_id': deviceTypeId}, function(err, addedDevice) {
                    if (err) reject(err);
                    resolve(addedDevice);
                });

            }


        }));

    });

};

var getDevices = function(userId) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('User ID is required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.UserDevice.find({'user_id': userId}, [], function (err, devices) {
                    if (err) reject(err);
                    resolve(devices);
                });

            }

        }));

    });
};

var getDeviceByToken = function(userId, deviceToken) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('User ID is required');
            }

            if (_.isEmpty(deviceToken)) {
                errors.push('Device token is required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.UserDevice.find({'user_id': userId, 'deviceToken': deviceToken}, [], function (err, devices) {
                    if (err) reject(err);
                    resolve(_.first(devices));
                });

            }

        }));

    });
};

module.exports = {

    addDevice: addDevice,
    getDevices: getDevices,
    getDeviceByToken: getDeviceByToken,

};
