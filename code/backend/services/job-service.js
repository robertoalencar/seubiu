var dotenv = require('dotenv').config();
var _ = require('lodash');
var kue = require('kue');

var queue = kue.createQueue({
  prefix: 'q',
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    db: 3
  }
});

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
    var clonedData = _.cloneDeep(data);
    clonedData.title = title;
    return queue.create(jobType, clonedData).attempts(3).removeOnComplete(true);
};

module.exports = {

    TYPES: TYPES,
    queue: queue,
    createJob: createJob

};