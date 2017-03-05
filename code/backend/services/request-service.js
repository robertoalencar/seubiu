var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
var doReadWrite = require('../utils/orm-db-transaction').doReadWrite;
var ERROR = require('../utils/service-error-constants');
var ServiceException = require('../utils/service-exception');

var getByFilter = (filter, db) => {
    var requestFind = Promise.promisify(db.models.Request.find);
    return requestFind(filter, [ 'description', 'A' ]);
};

var getAll = (filter) => {
    return doReadOnly((db) => {
        return getByFilter(filter, db);
    });
};

var getByOwner = (userId) => {
    return doReadOnly((db) => {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            return getByFilter({'owner_id':userId}, db);
        }

    });
};

var create = (userId, ip, data) => {
    return doReadWrite((db) => {
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
            throw ServiceException(errors);
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

            var requestProfessionals = [];

            _.forEach(professionals, (professional) => {

                requestProfessionals.push({
                    'request_id': request.id,
                    'professional_id': professional.id
                });

            });

            var requestProfessionalCreate = Promise.promisify(db.models.RequestProfessional.create);
            await (requestProfessionalCreate(requestProfessionals));

            return request;
        }

    });

};

var professionalAccept = (requestId, professionalId) => {
    return doReadWrite((db) => {

        var errors = [];

        if (!requestId) {
            errors.push(ERROR.Request.REQUEST_ID_IS_REQUIRED);
        }

        if (!professionalId) {
            errors.push(ERROR.Profession.PROFESSION_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {

            var requestProfessionalFind = Promise.promisify(db.models.RequestProfessional.find);
            var requestProfessional = _.first(await (requestProfessionalFind({'request_id': requestId, 'professional_id': professionalId})));

            if (_.isNil(requestProfessional)) {
                throw ServiceException(ERROR.RequestProfessional.REQUEST_PROFESSIONAL_NOT_FOUND, ERROR.Types.NOT_FOUND);
            } else if (requestProfessional.accepted) {
                throw ServiceException([ERROR.RequestProfessional.REQUEST_PROFESSIONAL_ALREADY_ACCEPTED]);
            } else {

                requestProfessional.accepted = true;
                var requestProfessionalSave = Promise.promisify(requestProfessional.save);
                return requestProfessionalSave();

            }

        }
    });
};

module.exports = {
    getAll: getAll,
    getByOwner: getByOwner,
    create: create,
    professionalAccept: professionalAccept
};