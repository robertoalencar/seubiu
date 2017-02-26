var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Professions', function() {

    before(function () {
        process.env.DB_PATH_NAME='/var/tmp/test_db.sqlite';
        process.env.DB_PROTOCOL='sqlite';
        process.env.DB_HOST='';
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

    it('should get a profession by id on GET /api/professions/:id ', function(done) {
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

});