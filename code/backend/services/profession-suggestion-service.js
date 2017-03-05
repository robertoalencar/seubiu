const _ = require('lodash');
const await = require('asyncawait/await');
const Promise = require('bluebird');
const doReadOnly = require('../utils/orm-db-transaction').doReadOnly;
const doReadWrite = require('../utils/orm-db-transaction').doReadWrite;
const ERROR = require('../utils/service-error-constants');
const ServiceException = require('../utils/service-exception');

const getByFilter = (filter, db) => {
    const professionSuggestionFind = Promise.promisify(db.models.ProfessionSuggestion.find);
    return professionSuggestionFind(filter, [ 'profession', 'A' ]);
};

const getAll = (filter) => {
    return doReadOnly(db => {
        return getByFilter(filter, db);
    });
};

const getById = (id) => {
    return doReadOnly((db) => {
        let errors = [];

        if (!id) {
            errors.push(ERROR.ProfessionSuggestion.PROFESSION_SUGGESTION_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {
            const professionSuggestionGet = Promise.promisify(db.models.ProfessionSuggestion.get);
            return professionSuggestionGet(id);
        }

    });

};

const remove = (id) => {
    return doReadWrite((db) => {
        let errors = [];

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

const create = (userId, data, ip) => {
    return doReadWrite((db) => {
        let errors = [];

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

            const professionSuggestionCreate = Promise.promisify(db.models.ProfessionSuggestion.create);
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

const applyPatchesForProfessionSuggestion = (professionSuggestion, patches) => {

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

const update = (professionSuggestionId, patches) => {
    return doReadWrite((db) => {
        let errors = [];

        if (!professionSuggestionId) {
            errors.push(ERROR.ProfessionSuggestion.PROFESSION_SUGGESTION_ID_IS_REQUIRED);
        }

        if (_.isEmpty(patches)) {
            errors.push(ERROR.Common.PATCHES_ARE_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {

            const professionSuggestionGet = Promise.promisify(db.models.ProfessionSuggestion.get);
            let professionSuggestion = await (professionSuggestionGet(professionSuggestionId));

            applyPatchesForProfessionSuggestion(professionSuggestion, patches);

            const professionSuggestionSave = Promise.promisify(professionSuggestion.save);
            return professionSuggestionSave();
        }

    });

};

const approve = function(id) {
    return doReadWrite((db) => {
        let errors = [];

        if (!id) {
            errors.push(ERROR.ProfessionSuggestion.PROFESSION_SUGGESTION_ID_IS_REQUIRED);
        }

        if (!_.isEmpty(errors)) {
            throw ServiceException(errors);
        } else {

            const professionSuggestionGet = Promise.promisify(db.models.ProfessionSuggestion.get);
            let professionSuggestion = await (professionSuggestionGet(id));

            if (professionSuggestion.approved) {
                throw ServiceException([ERROR.ProfessionSuggestion.PROFESSION_SUGGESTION_ALREADY_APPROVED]);
            }

            professionSuggestion.approved = true;

            const professionSuggestionSave = Promise.promisify(professionSuggestion.save);
            professionSuggestion = await (professionSuggestionSave());

            const professionCreate = Promise.promisify(db.models.Profession.create);
            let newProfession = await (professionCreate(
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