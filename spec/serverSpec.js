// Set env variables to test during testing
process.env.NODE_ENV = 'test';

// DB
const db = require('../database/index.js');
const Sequelize = require('sequelize');

// Server
const server = require('../server/server.js');

// Testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('RESTful API', () => {
  let sequelize;

  beforeEach((done) => {
    sequelize = new Sequelize('personaTest', 'root', null, {
      host: 'localhost',
      dialect: 'mysql',
      pool: {
        max: 10,
        min: 0,
        acquire: 3000,
        idle: 5000
    }


  });

  afterEach((done) => {
    server.close();
    return sequelize.close(done);
  });

  describe('/api/users', () => {
    describe('GET', () => {
      it('respond with a 200 (OK) on success', (done) => {
        chai.request(server)
          .get('/api/users')
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });
});
