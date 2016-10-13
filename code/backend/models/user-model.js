module.exports = function (orm, db) {

    var User = db.define('User', {
        id              : { type: 'serial', key: true, mapsTo: 'id' },
        name            : { type: 'text', size: 255, required: true, mapsTo: 'name' },
        displayName     : { type: 'text', size: 255, mapsTo: 'displayName' },
        email           : { type: 'text', size: 255, required: true, unique: true,  mapsTo: 'email' },
        emailVerified   : { type: 'boolean', defaultValue: false, mapsTo: 'emailVerified' },
        username        : { type: 'text', size: 50, required: false, unique: true, mapsTo: 'username' },
        password        : { type: 'text', size: 50, required: true, mapsTo: 'password' },
        admin           : { type: 'boolean', defaultValue: false, mapsTo: 'admin' }
    }, {
        collection: 'user',
        timestamp: true
    });

    User.hasOne('status', db.models.UserStatus, { required: true });
    User.hasMany('professions', db.models.Profession, {}, { key: true, mergeAssocId: 'profession_id' });
    User.hasMany('services', db.models.Service, {}, { key: true, mergeAssocId: 'service_id' });

    User.STATUS = { NEW: 1, ACTIVE: 2, BLOCKED: 3 };

};