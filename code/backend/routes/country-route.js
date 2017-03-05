var countryService = require('../services/country-service');
var stateService = require('../services/state-service');
var routeUtil = require('../utils/route-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    router.route('/countries')

        .get((req, res) => {

            countryService.getAll().then((countries) => {
                res.json(countries);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/countries/:id/states')

        .get((req, res) => {

            var id = req.params.id;

            stateService.getStatesByCountry(id).then((states) => {
                res.json(states);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

};