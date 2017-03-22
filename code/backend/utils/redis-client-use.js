const debug = require("debug")("orm:redis-client-use");
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const Promise = require('bluebird');
const redisClientPool = require('./redis-client-pool').pool;

const use = async (function (task) {
    let client;

    try {

        debug('### Acquire Redis client');
        client = await (new Promise((resolve, reject) => {

            redisClientPool.acquire((err, client) => {
                if (err) reject(err);
                resolve(client);
            });

        }));

        return await (task(client));

    } catch(err) {
        throw err;
    } finally {
        debug('### Release Redis client');
        if (client) redisClientPool.release(client);
    }

});

module.exports = {

    use:use

};