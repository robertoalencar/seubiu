var _ = require('lodash');
var Promise = require('bluebird');
var doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
var ERROR = require('../utils/service-error-constants');
var ServiceException = require('../utils/service-exception');

var getByFilter = function(filter, db) {
    var professionFind = Promise.promisify(db.models.Profession.find);
    return professionFind(filter, [ 'description', 'A' ]);
};

var getAll = function() {
    return doReadOnly(function(db) {
        return getByFilter({}, db);
    });
};

var getServicesByProfession = function(id) {
    return doReadOnly(function(db) {
        var errors = [];

        if (!id) {
            errors.push(ERROR.Profession.PROFESSION_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var serviceFind = Promise.promisify(db.models.Service.find);
            return serviceFind({'profession_id':id});
        }

    });

};

var getById = function(id) {
    return doReadOnly(function(db) {
        var errors = [];

        if (!id) {
            errors.push(ERROR.Profession.PROFESSION_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var professionGet = Promise.promisify(db.models.Profession.get);
            return professionGet(id);
        }

    });

};

module.exports = {
    getAll: getAll,
    getById: getById,
    getServicesByProfession: getServicesByProfession
};