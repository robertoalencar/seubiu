var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');

var getById = function(id) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!id) {
                errors.push('File ID is required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.File.get(id, function(err, file) {
                    if (err) reject(err);
                    resolve(file);
                });

            }

        }));

    });

};


var create = function(newFile) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (_.isEmpty(newFile.name)) {
                errors.push('Name is required');
            }

            if (!newFile.size  || newFile.size  <= 0) {
                errors.push('Size is required');
            }

            if (_.isEmpty(newFile.type)) {
                errors.push('Type is required');
            }

            if (_.isEmpty(newFile.data)) {
                errors.push('Data is required');
            }

            if (_.isEmpty(newFile.ip)) {
                errors.push('IP is required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.File.create(newFile, function(err, savedFile) {
                    if (err) reject(err);
                    resolve(savedFile);
                });

            }


        }));

    });

};

module.exports = {

    getById: getById,
    create: create

};