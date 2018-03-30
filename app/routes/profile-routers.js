const Router = require('express').Router;
const router = new Router();

const UsersController = require('../controllers/users-controller');

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

router.use(isLoggedIn);

const init = (app, data) => {
    const controller = new UsersController(data);
    router
        .get('/', (req, res) => {
            res.render('profile-logged', req.user);
        })
        .get('/home', (req, res) => {
            console.log(req.user);
            res.render('_profile/home', req.user);
        })
        .get('/posts', (req, res) => {
            res.render('_profile/posts');
        })
        .get('/settings', (req, res) => {
            res.render('_profile/settings', req.user);
        })
        .get('/image', (req, res) => {
            res.send(req.user.profile_pic);
        })
        .get('/:public_username', (req, res) => {
            // TO-DO: Render view for the profile
            // only with public information available
            // for non-logged users.
            res.send(req.params);
        })
        .post('/update', async (req, res) => {
            const response =
                await controller.updateProfileInfo(req.user.id, req.body);
            if (response instanceof Error) {
                res.status(400);
                res.send(response.message);
            } else {
                res.send(JSON.stringify(response));
            }
        })
        .post('/upload', async (req, res) => {
            try {
                await controller.updateImg(req);
                res.send('uploads/' + req.file.filename);
            } catch (err) {
                console.log(err);
            }
        });

    app.use('/profile', router);
};

module.exports = {
    init,
};