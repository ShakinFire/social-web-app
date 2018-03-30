'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    /* eslint-disable */
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(35),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(30),
      defaultValue: 'First name',
    },
    last_name: {
      type: DataTypes.STRING(30),
      defaultValue: 'Last name',
    },
    profile_pic: {
      type: DataTypes.STRING,
      defaultValue: 'img/profile/default-profile.jpeg',
    },
    cover_pic: {
      type: DataTypes.STRING,
      defaultValue: 'img/profile/default-cover.jpg',
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: 'Write down your description here...',
    },
    address: {
      type: DataTypes.STRING(150),
      defaultValue: 'Sofia, Bulgaria',
    },
    /* eslint-enable */
    birthday: {
      type: DataTypes.DATEONLY,
    },
  },
   {});
  User.associate = function(models) {
    const {
      Gender,
      Follower,
      Comment,
      Post,
      user_like_post,
    } = models;

    User.belongsTo(Gender, {
      onDelete: 'CASCADE',
    });

    Comment.belongsTo(User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

    Post.belongsTo(User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

    User.belongsToMany(Follower, {
      through: 'user_follower',
    });

    User.belongsToMany(Post, {
      through: 'user_like_post',
    });
  };
  return User;
};
