module.exports = (orm, db) => {

   const State = db.define('State', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 100, unique: true, required: true, mapsTo: 'description' },
        shortCode  : { type: 'text', size: 2, unique: true, required: true, mapsTo: 'shortCode' }
    }, {
        collection: 'state'
    });

   State.hasOne('country', db.models.Country, { reverse: 'states', required: true } );

};