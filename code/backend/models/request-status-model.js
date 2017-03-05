module.exports = (orm, db) => {

    const RequestStatus = db.define('RequestStatus', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 50, unique: true, required: true, mapsTo: 'description' }
    }, {
        collection: 'request_status'
    });

    RequestStatus.NEW = 1;
    RequestStatus.WAITING = 2;
    RequestStatus.ACTIVE = 3;
    RequestStatus.FINISHED = 4;
    RequestStatus.CLOSED = 5;
};