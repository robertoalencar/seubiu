const _ = require('lodash');
const Promise = require('bluebird');
const doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
const ERROR = require('../utils/service-error-constants');
const ServiceException = require('../utils/service-exception');

const getByFilter = (filter, db) => {
    let cityFind = Promise.promisify(db.models.City.find);
    return cityFind(filter, [ 'description', 'A' ]);
};

const getAll = () => {
    return doReadOnly((db) => {
        return getByFilter({}, db);
    });
};

const getCitiesByState = (stateId) => {
    return doReadOnly((db) => {
        let errors = [];

        if (!stateId) {
            errors.push(ERROR.State.STATE_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            return getByFilter({'state_id':stateId}, db);
        }
    });
};

module.exports = {
    getAll: getAll,
    getCitiesByState: getCitiesByState
};