var requestService = require('../services/request-service');

module.exports = function(router, isAuthenticated, isAdmin, userHasAccess) {

    router.route('/requests')

        .get(isAuthenticated, isAdmin, function(req, res) {

            requestService.getAll(req.query).then(function(requests){
                res.json(requests);
            }, function(err) {
                res.status(400).send(err.message || err);
            });

        });

};