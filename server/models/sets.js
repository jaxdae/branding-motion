'use strict';
module.exports = (sequelize, DataTypes) => {
  const sets = sequelize.define('sets', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    custom: DataTypes.INTEGER
  }, {});
  sets.associate = function(models) {
    // associations can be defined here
  };
  return sets;
};