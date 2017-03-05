module.exports = (orm, db) => {

    var File = db.define('File', {
        id      : { type: 'serial', key: true, mapsTo: 'id' },
        name    : { type: 'text', size: 255, mapsTo: 'name' },
        size    : { type: 'number', mapsTo: 'size' },
        type    : { type: 'text', size: 30, mapsTo: 'type' },
        data    : { type: 'binary', mapsTo: 'data' },
        ip      : { type: 'text', size: 255, required: true, mapsTo: 'ip' }
    }, {
        collection: 'file',
        timestamp: true
    });

};
