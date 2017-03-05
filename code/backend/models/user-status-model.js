module.exports = (orm, db) => {

   var UserStatus = db.define('UserStatus', {
        id         : { type: 'serial', key: true, mapsTo: 'id' },
        description: { type: 'text', size: 50, unique: true, required: true, mapsTo: 'description' }
    }, {
        collection: 'user_status'
    });

   UserStatus.NEW = 1;
   UserStatus.ACTIVE = 2;
   UserStatus.BLOCKED = 3;

};