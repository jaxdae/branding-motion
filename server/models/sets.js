'use strict';
module.exports = (sequelize, DataTypes) => {
  const sets = sequelize.define('sets', {
    name: DataTypes.STRING
  }, {});
  sets.associate = function(models) {
    // associations can be defined here
  };
  return sets;
};