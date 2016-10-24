module.exports = function (orm, db) {

    var UserPersonalInfo = db.define('UserPersonalInfo', {
        id              : { type: 'serial', key: true, mapsTo: 'id' },
        birth           : { type: 'date', time: false,  mapsTo: 'birthdate' },
        rg              : { type: 'text', size: 40, required: true, unique: true,  mapsTo: 'rg' },
        cpf             : { type: 'text', size: 30, required: true, unique: true,  mapsTo: 'cpf' }
    }, {
        collection: 'user_personal_info'
    });

    UserPersonalInfo.hasOne('user', db.models.User, { required: true } );
};