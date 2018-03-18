'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {}, {});
  Like.associate = function(models) {
    const {
      Post,
    } = models;

    Like.belongsTo(Post, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };
  return Like;
};
