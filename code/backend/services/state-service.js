var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
var ERROR = require('../utils/service-error-constants');
var ServiceException = require('../utils/service-exception');

var getByFilter = function(filter, db) {
    var stateFind = Promise.promisify(db.models.State.find);
    return stateFind(filter, [ 'description', 'A' ]);
};

var getAll = function() {
    return doReadOnly(function(db) {
        return getByFilter({}, db);
    });
};

var getStatesByCountry = function(countryId) {
    return doReadOnly(function(db) {
        var errors = [];

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