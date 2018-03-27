const Controller = require('../controllers/post-controller');

const init = (app, data) => {
    const PostController = new Controller(data);

    app.post('/', async (req, res) => {
        if (PostController.isLoggedIn(req.user)) {
            const postData = req.body.content;
            const postInfo = await PostController.createPost(postData, req.user);
            const currentUser = await req.user;

            const context = {
                postInfo,
                currentUser,
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
