var _ = require('lodash');

var handleException = function(res, err) {

    if (_.isArray(err)) {
        res.status(400).json(err);
    } else {
        res.status(500).send(err.message || err);
    }

};

module.exports = {

    handleException: handleException

};