const Controller = require('../controllers/post-controller');

const init = (app, data) => {
    const postController = new Controller(data);
    app.post('/', (req, res) => {
        if (postController.isLoggedIn(req.user)) {
            const postData = req.body;
            // TODO: Continue the logic in the controller for validation and DB
        } else {
            // TODO: Add error message
            res.redirect('/');
        }
    });
};

module.exports = {
    init,
};
