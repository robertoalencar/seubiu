module.exports = function (orm, db) {

    var UserPreference = db.define('UserPreference', {
        id              : { type: 'serial', key: true, mapsTo: 'id' },
        otherServices   : { type: 'boolean', defaultValue: false, mapsTo: 'otherServices' }
    }, {
        collection: 'user_preference'
    });

    UserPreference.hasOne('user', db.models.User, { required: true } );
    UserPreference.hasMany('cities', db.models.City, {}, { autoFetch: true, key: true, mergeTable: 'user_preference_city', mergeAssocId: 'city_id' });
};
