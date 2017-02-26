var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');
var ERROR = require('../utils/service-error-constants');

var getByFilter = function(filter, db) {
    var userAddressFind = Promise.promisify(db.models.UserAddress.find);
    return userAddressFind(filter, [ 'description', 'A' ]);
};


var getAllByUserId = function(id) {
    return transaction.doReadOnly(function(db) {
        var errors = [];

        if (!id) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {
            return await(getByFilter({'user_id': id}, db));
        }

    });

};

var getById = function(userId, addressId) {
    return transaction.doReadOnly(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!addressId) {
            errors.push(ERROR.UserAddress.ADDRESS_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {
            var userAddresses = await(getByFilter({'user_id': userId, 'id': addressId}, db));
            return _.first(userAddresses);
        }

    });

};

var remove = function(userId, addressId) {
    return transaction.doReadWrite(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!addressId) {
            errors.push(ERROR.UserAddress.ADDRESS_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {

            await (new Promise(function (resolve, reject) {

                db.models.UserAddress.find({'user_id': userId, 'id': addressId}).remove(function (err) {
                    if (err) reject(err);
                    resolve(true);
                });

            }));

        }

    });

};

var create = function(userId, addr) {
    return transaction.doReadWrite(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(addr.description)) {
            errors.push(ERROR.UserAddress.DESCRIPTION_IS_REQUIRED);
        }

        if (_.isEmpty(addr.main)) {
           errors.push(ERROR.UserAddress.MAIN_IS_REQUIRED);
        }

        if (!addr.zipCode) {
            errors.push(ERROR.UserAddress.ZIPCODE_IS_REQUIRED);
        }

        if (_.isEmpty(addr.address)) {
            errors.push(ERROR.UserAddress.ADDRESS_IS_REQUIRED);
        }

        if (!addr.number) {
            errors.push(ERROR.UserAddress.NUMBER_IS_REQUIRED);
        }

        if (_.isEmpty(addr.district)) {
            errors.push(ERROR.UserAddress.DISTRICT_IS_REQUIRED);
        }

        if (!addr.cityId) {
            errors.push(ERROR.City.CITY_ID_IS_REQUIRED);
        }

        if (!addr.stateId) {
            errors.push(ERROR.State.STATE_ID_IS_REQUIRED);
        }

        if (!addr.countryId) {
            errors.push(ERROR.Country.COUNTRY_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {

            var userAddressCreate = Promise.promisify(db.models.UserAddress.create);
            return await (userAddressCreate(
            {
                'description': addr.description,
                'main': Boolean(addr.main),
                'zipCode': addr.zipCode,
                'address': addr.address,
                'number': addr.number,
                'complement': addr.complement,
                'district': addr.district,
                'reference': addr.reference,
                'user_id': userId,
                'city_id': addr.cityId,
                'state_id': addr.stateId,
                'country_id': addr.countryId
            }));
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

var update = function(userId, addressId, patches) {
    return transaction.doReadWrite(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!addressId) {
            errors.push(ERROR.UserAddress.ADDRESS_ID_IS_REQUIRED);
        }

        if (_.isEmpty(patches)) {
            errors.push(ERROR.Common.PATCHES_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {

            var userAddresses = await (getByFilter({'user_id': userId, 'id': addressId}, db));
            var userAddress = _.first(userAddresses);

            applyPatchesForAddress(userAddress, patches);

            var userAddressSave = Promise.promisify(userAddress.save);
            return await(userAddressSave());
        }

    });

};


module.exports = {
    create: create,
    getAllByUserId: getAllByUserId,
    getById: getById,
    remove: remove,
    update: update
};