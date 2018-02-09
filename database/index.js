const Sequelize = require('sequelize');
const seedPrompts = require('./prompts');

let sequelize;

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  sequelize = new Sequelize('persona', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 5000
    }
  });
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Database successfully connected!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

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

sequelize.sync({ force: true })
  .then(() => {
    Prompt.bulkCreate(seedPrompts.prompts);
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
module.exports.selectAll = selectAll;
module.exports.sequelize = sequelize;
module.exports.getPrompts = getPrompts;
module.exports.Answer = Answer;
module.exports.Prompt = Prompt;
module.exports.Comment = Comment;
module.exports.Tag = Tag;
module.exports.Vote = Vote;
