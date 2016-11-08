var _ = require('lodash');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');


var getById = function(userId) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('USER_ID_IS_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.UserPersonalInfo.find({'user_id': userId}).first(function (err, personalInfo) {
                    if (err) {
                        reject(err);
                    } else if (_.isNil(personalInfo)) {
                        reject(['USER_PERSONAL_INFO_NOT_FOUND']);
                    } else {
                        resolve(personalInfo);
                    }
                });

            }

        }));

    });
};

var applyPatchesForUserPersonalInfo = function (personalInfo, patches, db) {

    _(patches).forEach(function(patchOp) {

        switch (patchOp.path) {

            case  '/birthDate':

                if (patchOp.op == 'replace') {
                    personalInfo.birthDate = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    personalInfo.birthDate = null;
                }

            break;

            case  '/rg':

                if (patchOp.op == 'replace') {
                    personalInfo.rg = patchOp.value;
                }

            break;

            case  '/rgOrgIssuer':

                if (patchOp.op == 'replace') {
                    personalInfo.rgOrgIssuer = patchOp.value;
                }

            break;

            case  '/cpf':

                if (patchOp.op == 'replace') {
                    personalInfo.cpf = patchOp.value;
                }

            break;

        }
    });

};

var update = function(userId, patches) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('USER_ID_IS_REQUIRED');
            }

            if (_.isEmpty(patches)) {
                errors.push('PATCHES_ARE_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.UserPersonalInfo.find({'user_id': userId}).first(function (err, personalInfo) {
                    if (err) {
                        reject(err);
                    } else {
                        if (_.isNil(personalInfo)) {
                            personalInfo = new db.models.UserPersonalInfo({'user_id': userId});
                        }

                        applyPatchesForUserPersonalInfo(personalInfo, patches, db);

                        personalInfo.save(function(err) {
                            if (err) reject(err);
                            resolve(personalInfo);
                        });
                    }

                });

            }

        }));

    });

};

module.exports = {

    getById: getById,
    update: update

};