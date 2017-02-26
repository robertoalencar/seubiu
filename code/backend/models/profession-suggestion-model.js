module.exports = function (orm, db) {

    var ProfessionSuggestion = db.define('ProfessionSuggestion', {
        id          : { type: 'serial', key: true, mapsTo: 'id' },
        profession  : { type: 'text', size: 100, required: true, mapsTo: 'profession' },
        approved    : { type: 'boolean', defaultValue: false, mapsTo: 'approved' },
        ip          : { type: 'text', size: 255, required: true, mapsTo: 'ip' }

    }, {
        collection: 'profession_suggestion',
        timestamp: true
    });

    ProfessionSuggestion.hasOne('user', db.models.User, { reverse: 'professionSuggestions', required: true } );

};