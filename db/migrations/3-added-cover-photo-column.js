'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "cover_pic" to table "Users"
 *
 **/

var info = {
    "revision": 3,
    "name": "added-cover-photo-column",
    "created": "2018-03-25T07:55:11.025Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Users",
        "cover_pic",
        {
            "type": Sequelize.STRING
        }
    ]
}];

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
