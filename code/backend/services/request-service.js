var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');
var ERROR = require('../utils/service-error-constants');

var getByFilter = function(filter, db, reject, resolve) {

    db.models.Request.find(filter, [ 'description', 'A' ], function (err, requests) {
        if (err) reject(err);
        resolve(requests);
    });

};

var getAll = function(filter) {
    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            getByFilter(filter, db, reject, resolve);

        }));

    });
};

var getByOwner = function(userId) {
    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push(ERROR.User.USER_ID_IS_REQUIRED);
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {
                getByFilter({'owner_id':userId}, db, reject, resolve);
            }

        }));

    });
};

var create = function(userId, ip, data) {
    var task = function(db) {

        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(data.description)) {
            errors.push(ERROR.Request.DESCRIPTION_IS_REQUIRED);
        }

        if (_.isEmpty(ip)) {
            errors.push(ERROR.Common.IP_IS_REQUIRED);
        }

        if (_.isEmpty(data.address)) {
            errors.push(ERROR.Request.ADDRESS_IS_REQUIRED);
        }

        if (_.isNil(data.coordLat) || _.isNaN(data.coordLat)) {
            errors.push(ERROR.Request.COORDLAT_IS_REQUIRED);
        }

        if (_.isNil(data.coordLong) || _.isNaN(data.coordLong)) {
            errors.push(ERROR.Request.COORDLONG_IS_REQUIRED);
        }

        if (!data.cityId) {
            errors.push(ERROR.City.CITY_ID_IS_REQUIRED);
        }

        if (!data.professionId) {
            errors.push(ERROR.Profession.PROFESSION_ID_IS_REQUIRED);
        }

        if (_.isNil(data.serviceIds) || _.isEmpty(data.serviceIds)) {
            errors.push(ERROR.Request.SERVICE_IDS_ARE_REQUIRED);
        }

        if (_.isNil(data.candidateIds) || _.isEmpty(data.candidateIds)) {
            errors.push(ERROR.Request.CANDIDATE_IDS_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {

            var request = await (new Promise(function (resolve, reject) {
                db.models.Request.create({
                    'description': data.description,
                    'ip': ip,
                    'address': data.address,
                    'coordLat': data.coordLat,
                    'coordLong': data.coordLong,
                    'owner_id': userId,
                    'city_id': data.cityId,
                    'profession_id': data.professionId,
                    'status_id': db.models.RequestStatus.NEW
                }, function(err, savedRequest) {
                    if (err) reject(err);
                    resolve(savedRequest);
                });
            }));

            await (new Promise(function (resolve, reject) {

                db.models.Service.find({'id': data.serviceIds}, function(err, services) {
                    if (err) {
                        reject(err);
                    } else {

                        request.setServices(services, function(err) {
                            if (err) reject(err);
                            resolve(true);
                        });

                    }

                });

            }));

            await (new Promise(function (resolve, reject) {

                db.models.User.find({'id': data.candidateIds}, function(err, users) {
                    if (err) {
                        reject(err);
                    } else {

                        request.setCandidates(users, function(err) {
                            if (err) reject(err);
                            resolve(true);
                        });

                    }

                });

            }));


            return request;
        }

    };

    return transaction.doReadWrite(task);

};

module.exports = {

    getAll: getAll,
    getByOwner: getByOwner,
    create: create

};