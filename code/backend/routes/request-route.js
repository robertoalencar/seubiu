var requestService = require('../services/request-service');
var routeUtil = require('../utils/route-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    router.route('/requests')

        .get(isAuthenticated, isAdmin, (req, res) => {

            requestService.getAll(req.query).then((requests) => {
                res.json(requests);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/requests/:requestId/professional/accept')

        .post(isAuthenticated, (req, res) => {
            var requestId = req.params.requestId;
            var professionalId = req.user.id;

            requestService.professionalAccept(requestId, professionalId).then((success) => {
                res.json(success);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

};