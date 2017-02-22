var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');
var ERROR = require('../utils/service-error-constants');

var getByFilter = function(filter, db) {
    var cityFind = Promise.promisify(db.models.City.find);
    return cityFind(filter, [ 'description', 'A' ]);
};

var getAll = function() {
    return transaction.doReadOnly(function(db) {
        return await (getByFilter({}, db));
    });
};

var getCitiesByState = function(stateId) {
    return transaction.doReadOnly(function(db) {
        var errors = [];

        if (!stateId) {
            errors.push(ERROR.State.STATE_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {
            return await(getByFilter({'state_id':stateId}, db));
        }
    });
};

module.exports = {
    getAll: getAll,
    getCitiesByState: getCitiesByState
};