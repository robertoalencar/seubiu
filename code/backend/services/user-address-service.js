var Promise = require('promise');
var _ = require('lodash');
var transaction = require('../utils/orm-db-transaction');

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

var applyPatchesForAddress = function(address, patches) {

    _(patches).forEach(function(patchOp) {

        switch (patchOp.path) {

            case  '/description':

                if (patchOp.op == 'replace') {
                    address.description = patchOp.value;
                }

            break;

            case  '/main':

                if (patchOp.op == 'replace') {
                    address.main = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    address.main = false;
                }

            break;

            case  '/zipCode':

                if (patchOp.op == 'replace') {
                    address.zipCode = patchOp.value;
                }

            break;

            case  '/address':

                if (patchOp.op == 'replace') {
                    address.address = patchOp.value;
                }

            break;

            case  '/number':

                if (patchOp.op == 'replace') {
                    address.number = patchOp.value;
                }

            break;

            case  '/complement':

                if (patchOp.op == 'replace') {
                    address.complement = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    address.complement = null;
                }

            break;

            case  '/district':

                if (patchOp.op == 'replace') {
                    address.district = patchOp.value;
                }

            break;

            case  '/reference':

                if (patchOp.op == 'replace') {
                    address.reference = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    address.reference = null;
                }

            break;

            case  '/city':

                if (patchOp.op == 'replace') {
                    address.city_id = patchOp.value;
                }

            break;

            case  '/state':

                if (patchOp.op == 'replace') {
                    address.state_id = patchOp.value;
                }

            break;

            case  '/country':

                if (patchOp.op == 'replace') {
                    address.country_id = patchOp.value;
                }

            break;

        }

    });

};

var updateAddress = function(userId, addressId, patches) {

     return new Promise(function (resolve, reject) {

        var errors = [];

        if (!userId) {
            errors.push('User ID is required');
        }

        if (!addressId) {
            errors.push('Address ID is required');
        }

        if (_.isEmpty(patches)) {
            errors.push('Patches are required');
        }

        if (!_.isEmpty(errors)) {

            reject(errors);

        } else {

            transaction.doReadWrite([
                function(db, t, done) {

                    db.models.UserAddress.find({'user_id': userId, 'id': addressId}, 1, function (err, addresses) {

                        if (err) {
                            reject(err);
                            done(err, db, t);
                        } else {
                            var address = _.first(addresses);
                            resolve(address);
                            done(err, db, t, address);
                        }

                    });

                },
                function(db, t, address, done) {

                    applyPatchesForAddress(address, patches);

                    address.save(function(err) {

                        if (err) {
                            reject(err);
                        } else {
                            resolve(address);
                        }

                        done(err, db, t);

                    });

                }
            ]);

        }

    });

};


module.exports = {

    createAddress: createAddress,
    getAddresses: getAddresses,
    getAddress: getAddress,
    removeAddress: removeAddress,
    updateAddress: updateAddress,

};