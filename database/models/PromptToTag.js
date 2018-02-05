'use strict';

module.exports = (sequelize, Sequelize) => {
  const PromptToTag = sequelize.define('promptsToTags', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  });

  return PromptToTag;
};
