module.exports = function (orm, db) {

    var Request = db.define('Request', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 250, mapsTo: 'description' },
        ip         : { type: 'text', size: 255, required: true, mapsTo: 'ip' }
    }, {
        collection: 'request',
        timestamp: true
    });

    Request.hasOne('owner', db.models.User, { required: true, reverse: 'requests' });
    Request.hasOne('address', db.models.UserAddress, {}, { required: true });
    Request.hasOne('profession', db.models.Profession, { required: true });
    Request.hasOne('professional', db.models.User, { reverse: 'matchedRequests' });
    Request.hasOne('status', db.models.RequestStatus, { required: true });
    Request.hasMany('services', db.models.Service, {}, { key: true });
    Request.hasMany('candidates', db.models.User, {}, { key: true });

};