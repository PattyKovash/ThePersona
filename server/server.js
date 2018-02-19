// Node Modules
const express = require('express');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
// DB Files
const db = require('../database');
const User = require('../database/models/User.js');
const sequelize = require('../database/index.js').sequelize;
const userData = require('../database/controllers/userData.js');
const interviewData = require('../database/controllers/interviewData.js');
// Helpers
const toneAnalyzer = require('./helpers/toneAnalyzer');
const wordAnalyzer = require('./helpers/fillerWords').fillerWords;
const personalityInsight = require('./helpers/personalityInsight');
const videoUploader = require('./helpers/videoUploader');

const app = express();
const social = require('./passport/authRoute.js')(app, passport);
const router = require('express').Router();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
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
    res.send(false);
    // res.redirect('/#!/login');
  }
}

// app.get('/user/dashboard', checkAuthentication, (req, res) => {
//   res.redirect('/#!/user/dashboard');
// });

app.get('/data/user', checkAuthentication, (req, res) => {
  const lookUp = req.user.dataValues.email;
  userData.userByEmail(lookUp, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/prompts', (req, res) => {
  const tag = req.query.tags;
  let query = { tags: tag };
  if (tag === 'all') {
    query = {};
  }
  db.getPrompts(query)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// app.get('/api/interviews', (req, res) => {
//   const userId = req.query.userId;
//   console.log('USERID: ', userId);
//   sequelize.query('select * from interviews inner join answers on 1 = answers.interviewId;')
//     .then((interviews) => {
//       console.log('INTERVIEWS IN SERVER: ', interviews);
//     });
//   // interviewData.getUserInterviews(userId)
//   //   .then((interviews) => {
//   //     console.log('USER INTS: ', interviews);
//   //     res.status(200).json(interviews);
//   //   })
//   //   .catch((err) => {
//   //     console.log('ERROR GETTING INTS: ', err);
//   //     res.status(500).send(err);
//   //   });
// });

app.get('/api/interviews', (req, res) => {
  const userId = req.query.userId;
  interviewData.getUserInterviews(userId)
    .then((interviews) => {
      console.log('USER INTS: ', interviews);
      res.status(200).json(interviews);
    })
    .catch((err) => {
      console.log('ERROR GETTING INTS: ', err);
      res.status(500).send(err);
    });
});

app.get('/api/answers', (req, res) => {
  const userId = req.query.userId;
  interviewData.getUserInterviews(userId)
    .then((answers) => {
      console.log('USER ANSWERS: ', answers);
      res.status(200).json(interviews);
    })
    .catch((err) => {
      console.log('ERROR GETTING INTS: ', err);
      res.status(500).send(err);
    });
});

app.post('/api/ibmtone', (req, res) => {
  toneAnalyzer(req.body.data.text)
    .then((tone) => {
      res.status(200).json(tone);
    })
    .catch((err) => {
      console.log('ERR FROM IBM TONE, ', err);
      res.status(500).send(err);
    });
});

app.post('/api/wordanalysis', (req, res) => {
  wordAnalyzer(req.body.data.text, (analysis) => {
    res.json(analysis);
  }, req.body.data.fillers);
});

app.post('/api/insight', (req, res) => {
  personalityInsight(req.body.data.text)
    .then((personality) => {
      res.status(200).json(personality);
    })
    .catch((err) => {
      res.status(500).send(err.error);
    });
});

app.post('/api/cloudinary', (req, res) => {
  const videoURL = req.body.video;
  videoUploader(videoURL, { resource_type: 'video' }, (error, result) => {
    if (error) {
      res.status(500).send(error);
    }
    res.status(200).json(result);
  });
});

app.post('/api/interviews', (req, res) => {
  const intObj = req.body.intObj;
  interviewData.addInterview(intObj)
    .then((interview) => {
      const intId = interview.dataValues.id;
      const qAndA = Object.entries(intObj.qAndA);
      interviewData.bulkAnswers(intId, qAndA)
        .then(() => {
          res.status(200).json(interview);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = app;
