var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');
var DAO = require('../dao');


var searchByProfessionServicesAndCity = function(professionId, servicesIds, cityId) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!professionId) {
                errors.push('PROFESSION_ID_IS_REQUIRED');
            }

            if (_.isEmpty(servicesIds)) {
                errors.push('SERVICES_IDS_ARE_REQUIRED');
            }

            if (!cityId) {
                errors.push('CITY_ID_IS_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                DAO.getUserSearchDAO().searchByProfessionServicesAndCity(professionId, servicesIds, cityId, db).then(function(data){
                    resolve(data);
                }, function(err) {
                    reject(err);
                });

            }

        }));

    });

};


module.exports = {

    searchByProfessionServicesAndCity: searchByProfessionServicesAndCity

};