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

var getAll = function() {

    return new Promise(function (resolve, reject) {

        transaction.doReadOnly([
            function(db, t, done) {

                db.models.User.find({}, [ 'name', 'A' ], function (err, users) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(users);
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

var remove = function(id) {

    return new Promise(function (resolve, reject) {

        transaction.doReadWrite([
            function(db, t, done){

                db.models.User.find({ 'id': id }).remove(function (err) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }

                    done(err, db, t);

                });

            }
        ]);
    });

};

var getAddresses = function(id) {

    return new Promise(function (resolve, reject) {

        transaction.doReadOnly([
            function(db, t, done) {

                db.models.UserAddress.find({'user_id': id}, [ 'description', 'A' ], function (err, addresses) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(addresses);
                    }

                    done(err, db, t);

                });

            }
        ]);
    });

};

var getAddress = function(userId, addressId) {

    return new Promise(function (resolve, reject) {

        transaction.doReadOnly([
            function(db, t, done) {

                db.models.UserAddress.find({'user_id': userId, 'id': addressId}, 1, function (err, addresses) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(_.first(addresses));
                    }

                    done(err, db, t);

                });

            }
        ]);
    });

};

var removeAddress = function(userId, addressId) {

    return new Promise(function (resolve, reject) {

        transaction.doReadWrite([
            function(db, t, done){

                db.models.UserAddress.find({'user_id': userId, 'id': addressId}).remove(function (err) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }

                    done(err, db, t);

                });

            }
        ]);
    });

};

var createAddress = function(userId, description, main, zipCode, address, number, district, cityId, stateId, countryId) {

    return new Promise(function (resolve, reject) {

        transaction.doReadWrite([
            function(db, t, done){

                db.models.UserAddress.create(
                    {
                        'description': description,
                        'main': Boolean(main),
                        'zipCode': zipCode,
                        'address': address,
                        'number': number,
                        'district': district,
                        'user_id': userId,
                        'city_id': cityId,
                        'state_id': stateId,
                        'country_id': countryId
                    },
                    function(err, newAddress) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(newAddress);
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
    getAll: getAll,
    create: create,
    remove: remove,
    createAddress: createAddress,
    getAddresses: getAddresses,
    getAddress: getAddress,
    removeAddress: removeAddress

};