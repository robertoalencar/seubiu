var Promise = require('promise');
var _ = require('lodash');
var transaction = require('../utils/orm-db-transaction');

var getAll = function() {

    return new Promise(function (resolve, reject) {

        transaction.doReadOnly([
            function(db, t, done) {

                db.models.City.find({}, [ 'description', 'A' ], function (err, cities) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(cities);
                    }

                    done(err, db, t);

                });

            }
        ]);
    });

};

module.exports = {

    getAll: getAll

};