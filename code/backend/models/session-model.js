module.exports = function (orm, db) {

    var Session = db.define('Session', {
        id       : { type: 'serial', key: true, mapsTo: 'id' },
        token    : { type: 'text', size: 255, unique: true, required: true, mapsTo: 'token' },
        expiresAt: { type: 'date', time: true, mapsTo: 'expiresAt' }
    }, {
        collection: 'session',
        timestamp: true
    });

    Session.hasOne('user', db.models.User, { required: true });
    Session.hasOne('installation', db.models.Installation, { required: true });

};