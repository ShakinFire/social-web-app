const passport = require('passport');
const AuthController = require('../controllers/authentication');

const init = (app, data) => {
    const authController = new AuthController(data);

    app.get('/login', (req, res) => {
        if (authController.isLoggedIn(req.user)) {
            res.render('home-logged');
        } else {
            res.render('login');
        }
    });

    app.post('/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: false,
        })
    );

    app.get('/register', (req, res) => {
        if (authController.isLoggedIn(req.user)) {
            res.redirect('/');
        } else {
            res.render('register');
        }
    });

    app.post('/register', (req, res) => {
        const userData = req.body;
        const isValid = authController.register(userData);
        res.send(isValid);
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

module.exports = {
    init,
};
