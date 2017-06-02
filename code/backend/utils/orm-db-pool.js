const debug = require("debug")("orm:db-pool");
const dotenv = require('dotenv').config();
const orm = require('orm');
const modts = require('orm-timestamps');
const transaction = require('orm-transaction');
const Pool = require('generic-pool').Pool;
const uuid = require('uuid');

const pool = new Pool({
    name     : process.env.DB_PROTOCOL,
    create   : (callback) => {

      const opts = {
        host:     process.env.DB_HOST,
        database: process.env.DB_NAME,
        pathname: process.env.DB_PATH_NAME,
        protocol: process.env.DB_PROTOCOL,
        user:     process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port:     process.env.DB_PORT,
        query:    { debug: (process.env.DB_DEBUG ? process.env.DB_DEBUG : false) }
      };

      orm.connect(opts, (err, db) => {
        if (err) return callback(err);

        db.poolId = uuid.v1();
        debug(`### Open connection ID [${db.poolId}]`);

        db.use(modts, {
          createdProperty: 'created_at',
          modifiedProperty: 'modified_at',
          expireProperty: false,
          dbtype: { type: 'date', time: true },
          now: () => { return new Date(); },
          expire: () => { const d = new Date(); return d.setMinutes(d.getMinutes() + 60); },
          persist: true
        });

        db.use(transaction);

        db.settings.set('instance.returnAllErrors', true);
        db.settings.set('instance.cache', false);
        db.settings.set('connection.debug', (process.env.DB_DEBUG ? process.env.DB_DEBUG : false));

        require('../models/')(orm, db);

        callback(null, db);

      });

    },
    destroy  : (db) => {
      debug(`### Close connection ID [${db.poolId}]`);
      db.close();
    },
    max      : process.env.DB_POOL_MAX,
    log      : false
});

module.exports = pool;