const router = require('express').Router();
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
const jwtoken = require('jsonwebtoken');
const Sequelize = require('sequelize');
const sequelize = require('../../database/index.js').sequelize;
const User = require('../../database/index.js').User;
const sequelizeStore = require('express-sequelize-session')(session.Store);
var secret = 'starwars';

module.exports = function (app, passport) {
  app.use(session({
    secret: 'darkside'
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.find({ where: {id: id}}).then((user) => {
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    }).catch((err) => {
      done(err, null);
    });
  });

  // FACEBOOK STRATEGY

  passport.use(new FacebookStrategy({ // travis is getting it from the .travis.yml so it's probably looking for it in there
    clientID: '1840741019270677',
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  (accessToken, refreshToken, profile, done) => {
    User.find({ where: { email: profile.emails[0].value } })
      .then((user) => {
        if (!user) {
          User.create({
            name: profile._json.name || '',
            email: profile.emails[0].value,
            username: profile.name.givenName || '',
            provider: 'facebook',
            facebookUserId: profile.id
          }).then((u) => {
            done(null, u);
          });
        } else {
          done(null, user);
        }
      }).catch((err) => {
        done(err, null);
      });
  }
  ));

  // GOOGLE STRATEGY

  passport.use(new GoogleStrategy({
    clientID: '544526537829-bgsghiocur95tm6br5smpf0t8uh5tkef.apps.googleusercontent.com',
    clientSecret: process.env.googleSECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    User.find({ where: { email: profile.emails[0].value } })
      .then((user) => {
        if (!user) {
          User.create({
            name: profile.name.givenName || '',
            email: profile.emails[0].value,
            username: profile.name.givenName + ' ' + profile.name.familyName || '',
            provider: 'google',
            googleUserId: profile.id
          }).then((u) => {
            done(null, u);
          });
        } else {
          done(null, user);
        }
      }).catch((err) => {
        done(err, null);
      });
  }
  ));


  // Facebook Auth Routes

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/facebookerror' }),
    (req, res) => {
      res.redirect('/');
    }
  );
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

  // Google OAuth Routes

  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/googleerror' }),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'] }));

  return passport;
};
