var debug = require("debug")("orm:redis-client-use");
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var pool = require('./redis-client-pool');

var use = async (function (task) {
    var client;

    try {

        debug('### Acquire Redis client');
        client = await (new Promise(function (resolve, reject) {

            pool.acquire(function(err, client) {
                if (err) reject(err);
                resolve(client);
            });

        }));

        return await (task(client));

    } catch(err) {
        throw err;
    } finally {
        debug('### Release Redis client');
        if (client) pool.release(client);
    }

});

module.exports = {

    use:use

};