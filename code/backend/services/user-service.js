var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var md5 = require('md5');
var doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
var doReadWrite = require('../utils/orm-db-transaction').doReadWrite;
var ERROR = require('../utils/service-error-constants');
var ServiceException = require('../utils/service-exception');
var jobService = require('./job-service');

var MINIMUM_PASSWORD_SIZE = 8;

var getByFilter = (filter, db) => {
    var userFind = Promise.promisify(db.models.User.find);
    return userFind(filter, [ 'name', 'A' ]);
};

var getAll = () => {
    return doReadOnly((db) => {
        return getByFilter({}, db);
    });
};

var getTotalUsers = (db) => {
    var userCount = Promise.promisify(db.models.User.count);
    return await (userCount());
};

var getByEmailAndPassword = (email, password) => {
    return doReadOnly((db) => {
        var errors = [];

        if (_.isEmpty(email)) {
            errors.push(ERROR.User.EMAIL_IS_REQUIRED);
        }

        if (_.isEmpty(password)) {
            errors.push(ERROR.User.PASSOWRD_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            //TODO: Add this filter when the email verification was implemented: , 'emailVerified': true
            return _.first(await (getByFilter({'password': md5(password), 'email': email}, db)));
        }

    });

};

var getById = (id) => {
    return doReadOnly((db) => {
        var errors = [];

        if (!id) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var userGet = Promise.promisify(db.models.User.get);
            return userGet(id);
        }

    });

};

var phoneAlreadyInUse = (phone, db) => {
    var userExists = Promise.promisify(db.models.User.exists);
    return await (userExists({'phone': phone}));
};

var emailAlreadyInUse = (email, db) => {
    var userExists = Promise.promisify(db.models.User.exists);
    return await (userExists({'email': email}));
};

var create = (user) => {
    return doReadWrite((db) => {
        var errors = [];

        if (_.isEmpty(user.name)) {
            errors.push(ERROR.Common.NAME_IS_REQUIRED);
        }

        if (_.isEmpty(user.surname)) {
            errors.push(ERROR.User.SURNAME_IS_REQUIRED);
        }

        if (_.isEmpty(user.phone)) {
            errors.push(ERROR.User.PHONE_IS_REQUIRED);
        } else if (phoneAlreadyInUse(user.phone, db)) {
            errors.push(ERROR.User.PHONE_ALREADY_IN_USE);
        }

        if (_.isEmpty(user.email)) {
            errors.push(ERROR.User.EMAIL_IS_REQUIRED);
        } else if (emailAlreadyInUse(user.email, db)) {
            errors.push(ERROR.User.EMAIL_ALREADY_IN_USE);
        }

        if (_.isEmpty(user.password)) {
            errors.push(ERROR.User.PASSOWRD_IS_REQUIRED);
        } else if (user.password.length < MINIMUM_PASSWORD_SIZE) {
            errors.push(ERROR.User.PASSOWRD_IS_TOO_SHORT);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {

            var isBootStrap = (getTotalUsers(db) === 0);

            var userCreate = Promise.promisify(db.models.User.create);

            var newUser = await (userCreate({
                    'name': user.name,
                    'surname': user.surname,
                    'phone': user.phone,
                    'email': user.email,
                    'password': md5(user.password),
                    'status_id': isBootStrap ? db.models.UserStatus.ACTIVE : db.models.UserStatus.NEW,
                    'admin': isBootStrap,
                    'emailVerified': isBootStrap
            }));

            await (jobService.createJob(jobService.TYPES.SEND_NEW_USER_EMAIL, 'Send new user e-mail', newUser).save());

            return newUser;
        }

    });
};

var remove = (id) => {
    return doReadWrite((db) => {
        var errors = [];

        if (!id) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            return new Promise((resolve, reject) => {
                db.models.User.find({ 'id': id }).remove((err) => {
                    if (err) reject(err);
                    resolve(true);
                });
            });

        }

    });

};

var checkSecurityForPatches = (patches, isAdmin) => {
    var errors = [];
    var hasPathAllowedOnlyForAdmin = false;

    var adminOnly = [
        '/admin', '/emailVerified', '/status',
        '/email'
    ];

    _(patches).forEach((patchOp) => {

        if (adminOnly.indexOf(patchOp.path) > -1) {
            hasPathAllowedOnlyForAdmin = true;
        }

    });

    if (hasPathAllowedOnlyForAdmin && !isAdmin) {
        errors.push(ERROR.Common.PATH_ALLOWED_ONLY_FOR_ADMIN);
    }

    return errors;

};

var applyPatchesForUser = (user, patches) => {

    _(patches).forEach((patchOp) => {

        switch (patchOp.path) {

            case  '/name':

                if (patchOp.op == 'replace') {
                    user.name = patchOp.value;
                }

            break;

            case  '/surname':

                if (patchOp.op == 'replace') {
                    user.surname = patchOp.value;
                }

            break;

            case  '/phone':

                if (patchOp.op == 'replace') {
                    user.phone = patchOp.value;
                }

            break;

            case  '/emailVerified':

                if (patchOp.op == 'replace') {
                    user.emailVerified = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    user.emailVerified = false;
                }

            break;

            case  '/password':

                if (patchOp.op == 'replace') {
                    user.password = cryptoUtil.encrypt(patchOp.value);
                }

            break;

            case  '/admin':

                if (patchOp.op == 'replace') {
                    user.admin = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    user.admin = false;
                }

            break;

            case  '/status':

                if (patchOp.op == 'replace') {
                    user.status_id = patchOp.value;
                }

            break;
        }

    });

};

var update = (userId, patches, isAdmin) => {
    return doReadWrite((db) => {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(patches)) {
            errors.push(ERROR.Common.PATCHES_ARE_REQUIRED);
        }

        errors = _.concat(errors, checkSecurityForPatches(patches, Boolean(isAdmin)));

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var userGet = Promise.promisify(db.models.User.get);
            var user = await (userGet(userId));

            applyPatchesForUser(user, patches);

            var userSave = Promise.promisify(user.save);
            return userSave();
        }

    });

};

module.exports = {
    getByEmailAndPassword: getByEmailAndPassword,
    getById: getById,
    getAll: getAll,
    create: create,
    remove: remove,
    update: update
};
