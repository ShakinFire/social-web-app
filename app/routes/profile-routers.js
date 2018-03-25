const Router = require('express').Router;

const controller = require('../controllers/users');

const router = new Router();

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
};

router.use(isLoggedIn);

const init = (app, data) => {
    router
        .get('/', async (req, res) => {
            const userData = await req.user.dataValues;
            res.render('profile-logged')(userData);
        })
        .get('/home', (req, res) => {
            res.render('profile-logged');
        })
        .get('/posts', (req, res) => {
            res.render('_profile/posts');
        })
        .get('/settings', (req, res) => {
            res.render('_profile/settings');
        });

    router.get('/:public_username', (req, res) => {
        // TO-DO: Render view for the profile
        // only with public information available
        // for non-logged users.
        res.send(req.params);
    });

    app.use('/profile', router);
};

module.exports = {
    init,
};
