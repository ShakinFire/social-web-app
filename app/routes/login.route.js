const passport = require('passport');

const init = (app, data) => {
    app.get('/login', (req, res) => {
        res.render('login');
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
