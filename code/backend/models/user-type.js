module.exports = function (orm, db) {

    var UserType = db.define('UserType', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 50, unique: true, required: true, mapsTo: 'description' }
    }, {
        collection: 'user_type',
        timestamp: true
    });

};