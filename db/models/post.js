'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    post_content: {
      /* eslint-disable */
      type: DataTypes.TEXT,
      /* eslint-enable */
      allowNull: false,
      },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    total_likes: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      },
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};
