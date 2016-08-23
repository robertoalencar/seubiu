var dotenv = require('dotenv').config();
var orm = require('orm');
var transaction = require('orm-transaction');

var connection = null;

function setup(db, cb) {

  require('./AuthProvider')(orm, db);
  require('./DeviceType')(orm, db);
  require('./Installation')(orm, db);
  require('./Service')(orm, db);
  require('./Profession')(orm, db);
  require('./UserType')(orm, db);
  require('./UserStatus')(orm, db);
  require('./User')(orm, db);
  require('./UserRating')(orm, db);
  require('./Session')(orm, db);
  require('./Comment')(orm, db);
  require('./RequestStatus')(orm, db);
  require('./Request')(orm, db);

  return cb(null, db);
}

module.exports = function (cb) {
  if (connection) return cb(null, connection);

  var opts = {
    host:     process.env.DB_HOST,
    database: process.env.DB_NAME,
    protocol: process.env.DB_PROTOCOL,
    user:     process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port:     process.env.DB_PORT,
    query:    {pool: false, debug: true}
  };

  orm.connect(opts, function (err, db) {
    if (err) return cb(err);

    db.use(transaction);
    connection = db;
    db.settings.set('instance.returnAllErrors', true);
    setup(db, cb);
  });
};