module.exports = function (orm, db) {

    var User = db.define('User', {
        id              : { type: 'serial', key: true, mapsTo: 'id' },
        name            : { type: 'text', size: 255, required: true, mapsTo: 'name' },
        displayName     : { type: 'text', size: 255, mapsTo: 'displayName' },
        email           : { type: 'text', size: 255, required: true, unique: true,  mapsTo: 'email' },
        emailVerified   : { type: 'boolean', defaultValue: false, mapsTo: 'emailVerified' },
        username        : { type: 'text', size: 50, required: true, unique: true, mapsTo: 'username' },
        password        : { type: 'text', size: 50, required: true, mapsTo: 'password' },
        admin           : { type: 'boolean', defaultValue: false, mapsTo: 'admin' },
        ratingCount     : { type: 'number', defaultValue: 0, mapsTo: 'ratingCount' },
        ratingSum       : { type: 'number', defaultValue: 0, mapsTo: 'ratingSum' }
    }, {
        methods: {
            addRate: function (rate) {
                 this.ratingCount++;
                 this.ratingSum += rate;
            },
            getRating: function () {
                var rating = 0;
                if ((this.ratingSum && this.ratingSum > 0) && (this.ratingCount && this.ratingCount > 0)) {
                    rating = (this.ratingSum / this.ratingCount);
                }
                return rating;
            }
        },
        collection: 'user',
        timestamp: true
    });

    User.hasOne('status', db.models.UserStatus, { required: true });
    User.hasMany('professions', db.models.Profession, {}, { key: true, mergeAssocId: 'profession_id' });
    User.hasMany('services', db.models.Service, {}, { key: true, mergeAssocId: 'service_id' });

};