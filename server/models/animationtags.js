'use strict';
module.exports = (sequelize, DataTypes) => {
  const animationtags = sequelize.define('animationtags', {
    animationId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  // animationtags.associate = function(models) {
  // };
  return animationtags;
};