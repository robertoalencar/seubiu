const _ = require('lodash');
const Promise = require('bluebird');
const doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
const ERROR = require('../utils/service-error-constants');
const ServiceException = require('../utils/service-exception');

const getByFilter = (filter, db) => {
    const professionFind = Promise.promisify(db.models.Profession.find);
    return professionFind(filter, [ 'description', 'A' ]);
};

const getAll = () => {
    return doReadOnly((db) => {
        return getByFilter({}, db);
    });
};

const getServicesByProfession = (id) => {
    return doReadOnly((db) => {
        let errors = [];

        if (!id) {
            errors.push(ERROR.Profession.PROFESSION_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            const serviceFind = Promise.promisify(db.models.Service.find);
            return serviceFind({'profession_id':id});
        }

    });

};

const getById = (id) => {
    return doReadOnly((db) => {
        let errors = [];

        if (!id) {
            errors.push(ERROR.Profession.PROFESSION_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            const professionGet = Promise.promisify(db.models.Profession.get);
            return professionGet(id);
        }

    });

};

module.exports = {
    getAll: getAll,
    getById: getById,
    getServicesByProfession: getServicesByProfession
};