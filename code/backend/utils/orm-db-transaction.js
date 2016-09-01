var debug = require("debug")("orm:db-transaction");
var pool = require('../utils/orm-db-pool');
var async = require('async');
var uuid = require('uuid');

var doInTransaction = function(tasks, readOnly) {
    var transactionId = uuid.v1();
    var doInWaterfall  = [];

    debug('New ' + (readOnly ? 'read-only':'read-write') +  ' transaction: ' + transactionId);

    doInWaterfall.push(function(callback) {
        debug('Acquire database connection for transaction: ' + transactionId);
        pool.acquire(function(err, db) {
            callback(err, db);
        });
    });

    doInWaterfall.push(function(db, callback) {
        debug('Start transaction: ' + transactionId);
        db.transaction(function (err, t) {
            callback(err, db, t);
        });
    });

    doInWaterfall = doInWaterfall.concat(tasks);

    async.waterfall(doInWaterfall, function (err, db, t) {

        if (!err) {

            if (t) {

                if (readOnly) {
                    debug('Rollback transaction: ' + transactionId);
                    t.rollback(function(err) {
                        if (err) console.error(err);
                    });
                } else {
                    debug('Commit transaction: ' + transactionId);
                    t.commit(function(err) {
                        if (err) console.error(err);
                    });
                }

            }

        } else {

            if (t) {
                debug('Rollback transaction: ' + transactionId);
                t.rollback(function(err){
                    if (err) console.error(err);
                });
            }

            console.error(err);

        }

        debug('Release database connection for transaction: ' + transactionId);

        if (db) pool.release(db);
    });

};

module.exports = {

    doReadWrite: function(tasks) {

        doInTransaction(tasks, false);
    },

    doReadOnly: function(tasks) {

        doInTransaction(tasks, true);
    }

};