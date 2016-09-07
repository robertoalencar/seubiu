var Promise = require('promise');
var _ = require('lodash');
var transaction = require('../utils/orm-db-transaction');

var getServicesByProfession = function(id) {

    return new Promise(function (resolve, reject) {

        var errors = [];

        if (!id) {
            errors.push('Profession ID is required');
        }

        if (errors.length != 0) {

            reject(errors);

        } else {

            transaction.doReadOnly([
                function(db, t, done) {

                    db.models.Service.find({'profession_id': id}, [ 'description', 'A' ], function (err, services) {

                        if (err) {
                            reject(err);
                        } else {
                            resolve(services);
                        }

                        done(err, db, t);

                    });

                }
            ]);

        }

    });

};

var getAll = function() {

    return new Promise(function (resolve, reject) {

        transaction.doReadOnly([
            function(db, t, done) {

                db.models.Profession.find({}, [ 'description', 'A' ], function (err, professions) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(professions);
                    }

                    done(err, db, t);

                });

            }
        ]);
    });

};

var getById = function(id) {

    return new Promise(function (resolve, reject) {

        var errors = [];

        if (!id) {
            errors.push('Profession ID is required');
        }

        if (errors.length != 0) {

            reject(errors);

        } else {

            transaction.doReadOnly([
                function(db, t, done) {

                    db.models.Profession.get(id, function(err, profession) {

                        if (err) {
                            reject(err);
                        } else {
                            resolve(profession);
                        }

                        done(err, db, t);

                    });

                }
            ]);

        }

    });

};

module.exports = {

    getAll: getAll,
    getById: getById,
    getServicesByProfession: getServicesByProfession

};