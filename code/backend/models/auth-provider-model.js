module.exports = function (orm, db) {

    var AuthProvider = db.define('AuthProvider', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 50, unique: true, required: true, mapsTo: 'description' }
    }, {
        collection: 'auth_provider'
    });

};