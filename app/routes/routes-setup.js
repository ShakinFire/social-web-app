/* globals __dirname __filename */
const fs = require('fs');
const path = require('path');

const init = (app, data) => {
    app.get('/', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('home-logged', {
                first_name: req.user.first_name,
                profile_pic: req.user.profice_pic,
            });
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
