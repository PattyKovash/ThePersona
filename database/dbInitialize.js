const db = require('./index.js');
const seedPrompts = require('./prompts');

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database successfully connected!');
    return db.sequelize.sync({ force: true });
  })
  .then(() => {
    return db.Prompt.bulkCreate(seedPrompts.prompts);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
