var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

//TODO: Remove this test ==================================================================
    var transaction = require('../utils/orm-db-transaction');

    transaction.doReadOnly([
        function(db, t, done) {
            db.models.UserType.get(1, function(err, type) {

                if (err) {
                    return done(err, db, t);
                }

                try {

                    console.log('Description: ' + type.description);
                    type.description = new Date();

                    done(err, db, t, type);

                } catch(err) {
                    done(err, db, t);
                }

            });
        },
        function(db, t, type, done) {
            type.save(function (err) {
                done(err, db, t);
            });
        }
    ]);

//===========================================================================================

    res.render('index', { title: 'Express' });

});

module.exports = router;
