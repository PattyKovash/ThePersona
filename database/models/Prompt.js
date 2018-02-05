'use strict';

module.exports = (sequelize, DataTypes) => {
  const Prompt = sequelize.define('prompts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: DataTypes.DATE
  });

  return Prompt;
};
