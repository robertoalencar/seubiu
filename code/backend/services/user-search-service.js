var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');
var DAO = require('../dao');
var ERROR = require('../utils/service-error-constants');


var searchByProfessionServicesAndCity = function(professionId, servicesIds, cityId) {
    return transaction.doReadOnly(function(db) {
        var errors = [];

        if (!professionId) {
            errors.push(ERROR.Profession.PROFESSION_ID_IS_REQUIRED);
        }

        if (_.isEmpty(servicesIds)) {
            errors.push(ERROR.Service.SERVICES_IDS_ARE_REQUIRED);
        }

        if (!cityId) {
            errors.push(ERROR.City.CITY_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {
            return await (DAO.getUserSearchDAO().searchByProfessionServicesAndCity(professionId, servicesIds, cityId, db));
        }

    });

};

module.exports = {

    searchByProfessionServicesAndCity: searchByProfessionServicesAndCity

};