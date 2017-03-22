const dotenv = require('dotenv').config();
const _ = require('lodash');
const kue = require('kue');

const queue = kue.createQueue({
  prefix: 'q',
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    db: 3
  }
});

const TYPES = {
    SEND_NEW_USER_EMAIL: 'SEND_NEW_USER_EMAIL',
    NOTIFY_NEW_REQUEST_TO_PROFESSIONALS: 'NOTIFY_NEW_REQUEST_TO_PROFESSIONALS'
};

process.once('SIGTERM', (sig) => {
  queue.shutdown(5000, (err) => {
    process.exit(0);
  });
});

const createJob = (jobType, title, data) => {
    let clonedData = _.cloneDeep(data);
    clonedData.title = title;
    return queue.create(jobType, clonedData).attempts(3).removeOnComplete(true);
};

module.exports = {

    TYPES: TYPES,
    queue: queue,
    createJob: createJob

};