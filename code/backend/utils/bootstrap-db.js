var async = require('asyncawait/async');
var transaction = require('./orm-db-transaction');
var initialData = require('../utils/initial-data-db');

var bootstrap = async (() => {

    return transaction.doReadWrite(initialData);

});

bootstrap().then(() => {
    console.log('Done.');
    process.exit();
}, (err) => {
    console.error(err);
    process.exit();
});

// cd /seubiu && NODE_ENV=development && node utils/bootstrap-db.js