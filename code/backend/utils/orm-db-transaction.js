var debug = require("debug")("orm:db-transaction");
var _ = require('lodash');
var uuid = require('uuid');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var pool = require('./orm-db-pool');

var doInTransaction = async ((task, readOnly) => {
    var transactionId = uuid.v1();
    var db;
    var transaction;
    var result;

    try {

        debug('### New transaction: ' + transactionId);

        debug('### Acquire database connection for transaction: ' + transactionId);
        db = await (new Promise((resolve, reject) => {

            pool.acquire((err, db) => {
                if (err) reject(err);
                resolve(db);
            });

        }));

        debug('### Start ' + (readOnly ? 'read-only':'read-write') +  ' transaction: ' + transactionId);
        transaction = await (new Promise((resolve, reject) => {

            db.transaction((err, t) => {
                if (err) reject(err);
                resolve(t);
            });

        }));

        result = await (task(db));

        if (readOnly) {
            debug('### Rollback transaction: ' + transactionId);
            await (new Promise((resolve, reject) => {

                transaction.rollback((err) => {
                    if (err) reject(err);
                    resolve(true);
                });

            }));

        } else {
            debug('### Commit transaction: ' + transactionId);
            await (new Promise((resolve, reject) => {

                transaction.commit((err) => {
                    if (err) reject(err);
                    resolve(true);
                });

            }));

        }

        return result;

    } catch(err) {

        if (transaction) {
            debug('### Rollback transaction: ' + transactionId);
            await (new Promise((resolve, reject) => {

                transaction.rollback((err) => {
                    if (err) reject(err);
                    resolve(true);
                });

            }));

        }

        throw err;

    } finally {
        debug('### Release database connection from transaction: ' + transactionId);
        if (db) pool.release(db);
    }

});

module.exports = {

    doReadWrite: (task) => {

        return doInTransaction(task, false);
    },

    doReadOnly: (task) => {

        return doInTransaction(task, true);
    }

};