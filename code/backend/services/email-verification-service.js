var _ = require('lodash');
var uuid = require('uuid');
var await = require('asyncawait/await');
var useRedis = require('../utils/redis-client-use').use;

var KEY_PREFIX = 'urn' + ':' + 'emailverification' + ':' + 'token' + ':';

var generateToken = function (userId) {
    return useRedis(function(client) {
        var token = uuid.v1();
        var key = KEY_PREFIX + token

        await(client.set(key, userId));

        return token;
    });

};

var deleteToken = function (token) {
    return useRedis(function(client) {
        var key = KEY_PREFIX + token

        return await(client.del(key));
    });

};

module.exports = {

    generateToken: generateToken,
    deleteToken: deleteToken

};
