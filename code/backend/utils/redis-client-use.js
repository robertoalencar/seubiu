const debug = require("debug")("orm:redis-client-use");
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const Promise = require('bluebird');
const pool = require('./redis-client-pool');

const use = async (function (task) {
    let client;

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