module.exports = (orm, db) => {

    var UserProfile = db.define('UserProfile', {
        id              : { type: 'serial', key: true, mapsTo: 'id' },
        displayName     : { type: 'text', size: 255, mapsTo: 'displayName' },
        about           : { type: 'text', mapsTo: 'about' },
        otherServices   : { type: 'boolean', defaultValue: false, mapsTo: 'otherServices' }
    }, {
        collection: 'user_profile'
    });

    UserProfile.hasOne('user', db.models.User, { required: true } );
    UserProfile.hasOne('displayImage', db.models.File, {} );
    UserProfile.hasMany('cities', db.models.City, {}, { key: true, mergeTable: 'user_profile_city', mergeAssocId: 'city_id' });
    UserProfile.hasMany('professions', db.models.Profession, {}, { key: true, mergeTable: 'user_profile_profession', mergeAssocId: 'profession_id' });
    UserProfile.hasMany('services', db.models.Service, {}, { key: true, mergeTable: 'user_profile_service', mergeAssocId: 'service_id' });
};
