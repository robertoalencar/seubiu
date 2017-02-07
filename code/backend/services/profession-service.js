var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');
var ERROR = require('../utils/service-error-constants');

var getServicesByProfession = function(id) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!id) {
                errors.push(ERROR.Profession.PROFESSION_ID_IS_REQUIRED);
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.Service.find({'profession_id': id}, [ 'description', 'A' ], function (err, services) {
                    if (err) reject(err);
                    resolve(services);
                });

            }

        }));

    });

};

var getAll = function() {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            db.models.Profession.find({}, [ 'description', 'A' ], function (err, professions) {
                if (err) reject(err);
                resolve(professions);
            });

        }));

    });

};

var getById = function(id) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!id) {
                errors.push(ERROR.Profession.PROFESSION_ID_IS_REQUIRED);
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.Profession.get(id, function(err, profession) {
                    if (err) reject(err);
                    resolve(profession);
                });

            }

        }));

    });

};

module.exports = {

    getAll: getAll,
    getById: getById,
    getServicesByProfession: getServicesByProfession

};