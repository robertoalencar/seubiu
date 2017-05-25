const _ = require('lodash');
const Promise = require('bluebird');
const await = require('asyncawait/await');
const doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
const doReadWrite = require('../utils/orm-db-transaction').doReadWrite;
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

const addServiceToProfession = (professionId, description) => {
    return doReadWrite((db) => {
        let errors = [];

        if (!professionId) {
            errors.push(ERROR.Profession.PROFESSION_ID_IS_REQUIRED);
        }

        if (_.isEmpty(description)) {
            errors.push(ERROR.Service.DESCRIPTION_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            const professionGet = Promise.promisify(db.models.Profession.get);
            let profession = await(professionGet(professionId));

            if (_.isNil(profession)) {
                throw ServiceException(ERROR.Profession.PROFESSION_NOT_FOUND, ERROR.Types.NOT_FOUND);
            }

            const serviceFind = Promise.promisify(db.models.Service.find);
            let existentService = await(serviceFind({'profession_id':professionId, 'description':description}));

            if (!_.isEmpty(existentService)) {
                throw ServiceException([ERROR.Service.SERVICE_ALREADY_EXISTS]);
            }

            const serviceCreate = Promise.promisify(db.models.Service.create);
            return serviceCreate({'profession_id': professionId, 'description': description, 'active': true});
        }

    });
};

module.exports = {
    getAll: getAll,
    getById: getById,
    getServicesByProfession: getServicesByProfession,
    addServiceToProfession: addServiceToProfession
};