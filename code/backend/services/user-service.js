var _ = require('lodash');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var md5 = require('md5');
var transaction = require('../utils/orm-db-transaction');
var ERROR = require('../utils/service-error-constants');

var MINIMUM_PASSWORD_SIZE = 8;

var getTotalUsers = function(db) {
    return await (new Promise(function (resolve, reject) {
        db.models.User.count({}, function (err, count) {
            if (err) reject(err);
            resolve(count);
        });
    }));
};

var getByEmailAndPassword = function(email, password) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (_.isEmpty(email)) {
                errors.push(ERROR.User.EMAIL_IS_REQUIRED);
            }

            if (_.isEmpty(password)) {
                errors.push(ERROR.User.PASSOWRD_IS_REQUIRED);
            }

            if (!_.isEmpty(errors)) {
                reject(errors);
            } else {
                //TODO: Add this filter when the email verification was implemented: , 'emailVerified': true
                db.models.User.find({'password': md5(password), 'email': email}, 1, function (err, users) {
                    if (err) reject(err);
                    resolve(_.first(users));
                });

            }

        }));

    });

};

var getById = function(id) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!id) {
                errors.push(ERROR.User.USER_ID_IS_REQUIRED);
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.User.get(id, function(err, user) {
                    if (err) reject(err);
                    resolve(user);
                });

            }

        }));

    });

};

var getAll = function() {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            db.models.User.find({}, [ 'name', 'A' ], function (err, users) {
                if (err) reject(err);
                resolve(users);
            });

        }));

    });

};

var phoneAlreadyInUse = function(phone, db) {
    return await (new Promise(function (resolve, reject) {
        db.models.User.exists({ 'phone': phone }, function (err, exists) {
            if (err) reject(err);
            resolve(exists);
        });
    }));
};

var emailAlreadyInUse = function(email, db) {
    return await (new Promise(function (resolve, reject) {
        db.models.User.exists({ 'email': email }, function (err, exists) {
            if (err) reject(err);
            resolve(exists);
        });
    }));
};

var create = function(user) {

    var task = function(db) {

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
            throw errors;
        } else {

            var isBootStrap = (getTotalUsers(db) === 0);

            var newUser = await (new Promise(function (resolve, reject) {
                db.models.User.create({
                    'name': user.name,
                    'surname': user.surname,
                    'phone': user.phone,
                    'email': user.email,
                    'password': md5(user.password),
                    'status_id': isBootStrap ? db.models.UserStatus.ACTIVE : db.models.UserStatus.NEW,
                    'admin': isBootStrap,
                    'emailVerified': isBootStrap
                }, function(err, newUser) {
                    if (err) reject(err);
                    resolve(newUser);
                });
            }));

            return newUser;
        }

    };

    return transaction.doReadWrite(task);

};

var remove = function(id) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!id) {
                errors.push(ERROR.User.USER_ID_IS_REQUIRED);
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.User.find({ 'id': id }).remove(function (err) {
                    if (err) reject(err);
                    resolve(true);
                });

            }

        }));

    });

};

var checkSecurityForPatches = function(patches, isAdmin){
    var errors = [];
    var hasPathAllowedOnlyForAdmin = false;

    var adminOnly = [
        '/admin', '/emailVerified', '/status',
        '/email'
    ];

    _(patches).forEach(function(patchOp) {

        if (adminOnly.indexOf(patchOp.path) > -1) {
            hasPathAllowedOnlyForAdmin = true;
        }

    });

    if (hasPathAllowedOnlyForAdmin && !isAdmin) {
        errors.push(ERROR.Common.PATH_ALLOWED_ONLY_FOR_ADMIN);
    }

    return errors;

};

var applyPatchesForUser = function(user, patches) {

    _(patches).forEach(function(patchOp) {

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

var update = function(userId, patches, isAdmin) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push(ERROR.User.USER_ID_IS_REQUIRED);
            }

            if (_.isEmpty(patches)) {
                errors.push(ERROR.Common.PATCHES_ARE_REQUIRED);
            }

            errors = _.concat(errors, checkSecurityForPatches(patches, Boolean(isAdmin)));

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.User.get(userId, function(err, user) {
                    if (err) {
                        reject(err);
                    } else {

                        applyPatchesForUser(user, patches);

                        user.save(function(err) {
                            if (err) reject(err);
                            resolve(user);
                        });

                    }

                });

            }

        }));

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
