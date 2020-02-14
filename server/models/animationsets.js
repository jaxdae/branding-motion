'use strict';
module.exports = (sequelize, DataTypes) => {
  const animationsets = sequelize.define('animationsets', {
    animationId: DataTypes.INTEGER,
    setId: DataTypes.INTEGER
  }, {});
  animationsets.associate = function(models) {
    // associations can be defined here
  };
  return animationsets;
};