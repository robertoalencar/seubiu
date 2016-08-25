var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {


//TODO: Remove this test ==================================================================
    var connectionPool = require('../utils/connection-pool');
    console.log('connectionPool.availableObjectsCount() A: ' + connectionPool.availableObjectsCount());

    connectionPool.acquire(function(err, db) {
        console.log('connectionPool.availableObjectsCount() B: ' + connectionPool.availableObjectsCount());
        db.models.UserType.get(1, function(err, type) {
            console.log(type.description);
        });
        connectionPool.release(db);
    });

    console.log('connectionPool.availableObjectsCount() C: ' + connectionPool.availableObjectsCount());
//TODO: Remove this test ==================================================================

    res.render('index', { title: 'Express' });

});

module.exports = router;
