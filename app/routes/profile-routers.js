const Router = require('express').Router;
const router = new Router();

const UsersController = require('../controllers/users-controller');

// middlewares for checking authentication & image URLs.
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

const setDomain = (req, res, next) => {
    // TO-DO: Export it to the config
    // or use req.hostname
    const domain = 'http://localhost:3001';

    const user = req.user;

    req.domain = domain;
    user.profile_pic = domain + user.profile_pic;
    user.cover_pic = domain + user.cover_pic;
    next();
};

router.use(isLoggedIn);
router.use(setDomain);

const init = (app, data) => {
    const controller = new UsersController(data);
    router
        .get('/', (req, res) => {
            res.render('profile-logged', req.user);
        })
        .get('/home', (req, res) => {
            res.render('_profile/home');
        })
        .get('/posts', (req, res) => {
            res.render('_profile/posts');
        })
        .get('/settings', (req, res) => {
            res.render('_profile/settings');
        })
        .get('/:public_username', (req, res) => {
            // TO-DO: Render view for the profile
            // only with public information available
            // for non-logged users.
            res.send(req.params);
        })
        .post('/upload', async (req, res) => {
            try {
                await controller.updateImg(
                    req.user.id, req.file.filename, req.body['which-image']
                );
                res.send('/uploads/' + req.file.filename);
            } catch (err) {
                console.log(err);
            }
        });

    app.use('/profile', router);
};

module.exports = {
    init,
};
