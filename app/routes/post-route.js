const Controller = require('../controllers/post-controller');

const init = (app, data) => {
    const PostController = new Controller(data);

    app.post('/', async (req, res) => {
        if (PostController.isLoggedIn(req.user)) {
            const postData = req.body.content;
            const allPosts = await PostController
                .createPost(postData, req.user);
            const allUsers = await req.user;

            const context = {
                allPosts,
                allUsers,
                condition: true,
            };

            res.render('post-content', context);
        } else {
            // TO-DO: Add error message
            res.redirect('/');
        }
    });
};

module.exports = {
    init,
};
