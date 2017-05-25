module.exports = (orm, db) => {

    const Service = db.define('Service', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 50, required: true, mapsTo: 'description' },
        active     : { type: 'boolean', defaultValue: false, mapsTo: 'active' }

    }, {
        collection: 'service'
    });

    Service.hasOne('profession', db.models.Profession, { reverse: 'services', required: true } );

};