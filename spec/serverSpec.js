// Set env variables to test during testing
require('dotenv').config();
process.env.NODE_ENV = 'test';

// Server
const server = require('../server/server.js');

// DB
const db = require('../database/index.js');
const seedPrompts = require('../database/prompts.js');

// Testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('RESTful API interaction with database', () => {
  beforeEach((done) => {
    db.sequelize.sync({ force: true })
      .then(() => {
        return db.Prompt.bulkCreate(seedPrompts.prompts);
      })
      .then(() => done())
      .catch((err) => {
        console.error('ERROR', err);
      });
  });

  describe('/api/users', () => {
    describe('GET', () => {
      it('respond with a 200 (OK) on success', (done) => {
        chai.request(server)
          .get('/api/users')
          .then((res) => {
            res.should.have.status(200);
            done();
          })
          .catch((err) => {
            console.error('ERROR', err);
          });
      });
    });
  });

  describe('/api/prompts', () => {
    describe('GET All Prompts', () => {
      it('should respond with a 200 (OK) on success and return an array of prompts', (done) => {
        chai.request(server)
          .get('/api/prompts')
          .query({ tags: 'all' })
          .end((err, res) => {
            if (err) {
              console.error(err);
            } else {
              const resultLen = res.body.length;
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body[0].should.have.property('id');
              res.body[0].should.have.property('question');
              res.body[0].should.have.property('tags');
              resultLen.should.equal(seedPrompts.prompts.length);
              done();
            }
          });
      });

      it('should return an array of prompts with a tag of non-technical', (done) => {
        chai.request(server)
          .get('/api/prompts')
          .query({ tags: 'non-technical' })
          .end((err, res) => {
            if (err) {
              console.error('ERROR', err);
            } else {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body[0].should.have.property('id');
              res.body[0].should.have.property('question');
              res.body[0].should.have.property('tags');
              res.body[0].tags.should.equal('non-technical');
              done();
            }
          });
      });

      it('should return an array of prompts with a tag of technical', (done) => {
        chai.request(server)
          .get('/api/prompts')
          .query({ tags: 'technical' })
          .end((err, res) => {
            if (err) {
              console.error('ERROR', err);
            } else {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body[0].should.have.property('id');
              res.body[0].should.have.property('question');
              res.body[0].should.have.property('tags');
              res.body[0].tags.should.equal('technical');
              done();
            }
          });
      });
    });
  });
});

process.env.NODE_ENV = undefined;
