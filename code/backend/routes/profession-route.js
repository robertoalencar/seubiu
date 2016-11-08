var _ = require('lodash');
var professionService = require('../services/profession-service');
var routeUtil = require('../utils/route-util');

module.exports = function(router, isAuthenticated, isAdmin, userHasAccess) {

    router.route('/professions')

        .get(function(req, res) {

            professionService.getAll().then(function(professions){
                res.json(professions);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/professions/:id')

        .get(function(req, res) {

            var id = req.params.id;

            professionService.getById(id).then(function(profession){
                if (_.isEmpty(profession)) res.status(404);
                res.json(profession);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/professions/:id/services')

        .get(function(req, res) {

            var id = req.params.id;

            professionService.getServicesByProfession(id).then(function(services){
                if (_.isEmpty(services)) res.status(404);
                res.json(services);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

};