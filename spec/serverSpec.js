// Set env variables to test during testing
require('dotenv').config();
process.env.NODE_ENV = 'test';

// DB
const db = require('../database/index.js');
const seedPrompts = require('../database/prompts.js');
const Sequelize = require('sequelize');

// Server
const server = require('../server/server.js');

// Testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('RESTful API interaction with database', () => {
  beforeEach((done) => {
    console.log('BEFORE EACH STARTED=====');
    db.sequelize.sync({ force: true })
      .then(() => {
        return db.Prompt.bulkCreate(seedPrompts.prompts);
      })
      .then(() => done())
      .catch((err) => {
        console.log('ERROR', err);
      });
  });

  // afterEach((done) => {
  //   db.sequelize.close()
  //     .then(() => done())
  //     .catch((err) => {
  //       throw err;
  //     });
  // });

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
            console.log('ERROR', err);
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
              console.log(err);
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
              console.log('ERROR', err);
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
              console.log('ERROR', err);
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

describe('RESTful API interaction with Watson API', () => {
  const sampleText = {
    text: `The most striking element of Eighner’s essay is his use of a
    “matter-of-fact” tone to describe an activity most people feel repulsiontoward. His criterion for judging whether someone is serious aboutdumpster diving provides a good example: “But eating from Dumpstersis what separates the dilettanti from the professionals.” For many people, it is probably difficult to visualize the action described here without feeling nauseous. Eighner remains value-neutral toward hissubject and his audience with a few notable exceptions. He “hates thecan scroungers” because they scatter trash looking for aluminum cansthey can redeem for small amounts of cash, which they typically spend,on alcohol. He refers to college students’ money as coming from“Daddy,” which suggests they are thoughtless and wasteful because they live on family subsidizes. And, at the end of the essay, he expresses hissorrow for “the rat-race millions who nightly scavenge the cablechannels looking for they know not what.” These millions areapparently the American middle class.`
  };

  describe('/api/ibmtone', () => {
    describe('POST answers for tone analysis from IBM Watson API', () => {
      it('should respond with a tone analysis from IBM Watson', (done) => {
        chai.request(server)
          .post('/api/ibmtone')
          .send({ data: sampleText })
          .end((err, res) => {
            if (err) {
              console.log('ERROR', err);
            }
            const analysis = JSON.parse(res.body);
            const documentAnalysis = analysis.document_tone;
            const docTones = documentAnalysis.tones;

            res.should.have.status(200);
            analysis.should.be.a('object');
            analysis.should.have.property('document_tone');
            documentAnalysis.should.have.property('tones');
            docTones.should.be.a('array');
            docTones[0].should.have.property('score');
            docTones[0].should.have.property('tone_id');
            docTones[0].should.have.property('tone_name');
            done();
          });
      });
    });
  });

  describe('/api/insight', () => {
    describe('POST answers for personality analysis from IBM Watson API', () => {
      it('should respond with a personality analysis from IBM Watson', (done) => {
        chai.request(server)
          .post('/api/insight')
          .send({ data: sampleText })
          .end((err, res) => {
            if (err) {
              console.error(`ERROR: ${err.response.error.text}`);
              console.log('ERROR', err);
            }
            const analysis = JSON.parse(res.body);
            res.should.have.status(200);

            analysis.should.be.a('object');
            analysis.should.have.property('word_count');
            analysis.should.have.property('processed_language');
            analysis.should.have.property('personality');
            analysis.should.have.property('needs');
            analysis.should.have.property('values');
            analysis.should.have.property('consumption_preferences');
            analysis.should.have.property('warnings');
            analysis.personality.should.be.a('array');
            analysis.personality[0].should.have.property('trait_id');
            analysis.personality[0].should.have.property('name');
            analysis.personality[0].should.have.property('category');
            analysis.personality[0].should.have.property('percentile');
            analysis.personality[0].should.have.property('raw_score');
            analysis.personality[0].should.have.property('significant');
            analysis.personality[0].should.have.property('children');
            analysis.personality[0].children.should.be.a('array');
            done();
          });
      });
    });
  });
});

// Tests for authenticated routes

// Tests for Cloudinary route

