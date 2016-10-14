var _ = require('lodash');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');

var getPreference = function(userId) {

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

var updatePreference = function(userId, patches) {

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

var setUserPreferenceCities = function(userId, cityIds) {

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

var getUserPreferenceCities = function(userId) {

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


module.exports = {

    getPreference: getPreference,
    updatePreference: updatePreference,
    setUserPreferenceCities: setUserPreferenceCities,
    getUserPreferenceCities: getUserPreferenceCities

};