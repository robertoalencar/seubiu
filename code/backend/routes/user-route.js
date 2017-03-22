const _ = require('lodash');
const userService = require('../services/user-service');
const userDeviceService = require('../services/user-device-service');
const routeUtil = require('../utils/route-util');
const passport = require('passport');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    router.route('/users')

        .get(isAuthenticated, isAdmin, (req, res) => {

            userService.getAll().then((users) => {
                res.json(users);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

        .post((req, res) => {

            userService.create(req.body).then((newUser) => {
                res.json(newUser);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/users/:userId')

        .get(isAuthenticated, userHasAccess, (req, res) => {

            const userId = req.params.userId;

            userService.getById(userId).then((user) => {
                if (_.isEmpty(user)) res.status(404);
                res.json(user);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

         .put(isAuthenticated, userHasAccess, (req, res) => {

            const userId = req.params.userId;

            userService.update(userId, req.body.patches, req.user.admin).then((user) => {
                res.json(user);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

        .delete(isAuthenticated, isAdmin, (req, res) => {

            const userId = req.params.userId;

            userService.remove(userId).then((success) => {
                res.send(success);
            }, (err) => {
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