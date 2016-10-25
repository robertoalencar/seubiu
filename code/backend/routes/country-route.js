var countryService = require('../services/country-service');
var stateService = require('../services/state-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    router.route('/countries')

        .get(function(req, res) {

            countryService.getAll().then(function(countries){
                res.json(countries);
            }, function(err) {
                res.status(500).send(err.message || err);
            });

        });

    router.route('/countries/:idCountry/states')

        .get(function(req, res) {

            var idCountry = req.params.idCountry;

            stateService.getStatesByCountry(idCountry).then(function(states){
                res.json(states);
            }, function(err) {
                res.status(500).send(err.message || err);
            });

        });

};