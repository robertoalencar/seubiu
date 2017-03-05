const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const testUtil = require('../utils/api-test-util');
const data = require('../utils/initial-data-db');

chai.should();
chai.use(chaiHttp);

describe('Profession API', () => {

    before((done) => {

        testUtil.setupInitialData(data).then(() => {
            done();
        }, (err) => {
            done(err);
        });

    });

    it('should get all professions on GET /api/professions', (done) => {
        chai.request(server)
        .get('/api/professions')
        .end((err, res) => {

            const expected = [
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

    it('should get a profession by id on GET /api/professions/:id', (done) => {
        chai.request(server)
        .get('/api/professions/1')
        .end((err, res) => {

            const expected = {
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

    it('should get all services by profession on GET /api/professions/:id/services', (done) => {
        chai.request(server)
        .get('/api/professions/1/services')
        .end((err, res) => {

            const expected = [
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