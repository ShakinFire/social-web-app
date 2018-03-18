'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
  };
  return Address;
};
