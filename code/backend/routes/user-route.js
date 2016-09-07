var _ = require('lodash');
var userService = require('../services/user-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    var MINIMUM_PASSWORD_SIZE = 8;

    function userHasAccess(req, res, next) {
        if (req.isAuthenticated() && (req.user.id == req.params.userId || req.user.admin)) { return next(null); }
        res.sendStatus(403);
    }

    router.route('/users')

        .get(isAuthenticated, isAdmin, function(req, res) {

            userService.getAll().then(function(users){
                    res.json(users);
                }, function(err) {
                    res.status(500).send(err);
            });

        })

        .post(function(req, res) {
            var errors = [];
            var name = req.body.name;
            var displayName = req.body.displayName;
            var email = req.body.email;
            var username = req.body.username;
            var password = req.body.password;

            if (_.isEmpty(name)) {
                errors.push("Name is required");
            }

            if (_.isEmpty(email)) {
                errors.push("Email is required");
            }

            if (_.isEmpty(username)) {
                errors.push("Username is required");
            }

            if (_.isEmpty(password)) {
                errors.push("Password is required");
            } else if (password.length < MINIMUM_PASSWORD_SIZE) {
                errors.push("Password is too short: < " + MINIMUM_PASSWORD_SIZE);
            }

            if (errors.length == 0) {

                userService.create(name, email, displayName, username, password).then(function(newUser){
                    res.json(newUser);
                }, function(err) {
                    res.status(500).send(err);
                });

            } else {
                res.status(400).send(errors.join(", "));
            }

        });

    router.route('/users/:userId')

        .get(userHasAccess, function(req, res) {

            var errors = [];
            var userId = req.params.userId;

            if (_.isEmpty(userId)) {
                errors.push("User ID is required");
            }

            if (errors.length == 0) {

                userService.getById(userId).then(function(user){
                    if (_.isEmpty(user)) res.status(404);
                    res.json(user);
                }, function(err) {
                    res.status(400).send(err);
                });

            } else {
                res.status(400).send(errors.join(", "));
            }

        })

        .delete(isAuthenticated, isAdmin, function(req, res) {

            var errors = [];
            var userId = req.params.userId;

            if (_.isEmpty(userId)) {
                errors.push("User ID is required");
            }

            if (errors.length == 0) {

                userService.remove(userId).then(function(success){
                    res.status(200).send(success);
                }, function(err) {
                    res.status(400).send(err);
                });

            } else {
                res.status(400).send(errors.join(", "));
            }

        });


    router.route('/users/:userId/addresses')

        .post(function(req, res) {
            var errors = [];
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

            if (_.isEmpty(userId)) {
                errors.push("User ID is required");
            }

            if (_.isEmpty(description)) {
                errors.push("Description is required");
            }

            if (_.isEmpty(main)) {
                errors.push("Main is required");
            }

            if (_.isEmpty(zipCode)) {
                errors.push("ZipCode is required");
            }

            if (_.isEmpty(address)) {
                errors.push("Address is required");
            }

            if (_.isEmpty(number)) {
                errors.push("Number is required");
            }

            if (_.isEmpty(district)) {
                errors.push("District is required");
            }

            if (_.isEmpty(cityId)) {
                errors.push("City ID is required");
            }

            if (_.isEmpty(stateId)) {
                errors.push("State Id is required");
            }

            if (_.isEmpty(countryId)) {
                errors.push("Country ID is required");
            }

            if (errors.length == 0) {

                userService.createAddress(
                    userId, description, main, zipCode, address, number, district, cityId, stateId, countryId
                    ).then(function(newAddress){
                    res.json(newAddress);
                }, function(err) {
                    res.status(500).send(err);
                });

            } else {
                res.status(400).send(errors.join(", "));
            }

        })

        .get(userHasAccess, function(req, res) {

            var errors = [];
            var userId = req.params.userId;

            if (_.isEmpty(userId)) {
                errors.push("User ID is required");
            }

            if (errors.length == 0) {

                userService.getAddresses(userId).then(function(addresses){
                    res.json(addresses);
                }, function(err) {
                    res.status(400).send(err);
                });

            } else {
                res.status(400).send(errors.join(", "));
            }

        });

    router.route('/users/:userId/addresses/:addressId')

        .get(userHasAccess, function(req, res) {

            var errors = [];
            var userId = req.params.userId;
            var addressId = req.params.addressId;

            if (_.isEmpty(userId)) {
                errors.push("User ID is required");
            }

            if (_.isEmpty(addressId)) {
                errors.push("Address ID is required");
            }

            if (errors.length == 0) {

                userService.getAddress(userId, addressId).then(function(address){
                    if (_.isEmpty(address)) res.status(404);
                    res.json(address);
                }, function(err) {
                    res.status(400).send(err);
                });

            } else {
                res.status(400).send(errors.join(", "));
            }

        })

        .delete(userHasAccess, function(req, res) {

            var errors = [];
            var userId = req.params.userId;
            var addressId = req.params.addressId;

            if (_.isEmpty(userId)) {
                errors.push("User ID is required");
            }

            if (_.isEmpty(addressId)) {
                errors.push("Address ID is required");
            }

            if (errors.length == 0) {

                userService.removeAddress(userId, addressId).then(function(success){
                    res.status(200).send(success);
                }, function(err) {
                    res.status(400).send(err);
                });

            } else {
                res.status(400).send(errors.join(", "));
            }

        });

};