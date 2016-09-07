module.exports = function (orm, db) {

    var Installation = db.define('Installation', {
        id          : { type: 'serial', key: true, mapsTo: 'id' },
        deviceToken : { type: 'text', size: 255, unique: true, required: true, mapsTo: 'deviceToken' },
        appVersion  : { type: 'text', size: 20, required: true, mapsTo: 'appVersion' }
    }, {
        collection: 'installation',
        timestamp: true
    });

    Installation.hasOne('deviceType', db.models.DeviceType, { required: true });

};