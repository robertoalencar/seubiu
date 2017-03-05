var _ = require('lodash');
var userAddressService = require('../services/user-address-service');
var routeUtil = require('../utils/route-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    router.route('/users/:userId/addresses')

        .post(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;

            userAddressService.create(userId, req.body).then((newAddress) => {
                res.json(newAddress);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

        .get(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;

            userAddressService.getAllByUserId(userId).then((addresses) => {
                res.json(addresses);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/users/:userId/addresses/:addressId')

        .get(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;
            var addressId = req.params.addressId;

            userAddressService.getById(userId, addressId).then((address) => {
                if (_.isEmpty(address)) res.status(404);
                res.json(address);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

        .put(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;
            var addressId = req.params.addressId;

            userAddressService.update(userId, addressId, req.body.patches).then((address) => {
                res.json(address);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })

        .delete(isAuthenticated, userHasAccess, (req, res) => {

            var userId = req.params.userId;
            var addressId = req.params.addressId;

            userAddressService.remove(userId, addressId).then((success) => {
                res.send(success);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });
};
