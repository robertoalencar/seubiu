module.exports = function (orm, db) {

  //require('./auth-provider')(orm, db);
  require('./device-type')(orm, db);
  require('./installation')(orm, db);
  require('./service')(orm, db);
  require('./profession')(orm, db);
  require('./user-type')(orm, db);
  require('./user-status')(orm, db);
  require('./user')(orm, db);
  //require('./user-rating')(orm, db);
  //require('./session')(orm, db);
  //require('./comment')(orm, db);
  //require('./request-status')(orm, db);
  //require('./request')(orm, db);

};