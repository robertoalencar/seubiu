var _ = require('lodash');
var userService = require('../services/user-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    var MINIMUM_PASSWORD_SIZE = 8;

    function userHasAccess(req, res, next) {
        if (req.isAuthenticated() && (req.user.id == req.params.id || req.user.admin)) { return next(null); }
        res.sendStatus(403);
    }

    router.route('/users')
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

    router.route('/users/:id')

        .get(userHasAccess, function(req, res) {

            var errors = [];
            var id = req.params.id;

            if (_.isEmpty(id)) {
                errors.push("ID is required");
            }

            if (errors.length == 0) {

                userService.getById(id).then(function(user){
                    if (_.isEmpty(user)) res.status(404);
                    res.json(user);
                }, function(err) {
                    res.status(400).send(err);
                });

            } else {
                res.status(400).send(errors.join(", "));
            }

        });


    router.route('/users/:id')

        .delete(isAuthenticated, isAdmin, function(req, res) {

            var errors = [];
            var id = req.params.id;

            if (_.isEmpty(id)) {
                errors.push("ID is required");
            }

            if (errors.length == 0) {

                userService.remove(id).then(function(success){
                    res.status(200).send(success);
                }, function(err) {
                    res.status(400).send(err);
                });

            } else {
                res.status(400).send(errors.join(", "));
            }

        });

};