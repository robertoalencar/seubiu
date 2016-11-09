var _ = require('lodash');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');

var tokenAlreadyExists = function(userId, deviceToken, deviceTypeId, db) {
    return await (new Promise(function (resolve, reject) {
        db.models.UserDevice.exists({ 'user_id': userId, 'deviceToken': deviceToken, 'devicetype_id': deviceTypeId }, function (err, exists) {
            if (err) reject(err);
            resolve(exists);
        });
    }));
};

var add = function(userId, deviceToken, deviceTypeId) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('USER_ID_IS_REQUIRED');
            }

            if (_.isEmpty(deviceToken)) {
                errors.push('DEVICE_TOKEN_IS_REQUIRED');
            }

            if (_.isEmpty(deviceTypeId)) {
                errors.push('DEVICE_TYPE_IS_REQUIRED');
            }

            if (userId && !_.isEmpty(deviceToken) && !_.isEmpty(deviceTypeId)
                && tokenAlreadyExists(userId, deviceToken, deviceTypeId, db)) {

                errors.push('DEVICE_TOKEN_ALREADY_EXISTS');

            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.UserDevice.create({ 'user_id': id, 'deviceToken': deviceToken, 'devicetype_id': deviceTypeId}, function(err, addedDevice) {
                    if (err) reject(err);
                    resolve(addedDevice);
                });

            }


        }));

    });

};

var getAllByUserId = function(userId) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('USER_ID_IS_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.UserDevice.find({'user_id': userId}, [], function (err, devices) {
                    if (err) reject(err);
                    resolve(devices);
                });

            }

        }));

    });
};

var getByToken = function(userId, deviceToken) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('USER_ID_IS_REQUIRED');
            }

            if (_.isEmpty(deviceToken)) {
                errors.push('DEVICE_TOKEN_IS_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

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

    add: add,
    getAllByUserId: getAllByUserId,
    getByToken: getByToken

};
