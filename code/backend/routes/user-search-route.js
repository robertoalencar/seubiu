const userSearchService = require('../services/user-search-service');
const routeUtil = require('../utils/route-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    router.route('/search')

        .get(isAuthenticated, (req, res) => {

            const professionId = req.query.professionId;
            const servicesIds = req.query.servicesIds;
            const cityId = req.query.cityId;

            userSearchService.searchByProfessionServicesAndCity(professionId, servicesIds, cityId).then(function(users){
                res.json(users);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

};