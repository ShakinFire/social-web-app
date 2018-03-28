'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "last_name" on table "Users"
 * changeColumn "first_name" on table "Users"
 *
 **/

var info = {
    "revision": 6,
    "name": "added-default-names",
    "created": "2018-03-28T12:55:06.317Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "Users",
            "last_name",
            {
                "type": Sequelize.STRING(30),
                "defaultValue": "Last name"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "first_name",
            {
                "type": Sequelize.STRING(30),
                "defaultValue": "First name"
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
