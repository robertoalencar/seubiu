var _ = require('lodash');
var Promise = require('bluebird');
var doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
var ERROR = require('../utils/service-error-constants');
var ServiceException = require('../utils/service-exception');

var getByFilter = function(filter, db) {
    var cityFind = Promise.promisify(db.models.City.find);
    return cityFind(filter, [ 'description', 'A' ]);
};

var getAll = function() {
    return doReadOnly(function(db) {
        return getByFilter({}, db);
    });
};

var getCitiesByState = function(stateId) {
    return doReadOnly(function(db) {
        var errors = [];

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