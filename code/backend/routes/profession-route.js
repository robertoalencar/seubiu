var _ = require('lodash');
var professionService = require('../services/profession-service');
var routeUtil = require('../utils/route-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    router.route('/professions')

        .get((req, res) => {

            professionService.getAll().then((professions) => {
                res.json(professions);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/professions/:id')

        .get((req, res) => {

            var id = req.params.id;

            professionService.getById(id).then((profession) => {
                if (_.isEmpty(profession)) res.status(404);
                res.json(profession);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/professions/:id/services')

        .get((req, res) => {

            var id = req.params.id;

            professionService.getServicesByProfession(id).then((services) => {
                if (_.isEmpty(services)) res.status(404);
                res.json(services);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

};