/* globals __dirname __filename */
const fs = require('fs');
const path = require('path');

const init = (app, data) => {
    app.get('/', (req, res) => {
        if (req.user) {
            res.send('You are logged.');
        } else {
            res.render('fullscreen-video');
        }
    });

    fs.readdirSync(__dirname)
        .filter((filename) => filename !== path.basename(__filename))
        .filter((filename) => filename !== 'index.js')
        .map((filename) => path.join(__dirname, filename))
        .forEach((modulePath) => {
            const route = require(modulePath);
            route.init(app, data);
        });
};

module.exports = {
    init,
};
