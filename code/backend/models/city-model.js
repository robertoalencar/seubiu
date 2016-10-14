module.exports = function (orm, db) {

   var City = db.define('City', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 100, unique: true, required: true, mapsTo: 'description' }
    }, {
        collection: 'city'
    });

   City.hasOne('state', db.models.State, { reverse: 'cities', key: true, required: true } );

};