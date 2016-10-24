module.exports = function (orm, db) {

    var UserProfile = db.define('UserProfile', {
        id              : { type: 'serial', key: true, mapsTo: 'id' },
        displayName     : { type: 'text', size: 255, mapsTo: 'displayName' },
        displayImage    : { type: 'binary', mapsTo: 'displayImage' }
    }, {
        collection: 'user_profile'
    });

    UserProfile.hasOne('user', db.models.User, { required: true } );
};
