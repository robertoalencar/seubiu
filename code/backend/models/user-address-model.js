module.exports = (orm, db) => {

    var UserAddress = db.define('UserAddress', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 50, unique: true, required: true, mapsTo: 'description' },
        main       : { type: 'boolean', defaultValue: false, mapsTo: 'main' },
        zipCode    : { type: 'text', size: 50, required: true, mapsTo: 'zipcode' },
        address    : { type: 'text', size: 200, required: true, mapsTo: 'address' },
        number     : { type: 'number', required: true, mapsTo: 'number' },
        complement : { type: 'text', size: 255, mapsTo: 'complement' },
        district   : { type: 'text', size: 100, required: true, mapsTo: 'district' },
        reference  : { type: 'text', size: 255, mapsTo: 'reference' }
    }, {
        collection: 'user_address'
    });

    UserAddress.hasOne('user', db.models.User, { reverse: 'addresses', required: true } );
    UserAddress.hasOne('city', db.models.City, { required: true } );
    UserAddress.hasOne('state', db.models.State, { required: true } );
    UserAddress.hasOne('country', db.models.Country, { required: true } );

};
