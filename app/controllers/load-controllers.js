/* globals require __dirname __filename */

const path = require('path');
const fs = require('fs');

const controllers = {};

module.exports = (data) => {
    fs.readdirSync(__dirname).
        filter((file) => file !== path.basename(__filename)).
        filter((file) => file !== 'index.js').
        forEach((file) => {
            const controllerName = file.slice(0, file.indexOf('.'));
            controllers[controllerName] = require('./' + file)(data);
        });

    return controllers;
};
