const _ = require('lodash');
const await = require('asyncawait/await');
const Promise = require('bluebird');
const doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
const doReadWrite = require('../utils/orm-db-transaction').doReadWrite;
const ERROR = require('../utils/service-error-constants');
const ServiceException = require('../utils/service-exception');

const getByFilter = (filter, db) => {
    const userDeviceFind = Promise.promisify(db.models.UserDevice.find);
    return userDeviceFind(filter, [ 'description', 'A' ]);
};

const tokenAlreadyExists = (userId, deviceToken, deviceTypeId, db) => {
    const userDeviceExists = Promise.promisify(db.models.UserDevice.exists);
    return await(userDeviceExists({'user_id': userId, 'deviceToken': deviceToken, 'devicetype_id': deviceTypeId}));
};

const add = (userId, deviceToken, deviceTypeId) => {
    return doReadWrite((db) => {
        let errors = [];

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
            const deviceCreate = Promise.promisify(db.models.UserDevice.create);
            return deviceCreate({'user_id': userId, 'deviceToken': deviceToken, 'devicetype_id': deviceTypeId});
        }

    });

};

const getAllByUserId = (userId) => {
    return doReadOnly((db) => {
        let errors = [];

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

const getByToken = (userId, deviceToken) => {
    return doReadOnly((db) => {
        let errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(deviceToken)) {
            errors.push(ERROR.UserDevice.DEVICE_TOKEN_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            let devices = await (getByFilter({'user_id': userId, 'deviceToken': deviceToken}, db));
            return _.first(devices);
        }

    });
};

module.exports = {
    add: add,
    getAllByUserId: getAllByUserId,
    getByToken: getByToken
};
