var _ = require('lodash');
var userService = require('../services/user-service');

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
                res.status(500).send(err);
            });

        })

        .post(function(req, res) {
            var name = req.body.name;
            var displayName = req.body.displayName;
            var email = req.body.email;
            var username = req.body.username;
            var password = req.body.password;

            userService.create(name, email, displayName, username, password).then(function(newUser){
                res.json(newUser);
            }, function(err) {
                res.status(400).send(err);
            });

        });

    router.route('/users/:userId')

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userService.getById(userId).then(function(user){
                if (_.isEmpty(user)) res.status(404);
                res.json(user);
            }, function(err) {
                res.status(400).send(err);
            });

        })

        .delete(isAdmin, function(req, res) {

            var userId = req.params.userId;

            userService.remove(userId).then(function(success){
                res.status(200).send(success);
            }, function(err) {
                res.status(400).send(err);
            });

        });


    router.route('/users/:userId/addresses')

        .post(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var description = req.body.description;
            var main = req.body.main;
            var zipCode = req.body.zipCode;
            var address = req.body.address;
            var number = req.body.number;
            var complement = req.body.complement;
            var district = req.body.district;
            var reference = req.body.reference;
            var cityId = req.body.cityId;
            var stateId = req.body.stateId;
            var countryId = req.body.countryId;

            userService.createAddress(userId, description, main, zipCode, address, number, complement,
                district, reference, cityId, stateId, countryId).then(function(newAddress){
                res.json(newAddress);
            }, function(err) {
                res.status(400).send(err);
            });

        })

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userService.getAddresses(userId).then(function(addresses){
                res.json(addresses);
            }, function(err) {
                res.status(400).send(err);
            });

        });

    router.route('/users/:userId/addresses/:addressId')

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var addressId = req.params.addressId;

            userService.getAddress(userId, addressId).then(function(address){
                if (_.isEmpty(address)) res.status(404);
                res.json(address);
            }, function(err) {
                res.status(400).send(err);
            });

        })

        .delete(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var addressId = req.params.addressId;

            userService.removeAddress(userId, addressId).then(function(success){
                res.status(200).send(success);
            }, function(err) {
                res.status(400).send(err);
            });

        });

    router.route('/users/:userId/professions')

        .post(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var professionIds = req.body.professionIds;

            userService.setProfessions(userId, professionIds).then(function(success){
                res.status(200).send(success);
            }, function(err) {
                res.status(400).send(err);
            });


        })

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userService.getProfessions(userId).then(function(professions){
                res.json(professions);
            }, function(err) {
                res.status(400).send(err);
            });

        });

    router.route('/users/:userId/services')

        .post(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var servicesIds = req.body.servicesIds;

            userService.setServices(userId, servicesIds).then(function(success){
                res.status(200).send(success);
            }, function(err) {
                res.status(400).send(err);
            });


        })

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userService.getServices(userId).then(function(services){
                res.json(services);
            }, function(err) {
                res.status(400).send(err);
            });

        });

};