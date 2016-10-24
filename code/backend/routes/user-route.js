var _ = require('lodash');
var userService = require('../services/user-service');
var userDeviceService = require('../services/user-device-service');

module.exports = function(router, isAuthenticated, isAdmin) {


    function userHasAccess(req, res, next) {
        if (req.isAuthenticated() && (req.user.id == req.params.userId || req.user.admin)) { return next(null); }
        res.sendStatus(403);
    }

    router.route('/users')

        .get(isAdmin, function(req, res) {

            userService.getAll().then(function(users){
                res.json(users);
            }, function(err) {
                res.status(500).send(err.message);
            });

        })

        .post(function(req, res) {

            userService.create(req.body).then(function(newUser){
                res.json(newUser);
            }, function(err) {
                res.status(400).send(err.message);
            });

        });

    router.route('/users/:userId')

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userService.getById(userId).then(function(user){
                if (_.isEmpty(user)) res.status(404);
                res.json(user);
            }, function(err) {
                res.status(400).send(err.message);
            });

        })

         .put(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userService.update(userId, req.body.patches, req.user.admin).then(function(user){
                res.json(user);
            }, function(err) {
                res.status(400).send(err.message);
            });

        })

        .delete(isAdmin, function(req, res) {

            var userId = req.params.userId;

            userService.remove(userId).then(function(success){
                res.status(200).send(success);
            }, function(err) {
                res.status(400).send(err.message);
            });

        });


/*

    router.route('/users/:userId/profile')

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            //TODO: Implement this
            res.status(200).send('OK');

        })

        .put(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            //TODO: Implement this
            res.status(200).send('OK');

        });

    router.route('/users/:userId/personal')

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            //TODO: Implement this
            res.status(200).send('OK');

        })

        .put(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            //TODO: Implement this
            res.status(200).send('OK');

        });
*/
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