'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment_content: {
      /* eslint-disable */
      type:DataTypes.TEXT,
      /* eslint-enable */
      allowNull: false,
    },
  }, {});
  Comment.associate = function(models) {
    const {
      Post,
    } = models;

    Comment.belongsTo(Post, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };
  return Comment;
};
