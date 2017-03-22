const countryService = require('../services/country-service');
const stateService = require('../services/state-service');
const routeUtil = require('../utils/route-util');
const apicacheUtil = require('../utils/apicache-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    const useCache = apicacheUtil.cacheWithRedis('12 months');

    router.route('/countries')

        .get(useCache, (req, res) => {

            countryService.getAll().then((countries) => {
                res.json(countries);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/countries/:id/states')

        .get(useCache, (req, res) => {

            var id = req.params.id;

            stateService.getStatesByCountry(id).then((states) => {
                res.json(states);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

};