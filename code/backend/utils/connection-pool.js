var dotenv = require('dotenv').config();
var orm = require('orm');
var transaction = require('orm-transaction');
var Pool = require('generic-pool').Pool;

function defineModels(db) {

  require('../models/auth-provider')(orm, db);
  require('../models/device-type')(orm, db);
  require('../models/installation')(orm, db);
  require('../models/service')(orm, db);
  require('../models/profession')(orm, db);
  require('../models/user-type')(orm, db);
  require('../models/user-status')(orm, db);
  require('../models/user')(orm, db);
  require('../models/user-rating')(orm, db);
  require('../models/session')(orm, db);
  require('../models/comment')(orm, db);
  require('../models/request-status')(orm, db);
  require('../models/request')(orm, db);

};

var pool = new Pool({
    name     : process.env.DB_PROTOCOL,
    create   : function(callback) {

      var opts = {
        host:     process.env.DB_HOST,
        database: process.env.DB_NAME,
        protocol: process.env.DB_PROTOCOL,
        user:     process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port:     process.env.DB_PORT,
        query:    {debug: true}
      };

      orm.connect(opts, function (err, db) {
        if (err) return callback(err);

        db.use(transaction);
        db.settings.set('instance.returnAllErrors', true);
        defineModels(db);

        callback(null, db);

      });

    },
    destroy  : function(db) { db.close(); },
    max      : 50,
    log      : false
});


module.exports = pool;