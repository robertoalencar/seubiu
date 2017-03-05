module.exports = (orm, db) => {

    const RequestProfessional = db.define('RequestProfessional', {
        id        : { type: 'serial', key: true, mapsTo: 'id' },
        accepted  : { type: 'boolean', defaultValue: false, mapsTo: 'accepted' }
    }, {
        collection: 'request_professional',
        timestamp: true
    });

    RequestProfessional.hasOne('request', db.models.Request, { required: true, reverse: 'requestedProfessionals' });
    RequestProfessional.hasOne('professional', db.models.User, { required: true });

};