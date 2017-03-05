const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const testUtil = require('../utils/api-test-util');
const data = require('../utils/initial-data-db');

chai.should();
chai.use(chaiHttp);

describe('City API', () => {

    before((done) => {

        testUtil.setupInitialData(data).then(() => {
            done();
        }, (err) => {
            done(err);
        });

    });

    it('should get all cities on GET /api/cities', (done) => {
        chai.request(server)
        .get('/api/cities')
        .end((err, res) => {

            const expected = [
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