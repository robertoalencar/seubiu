var _ = require('lodash');

var handleException = function(res, err) {

    if (_.isArray(err)) {
        res.status(400).json(err);
    } else {
        res.status(500).send(err.message || err);
    }

};

var getCurrentIp = function(req) {

    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;

};

module.exports = {

    handleException: handleException,
    getCurrentIp: getCurrentIp

};