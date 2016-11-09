var requestService = require('../services/request-service');
var routeUtil = require('../utils/route-util');

module.exports = function(router, isAuthenticated, isAdmin, userHasAccess) {

    router.route('/requests')

        .get(isAuthenticated, isAdmin, function(req, res) {

            requestService.getAll(req.query).then(function(requests){
                res.json(requests);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

};