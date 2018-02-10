const Sequelize = require('sequelize');
const seedPrompts = require('./prompts');

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
const Prompt = sequelize.import('./models/Prompt.js');
const Answer = sequelize.import('./models/Answer.js');
const Comment = sequelize.import('./models/Comment.js');
const Tag = sequelize.import('./models/Tag.js');
const Vote = sequelize.import('./models/Vote.js');
const PromptToTag = sequelize.import('./models/PromptToTag');


// // FOREIGN KEY CREATION

Answer.belongsTo(User, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`,
});

Prompt.belongsTo(User, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`,
});

Comment.belongsTo(User, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`,
});

Vote.belongsTo(User, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`,
});

Answer.belongsTo(Prompt, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database successfully connected!');
    sequelize.sync({ force: true })
      .then(() => {
        Prompt.bulkCreate(seedPrompts.prompts);
      })
      .catch((err) => {
        console.error('Unable to create prompts:', err);
        throw err;
      });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    throw err;
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
  User.find( {
    where: {
      email: query
    }
  })
  .then((found) => {
    if (callback) {callback(null,found)};
  })
  .catch(callback);
}; 

module.exports.User = User;
module.exports.Prompt = Prompt;
module.exports.Answer = Answer;
module.exports.Comment = Comment;
module.exports.Tag = Tag;
module.exports.Vote = Vote;
module.exports.PromptToTag = PromptToTag;
module.exports.selectAll = selectAll;
module.exports.sequelize = sequelize;
module.exports.getPrompts = getPrompts;
module.exports.Answer = Answer;
module.exports.Prompt = Prompt;
module.exports.Comment = Comment;
module.exports.Tag = Tag;
module.exports.Vote = Vote;
