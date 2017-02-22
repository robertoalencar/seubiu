var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');
var ERROR = require('../utils/service-error-constants');

var getByFilter = function(filter, db) {
    var professionFind = Promise.promisify(db.models.Profession.find);
    return professionFind(filter, [ 'description', 'A' ]);
};

var getAll = function() {
    return transaction.doReadOnly(function(db) {
        return await (getByFilter({}, db));
    });
};

var getServicesByProfession = function(id) {
    return transaction.doReadOnly(function(db) {
        var errors = [];

        if (!id) {
            errors.push(ERROR.Profession.PROFESSION_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {
            var serviceFind = Promise.promisify(db.models.Service.find);
            return await (serviceFind({'profession_id':id}));
        }

    });

};

var getById = function(id) {
    return transaction.doReadOnly(function(db) {
        var errors = [];

        if (!id) {
            errors.push(ERROR.Profession.PROFESSION_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {
            var professionGet = Promise.promisify(db.models.Profession.get);
            return await (professionGet(id));
        }

    });

};

module.exports = {
    getAll: getAll,
    getById: getById,
    getServicesByProfession: getServicesByProfession
};