'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "AddressId" from table "Users"
 * removeColumn "age" from table "Users"
 * dropTable "Addresses"
 * addColumn "birthday" to table "Users"
 * addColumn "address" to table "Users"
 * changeColumn "description" on table "Users"
 *
 **/

var info = {
    "revision": 2,
    "name": "removed-address-table",
    "created": "2018-03-30T09:04:15.245Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Users", "AddressId"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "age"]
    },
    {
        fn: "dropTable",
        params: ["Addresses"]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "birthday",
            {
                "type": Sequelize.DATEONLY
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "address",
            {
                "type": Sequelize.STRING(150),
                "defaultValue": "Sofia, Bulgaria"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "description",
            {
                "type": Sequelize.TEXT,
                "defaultValue": "Write down your description here..."
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
