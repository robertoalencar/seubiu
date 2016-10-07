module.exports = function (orm, db) {

    var UserDevice = db.define('UserDevice', {

        id          : { type: 'serial', key: true, mapsTo: 'id' },
        deviceToken : { type: 'text', size: 255, unique: true, required: true, mapsTo: 'deviceToken' },

    }, {
        collection: 'user_device',
        timestamp: true
    });

    UserDevice.hasOne('user', db.models.User, { reverse: 'devices', required: true } );
    UserDevice.hasOne('deviceType', db.models.DeviceType, { required: true });

};
