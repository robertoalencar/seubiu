var stateService = require('../services/state-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    router.route('/states')

        .get(function(req, res) {

            stateService.getAll().then(function(states){
                    res.json(states);
                }, function(err) {
                    res.status(500).send(err);
            });

        });

};