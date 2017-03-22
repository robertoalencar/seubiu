const _ = require('lodash');
const dotenv = require('dotenv').config();
const redis  = require('redis');
const Promise = require('bluebird');
const Pool = require('generic-pool').Pool;

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const createClient = (db) => {
    return redis.createClient({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        db: (_.isNil(db) ? process.env.REDIS_DB : db)
    });
};

const pool = new Pool({
    name     : 'Redis',
    create   : (callback) => {
        callback(null, createClient());
    },
    destroy  : (client) => { client.quit(); },
    max      : process.env.REDIS_POOL_MAX,
    log      : false
});

module.exports = {
    pool: pool,
    createClient: createClient
};