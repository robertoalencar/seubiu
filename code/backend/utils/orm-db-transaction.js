var debug = require("debug")("orm:db-transaction");
var pool = require('../utils/orm-db-pool');
var async = require('async');

var doInTransaction = function(tasks, readOnly) {

    var doInWaterfall  = [];

    doInWaterfall.push(function(callback) {
        pool.acquire(function(err, db) {
            callback(err, db);
        });
    });

    doInWaterfall.push(function(db, callback) {
        db.transaction(function (err, t) {
            callback(err, db, t);
        });
    });

    doInWaterfall = doInWaterfall.concat(tasks);

    async.waterfall(doInWaterfall, function (err, db, t) {

        if (!err) {

            if (t) {

                if (readOnly) {
                    t.rollback(function(err) {
                        if (err) console.error(err);
                    });
                } else {
                    t.commit(function(err) {
                        if (err) console.error(err);
                    });
                }

            }

        } else {

            if (t) {
                t.rollback(function(err){
                    if (err) console.error(err);
                });
            }

            console.error(err);

        }

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