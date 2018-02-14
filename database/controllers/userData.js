const db = require('../../database');

exports.userByEmail = function (email, callback) {
  db.User.find({ where: { email: email } })
    .then((user) => {
      if (user) {
        db.Answer.find({ where: { userID: user.id } })
          .then((answer) => {
            // console.log('userData file this is the answer', answer);
            user.answers = answer;
          });
      }
      // console.log('userData file this is the user', user);
      callback(null, user);
    })
    .catch((err) => {
      callback(err, null);
    });
};

exports.createAnswer = function (email, promptid, reply, callback) {
  db.User.find({ where: { email: email } })
    .then((user) => {
      db.Prompt.find({ where: { id: promptid } })
        .then((prompt) => {
          db.Answer.create({
            userId: user.id,
            propmtId: promptid,
            response: reply
          })
            .then((a) => {
              exports.userByEmail(email, callback);
            });
        });
    })
    .catch((err) => {
      callback(err, null);
    });
};

