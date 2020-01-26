'use strict';
module.exports = (sequelize, DataTypes) => {
  const tags = sequelize.define('tags', {
    name: DataTypes.STRING,
    isCategory: DataTypes.INTEGER
  }, {});
  tags.associate = function(models) {
    tags.hasMany(models.animationtags);
  };
  return tags;
};