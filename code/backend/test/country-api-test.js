var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var testUtil = require('../utils/api-test-util');
var data = require('../utils/initial-data-db');

chai.should();
chai.use(chaiHttp);

describe('Country API', function() {

    before(function (done) {

        testUtil.setupInitialData(data).then(function(){
            done();
        }, function(err) {
            done(err);
        });

    });

    it('should get all countries on GET /api/countries', function(done) {
        chai.request(server)
        .get('/api/countries')
        .end(function(err, res){

            var expected = [
                {
                    "id": 1,
                    "description": "Brasil"
                }
            ];

            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.to.deep.equal(expected);

            done();
        });
    });

    it('should get all states by country on GET /api/countries/:id/states', function(done) {
        chai.request(server)
        .get('/api/countries/1/states')
        .end(function(err, res){

            var expected = [
                {
                    "id": 1,
                    "description": "Pernambuco",
                    "shortCode": "PE",
                    "country_id": 1
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