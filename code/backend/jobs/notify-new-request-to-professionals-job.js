var _ = require('lodash');

module.exports = function (queue, TYPES) {
    queue.process(TYPES.NOTIFY_NEW_REQUEST_TO_PROFESSIONALS, 50, function(job, done){
        console.log('#### Sending push notifications to ', _.join(job.data, ','));
        return done();
    });
};