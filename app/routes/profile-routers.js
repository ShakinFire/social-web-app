const Router = require('express').Router;
const router = new Router();

const UsersController = require('../controllers/users-controller');
const PostController = require('../controllers/post-controller');

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

router.use(isLoggedIn);

const init = (app, data) => {
    const usersController = new UsersController(data);
    const postsController = new PostController(data);

    router
        .get('/', (req, res) => {
            res.render('profile-logged', req.user);
        })
        .get('/home', (req, res) => {
            res.render('_profile/home', req.user);
        })

        .get('/posts', async (req, res) => {
            const posts = await Promise.all(
                    await postsController.getPostsByUser(req.user.id));
            res.render('_profile/posts', { posts: posts });
        })
        .get('/posts/:id/comments', async (req, res) => {
            const {
                id,
            } = req.params;
            let context = await postsController.getPostComments(id);
            context = await Promise.all(context);
            res.render('_profile/_comments.pug', { comments: context });
        })
        .post('/posts/more/:numberOfPosts', (req, res) => {
            // const numberOfPosts = +req.url.split('/').pop();
            // TO-DO: Call template with number of posts.
        })
        .post('/posts/delete/:id', async (req, res) => {
            const {
                id,
            } = req.params;
            const response =
                await postsController.deletePostByUser(req.user.id, id);
            if (response instanceof Error) {
                res.status(401);
                res.send(response.message);
            } else {
                res.send('Successfully deleted.');
            }
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
                await usersController.updateProfileInfo(req.user.id, req.body);
            if (response instanceof Error) {
                res.status(400);
                res.send(response.message);
            } else {
                res.send(JSON.stringify(response));
            }
        })
        .post('/upload', async (req, res) => {
            try {
                await usersController.updateImg(req);
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
