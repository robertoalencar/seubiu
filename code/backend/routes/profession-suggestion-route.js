const _ = require('lodash');
const professionSuggestionService = require('../services/profession-suggestion-service');
const routeUtil = require('../utils/route-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    router.route('/professionsuggestions')

        .post(isAuthenticated, userHasAccess, (req, res) => {

            const userId = req.user.id;
            const ip = routeUtil.getCurrentIp(req);

            professionSuggestionService.create(userId, req.body, ip).then((newSuggestion) => {
                res.json(newSuggestion);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

        .get(isAuthenticated, isAdmin, (req, res) => {

            professionSuggestionService.getAll(req.query).then((suggestions) => {
                res.json(suggestions);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/groupedprofessionsuggestions')

        .get(isAuthenticated, isAdmin, (req, res) => {

            professionSuggestionService.getAllGrouped(req.query).then((groupedSuggestions) => {
                res.json(groupedSuggestions);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/professionsuggestions/:id')

        .get(isAuthenticated, isAdmin, (req, res) => {

            const id = req.params.id;

            professionSuggestionService.getById(id).then((suggestion) => {
                if (_.isEmpty(suggestion)) res.status(404);
                res.json(suggestion);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

        .put(isAuthenticated, isAdmin, (req, res) => {

            const id = req.params.id;

            professionSuggestionService.update(id, req.body.patches).then((suggestion) => {
                res.json(suggestion);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

        .delete(isAuthenticated, isAdmin, (req, res) => {

            const id = req.params.id;

            professionSuggestionService.remove(id).then((success) => {
                res.send(success);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/professionsuggestions/:id/approve')

        .post(isAuthenticated, isAdmin, (req, res) => {

            const id = req.params.id;

            professionSuggestionService.approve(id).then((success) => {
                res.send(success);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });
};
