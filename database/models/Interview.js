'use strict';

module.exports = (sequelize, Sequelize) => {
  const Interview = sequelize.define('interviews', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullTranscript: {
      type: Sequelize.TEXT('long'),
      allowNull: true,
    },
    videoUrl: {
      type: Sequelize.TEXT
    },
    overallTones: {
      type: Sequelize.JSON,
      allowNull: true
    },
    overallPersonality: {
      type: Sequelize.JSON,
      allowNull: true
    },
    overallWords: {
      type: Sequelize.JSON,
      allowNull: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  return Interview;
};
