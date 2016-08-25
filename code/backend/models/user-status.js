module.exports = function (orm, db) {

   var UserStatus = db.define('UserStatus', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 50, unique: true, required: true, mapsTo: 'description' }
    }, {
        collection: 'user_status',
        timestamp: true
    });

};