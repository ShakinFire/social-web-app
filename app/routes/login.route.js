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
};

module.exports = {
    init,
};
