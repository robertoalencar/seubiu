const cityService = require('../services/city-service');
const routeUtil = require('../utils/route-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    router.route('/cities')

        .get((req, res) => {

            cityService.getAll().then((cities) => {
                res.json(cities);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

};