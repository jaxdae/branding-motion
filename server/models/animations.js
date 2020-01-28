'use strict';
module.exports = (sequelize, DataTypes) => {
  const animations = sequelize.define('animations', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    video: DataTypes.STRING,
    componentName: DataTypes.STRING,
    rational: DataTypes.INTEGER,
    innovative: DataTypes.INTEGER,
    personal: DataTypes.INTEGER,
    maskuline: DataTypes.INTEGER,
    serious: DataTypes.INTEGER,
    luxurious: DataTypes.INTEGER,
    delicate: DataTypes.INTEGER,
    simple: DataTypes.INTEGER
  }, {});
  // animations.associate = function(models) {
  // };
  return animations;
};