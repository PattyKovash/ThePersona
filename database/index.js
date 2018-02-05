const Sequelize = require('sequelize');
const prompts = require('./prompts');
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

Prompt.belongsToMany(Tag, {
  through: PromptToTag,
  as: 'tags',
  foreignKey: 'promptID',
  otherKey: 'tagID',
  constraints: false,
  onDelete: 'CASCADE',
});

Tag.belongsToMany(Prompt, {
  through: PromptToTag,
  as: 'prompts',
  foreignKey: 'tagID',
  otherKey: 'promptID',
  constraints: false,
  onDelete: 'CASCADE',
});

sequelize.sync({ force: true })
  .then(() => {
    prompts.forEach((prompt) => {
      return Prompt.findOrCreate({
        where: { question: prompt.question }
      })
        .spread((newPrompt, isPromptCreated) => {
          console.log('newPrompt:', newPrompt);
          return prompt.tags.forEach((tag) => {
            Tag.findOrCreate({
              where: { tagname: tag }
            })
              .spread((newTag, isTagCreated) => {
                return newTag.addPrompt([newPrompt.id])
                  .then(() => {
                    console.log('AAAAHHHHHH');
                  });
              });
          });
        });
    });
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

// const addPrompt = (prompt, callback) => {
//   Prompt.findOrCreate({
//     where: { question: prompt.question }
//   })
//     .spread((newPrompt, isPromptCreated) => {
//       if (callback) {
//         callback(null, newPrompt, isPromptCreated);
//       }
//     })
//     .catch((err) => {
//       if (callback) {
//         callback(err);
//       }
//     });
// };

// const addTag = (tag, callback) => {
//   Tag.findOrCreate({
//     where: { tagname: tag }
//   })
//     .spread((newTag, isTagCreated) => {
//       if (callback) {
//         callback(null, newTag, isTagCreated);
//       }
//     })
//     .catch((err) => {
//       if (callback) {
//         callback(err);
//       }
//     });
// };

// const addPromptToTag = (prompt, tag, callback) => {
//   console.log('prompt:', prompt);
//   console.log('tag:', tag);



//   Prompt.find({
//     where: {
//       question: prompt.question
//     }
//   })
//     .then((foundPrompt) => {

//       Tag.find({
//         where: {
//           tagname: tag
//         }
//       })
//         .then((foundTag) => {
//           foundPrompt.addTag([foundTag.id])
//             .then(callback)
//             .catch(callback);
//         });
//     })
//     .catch(callback);
// };

module.exports.User = User;
module.exports.selectAll = selectAll;
module.exports.sequelize = sequelize;
// module.exports.addPrompt = addPrompt;
// module.exports.addTag = addTag;
// module.exports.addPromptToTag = addPromptToTag;
