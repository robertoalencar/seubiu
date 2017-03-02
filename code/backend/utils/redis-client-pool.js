var dotenv = require('dotenv').config();
var redis  = require("redis");
var Promise = require('bluebird');
var Pool = require('generic-pool').Pool;

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

var pool = new Pool({
    name     : 'Redis',
    create   : function(callback) {
        callback(null, redis.createClient({
            port: process.env.REDIS_PORT,
            host: process.env.REDIS_HOST,
            db: 1
          }));
    },
    destroy  : function(client) { client.quit(); },
    max      : process.env.REDIS_POOL_MAX,
    log      : false
});

module.exports = pool;