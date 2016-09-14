var countryService = require('../services/country-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    router.route('/countries')

        .get(function(req, res) {

            countryService.getAll().then(function(countries){
                res.json(countries);
            }, function(err) {
                res.status(500).send(err.message);
            });

        });

};