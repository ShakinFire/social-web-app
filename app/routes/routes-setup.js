/* globals __dirname __filename */
const fs = require('fs');
const path = require('path');
const Pcontroller = require('../controllers/post-controller');

const init = (app, data) => {
    const PostController = new Pcontroller(data);
    app.get('/', async (req, res) => {
        if (req.user) {
            const context = await PostController
                .updateContent(req.query.content);
            res.render('home-logged', context);
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
