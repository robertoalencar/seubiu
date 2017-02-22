var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');
var ERROR = require('../utils/service-error-constants');

var getByFilter = function(filter, db) {
    var stateFind = Promise.promisify(db.models.State.find);
    return stateFind(filter, [ 'description', 'A' ]);
};

var getAll = function() {
    return transaction.doReadOnly(function(db) {
        return await (getByFilter({}, db));
    });
};

var getStatesByCountry = function(countryId) {
    return transaction.doReadOnly(function(db) {
        var errors = [];

        if (!countryId) {
            errors.push(ERROR.Country.COUNTRY_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {
            return await (getByFilter({'country_id':countryId}, db));
        }

    });
};

module.exports = {
    getAll: getAll,
    getStatesByCountry: getStatesByCountry
};