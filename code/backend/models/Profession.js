module.exports = function (orm, db) {

    var Profession = db.define('Profession', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 50, unique: true, required: true, mapsTo: 'description' }

    }, {
        collection: 'profession',
        timestamp: true
    });

    Profession.hasMany('services', db.models.Service, {}, { key: true });

};