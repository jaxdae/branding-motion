'use strict';
module.exports = (sequelize, DataTypes) => {
  const crossRefs = sequelize.define('crossRefs', {
    animationId: DataTypes.INTEGER,
    otherAnimationId: DataTypes.INTEGER
  }, {});
  // crossRefs.associate = function(models) {
  // };
  return crossRefs;
};