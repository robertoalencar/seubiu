var _ = require('lodash');
var professionSuggestionService = require('../services/profession-suggestion-service');
var routeUtil = require('../utils/route-util');

module.exports = function(router, isAuthenticated, isAdmin, userHasAccess) {

    router.route('/professionsuggestions')

        .post(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.user.id;
            var ip = routeUtil.getCurrentIp(req);

            professionSuggestionService.create(userId, req.body, ip).then(function(newSuggestion){
                res.json(newSuggestion);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        })

        .get(isAuthenticated, isAdmin, function(req, res) {

            professionSuggestionService.getAll(req.query).then(function(suggestions){
                res.json(suggestions);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/professionsuggestions/:id')

        .get(isAuthenticated, isAdmin, function(req, res) {

            var id = req.params.id;

            professionSuggestionService.getById(id).then(function(suggestion){
                if (_.isEmpty(suggestion)) res.status(404);
                res.json(suggestion);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        })

        .put(isAuthenticated, isAdmin, function(req, res) {

            var id = req.params.id;

            professionSuggestionService.update(id, req.body.patches).then(function(suggestion){
                res.json(suggestion);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        })

        .delete(isAuthenticated, isAdmin, function(req, res) {

            var id = req.params.id;

            professionSuggestionService.remove(id).then(function(success){
                res.send(success);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/professionsuggestions/:id/approve')

        .post(isAuthenticated, isAdmin, function(req, res) {

            var id = req.params.id;

            professionSuggestionService.approve(id).then(function(success){
                res.send(success);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });
};
