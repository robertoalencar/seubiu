var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
var doReadWrite = require('../utils/orm-db-transaction').doReadWrite;
var ERROR = require('../utils/service-error-constants');
var ServiceException = require('../utils/service-exception');

var getByFilter = (filter, db) => {
    var professionSuggestionFind = Promise.promisify(db.models.ProfessionSuggestion.find);
    return professionSuggestionFind(filter, [ 'profession', 'A' ]);
};

var getAll = (filter) => {
    return doReadOnly(db => {
        return getByFilter(filter, db);
    });
};

var getById = (id) => {
    return doReadOnly((db) => {
        var errors = [];

        if (!id) {
            errors.push(ERROR.ProfessionSuggestion.PROFESSION_SUGGESTION_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            var professionSuggestionGet = Promise.promisify(db.models.ProfessionSuggestion.get);
            return professionSuggestionGet(id);
        }

    });

};

var remove = (id) => {
    return doReadWrite((db) => {
        var errors = [];

        if (!id) {
            errors.push(ERROR.ProfessionSuggestion.PROFESSION_SUGGESTION_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {

            return new Promise((resolve, reject) => {

                db.models.ProfessionSuggestion.find({'id': id}).remove( (err) => {
                    if (err) reject(err);
                    resolve(true);
                });

            });

        }

    });

};

var create = (userId, data, ip) => {
    return doReadWrite((db) => {
        var errors = [];

        if (!userId) {
            errors.push(ERROR.User.USER_ID_IS_REQUIRED);
        }

        if (_.isEmpty(data.profession)) {
            errors.push(ERROR.ProfessionSuggestion.PROFESSION_IS_REQUIRED);
        }

        if (_.isEmpty(ip)) {
            errors.push(ERROR.Common.IP_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {

            var professionSuggestionCreate = Promise.promisify(db.models.ProfessionSuggestion.create);
            return professionSuggestionCreate(
            {
                'profession': data.profession,
                'approved': false,
                'ip': ip,
                'user_id': userId
            });
        }

    });

};

var applyPatchesForProfessionSuggestion = (professionSuggestion, patches) => {

    _(patches).forEach((patchOp) => {

        switch (patchOp.path) {

            case  '/profession':

                if (patchOp.op == 'replace') {
                    professionSuggestion.profession = patchOp.value;
                }

            break;

        }

    });

};

var update = (professionSuggestionId, patches) => {
    return doReadWrite((db) => {
        var errors = [];

        if (!professionSuggestionId) {
            errors.push(ERROR.ProfessionSuggestion.PROFESSION_SUGGESTION_ID_IS_REQUIRED);
        }

        if (_.isEmpty(patches)) {
            errors.push(ERROR.Common.PATCHES_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {

            var professionSuggestionGet = Promise.promisify(db.models.ProfessionSuggestion.get);
            var professionSuggestion = await (professionSuggestionGet(professionSuggestionId));

            applyPatchesForProfessionSuggestion(professionSuggestion, patches);

            var professionSuggestionSave = Promise.promisify(professionSuggestion.save);
            return professionSuggestionSave();
        }

    });

};

var approve = function(id) {
    return doReadWrite((db) => {
        var errors = [];

        if (!id) {
            errors.push(ERROR.ProfessionSuggestion.PROFESSION_SUGGESTION_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {

            var professionSuggestionGet = Promise.promisify(db.models.ProfessionSuggestion.get);
            var professionSuggestion = await (professionSuggestionGet(id));

            if (professionSuggestion.approved) {
                throw ServiceException([ERROR.ProfessionSuggestion.PROFESSION_SUGGESTION_ALREADY_APPROVED]);
            }

            professionSuggestion.approved = true;

            var professionSuggestionSave = Promise.promisify(professionSuggestion.save);
            professionSuggestion = await (professionSuggestionSave());

            var professionCreate = Promise.promisify(db.models.Profession.create);
            var newProfession = await (professionCreate(
            {
                'description': professionSuggestion.profession,
                'active': true
            }));

            return professionSuggestion;
        }

    });

};


module.exports = {
    getAll: getAll,
    getById: getById,
    create: create,
    remove: remove,
    update: update,
    approve: approve
};