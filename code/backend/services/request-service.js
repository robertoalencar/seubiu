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

var getAll = function() {
    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            getByFilter({}, db, reject, resolve);

        }));

    });
};


module.exports = {

    getAll: getAll

};