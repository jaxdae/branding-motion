'use strict';
module.exports = (sequelize, DataTypes) => {
  const setssettag = sequelize.define('setssettag', {
    setId: DataTypes.INTEGER,
    settagsId: DataTypes.INTEGER
  }, {});
  setssettag.associate = function(models) {
    // associations can be defined here
  };
  return setssettag;
};