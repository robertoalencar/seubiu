module.exports = (orm, db) => {

    var Profession = db.define('Profession', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 50, unique: true, required: true, mapsTo: 'description' },
        active     : { type: 'boolean', defaultValue: false, mapsTo: 'active' }

    }, {
        collection: 'profession'
    });

};