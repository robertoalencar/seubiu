const stateService = require('../services/state-service');
const cityService = require('../services/city-service');
const routeUtil = require('../utils/route-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    router.route('/states')

        .get((req, res) => {

            stateService.getAll().then((states) => {
                res.json(states);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/states/:stateId/cities')

        .get((req, res) => {

            const stateId = req.params.stateId;

            cityService.getCitiesByState(stateId).then((cities) => {
                res.json(cities);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

};