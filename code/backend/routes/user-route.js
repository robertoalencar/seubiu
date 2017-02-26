var _ = require('lodash');
var userService = require('../services/user-service');
var userDeviceService = require('../services/user-device-service');
var routeUtil = require('../utils/route-util');
var passport = require('passport');

module.exports = function(router, isAuthenticated, isAdmin, userHasAccess) {

    router.route('/users')

        .get(isAuthenticated, isAdmin, function(req, res) {

            userService.getAll().then(function(users){
                res.json(users);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        })

        .post(function(req, res) {

            userService.create(req.body).then(function(newUser){
                res.json(newUser);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/users/:userId')

        .get(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userService.getById(userId).then(function(user){
                if (_.isEmpty(user)) res.status(404);
                res.json(user);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        })

         .put(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userService.update(userId, req.body.patches, req.user.admin).then(function(user){
                res.json(user);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        })

        .delete(isAuthenticated, isAdmin, function(req, res) {

            var userId = req.params.userId;

            userService.remove(userId).then(function(success){
                res.send(success);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

    /*
            //Patch/put operations
            //http://tools.ietf.org/html/rfc6902

            {
              "patches": [
               { "op": "replace", "path": "/displayName", "value": "New value" }
              ]
            }

    */

};