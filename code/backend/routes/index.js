var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

//TODO: Remove this test ==================================================================
    var transaction = require('../utils/orm-db-transaction');

    transaction.doReadOnly([
        function(db, t, done) {
            db.models.UserType.get(1, function(err, type) {
                console.log(type.description);
                done(err, db, t, type);
            });
        },
        function(db, t, type, done) {
            type.description = new Date();
            type.save(function (err) {
                done(err, db, t, type);
            });
        }
    ]);

//===========================================================================================

    res.render('index', { title: 'Express' });

});

module.exports = router;
