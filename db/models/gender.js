'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gender = sequelize.define('Gender', {
    gender_type: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: true,
    },
  }, {});
  Gender.associate = function(models) {
    // associations can be defined here
  };
  return Gender;
};
