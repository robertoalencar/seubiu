module.exports = function (orm, db) {

    var UserStats = db.define('UserStats', {
        id              : { type: 'serial', key: true, mapsTo: 'id' },
        ratingCount     : { type: 'number', defaultValue: 0, mapsTo: 'ratingCount' },
        ratingSum       : { type: 'number', defaultValue: 0, mapsTo: 'ratingSum' },
        score           : { type: 'number', defaultValue: 0, mapsTo: 'score' }
    }, {
        methods: {
            addRate: function (rate, score) {
                 this.ratingCount++;
                 this.ratingSum += rate;

                 if (score) {
                    this.score += score;
                 }
            },
            getRating: function () {
                var rating = 0;
                if ((this.ratingSum && this.ratingSum > 0) && (this.ratingCount && this.ratingCount > 0)) {
                    rating = (this.ratingSum / this.ratingCount);
                }
                return rating;
            }
        },
        collection: 'user_stats'
    });

    UserStats.hasOne('user', db.models.User, { required: true } );
};
