const dotenv = require('dotenv').config();
const apicache = require('apicache');
const redisClientPool = require('./redis-client-pool');

const options = {
    redisClient: redisClientPool.createClient(2),
    statusCodes: {
        exclude: [],
        include: [200]
    },
    enabled: (process.env.API_CACHE ? Boolean(process.env.API_CACHE) : false)
};

const cacheWithRedis = apicache.options(options).middleware;

const clear = (target) => {
    return apicache.clear(target);
};

module.exports = {
    cacheWithRedis: cacheWithRedis,
    clear: clear
};