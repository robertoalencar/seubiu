module.exports = function (orm, db) {

    var Comment = db.define('Comment', {
        id     : { type: 'serial', key: true, mapsTo: 'id' },
        content: { type: 'text', size: 250, required: true, mapsTo: 'content' }

    }, {
        collection: 'comment',
        timestamp: true
    });

    Comment.hasOne('author', db.models.User, { required: true });

};