var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var testUtil = require('../utils/api-test-util');
var data = require('../utils/initial-data-db');

chai.should();
chai.use(chaiHttp);

describe('Profession API', function() {

    before(function (done) {

        testUtil.setupInitialData(data).then(function(){
            done();
        }, function(err) {
            done(err);
        });

    });

    it('should get all professions on GET /api/professions', function(done) {
        chai.request(server)
        .get('/api/professions')
        .end(function(err, res){

            var expected = [
                {
                    "id": 1,
                    "description": "Eletricista",
                    "active": true
                },
                {
                    "id": 2,
                    "description": "Encanador",
                    "active": true
                }
            ];

            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.to.deep.equal(expected);

            done();
        });
    });

    it('should get a profession by id on GET /api/professions/:id', function(done) {
        chai.request(server)
        .get('/api/professions/1')
        .end(function(err, res){

            var expected = {
                "id": 1,
                "description": "Eletricista",
                "active": true
            };

            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.to.deep.equal(expected);

            done();
        });
    });

    it('should get all services by profession on GET /api/professions/:id/services', function(done) {
        chai.request(server)
        .get('/api/professions/1/services')
        .end(function(err, res){

            var expected = [
                {
                    "id": 1,
                    "description": "Aterramento",
                    "active": true,
                    "profession_id": 1
                },
                {
                    "id": 2,
                    "description": "Instalação de chuveiro elétrico",
                    "active": true,
                    "profession_id": 1
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