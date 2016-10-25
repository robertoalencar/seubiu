var _ = require('lodash');

var searchByProfessionServicesAndCity = function (professionId, servicesIds, cityId, db) {

    return new Promise(function (resolve, reject) {

        var sql = [
            'SELECT DISTINCT u."id", u."name", us."ratingSum", us."ratingCount", us."score"',
                'FROM',
                    '"user" AS u',
                    'INNER JOIN user_preference AS upre ON (u.id = upre.user_id)',
                    'LEFT OUTER JOIN user_preference_city AS upc ON (upre.id = upc.user_preference_id)',
                    'LEFT OUTER JOIN user_preference_service AS ups ON (upre.id = ups.user_preference_id)',
                    'LEFT OUTER JOIN user_preference_profession AS upp ON (upre.id = upp.user_preference_id)',
                    'LEFT OUTER JOIN user_address AS ua ON (u.id = ua.user_id)',
                    'LEFT OUTER JOIN user_stats AS us ON (u.id = us.user_id)',
                'WHERE',
                    'u.status_id = ? AND u."emailVerified" = ? AND',
                    '( upp.profession_id = ? AND (ups.service_id IN ? OR upre."otherServices" = ? ) ) AND ( (ua.city_id = ? AND ua.main = ?) OR upc.city_id = ? )',
                'ORDER BY us."ratingSum" DESC, us."score" DESC'
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