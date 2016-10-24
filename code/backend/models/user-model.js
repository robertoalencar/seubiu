module.exports = function (orm, db) {

    var User = db.define('User', {
        id              : { type: 'serial', key: true, mapsTo: 'id' },
        displayName     : { type: 'text', size: 255, required: true, mapsTo: 'displayName' },
        email           : { type: 'text', size: 255, required: true, unique: true,  mapsTo: 'email' },
        emailVerified   : { type: 'boolean', defaultValue: false, mapsTo: 'emailVerified' },
        username        : { type: 'text', size: 50, required: true, unique: true, mapsTo: 'username' },
        password        : { type: 'text', size: 50, required: true, mapsTo: 'password' },
        admin           : { type: 'boolean', defaultValue: false, mapsTo: 'admin' }
    }, {
        collection: 'user',
        timestamp: true
    });

    User.hasOne('status', db.models.UserStatus, { required: true });

};