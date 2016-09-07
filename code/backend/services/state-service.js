var Promise = require('promise');
var _ = require('lodash');
var transaction = require('../utils/orm-db-transaction');

var getAll = function() {

    return new Promise(function (resolve, reject) {

        transaction.doReadOnly([
            function(db, t, done) {

                db.models.State.find({}, [ 'description', 'A' ], function (err, states) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(states);
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