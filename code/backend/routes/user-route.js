var _ = require('lodash');
var userService = require('../services/user-service');
var userAddressService = require('../services/user-address-service');
var userPreferenceService = require('../services/user-preference-service');
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
            var name = req.body.name;
            var displayName = req.body.displayName;
            var email = req.body.email;
            var username = req.body.username;
            var password = req.body.password;

            userService.create(name, email, displayName, username, password).then(function(newUser){
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

            /*
            //http://tools.ietf.org/html/rfc6902

            {
              "patches": [
               { "op": "replace", "path": "/displayName", "value": "New value" }
              ]
            }

            */

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

            userAddressService.createAddress(userId, description, main, zipCode, address, number, complement,
                district, reference, cityId, stateId, countryId).then(function(newAddress){
                res.json(newAddress);
            }, function(err) {
                res.status(400).send(err.message);
            });

        })

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userAddressService.getAddresses(userId).then(function(addresses){
                res.json(addresses);
            }, function(err) {
                res.status(400).send(err.message);
            });

        });

    router.route('/users/:userId/addresses/:addressId')

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var addressId = req.params.addressId;

            userAddressService.getAddress(userId, addressId).then(function(address){
                if (_.isEmpty(address)) res.status(404);
                res.json(address);
            }, function(err) {
                res.status(400).send(err.message);
            });

        })

        .put(userHasAccess, function(req, res) {

            /*
            //http://tools.ietf.org/html/rfc6902

            {
              "patches": [
               { "op": "replace", "path": "/description", "value": "New value" }
              ]
            }

            */

            var userId = req.params.userId;
            var addressId = req.params.addressId;

            userAddressService.updateAddress(userId, addressId, req.body.patches).then(function(address){
                res.json(address);
            }, function(err) {
                res.status(400).send(err.message);
            });

        })

        .delete(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var addressId = req.params.addressId;

            userAddressService.removeAddress(userId, addressId).then(function(success){
                res.status(200).send(success);
            }, function(err) {
                res.status(400).send(err.message);
            });

        });

    router.route('/users/:userId/professions')

        .post(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var professionIds = req.body.professionIds;

            userService.setProfessions(userId, professionIds).then(function(success){
                res.status(200).send(success);
            }, function(err) {
                res.status(400).send(err.message);
            });


        })

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userService.getProfessions(userId).then(function(professions){
                res.json(professions);
            }, function(err) {
                res.status(400).send(err.message);
            });

        });

    router.route('/users/:userId/services')

        .post(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var servicesIds = req.body.servicesIds;

            userService.setServices(userId, servicesIds).then(function(success){
                res.status(200).send(success);
            }, function(err) {
                res.status(400).send(err.message);
            });


        })

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userService.getServices(userId).then(function(services){
                res.json(services);
            }, function(err) {
                res.status(400).send(err.message);
            });

        });

    router.route('/users/:userId/devices')

        .post(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var deviceToken = req.body.deviceToken;
            var deviceTypeId = req.body.deviceTypeId;

            userDeviceService.addDevice(userId, deviceToken, deviceTypeId).then(function(addedDevice){
                res.json(addedDevice);
            }, function(err) {
                res.status(400).send(err.message);
            });

        })

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userDeviceService.getDevices(userId).then(function(devices){
                res.json(devices);
            }, function(err) {
                res.status(400).send(err.message);
            });

        });

    router.route('/users/:userId/devices/:deviceToken')

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var deviceToken = req.params.deviceToken;

            userDeviceService.getDeviceByToken(userId, deviceToken).then(function(device){
                res.json(device);
            }, function(err) {
                res.status(400).send(err.message);
            });

        });

    router.route('/users/:userId/preference')

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userPreferenceService.getPreference(userId).then(function(preference){
                if (_.isEmpty(preference)) res.status(404);
                res.json(preference);
            }, function(err) {
                res.status(400).send(err.message);
            });

        })

        .put(userHasAccess, function(req, res) {

            /*
            //http://tools.ietf.org/html/rfc6902

            {
              "patches": [
               { "op": "replace", "path": "/displayName", "value": "New value" }
              ]
            }

            */

            var userId = req.params.userId;

            userPreferenceService.updatePreference(userId, req.body.patches).then(function(preference){
                res.json(preference);
            }, function(err) {
                res.status(400).send(err.message);
            });

        });

    router.route('/users/:userId/preference/cities')

        .get(userHasAccess, function(req, res) {

            var userId = req.params.userId;

            userPreferenceService.getUserPreferenceCities(userId).then(function(cities){
                res.json(cities);
            }, function(err) {
                res.status(400).send(err.message);
            });

        })

        .post(userHasAccess, function(req, res) {

            var userId = req.params.userId;
            var cityIds = req.body.cityIds;

            userPreferenceService.setUserPreferenceCities(userId, cityIds).then(function(success){
                res.status(200).send(success);
            }, function(err) {
                res.status(400).send(err);
            });

        });


};