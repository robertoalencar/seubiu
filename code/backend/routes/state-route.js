var stateService = require('../services/state-service');
var cityService = require('../services/city-service');
var routeUtil = require('../utils/route-util');

module.exports = function(router, isAuthenticated, isAdmin, userHasAccess) {

    router.route('/states')

        .get(function(req, res) {

            stateService.getAll().then(function(states){
                res.json(states);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/states/:idState/cities')

        .get(function(req, res) {

            var idState = req.params.idState;

            cityService.getCitiesByState(idState).then(function(cities){
                res.json(cities);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

};