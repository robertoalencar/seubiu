module.exports = (orm, db) => {

    var User = db.define('User', {
        id              : { type: 'serial', key: true, mapsTo: 'id' },
        name            : { type: "text", size: 125, required: true, mapsTo: 'name' },
        surname         : { type: "text", size: 125, required: true, mapsTo: 'surname' },
        phone           : { type: 'text', size: 30, required: true, unique: true,  mapsTo: 'phone' },
        email           : { type: 'text', size: 255, required: true, unique: true,  mapsTo: 'email' },
        emailVerified   : { type: 'boolean', defaultValue: false, mapsTo: 'emailVerified' },
        password        : { type: 'text', size: 50, required: true, mapsTo: 'password' },
        admin           : { type: 'boolean', defaultValue: false, mapsTo: 'admin' }
    }, {
        collection: 'user',
        timestamp: true
    });

    User.hasOne('status', db.models.UserStatus, { required: true });

};