module.exports = function (orm, db) {

    var UserRating = db.define('UserRating', {
        id     : { type: 'serial', key: true, mapsTo: 'id' },
        rate   : { type: 'number', required: true, mapsTo: 'rate' },
        comment: { type: 'text', size: 255, required: true, mapsTo: 'comment' }
    }, {
        collection: 'user_rating',
        timestamp: true
    });

    UserRating.hasOne('user', db.models.User, { key: true, required: true, reverse: 'ratings' });

};