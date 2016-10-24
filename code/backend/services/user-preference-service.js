var _ = require('lodash');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');

var ERROR_PREFERENCE_REQUIRED = 'User preference is required';

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

                db.models.UserPreference.find({'user_id': userId}, [], function (err, preferences) {
                    if (err) reject(err);
                    resolve(_.first(preferences));
                });

            }

        }));

    });
};

var applyPatchesForUserPreference = function (preference, patches, db) {

    _(patches).forEach(function(patchOp) {

        switch (patchOp.path) {

            case  '/otherServices':

                if (patchOp.op == 'replace') {
                    preference.otherServices = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    preference.otherServices = false;
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

                db.models.UserPreference.find({'user_id': userId}, [], function (err, preferences) {
                    if (err) reject(err);

                    var preference;

                    if (!_.isEmpty(preferences)) {
                        preference = _.first(preferences);
                    } else {
                        preference = new db.models.UserPreference({'user_id': userId});
                    }

                    applyPatchesForUserPreference(preference, patches, db);

                    preference.save(function(err) {
                        if (err) reject(err);
                        resolve(preference);
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

                db.models.UserPreference.find({'user_id': userId}, [], function (err, preferences) {
                    if (err) reject(err);
                    if (_.isEmpty(preferences)) reject('User preference is required');

                    var preference = _.first(preferences);

                    db.models.City.find({'id': cityIds}, function(err, cities) {
                        if (err) reject(err);

                        preference.setCities(cities, function(err) {
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

                db.models.UserPreference.find({'user_id': userId}, [], function (err, preferences) {
                    if (err) reject(err);
                    if (_.isEmpty(preferences)) reject('User preference is required');

                    var preference = _.first(preferences);

                    preference.getCities(function(err, cities) {
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

                db.models.UserPreference.find({'user_id': userId}, [], function (err, preferences) {
                    if (err) reject(err);
                    if (_.isEmpty(preferences)) reject('User preference is required');

                    var preference = _.first(preferences);

                    db.models.Profession.find({'id': professionIds}, function(err, professions) {
                        if (err) reject(err);

                        preference.setProfessions(professions, function(err) {
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

                db.models.UserPreference.find({'user_id': userId}, [], function (err, preferences) {
                    if (err) reject(err);
                    if (_.isEmpty(preferences)) reject('User preference is required');

                    var preference = _.first(preferences);

                    preference.getProfessions(function(err, professions) {
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

                db.models.UserPreference.find({'user_id': userId}, [], function (err, preferences) {
                    if (err) reject(err);
                    if (_.isEmpty(preferences)) reject('User preference is required');

                    var preference = _.first(preferences);

                    db.models.Service.find({'id': servicesIds}, function(err, services) {
                        if (err) reject(err);

                        preference.setServices(services, function(err) {
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

                db.models.UserPreference.find({'user_id': userId}, [], function (err, preferences) {
                    if (err) reject(err);
                    if (_.isEmpty(preferences)) reject('User preference is required');

                    var preference = _.first(preferences);

                    preference.getServices(function(err, services) {
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