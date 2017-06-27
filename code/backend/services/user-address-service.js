const _ = require('lodash');
const await = require('asyncawait/await');
const Promise = require('bluebird');
const doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
const doReadWrite = require('../utils/orm-db-transaction').doReadWrite;
const ERROR = require('../utils/service-error-constants');
const ServiceException = require('../utils/service-exception');

const getByFilter = (filter, db) => {
    const userAddressFind = Promise.promisify(db.models.UserAddress.find);
    return userAddressFind(filter, [ 'description', 'A' ]);
};


const getAllByUserId = (id) => {
    return doReadOnly((db) => {
        let errors = [];

        if (!id) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            return getByFilter({'user_id': id}, db);
        }

    });

};

const getById = (userId, addressId) => {
    return doReadOnly((db) => {
        let errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!addressId) {
            errors.push(ERROR.UserAddress.ADDRESS_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            let userAddresses = await(getByFilter({'user_id': userId, 'id': addressId}, db));
            return _.first(userAddresses);
        }

    });

};

const remove = (userId, addressId) => {
    return doReadWrite((db) => {
        let errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!addressId) {
            errors.push(ERROR.UserAddress.ADDRESS_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {

            return new Promise((resolve, reject) => {

                db.models.UserAddress.find({'user_id': userId, 'id': addressId}).remove((err) => {
                    if (err) reject(err);
                    resolve(true);
                });

            });

        }

    });

};

const create = (userId, addr) => {
    return doReadWrite((db) => {
        let errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(addr.description)) {
            errors.push(ERROR.UserAddress.DESCRIPTION_IS_REQUIRED);
        }

        if (_.isNil(addr.main)) {
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
            throw ServiceException(errors);
        } else {

            const userAddressCreate = Promise.promisify(db.models.UserAddress.create);
            return  userAddressCreate(
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
            });
        }

    });

};

const applyPatchesForAddress = (address, patches) => {

    _(patches).forEach((patchOp) => {

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

const update = (userId, addressId, patches) => {
    return doReadWrite((db) => {
        let errors = [];

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
            throw ServiceException(errors);
        } else {

            let userAddresses = await (getByFilter({'user_id': userId, 'id': addressId}, db));
            let userAddress = _.first(userAddresses);

            applyPatchesForAddress(userAddress, patches);

            const userAddressSave = Promise.promisify(userAddress.save);
            return userAddressSave();
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