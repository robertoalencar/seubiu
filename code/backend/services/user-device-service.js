var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
var doReadWrite = require('../utils/orm-db-transaction').doReadWrite;
var ERROR = require('../utils/service-error-constants');
var ServiceException = require('../utils/service-exception');

var getByFilter = (filter, db) => {
    var userDeviceFind = Promise.promisify(db.models.UserDevice.find);
    return userDeviceFind(filter, [ 'description', 'A' ]);
};

var tokenAlreadyExists = (userId, deviceToken, deviceTypeId, db) => {
    var userDeviceExists = Promise.promisify(db.models.UserDevice.exists);
    return await(userDeviceExists({'user_id': userId, 'deviceToken': deviceToken, 'devicetype_id': deviceTypeId}));
};

var add = (userId, deviceToken, deviceTypeId) => {
    return doReadWrite((db) => {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(deviceToken)) {
            errors.push(ERROR.UserDevice.DEVICE_TOKEN_IS_REQUIRED);
        }

        if (_.isEmpty(deviceTypeId)) {
            errors.push(ERROR.DeviceType.DEVICE_TYPE_IS_REQUIRED);
        }

        if (userId && !_.isEmpty(deviceToken) && !_.isEmpty(deviceTypeId) && tokenAlreadyExists(userId, deviceToken, deviceTypeId, db)) {
            errors.push(ERROR.UserDevice.DEVICE_TOKEN_ALREADY_EXISTS);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var deviceCreate = Promise.promisify(db.models.UserDevice.create);
            return deviceCreate({'user_id': userId, 'deviceToken': deviceToken, 'devicetype_id': deviceTypeId});
        }

    });

};

var getAllByUserId = (userId) => {
    return doReadOnly((db) => {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            return getByFilter({'user_id': userId}, db);
        }

    });
};

var getByToken = (userId, deviceToken) => {
    return doReadOnly((db) => {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(deviceToken)) {
            errors.push(ERROR.UserDevice.DEVICE_TOKEN_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var devices = await (getByFilter({'user_id': userId, 'deviceToken': deviceToken}, db));
            return _.first(devices);
        }

    });
};

module.exports = {
    add: add,
    getAllByUserId: getAllByUserId,
    getByToken: getByToken
};
