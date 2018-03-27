const Controller = require('../controllers/comment-like-controller');

const init = (app, data) => {
    const CommentLikeController = new Controller(data);

    app.post('/like', (req, res) => {
        const like = req.body;
        res.send(like);
    });

    app.post('/comment', (req, res) => {

    });
};

module.exports = {
    init,
};