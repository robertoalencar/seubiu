var Promise = require('promise');
var _ = require('lodash');
var transaction = require('../utils/orm-db-transaction');
var cryptoUtil = require('../utils/crypto-util');

var STATUS_NEW = 1;

var getByUsernameOrEmail = function(usernameOrEmail) {

    return new Promise(function (resolve, reject) {

        transaction.doReadOnly([
            function(db, t, done) {

                db.models.User.find({'emailVerified': true, or:[{'username': usernameOrEmail}, {'email': usernameOrEmail}]}, 1, function (err, users) {

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

var create = function(name, email, displayName, username, password) {

    return new Promise(function (resolve, reject) {

        transaction.doReadWrite([
            function(db, t, done){

                db.models.User.create(
                    {
                        'name': name,
                        'displayName': displayName,
                        'email': email,
                        'username': username,
                        'password': cryptoUtil.encrypt(password),
                        'status_id': STATUS_NEW
                    },
                    function(err, newUser) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(newUser);
                    }

                    done(err, db, t);

                });

            }
        ]);
    });

};

module.exports = {

    getByUsernameOrEmail: getByUsernameOrEmail,
    getById: getById,
    create: create

};