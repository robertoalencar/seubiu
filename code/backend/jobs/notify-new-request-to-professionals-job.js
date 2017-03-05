var _ = require('lodash');

module.exports = (queue, TYPES) => {
    queue.process(TYPES.NOTIFY_NEW_REQUEST_TO_PROFESSIONALS, 50, (job, done) => {
        console.log('#### Sending push notifications to ', _.join(job.data, ','));
        return done();
    });
};