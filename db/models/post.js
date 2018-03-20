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
      /* eslint-disable */
      type: DataTypes.STRING,
      /* eslint-enable */
      allowNull: false,
      },
    total_likes: {
      type: DataTypes.DECIMAL,
      },
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};
