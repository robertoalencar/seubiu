var dotenv = require('dotenv').config({path: '../.env'});
var orm = require('orm');
var modts = require('orm-timestamps');

var opts = {
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
  protocol: process.env.DB_PROTOCOL,
  user:     process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port:     process.env.DB_PORT,
  query:    {debug: true}
};

function defineModels(db) {
  require('../models/')(orm, db);
};

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

  db.sync(function(err) {
    if (err) throw err;
    process.exit();
  });

});

//NODE_ENV=development node orm-db-sync.js