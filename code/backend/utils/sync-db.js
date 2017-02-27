var dbUtil = require('./orm-db-util');

console.log('Creating the database schema...');

dbUtil.createSchema().then(function(){
    console.log('Done.');
    process.exit();
},function(err){
    console.error(err);
    process.exit();
});

// https://github.com/dresende/node-orm2/issues/353

// cd /seubiu && NODE_ENV=development && node utils/sync-db.js