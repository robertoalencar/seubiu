module.exports = function (orm, db) {

    var UserPreference = db.define('UserPreference', {
        id              : { type: 'serial', key: true, mapsTo: 'id' },
        otherServices   : { type: 'boolean', defaultValue: false, mapsTo: 'otherServices' }
    }, {
        collection: 'user_preference'
    });

    UserPreference.hasOne('user', db.models.User, { required: true } );
    UserPreference.hasMany('cities', db.models.City, {}, { key: true, mergeTable: 'user_preference_city', mergeAssocId: 'city_id' });
    UserPreference.hasMany('professions', db.models.Profession, {}, { key: true, mergeTable: 'user_preference_profession', mergeAssocId: 'profession_id' });
    UserPreference.hasMany('services', db.models.Service, {}, { key: true, mergeTable: 'user_preference_service', mergeAssocId: 'service_id' });
};
