var _ = require('lodash');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');
var ERROR = require('../utils/service-error-constants');
var ServiceException = require('../utils/service-exception');

var getById = function(userId) {
    return transaction.doReadOnly(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var userProfileFind = Promise.promisify(db.models.UserProfile.find);
            return _.first(await(userProfileFind({'user_id': userId})));
        }

    });
};

var applyPatchesForUpdate = function (userProfile, patches, db) {

    _(patches).forEach(function(patchOp) {

        switch (patchOp.path) {

            case  '/displayName':

                if (patchOp.op == 'replace') {
                    userProfile.displayName = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    userProfile.displayName = null;
                }

            break;

            case  '/about':

                if (patchOp.op == 'replace') {
                    userProfile.about = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    userProfile.about = null;
                }

            break;

            case  '/otherServices':

                if (patchOp.op == 'replace') {
                    userProfile.otherServices = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    userProfile.otherServices = false;
                }

            break;

        }
    });

};

var update = function(userId, patches) {
    return transaction.doReadWrite(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(patches)) {
            errors.push(ERROR.Common.PATCHES_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var userProfileFind = Promise.promisify(db.models.UserProfile.find);
            var userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                userProfile = new db.models.UserProfile({'user_id': userId});
            }

            applyPatchesForUpdate(userProfile, patches, db);

            var userProfileSave = Promise.promisify(userProfile.save);
            return await(userProfileSave());
        }

    });

};

var setCities = function(userId, cityIds) {
    return transaction.doReadWrite(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(cityIds)) {
            errors.push(ERROR.UserProfile.CITY_IDS_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var userProfileFind = Promise.promisify(db.models.UserProfile.find);
            var userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Type.NOT_FOUND);
            }

            var cityFind = Promise.promisify(db.models.City.find);
            var cities = await(cityFind({'id': cityIds}));

            var userProfileSetCities = Promise.promisify(userProfile.setCities);
            return await (userProfileSetCities(cities));
        }

    });
};

var getCities = function(userId) {
    return transaction.doReadOnly(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {
            var userProfileFind = Promise.promisify(db.models.UserProfile.find);
            var userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Type.NOT_FOUND);
            }

            var userProfileGetCities = Promise.promisify(userProfile.getCities);
            return await (userProfileGetCities());
        }

    });
};

var setProfessions = function(userId, professionIds) {
    return transaction.doReadWrite(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(professionIds)) {
            errors.push(ERROR.UserProfile.PROFESSION_IDS_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var userProfileFind = Promise.promisify(db.models.UserProfile.find);
            var userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Type.NOT_FOUND);
            }

            var professionFind = Promise.promisify(db.models.Profession.find);
            var professions = await (professionFind({'id': professionIds}));

            var userProfileSetProfessions = Promise.promisify(userProfile.setProfessions);
            return await (userProfileSetProfessions(professions));
        }

    });
};

var getProfessions = function(userId) {
    return transaction.doReadOnly(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var userProfileFind = Promise.promisify(db.models.UserProfile.find);
            var userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Type.NOT_FOUND);
            }

            var userProfileGetProfessions = Promise.promisify(userProfile.getProfessions);
            return await (userProfileGetProfessions());
        }

    });
};

var setServices = function(userId, servicesIds) {
    return transaction.doReadWrite(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(servicesIds)) {
            errors.push(ERROR.UserProfile.SERVICE_IDS_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var userProfileFind = Promise.promisify(db.models.UserProfile.find);
            var userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Type.NOT_FOUND);
            }

            var servicesFind = Promise.promisify(db.models.Service.find);
            var services = await (servicesFind({'id': servicesIds}));

            var userProfileSetServices = Promise.promisify(userProfile.setServices);
            return await (userProfileSetServices(services));
        }

    });
};

var getServices = function(userId) {
    return transaction.doReadOnly(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var userProfileFind = Promise.promisify(db.models.UserProfile.find);
            var userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Type.NOT_FOUND);
            }

            var userProfileGetServices = Promise.promisify(userProfile.getServices);
            return await (userProfileGetServices());
        }

    });
};

var updateDisplayImage = function(userId, name, size, type, data, ip) {
    return transaction.doReadWrite(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(name)) {
            errors.push(ERROR.Common.NAME_IS_REQUIRED);
        }

        if (!size || size  <= 0) {
            errors.push(ERROR.UserProfile.DisplayImage.SIZE_IS_REQUIRED);
        }

        if (_.isEmpty(type)) {
            errors.push(ERROR.UserProfile.DisplayImage.TYPE_IS_REQUIRED);
        }

        if (_.isEmpty(data)) {
            errors.push(ERROR.UserProfile.DisplayImage.DATA_IS_REQUIRED);
        }

        if (_.isEmpty(ip)) {
            errors.push(ERROR.Common.IP_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var userProfileFind = Promise.promisify(db.models.UserProfile.find);
            var userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Type.NOT_FOUND);
            }

            await (new Promise(function (resolve, reject) {

                db.models.File.find({'id': userProfile.displayimage_id}).remove(function (err) {
                    if (err) reject(err);
                    resolve(true);
                });

            }));

            var fileCreate = Promise.promisify(db.models.File.create);
            var file = await (fileCreate({
                            'name' : name,
                            'size' : size,
                            'type' : type,
                            'data' : data,
                            'ip'   : ip
            }));

            var profileSetDisplayImage = Promise.promisify(userProfile.setDisplayImage);
            return await(profileSetDisplayImage(file));
        }

    });
};

var getDisplayImage = function(userId) {
    return transaction.doReadWrite(function(db) {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var userProfileFind = Promise.promisify(db.models.UserProfile.find);
            var userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Type.NOT_FOUND);
            } else if (userProfile.displayimage_id) {
                throw ServiceException(ERROR.UserProfile.DISPLAY_IMAGE_NOT_FOUND, ERROR.Type.NOT_FOUND);
            }

            var fileGet = Promise.promisify(db.models.File.get);
            return await(fileGet(userProfile.displayimage_id));
        }

    });

};


module.exports = {
    getById: getById,
    update: update,
    setCities: setCities,
    getCities: getCities,

    setProfessions: setProfessions,
    getProfessions: getProfessions,
    setServices: setServices,
    getServices: getServices,

    updateDisplayImage: updateDisplayImage,
    getDisplayImage: getDisplayImage
};