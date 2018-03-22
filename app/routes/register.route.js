const AuthController = require('../controllers/authentication');

const init = (app, data, controllers) => {
    const authController = new AuthController(data);

    app.get('/register', (req, res) => {
        res.render('register');
    });

    app.post('/register', (req, res) => {
        const userData = req.body;
        const isValid = authController.register(userData);
        res.send(isValid);
    });
};

module.exports = {
    init,
};
