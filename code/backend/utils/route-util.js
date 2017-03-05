var _ = require('lodash');

var handleException = (res, err) => {
    var statusCode = 500;

    if (err.type && err.type == 'BUSINESS') {
        statusCode = 400;
    } else if (err.type && err.type == 'NOT_FOUND' || (err.literalCode && err.literalCode == 'NOT_FOUND')) {
        statusCode = 404;
    }

    res.status(statusCode).send(err.message || err);

};

var getCurrentIp = (req) => {

    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;

};

module.exports = {

    handleException: handleException,
    getCurrentIp: getCurrentIp

};