var requestService = require('../services/request-service');
var userService = require('../services/user-service');
var userSearchService = require('../services/user-search-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    router.route('/requests')

        .get(function(req, res) {

            requestService.getAll().then(function(requests){
                res.json(requests);
            }, function(err) {
                res.status(500).send(err.message);
            });

        });

};