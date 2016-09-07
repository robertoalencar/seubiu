var cityService = require('../services/city-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    router.route('/cities')

        .get(function(req, res) {
            console.log('Fire!!!!!!');

            cityService.getAll().then(function(cities){
                    res.json(cities);
                }, function(err) {
                    res.status(500).send(err);
            });

        });

};