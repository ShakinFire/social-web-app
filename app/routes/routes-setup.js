/* globals __dirname __filename */
const fs = require('fs');
const path = require('path');
const Pcontroller = require('../controllers/post-controller');

const init = (app, data) => {
    const PostController = new Pcontroller(data);
    app.get('/', async (req, res) => {
        console.log(req.query);
        if (req.user) {
            if (Object.keys(req.query).length === 0
            && req.query.constructor === Object) {
                const context = await PostController.loadContent();
                context.first_name = req.user.first_name;
                context.profile_pic = req.user.profile_pic;
                res.render('home-logged', context);
            } else {
                const context = await PostController
                    .loadContent(req.query.load);
                res.render('post-content', context);
            }
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
