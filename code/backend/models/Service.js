module.exports = function (orm, db) {

    var Service = db.define('Service', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 50, unique: true, required: true, mapsTo: 'description' }

    }, {
        collection: 'service',
        timestamp: true
    });

};