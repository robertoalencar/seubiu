var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');

var getAll = function() {

    var task = function(db) {

        var countries = await (new Promise(function (resolve, reject) {

            db.models.Country.find({}, [ 'description', 'A' ], function (err, countries) {
                if (err) reject(err);
                resolve(countries);
            });

        }));

        return countries;

    };

    return transaction.doReadOnly(task);

};

module.exports = {

    getAll: getAll

};