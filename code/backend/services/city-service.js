var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');

var getByFilter = function(filter, db, reject, resolve) {

    db.models.City.find(filter, [ 'description', 'A' ], function (err, cities) {
        if (err) reject(err);
        resolve(cities);
    });

};

var getAll = function() {
    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            getByFilter({}, db, reject, resolve);

        }));

    });
};

var getCitiesByState = function(idState) {
    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!idState) {
                errors.push('State ID is required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                getByFilter({'state_id':idState}, db, reject, resolve);

            }

        }));

    });
};

module.exports = {

    getAll: getAll,
    getCitiesByState: getCitiesByState

};