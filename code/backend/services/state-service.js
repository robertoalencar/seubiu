var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');

var getByFilter = function(filter, db, reject, resolve) {

    db.models.State.find(filter, [ 'description', 'A' ], function (err, states) {
        if (err) reject(err);
        resolve(states);
    });

};

var getAll = function() {
    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            getByFilter({}, db, reject, resolve);

        }));

    });
};

var getStatesByCountry = function(idCountry) {
    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!idCountry) {
                errors.push('COUNTRY_ID_IS_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                getByFilter({'country_id':idCountry}, db, reject, resolve);

            }

        }));

    });
};

module.exports = {

    getAll: getAll,
    getStatesByCountry: getStatesByCountry

};