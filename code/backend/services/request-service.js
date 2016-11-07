var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');

var getByFilter = function(filter, db, reject, resolve) {

    db.models.Request.find(filter, [ 'description', 'A' ], function (err, requests) {
        if (err) reject(err);
        resolve(requests);
    });

};

var getAll = function(filter) {
    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            getByFilter(filter, db, reject, resolve);

        }));

    });
};

var getByOwner = function(userId) {
    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('USER_ID_IS_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {
                getByFilter({'owner_id':userId}, db, reject, resolve);
            }

        }));

    });
};

var create = function(userId, request) {
    //TODO: Implement this...

};

module.exports = {

    getAll: getAll,
    getByOwner: getByOwner,
    create: create

};