const Lcontroller = require('../controllers/like-controller');
const Ccontroller = require('../controllers/comment-controller');

const init = (app, data) => {
    const LikeController = new Lcontroller(data);
    const CommentController = new Ccontroller(data);

    app.get('/like', async (req, res) => {
        if (req.user && req.xhr) {
            const upvote = await LikeController.giveLike(req.query.id, req.user.id);
            res.send('50');
        } else {
            res.redirect('/');
        }
    });

    app.get('/comment', (req, res) => {
        if (req.user) {
            
        } else {
            res.redirect('/');
        }
    });
};

module.exports = {
    init,
};
