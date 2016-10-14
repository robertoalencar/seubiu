module.exports = function (orm, db) {

    var Service = db.define('Service', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 50, unique: true, required: true, mapsTo: 'description' },
        active     : { type: 'boolean', defaultValue: false, mapsTo: 'active' }

    }, {
        collection: 'service'
    });

    Service.hasOne('profession', db.models.Profession, { key: true, reverse: 'services', required: true } );

};