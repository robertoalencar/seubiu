var jobService = require('../services/job-service');

module.exports = () => {
  require('./send-new-user-email-job')(jobService.queue, jobService.TYPES);
  require('./notify-new-request-to-professionals-job')(jobService.queue, jobService.TYPES);
};