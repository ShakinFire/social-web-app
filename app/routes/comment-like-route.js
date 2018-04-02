const Lcontroller = require('../controllers/like-controller');
const Ccontroller = require('../controllers/comment-controller');

const init = (app, data) => {
    const LikeController = new Lcontroller(data);
    const CommentController = new Ccontroller(data);

    app.get('/like', async (req, res) => {
        if (req.user && req.xhr) { // req.xhr for ajax requests only
            const upOrDown = await LikeController
                .likeDislike(req.query.id, req.user.id);
            res.send(upOrDown);
        } else {
            res.redirect('/');
        }
    });

    app.get('/comment', async (req, res) => {
        if (req.user && req.xhr) { // req.xhr for ajax requests only
            const comments = await CommentController.loadMoreComments(req.query);
            const context = {
                comments,
            };
            res.render('comments/comment-block', context);
        } else {
            res.redirect('/');
        }
    });

    app.post('/comment', async (req, res) => {
        if (req.user) {
            try {
                const comment =
                    await CommentController.submitComment(req.body, req.user);
                const user = req.user;
                const context = {
                    comment,
                    user,
                    condition: false,
                };
                res.render('comments/comment-block', context);
            } catch (err) {
                res.status(400);
                res.send(err.message);
            }
        } else {
            res.redirect('/');
        }
    });
};

module.exports = {
    init,
};