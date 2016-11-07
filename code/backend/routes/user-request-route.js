var _ = require('lodash');
var requestService = require('../services/request-service');

module.exports = function(router, isAuthenticated, isAdmin, userHasAccess) {

    router.route('/users/:userId/requests')

        .post(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;

            requestService.create(userId, req.body).then(function(newRequest){
                res.json(newRequest);
            }, function(err) {
                res.status(400).send(err.message || err);
            });

        })

        .get(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;

            requestService.getByOwner(userId).then(function(requests){
                res.json(requests);
            }, function(err) {
                res.status(400).send(err.message || err);
            });


        });

};
