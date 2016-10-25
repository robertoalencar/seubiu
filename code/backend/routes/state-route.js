var stateService = require('../services/state-service');
var cityService = require('../services/city-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    router.route('/states')

        .get(function(req, res) {

            stateService.getAll().then(function(states){
                res.json(states);
            }, function(err) {
                res.status(500).send(err.message || err);
            });

        });

    router.route('/states/:idState/cities')

        .get(function(req, res) {

            var idState = req.params.idState;

            cityService.getCitiesByState(idState).then(function(cities){
                res.json(cities);
            }, function(err) {
                res.status(500).send(err.message || err);
            });

        });

};