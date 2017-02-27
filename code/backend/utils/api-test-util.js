var dbUtil = require('../utils/orm-db-util');
var transaction = require('../utils/orm-db-transaction');

var setupInitialData = function(task) {
    process.env.DB_PATH_NAME='/var/tmp/test_db.sqlite';
    process.env.DB_PROTOCOL='sqlite';
    process.env.DB_HOST='';
    process.env.DB_DEBUG=false;

    return (new Promise(function (resolve, reject) {
        dbUtil.createSchema().then(function(){
            transaction.doReadWrite(function(db) {
                resolve(task(db));
            }, function(err){
                reject(err);
            });
        }, function(err){
            reject(err);
        });
    }));
};

module.exports = {

    setupInitialData: setupInitialData

};