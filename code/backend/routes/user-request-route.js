const _ = require('lodash');
const requestService = require('../services/request-service');
const routeUtil = require('../utils/route-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    router.route('/users/:userId/requests')

        .post(isAuthenticated, userHasAccess, (req, res) => {

            const userId = req.params.userId;
            const ip = routeUtil.getCurrentIp(req);

            requestService.create(userId, ip, req.body).then((newRequest) => {
                res.json(newRequest);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

        .get(isAuthenticated, userHasAccess, (req, res) => {

            const userId = req.params.userId;

            requestService.getByOwner(userId).then((requests) => {
                res.json(requests);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

};
