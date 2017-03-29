const emailVerificationService = require('../services/email-verification-service');
const routeUtil = require('../utils/route-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    router.route('/emailverification')

        .get((req, res) => {

            let token = req.query.token;

            emailVerificationService.verifyToken(token).then((success) => {
                res.json(success);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

};