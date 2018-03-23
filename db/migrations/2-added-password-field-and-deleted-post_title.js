'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "title" from table "Posts"
 * addColumn "password" to table "Users"
 *
 **/

var info = {
    "revision": 2,
    "name": "added-password-field-and-deleted-post_title",
    "created": "2018-03-23T09:07:31.752Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Posts", "title"]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "password",
            {
                "type": Sequelize.STRING(35),
                "allowNull": false
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
