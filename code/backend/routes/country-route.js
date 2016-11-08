var countryService = require('../services/country-service');
var stateService = require('../services/state-service');
var routeUtil = require('../utils/route-util');

module.exports = function(router, isAuthenticated, isAdmin, userHasAccess) {

    router.route('/countries')

        .get(function(req, res) {

            countryService.getAll().then(function(countries){
                res.json(countries);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/countries/:idCountry/states')

        .get(function(req, res) {

            var idCountry = req.params.idCountry;

            stateService.getStatesByCountry(idCountry).then(function(states){
                res.json(states);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

};