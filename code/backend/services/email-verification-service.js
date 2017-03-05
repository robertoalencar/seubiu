var uuid = require('uuid');
var await = require('asyncawait/await');
var useRedis = require('../utils/redis-client-use').use;

var KEY_PREFIX = 'urn' + ':' + 'emailverification' + ':' + 'token' + ':';

var generateToken = (userId) => {
    return useRedis((client) => {
        var token = uuid.v1();
        var key = KEY_PREFIX + token

        await(client.set(key, userId));

        return token;
    });

};

var deleteToken = (token) => {
    return useRedis((client) => {
        var key = KEY_PREFIX + token

        return await(client.del(key));
    });

};

module.exports = {

    generateToken: generateToken,
    deleteToken: deleteToken

};
