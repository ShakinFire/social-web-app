'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_pic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      /* eslint-disable */
      type: DataTypes.TEXT,
      /* eslint-enable */
      allowNull: false,
    },
    age: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      unique: true,
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
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

    User.belongsTo(Gender, {
      foreignKey: {
        allowNull: false,
      },
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
