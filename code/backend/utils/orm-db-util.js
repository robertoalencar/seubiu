const dotenv = require('dotenv').config();
const orm = require('orm');
const modts = require('orm-timestamps');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const createSchema = async (() => {

    const opts = {
      host:     process.env.DB_HOST,
      database: process.env.DB_NAME,
      pathname: process.env.DB_PATH_NAME,
      protocol: process.env.DB_PROTOCOL,
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port:     process.env.DB_PORT,
      query:    { debug: (process.env.DB_DEBUG ? Boolean(process.env.DB_DEBUG) : false) }
    };

    const db = await (new Promise(function (resolve, reject) {

        orm.connect(opts, (err, db) => {
            if (err) reject(err);
            resolve(db);
        });

    }));

    db.use(modts, {
        createdProperty: 'created_at',
        modifiedProperty: 'modified_at',
        expireProperty: false,
        dbtype: { type: 'date', time: true },
        now: () => { return new Date(); },
        expire: () => { const d = new Date(); return d.setMinutes(d.getMinutes() + 60); },
        persist: true
    });

    require('../models/')(orm, db);

    await (new Promise((resolve, reject) => {

        db.drop((err) => {
          if (err) reject(err);
          resolve(true);
        });

    }));

    await (new Promise((resolve, reject) => {

        db.sync((err) => {
          if (err) reject(err);
          resolve(true);
        });

    }));

    return true;
});

module.exports = {

    createSchema: createSchema

};