var Promise = require('promise');
var _ = require('lodash');
var transaction = require('../utils/orm-db-transaction');
var cryptoUtil = require('../utils/crypto-util');

var STATUS_NEW = 1;
var MINIMUM_PASSWORD_SIZE = 8;


var getByUsernameOrEmail = function(usernameOrEmail) {

    return new Promise(function (resolve, reject) {

        transaction.doReadOnly([
            function(db, t, done) {

                db.models.User.find({or:[{'username': usernameOrEmail}, {'email': usernameOrEmail}]}, 1, function (err, users) {

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

        var errors = [];

        if (!id) {
            errors.push('User ID is required');
        }

        if (errors.length != 0) {

            reject(errors);

        } else {

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

        }

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

        var errors = [];

        if (_.isEmpty(name)) {
            errors.push('Name is required');
        }

        if (_.isEmpty(email)) {
            errors.push('Email is required');
        }

        if (_.isEmpty(username)) {
            errors.push('Username is required');
        }

        if (_.isEmpty(password)) {
            errors.push('Password is required');
        } else if (password.length < MINIMUM_PASSWORD_SIZE) {
            errors.push('Password is too short: < ' + MINIMUM_PASSWORD_SIZE);
        }

        if (errors.length != 0) {

            reject(errors);

        } else {

            transaction.doReadWrite([
                function(db, t, done){

                    db.models.User.exists({ 'username': username }, function (err, exists) {
                        if (err) {
                            reject(err);
                            done(err, db, t);
                        } else if (exists) {
                            err = ['Username already in use'];
                            reject(err);
                            done(err, db, t);
                        } else {
                            done(err, db, t);
                        }
                    });

                },
                function(db, t, done){

                    db.models.User.exists({ 'email': email }, function (err, exists) {
                        if (err) {
                            reject(err);
                            done(err, db, t);
                        } else if (exists) {
                            err = ['Email already in use'];
                            reject(err);
                            done(err, db, t);
                        } else {
                            done(err, db, t);
                        }
                    });

                },
                function(db, t, done){

                    db.models.User.create(
                        {
                            'name': name,
                            'displayName': displayName,
                            'email': email,
                            'username': username,
                            'password': cryptoUtil.encrypt(password),
                            'status_id': STATUS_NEW,
                            'admin': false,
                            'emailVerified': true
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

        }

    });

};

var remove = function(id) {

    return new Promise(function (resolve, reject) {

        var errors = [];

        if (!id) {
            errors.push('User ID is required');
        }

        if (errors.length != 0) {

            reject(errors);

        } else {
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
        }

    });

};

var getAddresses = function(id) {

    return new Promise(function (resolve, reject) {

        var errors = [];

        if (!id) {
            errors.push('User ID is required');
        }

        if (errors.length != 0) {

            reject(errors);

        } else {

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

        }

    });

};

var getAddress = function(userId, addressId) {

    return new Promise(function (resolve, reject) {

        var errors = [];

        if (!userId) {
            errors.push('User ID is required');
        }

        if (!addressId) {
            errors.push('Address ID is required');
        }

        if (errors.length != 0) {

            reject(errors);

        } else {

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
        }

    });

};

var removeAddress = function(userId, addressId) {

    return new Promise(function (resolve, reject) {

        var errors = [];

        if (!userId) {
            errors.push('User ID is required');
        }

        if (!addressId) {
            errors.push('Address ID is required');
        }

        if (errors.length != 0) {

            reject(errors);

        } else {

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
        }

    });

};

var createAddress = function(userId, description, main, zipCode, address, number, complement,
                district, reference, cityId, stateId, countryId) {

    return new Promise(function (resolve, reject) {

        var errors = [];

        if (!userId) {
            errors.push("User ID is required");
        }

        if (_.isEmpty(description)) {
            errors.push("Description is required");
        }

        if (_.isEmpty(main)) {
            errors.push("Main is required");
        }

        if (!zipCode) {
            errors.push("ZipCode is required");
        }

        if (_.isEmpty(address)) {
            errors.push("Address is required");
        }

        if (!number) {
            errors.push("Number is required");
        }

        if (_.isEmpty(district)) {
            errors.push("District is required");
        }

        if (!cityId) {
            errors.push("City ID is required");
        }

        if (!stateId) {
            errors.push("State Id is required");
        }

        if (!countryId) {
            errors.push("Country ID is required");
        }

        if (errors.length != 0) {

            reject(errors);

        } else {

            transaction.doReadWrite([
                function(db, t, done){

                    db.models.UserAddress.create(
                        {
                            'description': description,
                            'main': Boolean(main),
                            'zipCode': zipCode,
                            'address': address,
                            'number': number,
                            'complement': complement,
                            'district': district,
                            'reference': reference,
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

        }

    });

};

var setProfessions = function(userId, professionIds) {

    return new Promise(function (resolve, reject) {

        var errors = [];

        if (!userId) {
            errors.push('User ID is required');
        }

        if (_.isEmpty(professionIds)) {
            errors.push('Profession IDs are required');
        }

        if (errors.length != 0) {

            reject(errors);

        } else {

            transaction.doReadWrite([
                function(db, t, done) {

                    db.models.User.get(userId, function(err, user) {

                        if (err) {
                            reject(err);
                            done(err, db, t);
                        } else {
                            done(err, db, t, user);
                        }

                    });

                },
                function(db, t, user, done) {

                    db.models.Profession.find({'id': professionIds}, function(err, professions) {

                        if (err) {
                            reject(err);
                            done(err, db, t);
                        } else {
                            done(err, db, t, user, professions);
                        }

                    });

                },
                function(db, t, user, professions, done) {

                    user.setProfessions(professions, function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(true);
                        }

                        done(err, db, t);
                    });

                }
            ]);
        }

    });
};

var getProfessions = function(userId) {
    return new Promise(function (resolve, reject) {

        var errors = [];

        if (!userId) {
            errors.push('User ID is required');
        }

        if (errors.length != 0) {

            reject(errors);

        } else {

            transaction.doReadOnly([
                function(db, t, done) {

                    db.models.User.get(userId, function(err, user) {

                        if (err) {
                            reject(err);
                            done(err, db, t);
                        } else {
                            done(err, db, t, user);
                        }

                    });

                },
                function(db, t, user, done) {

                    user.getProfessions(function(err, professions) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(professions);
                        }

                        done(err, db, t);
                    });

                }
            ]);
        }

    });
};

var setServices = function(userId, servicesIds) {

    return new Promise(function (resolve, reject) {

        var errors = [];

        if (!userId) {
            errors.push('User ID is required');
        }

        if (_.isEmpty(servicesIds)) {
            errors.push('Service IDs are required');
        }

        if (errors.length != 0) {

            reject(errors);

        } else {

            transaction.doReadWrite([
                function(db, t, done) {

                    db.models.User.get(userId, function(err, user) {

                        if (err) {
                            reject(err);
                            done(err, db, t);
                        } else {
                            done(err, db, t, user);
                        }

                    });

                },
                function(db, t, user, done) {

                    db.models.Service.find({'id': servicesIds}, function(err, services) {

                        if (err) {
                            reject(err);
                            done(err, db, t);
                        } else {
                            done(err, db, t, user, services);
                        }

                    });

                },
                function(db, t, user, services, done) {

                    user.setServices(services, function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(true);
                        }

                        done(err, db, t);
                    });

                }
            ]);
        }

    });
};

var getServices = function(userId) {
    return new Promise(function (resolve, reject) {

        var errors = [];

        if (!userId) {
            errors.push('User ID is required');
        }

        if (errors.length != 0) {

            reject(errors);

        } else {

            transaction.doReadOnly([
                function(db, t, done) {

                    db.models.User.get(userId, function(err, user) {

                        if (err) {
                            reject(err);
                            done(err, db, t);
                        } else {
                            done(err, db, t, user);
                        }

                    });

                },
                function(db, t, user, done) {

                    user.getServices(function(err, services) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(services);
                        }

                        done(err, db, t);
                    });

                }
            ]);
        }

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
    removeAddress: removeAddress,
    setProfessions: setProfessions,
    getProfessions: getProfessions,
    setServices: setServices,
    getServices: getServices

};