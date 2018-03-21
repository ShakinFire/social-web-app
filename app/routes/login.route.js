const passport = require('passport');

const init = (app, data) => {
    app.get('/login', (req, res) => {
        console.log(req.session);
        if (req.user) {
            res.send('You have already logged in.');
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
