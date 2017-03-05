module.exports = (orm, db) => {

    var Request = db.define('Request', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 250, mapsTo: 'description' },
        ip         : { type: 'text', size: 255, required: true, mapsTo: 'ip' },
        address    : { type: 'text', size: 255, required: true, mapsTo: 'address' },
        coordLat   : { type: 'number', required: true, mapsTo: 'coordLat' },
        coordLong  : { type: 'number', required: true, mapsTo: 'coordLong' }
    }, {
        collection: 'request',
        timestamp: true
    });

    Request.hasOne('owner', db.models.User, { required: true, reverse: 'ownerRequests' });
    Request.hasOne('city', db.models.City, {}, { required: true });
    Request.hasOne('profession', db.models.Profession, { required: true });
    Request.hasOne('professional', db.models.User, { reverse: 'professionalRequests' });
    Request.hasOne('status', db.models.RequestStatus, { required: true });
    Request.hasMany('services', db.models.Service, {}, { key: true, mergeTable: 'request_service', mergeAssocId: 'service_id' });
};