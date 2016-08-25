var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {


//TODO: Remove this test ==================================================================
    var pool = require('../utils/orm-db-pool');
    console.log('pool.availableObjectsCount() A: ' + pool.availableObjectsCount());

    pool.acquire(function(err, db) {
        console.log('pool.availableObjectsCount() B: ' + pool.availableObjectsCount());
        db.models.UserType.get(1, function(err, type) {
            console.log(type.description);
        });
        pool.release(db);
    });

    console.log('pool.availableObjectsCount() C: ' + pool.availableObjectsCount());
//===========================================================================================

    res.render('index', { title: 'Express' });

});

module.exports = router;
