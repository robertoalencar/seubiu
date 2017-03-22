module.exports = (orm, db) => {

    const RequestComment = db.define('RequestComment', {
        id     : { type: 'serial', key: true, mapsTo: 'id' },
        content: { type: 'text', size: 250, required: true, mapsTo: 'content' }

    }, {
        collection: 'request_comment',
        timestamp: true
    });

    RequestComment.hasOne('request', db.models.Request, { required: true, reverse: 'comments' });
    RequestComment.hasOne('author', db.models.User, { required: true });

};