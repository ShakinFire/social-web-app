const session = require('express-session');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const init = (app, data) => {
    // defining the strategy
    const strategy = new LocalStrategy( async (username, password, done) => {
        try {
            const queryResult = await data.user.getUserByUsername(username);

            const userData = queryResult.dataValues;
            if (!userData) {
                return done(null, false);
            }
            if (!(userData.password === password)) {
                return done(null, false);
            }
            return done(null, userData);
        } catch (err) {
            console.log(err.Parent);
            return done(err);
        }
    });

    passport.use(strategy);

    app.use(session({
        secret: 'laniakea_key',
        name: 'laniakea_sid',
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user.id);
        }
    });

    passport.deserializeUser((id, done) => {
        const user = data.user.getById(id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    });
};

module.exports = {
    init,
};
