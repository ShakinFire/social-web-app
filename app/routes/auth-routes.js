const passport = require('passport');

const AuthController = require('../controllers/authentication-controller');

const init = (app, data) => {
    const authController = new AuthController(data);

    app.get('/login', (req, res) => {
        if (authController.isLoggedIn(req.user)) {
            res.redirect('/');
        } else {
            res.render('login');
        }
    });

    app.post('/login', (req, res) => {
        (passport.authenticate('local',
            (err, user, info) => {
                if (err) {
                    res.status(500);
                    res.send('Internal server error');
                    return;
                }
                if (!user) {
                    res.status(400);
                    res.send('Please provide correct credentials');
                    return;
                }
                req.logIn(user, () => {
                    res.redirect('/');
                    return;
                });
           })
        )(req, res);
    });

    app.get('/register', (req, res) => {
        if (authController.isLoggedIn(req.user)) {
            res.redirect('/');
        } else {
            res.render('register');
        }
    });

    app.post('/register', async (req, res) => {
        const response = await authController.register(req.body);
        if (response instanceof Error) {
            res.status(400);
            res.send(response.message);
        } else {
            res.redirect('/');
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
