const Sequelize = require('sequelize');

const NODE_ENV = process.env.NODE_ENV;
let sequelize;
let database = 'persona';

if (NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  if (NODE_ENV === 'test') {
    database = 'personaTest';
  }
  sequelize = new Sequelize(database, 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 5000
    },
    logging: false
  });
}

// INITIALIZE TABLES

const User = sequelize.import('./models/User.js');
const Answer = sequelize.import('./models/Answer.js');
const Prompt = sequelize.import('./models/Prompt.js');
const Comment = sequelize.import('./models/Comment.js');
const Tag = sequelize.import('./models/Tag.js');
const Vote = sequelize.import('./models/Vote.js');
const Interview = sequelize.import('./models/Interview.js');

// // FOREIGN KEY CREATION

Answer.belongsTo(User, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`
});

Prompt.belongsTo(User, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`
});

Comment.belongsTo(User, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`
});

Vote.belongsTo(User, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`
});

Answer.belongsTo(Prompt, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`
});

Answer.belongsTo(Interview, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`
});

Interview.belongsTo(User, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`
});

const selectAll = (callback) => {
  User.findAll()
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const getPrompts = (query, callback) => {
  Prompt.findAll({
    where: query
  })
    .then((found) => {
      if (callback) {
        callback(null, found);
      }
    })
    .catch(callback);
};

const findUser = (query, callback) => {
  User.find({
    where: {
      email: query
    }
  })
    .then((found) => {
      if (callback) { callback(null, found); }
    })
    .catch(callback);
};

module.exports.sequelize = sequelize;

// Models
module.exports.Answer = Answer;
module.exports.Comment = Comment;
module.exports.Prompt = Prompt;
module.exports.Tag = Tag;
module.exports.User = User;
module.exports.Vote = Vote;
module.exports.Interview = Interview;

// Query Functions
module.exports.findUser = findUser;
module.exports.getPrompts = getPrompts;
module.exports.selectAll = selectAll;
