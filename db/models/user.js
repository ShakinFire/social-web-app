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
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(30),
    },
    last_name: {
      type: DataTypes.STRING(30),
    },
    profile_pic: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    /* eslint-enable */
    age: {
      type: DataTypes.DECIMAL,
    },
  },
   {});
  User.associate = function(models) {
    const {
      Gender,
      Address,
      Like,
      Follower,
      Comment,
      Post,
    } = models;

    User.belongsTo(Address, {
      onDelete: 'CASCADE',
    });

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

    User.belongsToMany(Like, {
      through: 'user_like',
    });
  };
  return User;
};
