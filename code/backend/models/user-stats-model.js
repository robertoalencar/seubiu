module.exports = function (orm, db) {

    var UserStats = db.define('UserStats', {
        id              : { type: 'serial', key: true, mapsTo: 'id' },
        ratingCount     : { type: 'number', defaultValue: 0, mapsTo: 'ratingCount' },
        ratingSum       : { type: 'number', defaultValue: 0, mapsTo: 'ratingSum' },
        rating          : { type: 'number', defaultValue: 0, mapsTo: 'rating' },
        score           : { type: 'number', defaultValue: 0, mapsTo: 'score' }
    }, {
        methods: {
            addRate: function (rate, score) {
                 this.ratingCount++;
                 this.ratingSum += rate;

                 if (score) {
                    this.score += score;
                 }
            }
        },
        hooks: {
            beforeSave: function (next) {

                if ((this.ratingSum && this.ratingSum > 0) && (this.ratingCount && this.ratingCount > 0)) {
                    this.rating = (this.ratingSum / this.ratingCount);
                }

                return next();
            }
        },
        collection: 'user_stats'
    });

    UserStats.hasOne('user', db.models.User, { required: true } );
};
