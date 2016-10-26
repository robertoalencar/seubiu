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
                errors.push('User ID is required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.UserProfile.find({'user_id': userId}, [], function (err, profiles) {
                    if (err) reject(err);
                    resolve(_.first(profiles));
                });

            }

        }));

    });
};

var applyPatchesForUpdate = function (profile, patches, db) {

    _(patches).forEach(function(patchOp) {

        switch (patchOp.path) {

            case  '/displayName':

                if (patchOp.op == 'replace') {
                    profile.displayName = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    profile.displayName = null;
                }

            break;

            case  '/about':

                if (patchOp.op == 'replace') {
                    profile.about = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    profile.about = null;
                }

            break;

            case  '/otherServices':

                if (patchOp.op == 'replace') {
                    profile.otherServices = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    profile.otherServices = false;
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
                errors.push('User ID is required');
            }

            if (_.isEmpty(patches)) {
                errors.push('Patches are required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.UserProfile.find({'user_id': userId}, [], function (err, profiles) {
                    if (err) reject(err);

                    var profile;

                    if (!_.isEmpty(profiles)) {
                        profile = _.first(profiles);
                    } else {
                        profile = new db.models.UserProfile({'user_id': userId});
                    }

                    applyPatchesForUpdate(profile, patches, db);

                    profile.save(function(err) {
                        if (err) reject(err);
                        resolve(profile);
                    });

                });

            }

        }));

    });

};

var setCities = function(userId, cityIds) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('User ID is required');
            }

            if (_.isEmpty(cityIds)) {
                errors.push('City IDs are required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.UserProfile.find({'user_id': userId}, [], function (err, profiles) {
                    if (err) reject(err);
                    if (_.isEmpty(profiles)) reject('User profile is required');

                    var profile = _.first(profiles);

                    db.models.City.find({'id': cityIds}, function(err, cities) {
                        if (err) reject(err);

                        profile.setCities(cities, function(err) {
                            if (err) reject(err);
                            resolve(true);
                        });

                    });

                });

            }

        }));

    });
};

var getCities = function(userId) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('User ID is required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.UserPreference.find({'user_id': userId}, [], function (err, profiles) {
                    if (err) reject(err);
                    if (_.isEmpty(profiles)) reject('User profile is required');

                    var profile = _.first(profiles);

                    profile.getCities(function(err, cities) {
                        if (err) reject(err);
                        resolve(cities);
                    });


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

                db.models.UserPreference.find({'user_id': userId}, [], function (err, profiles) {
                    if (err) reject(err);
                    if (_.isEmpty(profiles)) reject('User profile is required');

                    var profile = _.first(profiles);

                    db.models.Profession.find({'id': professionIds}, function(err, professions) {
                        if (err) reject(err);

                        profile.setProfessions(professions, function(err) {
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

                db.models.UserPreference.find({'user_id': userId}, [], function (err, profiles) {
                    if (err) reject(err);
                    if (_.isEmpty(profiles)) reject('User profil is required');

                    var profile = _.first(profiles);

                    profile.getProfessions(function(err, professions) {
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

                db.models.UserPreference.find({'user_id': userId}, [], function (err, profiles) {
                    if (err) reject(err);
                    if (_.isEmpty(profiles)) reject('User profile is required');

                    var profile = _.first(profiles);

                    db.models.Service.find({'id': servicesIds}, function(err, services) {
                        if (err) reject(err);

                        profile.setServices(services, function(err) {
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

                db.models.UserPreference.find({'user_id': userId}, [], function (err, profiles) {
                    if (err) reject(err);
                    if (_.isEmpty(profiles)) reject('User profile is required');

                    var profile = _.first(profiles);

                    profile.getServices(function(err, services) {
                        if (err) reject(err);
                        resolve(services);
                    });

                });

            }

        }));

    });
};


module.exports = {

    getById: getById,
    update: update,
    setCities: setCities,
    getCities: getCities,

    setProfessions: setProfessions,
    getProfessions: getProfessions,
    setServices: setServices,
    getServices: getServices

};