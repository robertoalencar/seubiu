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
                errors.push('Profession ID is required');
            }

            if (_.isEmpty(servicesIds)) {
                errors.push('Services IDs are required');
            }

            if (!cityId) {
                errors.push('City ID is required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

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