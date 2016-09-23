var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');

var getAll = function() {

    return transaction.doReadOnly(function(db) {

        var cities = await (new Promise(function (resolve, reject) {

            db.models.City.find({}, [ 'description', 'A' ], function (err, cities) {
                if (err) reject(err);
                resolve(cities);
            });

        }));

        return cities;

    });

};

module.exports = {

    getAll: getAll

};