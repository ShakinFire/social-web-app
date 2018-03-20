'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    country: {
      /* eslint-disable */
      type: DataTypes.STRING,
      /* eslint-enable */
      unique: true,
    },
    city: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
  };
  return Address;
};
