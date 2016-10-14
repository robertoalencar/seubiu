var dotenv = require('dotenv').config();
var orm = require('orm');
var modts = require('orm-timestamps');

var opts = {
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
  protocol: process.env.DB_PROTOCOL,
  user:     process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port:     process.env.DB_PORT,
  query:    { debug: (process.env.DB_DEBUG ? Boolean(process.env.DB_DEBUG) : false) }
};

function defineModels(db) {
  require('../models/')(orm, db);
}

orm.connect(opts, function (err, db) {
  if (err) throw err;

  db.use(modts, {
    createdProperty: 'created_at',
    modifiedProperty: 'modified_at',
    expireProperty: false,
    dbtype: { type: 'date', time: true },
    now: function() { return new Date(); },
    expire: function() { var d = new Date(); return d.setMinutes(d.getMinutes() + 60); },
    persist: true
  });

  defineModels(db);

  db.drop(function(err) {
      if (err) throw err;

      db.sync(function(err) {
        if (err) throw err;
        process.exit();
      });
  });

});

// https://github.com/dresende/node-orm2/issues/353

// cd /seubiu && NODE_ENV=development && node utils/orm-db-sync.js