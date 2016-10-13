var dotenv = require('dotenv').config();
var orm = require('orm');
var modts = require('orm-timestamps');
var transaction = require('orm-transaction');
var Pool = require('generic-pool').Pool;

function defineModels(db) {
  require('../models/')(orm, db);
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
        query:    { debug: (process.env.DB_DEBUG ? Boolean(process.env.DB_DEBUG) : false) }
      };

      orm.connect(opts, function (err, db) {
        if (err) return callback(err);

        db.use(modts, {
          createdProperty: 'created_at',
          modifiedProperty: 'modified_at',
          expireProperty: false,
          dbtype: { type: 'date', time: true },
          now: function() { return new Date(); },
          expire: function() { var d = new Date(); return d.setMinutes(d.getMinutes() + 60); },
          persist: true
        });

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