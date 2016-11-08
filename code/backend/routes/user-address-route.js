var _ = require('lodash');
var userAddressService = require('../services/user-address-service');
var routeUtil = require('../utils/route-util');

module.exports = function(router, isAuthenticated, isAdmin, userHasAccess) {

    router.route('/users/:userId/addresses')

        .post(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userAddressService.create(userId, req.body).then(function(newAddress){
                res.json(newAddress);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        })

        .get(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userAddressService.getAllByUserId(userId).then(function(addresses){
                res.json(addresses);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/users/:userId/addresses/:addressId')

        .get(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var addressId = req.params.addressId;

            userAddressService.getById(userId, addressId).then(function(address){
                if (_.isEmpty(address)) res.status(404);
                res.json(address);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        })

        .put(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var addressId = req.params.addressId;

            userAddressService.update(userId, addressId, req.body.patches).then(function(address){
                res.json(address);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        })

        .delete(isAuthenticated, userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var addressId = req.params.addressId;

            userAddressService.remove(userId, addressId).then(function(success){
                res.send(success);
            }, function(err) {
                routeUtil.handleException(res, err);
            });

        });
};
