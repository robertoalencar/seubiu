var _ = require('lodash');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');
var ERROR = require('../utils/service-error-constants');

var getById = function(userId) {
    return transaction.doReadOnly(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {
            var userPersonalInfoFind = Promise.promisify(db.models.UserPersonalInfo.find);
            var userPersonalInfo = _.first(await(userPersonalInfoFind({'user_id': userId})));

            if (_.isNil(userPersonalInfo)) {
                throw ['USER_PERSONAL_INFO_NOT_FOUND'];
            }

            return userPersonalInfo;
        }

    });
};

var applyPatchesForUserPersonalInfo = function (userPersonalInfo, patches, db) {

    _(patches).forEach(function(patchOp) {

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

var update = function(userId, patches) {
    return transaction.doReadWrite(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(patches)) {
            errors.push(ERROR.Common.PATCHES_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {
            var userPersonalInfoFind = Promise.promisify(db.models.UserPersonalInfo.find);
            var userPersonalInfo = _.first(await(userPersonalInfoFind({'user_id': userId})));

            if (_.isNil(userPersonalInfo)) {
                userPersonalInfo = new db.models.UserPersonalInfo({'user_id': userId});
            }

            applyPatchesForUserPersonalInfo(userPersonalInfo, patches, db);

            var userPersonalInfoSave = Promise.promisify(userPersonalInfo.save);
            return await(userPersonalInfoSave());

        }

    });

};

module.exports = {
    getById: getById,
    update: update
};