'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Addresses", deps: []
 * createTable "Followers", deps: []
 * createTable "Genders", deps: []
 * createTable "Users", deps: [Addresses, Genders]
 * createTable "Posts", deps: [Users]
 * createTable "Likes", deps: [Posts]
 * createTable "Comments", deps: [Posts, Users]
 * createTable "user_follower", deps: [Users, Followers]
 * createTable "user_like", deps: [Users, Likes]
 *
 **/

var info = {
    "revision": 1,
    "name": "fixed-validation-issues-final",
    "created": "2018-03-20T13:38:52.817Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Addresses",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "country": {
                    "type": Sequelize.STRING,
                    "unique": true
                },
                "city": {
                    "type": Sequelize.STRING,
                    "unique": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Followers",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "followed_user_id": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Genders",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "gender_type": {
                    "type": Sequelize.BOOLEAN,
                    "unique": true,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "unique": true,
                    "allowNull": false,
                    "validate": {
                        "isEmail": true
                    }
                },
                "username": {
                    "type": Sequelize.STRING(35),
                    "unique": true,
                    "allowNull": false
                },
                "first_name": {
                    "type": Sequelize.STRING(30)
                },
                "last_name": {
                    "type": Sequelize.STRING(30)
                },
                "profile_pic": {
                    "type": Sequelize.STRING
                },
                "description": {
                    "type": Sequelize.TEXT
                },
                "age": {
                    "type": Sequelize.DECIMAL
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "AddressId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Addresses",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "GenderId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Genders",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Posts",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "post_content": {
                    "type": Sequelize.TEXT,
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "total_likes": {
                    "type": Sequelize.DECIMAL
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Likes",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "PostId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Posts",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Comments",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "comment_content": {
                    "type": Sequelize.TEXT,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "PostId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Posts",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "user_follower",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "FollowerId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Followers",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "user_like",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "LikeId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Likes",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
