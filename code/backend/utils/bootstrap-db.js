const async = require('asyncawait/async');
const transaction = require('./orm-db-transaction');
const initialData = require('../utils/initial-data-db');

const bootstrap = async (() => {

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