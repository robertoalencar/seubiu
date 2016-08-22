var dotenv = require('dotenv').config({path: '../../../../'});
var orm = require('../../../../');

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

  var url = 'postgres://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST  + '/seubiu';

  orm.connect(url, function (err, db) {
    if (err) return cb(err);

    connection = db;
    db.settings.set('instance.returnAllErrors', true);
    setup(db, cb);
  });
};