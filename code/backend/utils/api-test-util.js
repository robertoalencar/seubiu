var dbUtil = require('../utils/orm-db-util');
var transaction = require('../utils/orm-db-transaction');

var setupInitialData = (task) => {
    process.env.DB_NAME=process.env.DB_TEST_NAME;

    return (new Promise((resolve, reject) => {
        dbUtil.createSchema().then(() => {
            transaction.doReadWrite((db) => {
                resolve(task(db));
            }, (err) => {
                reject(err);
            });
        }, (err) => {
            reject(err);
        });
    }));
};

module.exports = {

    setupInitialData: setupInitialData

};