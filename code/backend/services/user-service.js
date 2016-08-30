var Promise = require('promise');
var _ = require('lodash');
var transaction = require('../utils/orm-db-transaction');

var getByEmail = function(email) {

    return new Promise(function (resolve, reject) {

        transaction.doReadOnly([
            function(db, t, done) {

                db.models.User.find({ email: email, emailVerified: true }, 1, function (err, users) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(_.first(users));
                    }

                    done(err, db, t);

                });

            }
        ]);
    });

};

var getById = function(id) {

    return new Promise(function (resolve, reject) {

        transaction.doReadOnly([
            function(db, t, done) {

                db.models.User.get(id, function(err, user) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(user);
                    }

                    done(err, db, t);

                });

            }
        ]);
    });

};

module.exports = {

    getByEmail: getByEmail,
    getById: getById

};