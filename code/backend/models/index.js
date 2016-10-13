module.exports = function (orm, db) {

  require('./country-model')(orm, db);
  require('./state-model')(orm, db);
  require('./city-model')(orm, db);
  require('./device-type-model')(orm, db);
  require('./service-model')(orm, db);
  require('./profession-model')(orm, db);
  require('./user-status-model')(orm, db);
  require('./user-model')(orm, db);
  require('./user-address-model')(orm, db);
  require('./user-device-model')(orm, db);
  require('./user-preference-model')(orm, db);
  //require('./user-rating-model')(orm, db);
  //require('./request-comment-model')(orm, db);
  //require('./request-status-model')(orm, db);
  //require('./request-model')(orm, db);
};