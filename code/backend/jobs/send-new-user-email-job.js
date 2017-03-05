const emailVerificationService = require('../services/email-verification-service');

module.exports = (queue, TYPES) => {
    queue.process(TYPES.SEND_NEW_USER_EMAIL, 50, (job, done) => {
        console.log('#### Sending new user e-mail to', job.data.name, job.data.email);
        return done();
    });
};