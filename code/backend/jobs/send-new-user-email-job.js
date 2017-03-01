module.exports = function (queue, TYPES) {
    queue.process(TYPES.SEND_NEW_USER_EMAIL, 50, function(job, done){
        console.log('#### Sending new user e-mail to', job.data.name, job.data.email);
        return done();
    });
};