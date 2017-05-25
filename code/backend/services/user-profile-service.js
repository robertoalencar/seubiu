const _ = require('lodash');
const await = require('asyncawait/await');
const Promise = require('bluebird');
const doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
const doReadWrite = require('../utils/orm-db-transaction').doReadWrite;
const ERROR = require('../utils/service-error-constants');
const ServiceException = require('../utils/service-exception');

const getById = (userId) => {
    return doReadOnly((db) => {
        let errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            const userProfileFind = Promise.promisify(db.models.UserProfile.find);
            return _.first(await(userProfileFind({'user_id': userId})));
        }

    });
};

const applyPatchesForUpdate = (userProfile, patches, db) => {

    _(patches).forEach((patchOp) => {

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

const update = (userId, patches) => {
    return doReadWrite((db) => {
        let errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(patches)) {
            errors.push(ERROR.Common.PATCHES_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            const userProfileFind = Promise.promisify(db.models.UserProfile.find);
            let userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                userProfile = new db.models.UserProfile({'user_id': userId});
            }

            applyPatchesForUpdate(userProfile, patches, db);

            const userProfileSave = Promise.promisify(userProfile.save);
            return userProfileSave();
        }

    });

};

const setCities = (userId, cityIds) => {
    return doReadWrite((db) => {
        let errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(cityIds)) {
            errors.push(ERROR.UserProfile.CITY_IDS_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            const userProfileFind = Promise.promisify(db.models.UserProfile.find);
            let userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Types.NOT_FOUND);
            }

            const cityFind = Promise.promisify(db.models.City.find);
            let cities = await(cityFind({'id': cityIds}));

            const userProfileSetCities = Promise.promisify(userProfile.setCities);
            return userProfileSetCities(cities);
        }

    });
};

const getCities = (userId) => {
    return doReadOnly((db) => {
        let errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {
            const userProfileFind = Promise.promisify(db.models.UserProfile.find);
            let userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Types.NOT_FOUND);
            }

            const userProfileGetCities = Promise.promisify(userProfile.getCities);
            return userProfileGetCities();
        }

    });
};

const setProfessions = (userId, professionIds) => {
    return doReadWrite((db) => {
        let errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(professionIds)) {
            errors.push(ERROR.UserProfile.PROFESSION_IDS_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            const userProfileFind = Promise.promisify(db.models.UserProfile.find);
            let userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Types.NOT_FOUND);
            }

            const professionFind = Promise.promisify(db.models.Profession.find);
            let professions = await (professionFind({'id': professionIds}));

            const userProfileSetProfessions = Promise.promisify(userProfile.setProfessions);
            return userProfileSetProfessions(professions);
        }

    });
};

const getProfessions = (userId) => {
    return doReadOnly((db) => {
        let errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            const userProfileFind = Promise.promisify(db.models.UserProfile.find);
            let userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Types.NOT_FOUND);
            }

            const userProfileGetProfessions = Promise.promisify(userProfile.getProfessions);
            return userProfileGetProfessions();
        }

    });
};

const setServices = (userId, servicesIds) => {
    return doReadWrite((db) => {
        let errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(servicesIds)) {
            errors.push(ERROR.UserProfile.SERVICE_IDS_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            const userProfileFind = Promise.promisify(db.models.UserProfile.find);
            let userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Types.NOT_FOUND);
            }

            const servicesFind = Promise.promisify(db.models.Service.find);
            let services = await (servicesFind({'id': servicesIds}));

            const userProfileSetServices = Promise.promisify(userProfile.setServices);
            return userProfileSetServices(services);
        }

    });
};

const getServices = (userId) => {
    return doReadOnly((db) => {
        let errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            const userProfileFind = Promise.promisify(db.models.UserProfile.find);
            let userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Types.NOT_FOUND);
            }

            const userProfileGetServices = Promise.promisify(userProfile.getServices);
            return userProfileGetServices();
        }

    });
};

const updateDisplayImage = (userId, name, size, type, data, ip) => {
    return doReadWrite((db) => {
        let errors = [];

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
            const userProfileFind = Promise.promisify(db.models.UserProfile.find);
            let userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Types.NOT_FOUND);
            }

            await (new Promise((resolve, reject) => {

                db.models.File.find({'id': userProfile.displayimage_id}).remove((err) => {
                    if (err) reject(err);
                    resolve(true);
                });

            }));

            const fileCreate = Promise.promisify(db.models.File.create);
            let file = await (fileCreate({
                            'name' : name,
                            'size' : size,
                            'type' : type,
                            'data' : data,
                            'ip'   : ip
            }));

            const profileSetDisplayImage = Promise.promisify(userProfile.setDisplayImage);
            return profileSetDisplayImage(file);
        }

    });
};

const getDisplayImage = (userId) => {
    return doReadWrite((db) => {
        let errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            const userProfileFind = Promise.promisify(db.models.UserProfile.find);
            let userProfile = _.first(await(userProfileFind({'user_id': userId})));

            if (_.isNil(userProfile)) {
                throw ServiceException(ERROR.UserProfile.USER_PROFILE_NOT_FOUND, ERROR.Types.NOT_FOUND);
            } else if (userProfile.displayimage_id) {
                throw ServiceException(ERROR.UserProfile.DISPLAY_IMAGE_NOT_FOUND, ERROR.Types.NOT_FOUND);
            }

            const fileGet = Promise.promisify(db.models.File.get);
            return fileGet(userProfile.displayimage_id);
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