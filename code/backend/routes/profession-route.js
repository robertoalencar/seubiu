var _ = require('lodash');
var professionService = require('../services/profession-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    router.route('/professions')

        .get(function(req, res) {

            professionService.getAll().then(function(professions){
                res.json(professions);
            }, function(err) {
                res.status(500).send(err);
            });

        });

    router.route('/professions/:id')

        .get(function(req, res) {

            var id = req.params.id;

            professionService.getById(id).then(function(profession){
                if (_.isEmpty(profession)) res.status(404);
                res.json(profession);
            }, function(err) {
                res.status(400).send(err);
            });

        });

    router.route('/professions/:id/services')

        .get(function(req, res) {

            var id = req.params.id;

            professionService.getServicesByProfession(id).then(function(services){
                if (_.isEmpty(services)) res.status(404);
                res.json(services);
            }, function(err) {
                res.status(400).send(err);
            });

        });

};