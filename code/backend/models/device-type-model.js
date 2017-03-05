module.exports = (orm, db) => {

    var DeviceType = db.define('DeviceType', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 50, unique: true, required: true, mapsTo: 'description' }
    }, {
        collection: 'device_type'
    });

};