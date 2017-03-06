const dbUtil = require('./orm-db-util');
const transaction = require('./orm-db-transaction');
const routeUtil = require('./route-util');

const setupInitialData = (task) => {
    process.env.DB_NAME=process.env.DB_TEST_NAME;
    process.env.REDIS_DB=1;

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