var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var md5 = require('md5');
var transaction = require('../utils/orm-db-transaction');

var STATUS_NEW = 1;
var MINIMUM_PASSWORD_SIZE = 8;

var getByUsernameOrEmail = function(usernameOrEmail, password) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (_.isEmpty(usernameOrEmail)) {
                errors.push('Username or email is required');
            }

            if (_.isEmpty(password)) {
                errors.push('Password is required');
            }

            if (!_.isEmpty(errors)) {
                reject(_.join(errors, ', '));
            } else {

                db.models.User.find({'password': md5(password), or:[{'username': usernameOrEmail}, {'email': usernameOrEmail}]}, 1, function (err, users) {
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
                errors.push('User ID is required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

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

var emailAlreadyInUse = function(email, db) {
    return await (new Promise(function (resolve, reject) {
        db.models.User.exists({ 'email': email }, function (err, exists) {
            if (err) reject(err);
            resolve(exists);
        });
    }));
};

var usernameAlreadyInUse = function(username, db) {
    return await (new Promise(function (resolve, reject) {
        db.models.User.exists({ 'username': username }, function (err, exists) {
            if (err) reject(err);
            resolve(exists);
        });
    }));
};

var create = function(name, email, displayName, username, password) {

    var task = function(db) {

        var errors = [];

        if (_.isEmpty(name)) {
            errors.push('Name is required');
        }

        if (_.isEmpty(email)) {
            errors.push('Email is required');
        } else if (emailAlreadyInUse(email, db)) {
            errors.push('Email already in use');
        }

        if (!_.isEmpty(username) && usernameAlreadyInUse(username, db)) {
            errors.push('Username already in use');
        }

        if (_.isEmpty(password)) {
            errors.push('Password is required');
        } else if (password.length < MINIMUM_PASSWORD_SIZE) {
            errors.push('Password is too short: < ' + MINIMUM_PASSWORD_SIZE);
        }

        if (!_.isEmpty(errors)) {
            throw new Error(_.join(errors, ', '));
        } else {

            var newUser = await (new Promise(function (resolve, reject) {
                db.models.User.create({
                    'name': name,
                    'displayName': displayName,
                    'email': email,
                    'username': username,
                    'password': md5(password),
                    'status_id': STATUS_NEW,
                    'admin': false,
                    'emailVerified': true
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
                errors.push('User ID is required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.User.find({ 'id': id }).remove(function (err) {
                    if (err) reject(err);
                    resolve(true);
                });

            }

        }));

    });

};

var setProfessions = function(userId, professionIds) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('User ID is required');
            }

            if (_.isEmpty(professionIds)) {
                errors.push('Profession IDs are required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.User.get(userId, function(err, user) {
                    if (err) reject(err);

                    db.models.Profession.find({'id': professionIds}, function(err, professions) {
                        if (err) reject(err);

                        user.setProfessions(professions, function(err) {
                            if (err) reject(err);
                            resolve(true);
                        });

                    });

                });

            }

        }));

    });
};

var getProfessions = function(userId) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('User ID is required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.User.get(userId, function(err, user) {
                    if (err) reject(err);

                    user.getProfessions(function(err, professions) {
                        if (err) reject(err);
                        resolve(professions);
                    });

                });

            }

        }));

    });
};

var setServices = function(userId, servicesIds) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('User ID is required');
            }

            if (_.isEmpty(servicesIds)) {
                errors.push('Service IDs are required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.User.get(userId, function(err, user) {
                    if (err) reject(err);

                    db.models.Service.find({'id': servicesIds}, function(err, services) {
                        if (err) reject(err);

                        user.setServices(services, function(err) {
                            if (err) reject(err);
                            resolve(true);
                        });

                    });

                });

            }

        }));

    });
};

var getServices = function(userId) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('User ID is required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.User.get(userId, function(err, user) {
                    if (err) reject(err);

                    user.getServices(function(err, services) {
                        if (err) reject(err);
                        resolve(services);
                    });

                });

            }

        }));

    });
};

var checkSecurityForPatches = function(patches, isAdmin){
    var errors = [];
    var hasPathAllowedOnlyForAdmin = false;

    _(patches).forEach(function(patchOp) {

        if (patchOp.path == '/admin' || patchOp.path == '/emailVerified' || patchOp.path == '/status') {
            hasPathAllowedOnlyForAdmin = true;
        }

    });

    if (hasPathAllowedOnlyForAdmin && !isAdmin) {
        errors.push('Path allowed only for administrators');
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

            case  '/displayName':

                if (patchOp.op == 'replace') {
                    user.displayName = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    user.displayName = '';
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
                errors.push('User ID is required');
            }

            if (_.isEmpty(patches)) {
                errors.push('Patches are required');
            }

            errors = _.concat(errors, checkSecurityForPatches(patches, Boolean(isAdmin)));

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.User.get(userId, function(err, user) {
                    if (err) reject(err);

                    applyPatchesForUser(user, patches);

                    user.save(function(err) {
                        if (err) reject(err);
                        resolve(user);
                    });

                });

            }

        }));

    });

};

module.exports = {

    getByUsernameOrEmail: getByUsernameOrEmail,
    getById: getById,
    getAll: getAll,
    create: create,
    remove: remove,
    update: update,

    setProfessions: setProfessions,
    getProfessions: getProfessions,
    setServices: setServices,
    getServices: getServices

};