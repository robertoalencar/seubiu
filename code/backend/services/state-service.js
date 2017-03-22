const _ = require('lodash');
const await = require('asyncawait/await');
const Promise = require('bluebird');
const doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
const ERROR = require('../utils/service-error-constants');
const ServiceException = require('../utils/service-exception');

const getByFilter = (filter, db) => {
    const stateFind = Promise.promisify(db.models.State.find);
    return stateFind(filter, [ 'description', 'A' ]);
};

const getAll = () => {
    return doReadOnly((db) => {
        return getByFilter({}, db);
    });
};

const getStatesByCountry = (countryId) => {
    return doReadOnly((db) => {
        let errors = [];

        if (!countryId) {
            errors.push(ERROR.Country.COUNTRY_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            return getByFilter({'country_id':countryId}, db);
        }

    });
};

module.exports = {
    getAll: getAll,
    getStatesByCountry: getStatesByCountry
};