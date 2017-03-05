var _ = require('lodash');
var userPersonalInfoService = require('../services/user-personal-info-service');
var routeUtil = require('../utils/route-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    router.route('/users/:userId/personalinfo')

        .get(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;

            userPersonalInfoService.getById(userId).then((personalInfo) => {
                if (_.isEmpty(personalInfo)) res.status(404);
                res.json(personalInfo);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

        .put(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;

            userPersonalInfoService.update(userId, req.body.patches).then((personalInfo) => {
                res.json(personalInfo);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

};