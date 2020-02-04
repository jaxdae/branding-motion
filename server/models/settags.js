'use strict';
module.exports = (sequelize, DataTypes) => {
  const settags = sequelize.define('settags', {
    name: DataTypes.STRING
  }, {});
  settags.associate = function(models) {
    // associations can be defined here
  };
  return settags;
};