var _ = require('lodash');
var requestService = require('../services/request-service');
var routeUtil = require('../utils/route-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    router.route('/users/:userId/requests')

        .post(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;
            var ip = routeUtil.getCurrentIp(req);

            requestService.create(userId, ip, req.body).then((newRequest) => {
                res.json(newRequest);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

        .get(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;

            requestService.getByOwner(userId).then((requests) => {
                res.json(requests);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

};
