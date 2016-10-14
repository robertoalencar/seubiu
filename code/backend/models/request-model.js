module.exports = function (orm, db) {

    var Request = db.define('Request', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 250, mapsTo: 'description' }
    }, {
        collection: 'request',
        timestamp: true
    });

    Request.hasOne('owner', db.models.User, { key: true, required: true, reverse: 'requests' });
    Request.hasOne('profession', db.models.Profession, { key: true, required: true });
    Request.hasOne('status', db.models.RequestStatus, { key: true, required: true });
    Request.hasMany('services', db.models.Service, {}, { key: true });
    Request.hasMany('candidates', db.models.User, {}, { key: true });
    Request.hasOne('professional', db.models.User, { key: true, required: false, alwaysValidate: true, reverse: 'matchedRequests' });

};