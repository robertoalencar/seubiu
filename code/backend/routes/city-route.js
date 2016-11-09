var cityService = require('../services/city-service');
var routeUtil = require('../utils/route-util');

module.exports = function(router, isAuthenticated, isAdmin, userHasAccess) {

    router.route('/cities')

        .get(function(req, res) {

            cityService.getAll().then(function(cities){
                res.json(cities);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

};