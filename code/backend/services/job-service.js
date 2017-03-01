var kue = require('kue');
var queue = kue.createQueue();

var TYPES = {
    SEND_NEW_USER_EMAIL: 'SEND_NEW_USER_EMAIL',
    NOTIFY_NEW_REQUEST_TO_PROFESSIONALS: 'NOTIFY_NEW_REQUEST_TO_PROFESSIONALS'
};

process.once('SIGTERM', function(sig) {
  queue.shutdown(5000, function(err) {
    process.exit(0);
  });
});

var createJob = function(jobType, title, data) {
    data.title = title;
    return queue.create(jobType, data).attempts(3).removeOnComplete(true);
};

module.exports = {

    TYPES: TYPES,
    queue: queue,
    createJob: createJob

};