var _ = require('lodash');

var searchByProfessionServicesAndCity = function (professionId, servicesIds, cityId, db) {

    return new Promise(function (resolve, reject) {

        var sql = [
            'SELECT DISTINCT u."id", u."name", u."ratingSum", u."ratingCount"',
            'FROM',
                '"user" AS u',
                'INNER JOIN user_professions AS upro ON (u.id = upro.user_id)',
                'LEFT OUTER JOIN user_services AS us ON (u.id = us.user_id)',
                'LEFT OUTER JOIN user_address AS ua ON (u.id = ua.user_id)',
                'LEFT OUTER JOIN user_preference AS upre ON (u.id = upre.user_id)',
                'LEFT OUTER JOIN user_preference_city AS upc ON (upre.id = upc.user_preference_id)',
            'WHERE',
                '( upro.profession_id = ? AND (us.service_id IN ? OR upre."otherServices" = true ) ) AND ( (ua.city_id = ? AND ua.main = true) OR upc.city_id = ? )',
            'ORDER BY u."ratingSum" DESC, u."ratingCount" ASC'
        ];

        var parameters = [professionId, servicesIds, cityId, cityId];

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