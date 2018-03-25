const Router = require('express').Router;

const controller = require('../controllers/users');

const router = new Router();

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

router.use(isLoggedIn);

const init = (app, data) => {
    router
        .get('/', async (req, res) => {
            const details = await req.session;
            console.log(details);
            res.render('profile-logged', {
                cover_pic: 'http://covertimeline.com/app/template/1035.jpg',
                profile_pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQodQEqiu0r3eGFJ_zHaOqZ8oWtXMDn8AIOdyw4mCiVerbA571zQ',
            });
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
