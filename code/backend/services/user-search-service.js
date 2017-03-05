var _ = require('lodash');
var Promise = require('bluebird');
var doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
var ERROR = require('../utils/service-error-constants');
var ServiceException = require('../utils/service-exception');

var _searchByProfessionServicesAndCity = (professionId, servicesIds, cityId, db) => {

    return new Promise((resolve, reject) => {

        var sql = [
            'SELECT DISTINCT u."id", u."name", upro."displayName", us."rating", us."score"',
                'FROM',
                    '"user" AS u',
                    'INNER JOIN user_profile AS upro ON (u.id = upro.user_id)',
                    'LEFT OUTER JOIN user_profile_city AS upc ON (upro.id = upc.user_profile_id)',
                    'LEFT OUTER JOIN user_profile_service AS ups ON (upro.id = ups.user_profile_id)',
                    'LEFT OUTER JOIN user_profile_profession AS upp ON (upro.id = upp.user_profile_id)',
                    'LEFT OUTER JOIN user_address AS ua ON (u.id = ua.user_id)',
                    'LEFT OUTER JOIN user_stats AS us ON (u.id = us.user_id)',
                'WHERE',
                    'u.status_id = ? AND u."emailVerified" = ? AND',
                    '( upp.profession_id = ? AND (ups.service_id IN ? OR upro."otherServices" = ? ) ) AND ( (ua.city_id = ? AND ua.main = ?) OR upc.city_id = ? )',
                'ORDER BY us."rating" DESC, us."score" DESC'
        ];

        var parameters = [
            db.models.UserStatus.ACTIVE, true, professionId, servicesIds,
            true, cityId, true, cityId
        ];

        db.driver.execQuery(_.join(sql, ' '), parameters,
            (err, data) => {
                if (err) reject(err);
                resolve(data);
            });

    });

};

var searchByProfessionServicesAndCity = (professionId, servicesIds, cityId) => {
    return doReadOnly((db) => {
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
            throw ServiceException(errors);
        } else {
            return _searchByProfessionServicesAndCity(professionId, servicesIds, cityId, db);
        }

    });

};

module.exports = {

    searchByProfessionServicesAndCity: searchByProfessionServicesAndCity

};