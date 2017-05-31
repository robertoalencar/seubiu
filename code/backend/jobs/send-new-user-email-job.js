const dotenv = require('dotenv').config();
const send = require('gmail-send');
const emailVerificationService = require('../services/email-verification-service');

module.exports = (queue, TYPES) => {
    queue.process(TYPES.SEND_NEW_USER_EMAIL, 50, (job, done) => {

        let subject = emailVerificationService.getEmailValidationSubject();
        let body = emailVerificationService.generateEmailVerification(job.data.id);

        send({
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
            to: job.data.email,
            subject: subject,
            html: body
        })();

        return done();
    });
};