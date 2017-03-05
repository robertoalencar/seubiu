var stateService = require('../services/state-service');
var cityService = require('../services/city-service');
var routeUtil = require('../utils/route-util');

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

            var stateId = req.params.stateId;

            cityService.getCitiesByState(stateId).then((cities) => {
                res.json(cities);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

};