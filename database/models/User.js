'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebookUserId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    googleUserId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  User.associate = function (models) {
    models.User.hasMany(models.Prompt);
  };

  return User;
};
