var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');
var ERROR = require('../utils/service-error-constants');

var getByFilter = function(filter, db) {
    var professionSuggestionFind = Promise.promisify(db.models.ProfessionSuggestion.find);
    return professionSuggestionFind(filter, [ 'profession', 'A' ]);
};

var getAll = function(filter) {
    return transaction.doReadOnly(function(db) {
        return await (getByFilter(filter, db));
    });
};

var getById = function(id) {
    return transaction.doReadOnly(function(db) {
        var errors = [];

        if (!id) {
            errors.push(ERROR.ProfessionSuggestion.PROFESSION_SUGGESTION_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {
            var professionSuggestionGet = Promise.promisify(db.models.ProfessionSuggestion.get);
            return await (professionSuggestionGet(id));
        }

    });

};

var remove = function(id) {
    return transaction.doReadWrite(function(db) {
        var errors = [];

        if (!id) {
            errors.push(ERROR.ProfessionSuggestion.PROFESSION_SUGGESTION_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {

            await (new Promise(function (resolve, reject) {

                db.models.ProfessionSuggestion.find({'id': id}).remove(function (err) {
                    if (err) reject(err);
                    resolve(true);
                });

            }));

        }

    });

};

var create = function(userId, data, ip) {
    return transaction.doReadWrite(function(db) {
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
            throw errors;
        } else {

            var professionSuggestionCreate = Promise.promisify(db.models.ProfessionSuggestion.create);
            return await (professionSuggestionCreate(
            {
                'profession': data.profession,
                'approved': false,
                'ip': ip,
                'user_id': userId
            }));
        }

    });

};

var applyPatchesForProfessionSuggestion = function(professionSuggestion, patches) {

    _(patches).forEach(function(patchOp) {

        switch (patchOp.path) {

            case  '/profession':

                if (patchOp.op == 'replace') {
                    professionSuggestion.profession = patchOp.value;
                }

            break;

        }

    });

};

var update = function(professionSuggestionId, patches) {
    return transaction.doReadWrite(function(db) {
        var errors = [];

        if (!professionSuggestionId) {
            errors.push(ERROR.ProfessionSuggestion.PROFESSION_SUGGESTION_ID_IS_REQUIRED);
        }

        if (_.isEmpty(patches)) {
            errors.push(ERROR.Common.PATCHES_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {

            var professionSuggestionGet = Promise.promisify(db.models.ProfessionSuggestion.get);
            var professionSuggestion = await (professionSuggestionGet(professionSuggestionId));

            applyPatchesForProfessionSuggestion(professionSuggestion, patches);

            var professionSuggestionSave = Promise.promisify(professionSuggestion.save);
            return await(professionSuggestionSave());
        }

    });

};

var alreadyApproved = function(id, db) {
    var exists = Promise.promisify(db.models.ProfessionSuggestion.exists);
    return await (exists({'id': id, 'approved': true}));
};

var approve = function(id) {
    return transaction.doReadWrite(function(db) {
        var errors = [];

        if (!id) {
            errors.push(ERROR.ProfessionSuggestion.PROFESSION_SUGGESTION_ID_IS_REQUIRED);
        } else if (alreadyApproved(id, db)) {
            errors.push(ERROR.ProfessionSuggestion.PROFESSION_SUGGESTION_ALREADY_APPROVED);
        }

        if (!_.isEmpty(errors)) {
            throw errors;
        } else {

            var professionSuggestionGet = Promise.promisify(db.models.ProfessionSuggestion.get);
            var professionSuggestion = await (professionSuggestionGet(id));

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