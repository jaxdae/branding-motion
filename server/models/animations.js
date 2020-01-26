'use strict';
module.exports = (sequelize, DataTypes) => {
  const animations = sequelize.define('animations', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    video: DataTypes.STRING,
    componentName: DataTypes.STRING
  }, {});
  // animations.associate = function(models) {
  // };
  return animations;
};