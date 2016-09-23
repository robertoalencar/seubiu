var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');

var getAll = function() {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            db.models.State.find({}, [ 'description', 'A' ], function (err, states) {
                if (err) reject(err);
                resolve(states);
            });

        }));

    });

};

module.exports = {

    getAll: getAll

};