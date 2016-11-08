var _ = require('lodash');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');

var getById = function(userId) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('USER_ID_IS_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.UserProfile.find({'user_id': userId}).first(function (err, profile) {
                    if (err) reject(err);
                    resolve(profile);
                });

            }

        }));

    });
};

var applyPatchesForUpdate = function (profile, patches, db) {

    _(patches).forEach(function(patchOp) {

        switch (patchOp.path) {

            case  '/displayName':

                if (patchOp.op == 'replace') {
                    profile.displayName = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    profile.displayName = null;
                }

            break;

            case  '/about':

                if (patchOp.op == 'replace') {
                    profile.about = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    profile.about = null;
                }

            break;

            case  '/otherServices':

                if (patchOp.op == 'replace') {
                    profile.otherServices = patchOp.value;
                } else if (patchOp.op == 'remove') {
                    profile.otherServices = false;
                }

            break;

        }
    });

};

var update = function(userId, patches) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('User ID is required');
            }

            if (_.isEmpty(patches)) {
                errors.push('Patches are required');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.UserProfile.find({'user_id': userId}).first(function (err, profile) {
                    if (err) {
                        reject(err);
                    } else {

                        if (_.isNil(profile)) {
                            profile = new db.models.UserProfile({'user_id': userId});
                        }

                        applyPatchesForUpdate(profile, patches, db);

                        profile.save(function(err) {
                            if (err) reject(err);
                            resolve(profile);
                        });

                    }


                });

            }

        }));

    });

};

var setCities = function(userId, cityIds) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('USER_ID_IS_REQUIRED');
            }

            if (_.isEmpty(cityIds)) {
                errors.push('CITY_IDS_ARE_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.UserProfile.find({'user_id': userId}).first(function (err, profile) {
                    if (err) {
                        reject(err);
                    } else if (_.isNil(profile)) {
                        reject(['USER_PROFILE_NOT_FOUND']);
                    } else {

                        db.models.City.find({'id': cityIds}, function(err, cities) {
                            if (err) {
                                reject(err);
                            } else {

                                 profile.setCities(cities, function(err) {
                                    if (err) reject(err);
                                    resolve(true);
                                });

                            }

                        });
                    }

                });

            }

        }));

    });
};

var getCities = function(userId) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('USER_ID_IS_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.UserProfile.find({'user_id': userId}).first(function (err, profile) {
                    if (err) {
                        reject(err);
                    } else if (_.isNil(profile)) {
                        reject(['USER_PROFILE_NOT_FOUND']);
                    } else {
                        profile.getCities(function(err, cities) {
                            if (err) reject(err);
                            resolve(cities);
                        });

                    }

                });

            }

        }));

    });
};

var setProfessions = function(userId, professionIds) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('USER_ID_IS_REQUIRED');
            }

            if (_.isEmpty(professionIds)) {
                errors.push('PROFESSION_IDS_ARE_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.UserProfile.find({'user_id': userId}).first(function (err, profile) {
                    if (err) {
                        reject(err);
                    } else if (_.isNil(profile)) {
                        reject(['USER_PROFILE_NOT_FOUND']);
                    } else {

                        db.models.Profession.find({'id': professionIds}, function(err, professions) {
                            if (err) {
                                reject(err);
                            } else {

                                profile.setProfessions(professions, function(err) {
                                    if (err) reject(err);
                                    resolve(true);
                                });

                            }

                        });

                    }
                });

            }

        }));

    });
};

var getProfessions = function(userId) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('USER_ID_IS_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.UserProfile.find({'user_id': userId}).first(function (err, profile) {
                    if (err) {
                        reject(err);
                    } else if (_.isNil(profile)) {
                        reject(['USER_PROFILE_NOT_FOUND']);
                    } else {
                        profile.getProfessions(function(err, professions) {
                            if (err) reject(err);
                            resolve(professions);
                        });
                    }

                });

            }

        }));

    });
};

var setServices = function(userId, servicesIds) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('USER_ID_IS_REQUIRED');
            }

            if (_.isEmpty(servicesIds)) {
                errors.push('SERVICE_IDS_ARE_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.UserProfile.find({'user_id': userId}).first(function (err, profile) {
                    if (err) {
                        reject(err);
                    } else if (_.isNil(profile)) {
                        reject(['USER_PROFILE_NOT_FOUND']);
                    } else {

                        db.models.Service.find({'id': servicesIds}, function(err, services) {
                            if (err) {
                                reject(err);
                            } else {

                                profile.setServices(services, function(err) {
                                    if (err) reject(err);
                                    resolve(true);
                                });

                            }

                        });

                    }

                });

            }

        }));

    });
};

var getServices = function(userId) {

    return transaction.doReadOnly(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('USER_ID_IS_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.UserProfile.find({'user_id': userId}).first(function (err, profile) {
                    if (err) {
                        reject(err);
                    } else if (_.isNil(profile)) {
                        reject(['USER_PROFILE_NOT_FOUND']);
                    } else {

                        profile.getServices(function(err, services) {
                            if (err) reject(err);
                            resolve(services);
                        });

                    }

                });

            }

        }));

    });
};

var updateDisplayImage = function(userId, name, size, type, data, ip) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('USER_ID_IS_REQUIRED');
            }

            if (_.isEmpty(name)) {
                errors.push('NAME_IS_REQUIRED');
            }

            if (!size  || size  <= 0) {
                errors.push('SIZE_IS_REQUIRED');
            }

            if (_.isEmpty(type)) {
                errors.push('TYPE_IS_REQUIRED');
            }

            if (_.isEmpty(data)) {
                errors.push('DATA_IS_REQUIRED');
            }

            if (_.isEmpty(ip)) {
                errors.push('IP_IS_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(errors);

            } else {

                db.models.UserProfile.find({'user_id': userId}).first(function (err, profile) {
                    if (err) {
                        reject(err);
                    } else if (_.isNil(profile)) {
                        reject(['USER_PROFILE_NOT_FOUND']);
                    } else {

                        db.models.File.find({'id': profile.displayimage_id}).remove(function (err) {
                            if (err) {
                                reject(err);
                            } else {

                                var newFile = new db.models.File({
                                    'name' : name,
                                    'size' : size,
                                    'type' : type,
                                    'data' : data,
                                    'ip'   : ip
                                });

                                db.models.File.create(newFile, function(err, savedFile) {
                                    if (err) {
                                        reject(err);
                                    } else {

                                        profile.setDisplayImage(savedFile, function(err) {
                                            if (err) reject(err);
                                            resolve(true);
                                        });

                                    }


                                });

                            }

                        });
                    }

                });

            }

        }));

    });

};


var getDisplayImage = function(userId) {

    return transaction.doReadWrite(function(db) {

        return await (new Promise(function (resolve, reject) {

            var errors = [];

            if (!userId) {
                errors.push('USER_ID_IS_REQUIRED');
            }

            if (!_.isEmpty(errors)) {

                reject(_.join(errors, ', '));

            } else {

                db.models.UserProfile.find({'user_id': userId}).first(function (err, profile) {
                    if (err) {
                        reject(err);
                    } else if (_.isNil(profile)) {
                        reject(['USER_PROFILE_NOT_FOUND']);
                    } else if (_.isNil(profile.displayimage_id)) {
                        reject(['DISPLAY_IMAGE_NOT_FOUND']);
                    } else {

                        db.models.File.get(profile.displayimage_id, function(err, file) {
                            if (err) reject(err);
                            resolve(file);
                        });

                    }

                });

            }

        }));

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