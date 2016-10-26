var _ = require('lodash');

var searchByProfessionServicesAndCity = function (professionId, servicesIds, cityId, db) {

    return new Promise(function (resolve, reject) {

        var sql = [
            'SELECT DISTINCT u."id", u."name", upro."displayName", upro."displayImage_id", us."rating", us."score"',
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
            function (err, data) {
                if (err) reject(err);
                resolve(data);
            });

    });

};

module.exports = {

    searchByProfessionServicesAndCity: searchByProfessionServicesAndCity

};