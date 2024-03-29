module.exports = (orm, db) => {

   const Country = db.define('Country', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 100, unique: true, required: true, mapsTo: 'description' }
    }, {
        collection: 'country'
    });

};