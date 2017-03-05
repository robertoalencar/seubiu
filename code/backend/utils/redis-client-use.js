var debug = require("debug")("orm:redis-client-use");
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var pool = require('./redis-client-pool');

var use = async ((task) => {
    var client;

    try {

        debug('### Acquire Redis client');
        client = await (new Promise((resolve, reject) => {

            pool.acquire((err, client) => {
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