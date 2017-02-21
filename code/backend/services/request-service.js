var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');
var ERROR = require('../utils/service-error-constants');

var getByFilter = function(filter, db) {
    var requestFind = Promise.promisify(db.models.Request.find);
    return requestFind(filter, [ 'description', 'A' ]);
};

var getAll = function(filter) {
    return transaction.doReadOnly(function(db) {
        return await (getByFilter(filter, db));
    });
};

var getByOwner = function(userId) {
    return transaction.doReadOnly(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {
            return await (getByFilter({'owner_id':userId}, db));
        }

    });
};

var create = function(userId, ip, data) {
    return transaction.doReadWrite(function(db) {
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

        if (_.isNil(data.professionalIds) || _.isEmpty(data.professionalIds)) {
            errors.push(ERROR.Request.PROFESSIONAL_IDS_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {

            var requestCreate = Promise.promisify(db.models.Request.create);
            var request = await (requestCreate({
                    'description': data.description,
                    'ip': ip,
                    'address': data.address,
                    'coordLat': data.coordLat,
                    'coordLong': data.coordLong,
                    'owner_id': userId,
                    'city_id': data.cityId,
                    'profession_id': data.professionId,
                    'status_id': db.models.RequestStatus.NEW
            }));

            var serviceFind = Promise.promisify(db.models.Service.find);
            var services = await (serviceFind({'id': data.serviceIds}));

            var requestSetService = Promise.promisify(request.setServices);
            await (requestSetService(services));

            var professionalFind = Promise.promisify(db.models.User.find);
            var professionals = await (professionalFind({'id': data.professionalIds}));

            var requestProfessionalCreate = Promise.promisify(db.models.RequestProfessional.create);
            _.forEach(professionals, function(professional) {

                await (requestProfessionalCreate({
                    'request_id': request.id,
                    'professional_id': professional.id
                }));

            });

            return request;
        }

    });

};

module.exports = {
    getAll: getAll,
    getByOwner: getByOwner,
    create: create
};