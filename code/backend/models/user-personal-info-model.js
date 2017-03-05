module.exports = (orm, db) => {

    var UserPersonalInfo = db.define('UserPersonalInfo', {
        id              : { type: 'serial', key: true, mapsTo: 'id' },
        birthDate       : { type: 'date', time: false, required: true, mapsTo: 'birthDate' },
        rg              : { type: 'text', size: 30, required: true,  mapsTo: 'rg' },
        rgOrgIssuer     : { type: 'text', size: 20, required: true,  mapsTo: 'rgOrgIssuer' },
        cpf             : { type: 'text', size: 30, required: true, unique: true,  mapsTo: 'cpf' }
    }, {
        collection: 'user_personal_info'
    });

    UserPersonalInfo.hasOne('user', db.models.User, { required: true } );
};