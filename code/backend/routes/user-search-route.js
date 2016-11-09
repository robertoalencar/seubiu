var userSearchService = require('../services/user-search-service');
var routeUtil = require('../utils/route-util');

module.exports = function(router, isAuthenticated, isAdmin, userHasAccess) {

    router.route('/search')

        .get(isAuthenticated, function(req, res) {

            var professionId = req.query.professionId;
            var servicesIds = req.query.servicesIds;
            var cityId = req.query.cityId;

            userSearchService.searchByProfessionServicesAndCity(professionId, servicesIds, cityId).then(function(users){
                res.json(users);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

};