module.exports = (orm, db) => {

    var RequestComment = db.define('RequestComment', {
        id     : { type: 'serial', key: true, mapsTo: 'id' },
        content: { type: 'text', size: 250, required: true, mapsTo: 'content' }

    }, {
        collection: 'request_comment',
        timestamp: true
    });

    Comment.hasOne('request', db.models.Request, { required: true, reverse: 'comments' });
    Comment.hasOne('author', db.models.User, { required: true });

};