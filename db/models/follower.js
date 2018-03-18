'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    followed_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Follower.associate = function(models) {
    // associations can be defined here
  };
  return Follower;
};
