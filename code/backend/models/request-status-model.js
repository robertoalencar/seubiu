module.exports = function (orm, db) {

    var RequestStatus = db.define('RequestStatus', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 50, unique: true, required: true, mapsTo: 'description' }
    }, {
        collection: 'request_status'
    });

};