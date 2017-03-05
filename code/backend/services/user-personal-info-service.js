var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
var doReadWrite = require('../utils/orm-db-transaction').doReadWrite;
var ERROR = require('../utils/service-error-constants');
var ServiceException = require('../utils/service-exception');

var getById = (userId) => {
    return doReadOnly((db) => {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var userPersonalInfoFind = Promise.promisify(db.models.UserPersonalInfo.find);
            var userPersonalInfo = _.first(await(userPersonalInfoFind({'user_id': userId})));

            if (_.isNil(userPersonalInfo)) {
                throw ServiceException(ERROR.UserPersonalInfo.USER_PERSONAL_INFO_NOT_FOUND, ERROR.Type.NOT_FOUND);
            }

            return userPersonalInfo;
        }

    });
};

var applyPatchesForUserPersonalInfo = (userPersonalInfo, patches, db) => {

    _(patches).forEach((patchOp) => {

        switch (patchOp.path) {

            case  '/birthDate':

                if (patchOp.op == 'replace') {
                    userPersonalInfo.birthDate = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    userPersonalInfo.birthDate = null;
                }

            break;

            case  '/rg':

                if (patchOp.op == 'replace') {
                    userPersonalInfo.rg = patchOp.value;
                }

            break;

            case  '/rgOrgIssuer':

                if (patchOp.op == 'replace') {
                    userPersonalInfo.rgOrgIssuer = patchOp.value;
                }

            break;

            case  '/cpf':

                if (patchOp.op == 'replace') {
                    userPersonalInfo.cpf = patchOp.value;
                }

            break;

        }
    });

};

var update = (userId, patches) => {
    return doReadWrite((db) => {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(patches)) {
            errors.push(ERROR.Common.PATCHES_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var userPersonalInfoFind = Promise.promisify(db.models.UserPersonalInfo.find);
            var userPersonalInfo = _.first(await(userPersonalInfoFind({'user_id': userId})));

            if (_.isNil(userPersonalInfo)) {
                userPersonalInfo = new db.models.UserPersonalInfo({'user_id': userId});
            }

            applyPatchesForUserPersonalInfo(userPersonalInfo, patches, db);

            var userPersonalInfoSave = Promise.promisify(userPersonalInfo.save);
            return userPersonalInfoSave();

        }

    });

};

module.exports = {
    getById: getById,
    update: update
};