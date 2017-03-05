const dbUtil = require('../utils/orm-db-util');
const transaction = require('../utils/orm-db-transaction');

const setupInitialData = (task) => {
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