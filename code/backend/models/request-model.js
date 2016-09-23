module.exports = function (orm, db) {

    var Request = db.define('Request', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 250, mapsTo: 'description' }
    }, {
        collection: 'request',
        timestamp: true
    });

    Request.hasOne('owner', db.models.User, { required: true, reverse: 'requests' });
    Request.hasOne('profession', db.models.Profession, { required: true });
    Request.hasOne('status', db.models.RequestStatus, { required: true });
    Request.hasMany('services', db.models.Service, {}, { key: true });
    Request.hasMany('candidates', db.models.User, {}, { key: true });
    Request.hasOne('professional', db.models.User, { required: false, alwaysValidate: true, reverse: 'matchedRequests' });

};