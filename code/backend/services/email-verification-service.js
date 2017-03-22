const uuid = require('uuid');
const await = require('asyncawait/await');
const useRedis = require('../utils/redis-client-use').use;

const KEY_PREFIX = 'urn' + ':' + 'emailverification' + ':' + 'token' + ':';

const generateToken = (userId) => {
    return useRedis((client) => {
        const token = uuid.v1();
        const key = KEY_PREFIX + token;

        await(client.set(key, userId));

        return token;
    });

};

const deleteToken = (token) => {
    return useRedis((client) => {
        const key = KEY_PREFIX + token

        return await(client.del(key));
    });

};

module.exports = {

    generateToken: generateToken,
    deleteToken: deleteToken

};
