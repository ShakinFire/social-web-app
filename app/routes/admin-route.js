const Router = require('express').Router;
const router = new Router();

const UsersController = require('../controllers/users-controller');
const PostsController = require('../controllers/post-controller');

const isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }
    if (req.user.id === 1) {
        next();
        return;
    }
    res.status(401);
    res.send('You are not authorized to enter the admin page.');
};

router.use(isAdmin);

const init = (app, data) => {
    const usersController = new UsersController(data);
    const postsController = new PostsController(data);

    router
    .get('/', async (req, res) => {
        const users = await usersController.getAllUsers();
        res.render('admin-logged.pug', { users: users });
    })
    .get('/users', async (req, res) => {
        const users = await usersController.getAllUsers();
        res.render('_admin/users.pug', { users: users });
    })
    .post('/users/delete/:id', (req, res) => {
        const {
            id,
        } = req.params;
        usersController.deleteUserById(id);
        res.sendStatus(200);
    })
    .get('/posts', (req, res) => {
        res.render('_admin/posts');
    })
    .get('/something-else', (req, res) => {
        res.render('_admin/something-else');
    });

    app.use('/admin', router);
};

module.exports = {
    init,
};
