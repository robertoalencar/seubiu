var debug = require("debug")("orm:db-transaction");
var _ = require('lodash');
var uuid = require('uuid');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var pool = require('../utils/orm-db-pool');

var doInTransaction = async (function (task, readOnly) {
    var transactionId = uuid.v1();
    var db;
    var transaction;
    var result;

    try {

        debug('Acquire database connection for transaction: ' + transactionId);
        db = await (new Promise(function (resolve, reject) {

            pool.acquire(function(err, db) {
                if (err) reject(err);
                resolve(db);
            });

        }));

        debug('Start ' + (readOnly ? 'read-only':'read-write') +  ' transaction: ' + transactionId);
        transaction = await (new Promise(function (resolve, reject) {

            db.transaction(function (err, t) {
                if (err) reject(err);
                resolve(t);
            });

        }));

        result = task(db);

        if (readOnly) {
            debug('Rollback transaction: ' + transactionId);
            await (new Promise(function (resolve, reject) {

                transaction.rollback(function(err) {
                    if (err) reject(err);
                    resolve();
                });

            }));

        } else {
            debug('Commit transaction: ' + transactionId);
            await (new Promise(function (resolve, reject) {

                transaction.commit(function(err) {
                    if (err) reject(err);
                    resolve();
                });

            }));

        }

        return result;

    } catch(err) {

        if (transaction) {
            debug('Rollback transaction: ' + transactionId);
            await (new Promise(function (resolve, reject) {

                transaction.rollback(function(err) {
                    if (err) reject(err);
                    resolve();
                });

            }));

        }

        throw err;

    } finally {
        debug('Release database connection for transaction: ' + transactionId);
        if (db) pool.release(db);
    }

});

module.exports = {

    doReadWrite: function(task) {

        return doInTransaction(task, false);
    },

    doReadOnly: function(task) {

        return doInTransaction(task, true);
    }

};