var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');

var checkSecurityForFilter = function(filter, isAdmin){
    var errors = [];
    var hasFieldAllowedOnlyForAdmin = false;

    _(filter).forEach(function(field) {

        if (field == '/admin' || patchOp.path == '/emailVerified' || patchOp.path == '/status') {
            hasFieldAllowedOnlyForAdmin = true;
        }

    });

    if (hasFieldAllowedOnlyForAdmin && !isAdmin) {
        errors.push('Field allowed only for administrators');
    }

    return errors;

};

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


module.exports = {

    getAll: getAll

};