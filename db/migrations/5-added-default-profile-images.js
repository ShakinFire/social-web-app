'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "cover_pic" on table "Users"
 * changeColumn "cover_pic" on table "Users"
 * changeColumn "profile_pic" on table "Users"
 * changeColumn "profile_pic" on table "Users"
 *
 **/

var info = {
    "revision": 5,
    "name": "added-default-profile-images",
    "created": "2018-03-28T12:28:41.769Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "Users",
            "cover_pic",
            {
                "type": Sequelize.STRING,
                "defaultValue": "img/profile/default-cover.jpg"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "cover_pic",
            {
                "type": Sequelize.STRING,
                "defaultValue": "img/profile/default-cover.jpg"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "profile_pic",
            {
                "type": Sequelize.STRING,
                "defaultValue": "img/profile/default-profile.jpeg"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "profile_pic",
            {
                "type": Sequelize.STRING,
                "defaultValue": "img/profile/default-profile.jpeg"
            }
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
