const passport = require('passport');

const init = (app, controllers) => {
    const controller = controllers.authentication;

    app.get('/login', controller.login);
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
