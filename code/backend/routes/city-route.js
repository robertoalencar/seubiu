const cityService = require('../services/city-service');
const routeUtil = require('../utils/route-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    const useCache = routeUtil.cacheWithRedis('12 months');

    router.route('/cities')

        .get(useCache, (req, res) => {

            cityService.getAll().then((cities) => {
                res.json(cities);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

};