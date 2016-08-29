var Promise = require('promise');
var md5 = require('md5');
var _ = require('lodash');
var transaction = require('../utils/orm-db-transaction');

var getByEmailAndPassword = function(email, password) {

    return new Promise(function (resolve, reject) {

        transaction.doReadOnly([
            function(db, t, done) {

                db.models.User.find({ email: email, password: md5(password), emailVerified: true }, 1, function (err, users) {

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

    getByEmailAndPassword: getByEmailAndPassword,
    getById: getById

};