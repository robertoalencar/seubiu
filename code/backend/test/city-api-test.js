var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var testUtil = require('../utils/api-test-util');
var data = require('../utils/initial-data-db');

chai.should();
chai.use(chaiHttp);

describe('City API', function() {

    before(function (done) {

        testUtil.setupInitialData(data).then(function(){
            done();
        }, function(err) {
            done(err);
        });

    });

    it('should get all cities on GET /api/cities', function(done) {
        chai.request(server)
        .get('/api/cities')
        .end(function(err, res){

            var expected = [
                {
                    "id": 2,
                    "description": "Olinda",
                    "state_id": 1
                },
                {
                    "id": 1,
                    "description": "Recife",
                    "state_id": 1
                }
            ];

            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.to.deep.equal(expected);

            done();
        });
    });

});