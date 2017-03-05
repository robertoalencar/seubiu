var _ = require('lodash');
var ERROR = require('./service-error-constants');

module.exports = (err, type) => {
    if (_.isArray(err) && _.isEmpty(type)) {
        return {
            'message': err,
            'type': ERROR.Types.BUSINESS
        };
    } else if (!_.isEmpty(type)) {
        return {
            'message': err,
            'type': type
        };
    } else {
        return {
            'message': err
        };
    }
};