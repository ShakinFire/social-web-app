'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    post_content: {
      /* eslint-disable */
      type: DataTypes.TEXT,
      /* eslint-enable */
      allowNull: false,
      },
    total_likes: {
      type: DataTypes.INTEGER,
      },
    total_comments: {
      type: DataTypes.INTEGER,
    }
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};
