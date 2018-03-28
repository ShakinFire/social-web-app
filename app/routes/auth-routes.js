const passport = require('passport');

const AuthController = require('../controllers/authentication-controller');

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

    app.post('/register', async (req, res) => {
        const userData = req.body;
        try {
            await authController.register(userData);
            res.redirect('/');
        } catch (err) {
            console.log(err);
            const reason =
            err.parent.sqlMessage.includes('username') ? 'username' : 'email';
            res.send(
                `ERROR: There is already a user registered with that ${reason}
            `);
        }
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

module.exports = {
    init,
};
