var dbUtil = require('../utils/orm-db-util');
var transaction = require('../utils/orm-db-transaction');

var setupInitialData = function(task) {
    process.env.DB_NAME=process.env.DB_TEST_NAME;

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