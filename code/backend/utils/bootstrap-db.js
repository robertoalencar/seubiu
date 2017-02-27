var async = require('asyncawait/async');
var transaction = require('./orm-db-transaction');
var initialData = require('../utils/initial-data-db');

var bootstrap = async (function() {

    return transaction.doReadWrite(initialData);

});

bootstrap().then(function(){
    console.log('Done.');
    process.exit();
},function(err){
    console.error(err);
    process.exit();
});

// cd /seubiu && NODE_ENV=development && node utils/bootstrap-db.js