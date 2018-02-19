'use strict';

module.exports = (sequelize, Sequelize) => {
  const Answer = sequelize.define('answers', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    answer: {
      type: Sequelize.TEXT('long'),
      allowNull: false,
    },
    toneAnalysis: {
      type: Sequelize.JSON,
      allowNull: true
    },
    personalityAnalysis: {
      type: Sequelize.JSON,
      allowNull: true
    },
    wordAnalysis: {
      type: Sequelize.JSON,
      allowNull: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  return Answer;
};
