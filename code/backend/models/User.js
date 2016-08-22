module.exports = function (orm, db) {

    var User = db.define('User', {
        id              : { type: 'serial', key: true, mapsTo: 'id' },
        name            : { type: 'text', size: 255, required: true, mapsTo: 'name' },
        displayName     : { type: 'text', size: 255, mapsTo: 'displayName' },
        email           : { type: 'text', size: 255, required: true, unique: true,  mapsTo: 'email' },
        emailVerified   : { type: 'boolean', defaultValue: false, mapsTo: 'emailVerified' },
        password        : { type: 'text', size: 50, required: true, mapsTo: 'password' },
        authData        : { type: 'text', size: 255, mapsTo: 'authData' }
    }, {
        collection: 'user',
        timestamp: true
    });

    User.hasOne('status', db.models.UserStatus, { required: true });
    User.hasOne('type', db.models.UserType, { required: true });
    User.hasOne('authProvider', db.models.AuthProvider, { required: true });
    User.hasMany('professions', db.models.Profession, {}, { key: true });
    User.hasMany('services', db.models.Service, {}, { key: true });

};