var _ = require('lodash');
var requestService = require('../services/request-service');
var routeUtil = require('../utils/route-util');

module.exports = function(router, isAuthenticated, isAdmin, userHasAccess) {

    router.route('/users/:userId/requests')

        .post(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            requestService.create(userId, ip, req.body).then(function(newRequest){
                res.json(newRequest);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        })

        .get(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;

            requestService.getByOwner(userId).then(function(requests){
                res.json(requests);
            }, function(err) {
                routeUtil.handleException(res, err);
            });


        });

};
