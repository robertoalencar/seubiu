module.exports = function (orm, db) {

   var State = db.define('State', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 100, unique: true, required: true, mapsTo: 'description' }
    }, {
        collection: 'state'
    });

   State.hasOne('country', db.models.Country, { reverse: 'states', required: true } );

}