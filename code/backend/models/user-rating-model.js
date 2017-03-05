module.exports = (orm, db) => {

    var UserRating = db.define('UserRating', {
        id     : { type: 'serial', key: true, mapsTo: 'id' },
        rate   : { type: 'number', required: true, mapsTo: 'rate' },
        comment: { type: 'text', size: 255, required: true, mapsTo: 'comment' },
        ip     : { type: 'text', size: 255, required: true, mapsTo: 'ip' }
    }, {
        collection: 'user_rating',
        timestamp: true
    });

    UserRating.hasOne('user', db.models.User, { required: true, reverse: 'ratings' });
    UserRating.hasOne('rater', db.models.User, { required: true });

};