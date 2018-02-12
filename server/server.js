const db = require('../database');
const path = require('path');
const User = require('../database/models/User.js');
const router = require('express').Router();
const express = require('express');
const passport = require('passport');
const sequelize = require('../database/index.js').sequelize;
const bodyParser = require('body-parser');
const toneAnalyzer = require('./helpers/toneAnalyzer');
const wordAnalyzer = require('./helpers/fillerWords').fillerWords;
const personalityInsight = require('./helpers/personalityInsight');
const userData = require('../database/controllers/userData.js');

const app = express();
const social = require('./passport/authRoute.js')(app, passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/../client')));
app.use(express.static(path.join(__dirname, '/../node_modules')));

app.get('/api/users', (req, res) => {
  res.sendStatus(200);
});

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('You are authenticated!');
    next();
  } else {
    console.log('You are not Authenticated!');
    res.redirect('/#!/login');
  }
}

app.get('/api/dashboard', checkAuthentication, (req, res) => {
  res.redirect('/#!/interview/practice');
});

app.get('/data/user', checkAuthentication, (req, res) => {
  let lookUp = req.user.dataValues.email;
  console.log('this is the incoming request', req.user);
  console.log('this is the session ID', req.session);
  userData.userByEmail(lookUp, (err, results) => {
    console.log('this is the server js', err, results);
    if (err) {
      res.status(500).send(err);
    } else {
      console.log('these are the callback results', results);
      res.status(200).json(results);
    }
  })
});

app.get('/api/prompts', (req, res) => {
  const tag = req.query.tags;
  let query = { tags: tag };
  if (tag === 'all') {
    query = {};
  }
  db.getPrompts(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/api/ibmtone', (req, res) => {
  toneAnalyzer(req.body.data.text)
    .then((tone) => {
      const toneResults = JSON.parse(tone);
      res.status(200).send(toneResults);
    })
    .catch((err) => {
      console.log('IM ERRORING OUT!!!!!!!!!');
      res.status(500).json(err);
    });
});

app.post('/api/wordanalysis', (req, res) => {
  wordAnalyzer(req.body.data.text, (analysis) => {
    res.send(JSON.stringify(analysis));
  }, req.body.data.fillers);
});

app.post('/api/insight', (req, res) => {
  personalityInsight(req.body.data.text)
    .then((personality) => {
      res.json(personality);
    })
    .catch((err) => {
      res.status(500).send(err.error);
    });
});

app.post('/api/cloudinary', (req, res) => {
  console.log(req.body.video);
  res.end();
});

module.exports = app;
