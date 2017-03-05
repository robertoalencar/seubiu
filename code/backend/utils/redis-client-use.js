const dotenv = require('dotenv').config();
const redis  = require('redis');
const Promise = require('bluebird');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(
{
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    db: 1
});

const use = async ((task) => {
    return await (task(client));
});

module.exports = {
    use:use
};